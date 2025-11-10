import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0'
import { redis } from '@/lib/redis'
import { v4 as uuidv4 } from 'uuid'

const MAX_DEVICES = 3

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res)
  if (!session || !session.user?.email) {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }

  const email = session.user.email.toLowerCase()
  const key = `sessions:${email}`
  console.log('🧩 Using Redis key:', key)


  try {
    if (req.method === 'GET') {
      const devices = (await redis.lrange(key, 0, -1)) as string[]
      const parsed = devices
        .map((d) => {
          try {
            return typeof d === 'string' ? JSON.parse(d) : d
          } catch {
            return null
          }
        })
        .filter(Boolean)
      res.status(200).json(parsed)
      return
    }

    if (req.method === 'POST') {
      const deviceId = uuidv4()
      const userAgent = req.headers['user-agent'] || 'Unknown'
      const newDevice = {
        deviceId,
        email,
        userAgent,
        timestamp: Date.now(),

      }

      const devices = (await redis.lrange(key, 0, -1)) as string[]

      // Clean parse only valid JSON strings
      const validDevices = devices
        .map((d) => {
          try {
            return typeof d === 'string' ? JSON.parse(d) : d
          } catch {
            return null
          }
        })
        .filter(Boolean)

      if (validDevices.length >= MAX_DEVICES) {
        return res.status(409).json({
          error: `Device limit reached (${MAX_DEVICES}).`,
          devices: validDevices,
        })
      }

      // Always stringify before storing
      await redis.lpush(key, JSON.stringify(newDevice))
      await redis.ltrim(key, 0, MAX_DEVICES - 1)

      const saved = await redis.lrange(key, 0, -1)
      console.log('✅ Redis saved devices:', saved)
      res.status(201).json(newDevice)
      return
    }

    if (req.method === 'DELETE') {
      const { deviceId } = req.query
      if (!deviceId || typeof deviceId !== 'string') {
        res.status(400).json({ error: 'Missing deviceId' })
        return
      }

      const devices = (await redis.lrange(key, 0, -1)) as string[]
      const filtered = devices.filter((d) => {
        try {
          const parsed = typeof d === 'string' ? JSON.parse(d) : d
          return parsed.deviceId !== deviceId
        } catch {
          return false
        }
      })
      await redis.del(key)
      if (filtered.length) {
        await redis.lpush(key, ...filtered.map((f) => JSON.stringify(f)))
      }

      res.status(200).json({ success: true })
      return
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err: any) {
    console.error('Redis error:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

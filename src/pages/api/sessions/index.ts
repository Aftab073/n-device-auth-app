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

  const email = session.user.email
  const key = `sessions:${email}`

  try {
    if (req.method === 'GET') {
      const devices = (await redis.lrange(key, 0, -1)) as string[]
      const parsed = devices.map((d) => JSON.parse(d))
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
      if (devices.length >= MAX_DEVICES) {
        return res
          .status(409)
          .json({ error: `Device limit reached (${MAX_DEVICES}).`, devices: devices.map((d) => JSON.parse(d)) })
      }

      await redis.lpush(key, JSON.stringify(newDevice))
      await redis.ltrim(key, 0, MAX_DEVICES - 1)
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
      const filtered = devices.filter((d) => JSON.parse(d).deviceId !== deviceId)
      await redis.del(key)
      if (filtered.length) await redis.lpush(key, ...filtered)
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

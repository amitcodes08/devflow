'use server'

import User from '@/database/user.model'
import dbConnect from '../mongoose'

export async function getTopUsersForLeaderboard() {
  try {
    await dbConnect()
    const topUsers = await User.find()
      .sort({ reputation: -1 })
      .limit(10)
      .select('name username image reputation')
      .lean()
    return JSON.parse(JSON.stringify(topUsers))
  } catch (error) {
    console.error('Error fetching leaderboard users:', error)
    throw new Error('Failed to fetch leaderboard data')
  }
}

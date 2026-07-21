import Image from 'next/image'
import Link from 'next/link'

import { getTopUsersForLeaderboard } from '@/lib/actions/leaderboard.action'
import ROUTES from '@/constants/routes'

interface LeaderboardUser {
  _id: string
  name: string
  username: string
  image?: string
  reputation: number
}

const LeaderBoard = async () => {
  const topUsers: LeaderboardUser[] = await getTopUsersForLeaderboard()

  const getRankStyle = (index: number) => {
    if (index === 0)
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 ring-1 ring-yellow-400'
    if (index === 1)
      return 'text-light-500 bg-light-700 dark:bg-dark-400 ring-1 ring-light-500 dark:ring-light-400'
    if (index === 2)
      return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 ring-1 ring-amber-500'
    return 'text-dark400_light700 background-light700_dark400'
  }

  return (
    <div className="w-full">
      {/* Page header — matches h1 pattern from other pages */}
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Leaderboard</h1>
      </section>

      {/* Subtitle */}
      <p className="body-regular text-dark500_light700 mt-2">
        Top developers ranked by reputation score
      </p>

      {/* Leaderboard card */}
      <div className="mt-9 w-full max-w-2xl">
        {topUsers.length === 0 ? (
          <div className="card-wrapper rounded-[10px] p-9 text-center">
            <p className="paragraph-regular text-dark400_light700">
              No users on the leaderboard yet.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {topUsers.map((user, index) => (
              <li key={user._id}>
                <Link
                  href={ROUTES.PROFILE(user._id)}
                  className="card-wrapper flex items-center justify-between rounded-[10px] p-5 transition-shadow duration-300 hover:shadow-light-100 dark:hover:shadow-dark-100"
                >
                  {/* Left: rank + avatar + name */}
                  <div className="flex items-center gap-5">
                    {/* Rank badge */}
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full text-base font-bold shadow-sm ${getRankStyle(index)}`}
                    >
                      {index === 0 ? '👑' : `#${index + 1}`}
                    </div>

                    {/* Avatar */}
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-full light-border border-2">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="primary-gradient flex size-full items-center justify-center text-lg font-bold text-light-900">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Name + username */}
                    <div className="flex flex-col">
                      <span className="base-semibold text-dark300_light900 line-clamp-1">
                        {user.name}
                      </span>
                      <span className="small-regular text-dark400_light700">
                        @{user.username}
                      </span>
                    </div>
                  </div>

                  {/* Right: reputation */}
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="body-semibold text-primary-500">
                      {user.reputation.toLocaleString()}
                    </span>
                    <span className="subtle-medium text-dark400_light700 uppercase tracking-wider">
                      rep
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default LeaderBoard

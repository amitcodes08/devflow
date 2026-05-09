import { getTopUsersForLeaderboard } from '@/lib/actions/leaderboard.action'

const LeaderBoard = async () => {
  const topUsers = await getTopUsersForLeaderboard()

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
      <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-center">
        <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-3">
          <span>🏆</span> Top Users
        </h2>
        <p className="text-indigo-100 mt-2 font-medium">
          Global reputation leaderboard
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {topUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No users found on the leaderboard yet.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {topUsers.map((user: any, index: number) => {
              const isFirst = index === 0
              const isSecond = index === 1
              const isThird = index === 2

              let rankStyle =
                'text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400'
              if (isFirst)
                rankStyle =
                  'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/30 ring-1 ring-yellow-400'
              else if (isSecond)
                rankStyle =
                  'text-primary-500 bg-gray-200 dark:bg-gray-700 ring-1 ring-gray-400'
              else if (isThird)
                rankStyle =
                  'text-amber-800 bg-amber-100 dark:bg-amber-900/30 ring-1 ring-amber-500'

              return (
                <li
                  key={user._id}
                  className="group flex items-center justify-between p-4 sm:p-5 bg-gray-50 dark:bg-gray-800/40 rounded-2xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg shadow-sm ${rankStyle}`}
                    >
                      {isFirst ? '👑' : `#${index + 1}`}
                    </div>

                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 ring-2 ring-white dark:ring-gray-800 shadow-sm">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.username}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg font-semibold uppercase bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                          {user.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 dark:text-white text-base sm:text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {user.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        @{user.username}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-lg">
                      <span className="text-indigo-600 dark:text-indigo-400 font-extrabold text-lg sm:text-xl">
                        {user.reputation}
                      </span>
                      <span className="text-indigo-400 dark:text-indigo-500 text-xs font-bold uppercase tracking-wider hidden sm:block">
                        REP
                      </span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default LeaderBoard

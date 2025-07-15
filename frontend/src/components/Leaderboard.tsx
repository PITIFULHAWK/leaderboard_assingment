import React from "react";
import { Trophy, Crown, Medal } from "lucide-react";
import type { User } from "../types";

interface LeaderboardProps {
  users: User[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">
            #{rank}
          </div>
        );
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white";
      default:
        return "bg-white border border-gray-200";
    }
  };

  const topThree = users.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Top 3 Podium */}
      <div className="bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="text-center mb-6">
          <Trophy className="w-12 h-12 mx-auto mb-2 text-yellow-300" />
          <h2 className="text-2xl font-bold">Top Performers</h2>
          <p className="text-orange-100">Leading the leaderboard</p>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* 2nd Place */}
          {topThree[1] && (
            <div className="text-center">
              <div className="relative mb-3">
                <img
                  src={topThree[1].avatar}
                  alt={topThree[1].name}
                  className="w-16 h-16 rounded-full mx-auto border-4 border-gray-300 object-cover"
                />
                <div className="absolute -top-2 -right-2 bg-gray-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  2
                </div>
              </div>
              <h3 className="font-semibold text-lg truncate">
                {topThree[1].name}
              </h3>
              <p className="text-orange-100 text-sm">
                {topThree[1].totalPoints.toLocaleString()}
              </p>
            </div>
          )}

          {/* 1st Place */}
          {topThree[0] && (
            <div className="text-center">
              <div className="relative mb-3">
                <img
                  src={topThree[0].avatar}
                  alt={topThree[0].name}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-yellow-400 object-cover"
                />
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <Crown className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 text-yellow-300" />
              </div>
              <h3 className="font-bold text-xl truncate">{topThree[0].name}</h3>
              <p className="text-orange-100">
                {topThree[0].totalPoints.toLocaleString()}
              </p>
            </div>
          )}

          {/* 3rd Place */}
          {topThree[2] && (
            <div className="text-center">
              <div className="relative mb-3">
                <img
                  src={topThree[2].avatar}
                  alt={topThree[2].name}
                  className="w-16 h-16 rounded-full mx-auto border-4 border-amber-400 object-cover"
                />
                <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  3
                </div>
              </div>
              <h3 className="font-semibold text-lg truncate">
                {topThree[2].name}
              </h3>
              <p className="text-orange-100 text-sm">
                {topThree[2].totalPoints.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Remaining Rankings */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Full Rankings
        </h3>
        {users.map((user, _index) => (
          <div
            key={user.id}
            className={`p-4 rounded-xl flex items-center justify-between transition-all duration-200 hover:shadow-md ${getRankStyle(
              user.rank
            )}`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center">
                {getRankIcon(user.rank)}
              </div>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-lg">{user.name}</h4>
                <p
                  className={`text-sm ${
                    user.rank <= 3 ? "text-white opacity-90" : "text-gray-500"
                  }`}
                >
                  Rank #{user.rank}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`text-xl font-bold ${
                  user.rank <= 3 ? "text-white" : "text-gray-800"
                }`}
              >
                {user.totalPoints.toLocaleString()}
              </div>
              <div
                className={`text-sm ${
                  user.rank <= 3 ? "text-white opacity-90" : "text-gray-500"
                }`}
              >
                points
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

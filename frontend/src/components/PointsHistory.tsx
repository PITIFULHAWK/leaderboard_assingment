import React from "react";
import { History, Clock, Star } from "lucide-react";
import type { ClaimHistory } from "../types";

interface PointsHistoryProps {
  history: ClaimHistory[];
}

export const PointsHistory: React.FC<PointsHistoryProps> = ({ history }) => {
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <History className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-bold text-gray-800">Points History</h2>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No points claimed yet</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.map((entry) => (
            <div
              key={entry._id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    {entry.userId.name}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-orange-600">
                  +{entry.pointsClaimed}
                </div>
                <div className="text-xs text-gray-500">
                  {formatTimestamp(entry.claimedAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

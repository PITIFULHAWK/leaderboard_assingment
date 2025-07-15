import React from "react";
import { Zap } from "lucide-react";
import type { User } from "../types";

interface ClaimButtonProps {
  selectedUser: User | null;
  onClaim: () => void;
  isLoading: boolean;
}

export const ClaimButton: React.FC<ClaimButtonProps> = ({
  selectedUser,
  onClaim,
  isLoading,
}) => {
  return (
    <button
      onClick={onClaim}
      disabled={!selectedUser || isLoading}
      className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
        !selectedUser || isLoading
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      }`}
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Claiming...</span>
        </>
      ) : (
        <>
          <Zap size={20} />
          <span>Claim Random Points</span>
        </>
      )}
    </button>
  );
};

import React, { useState } from "react";
import { ChevronDown, Search, Plus } from "lucide-react";
import type { User } from "../types";

interface UserSelectorProps {
  users: User[];
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
  onAddUser: () => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUser,
  onUserSelect,
  onAddUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between hover:border-orange-300 transition-colors shadow-sm"
      >
        <div className="flex items-center space-x-3">
          {selectedUser ? (
            <>
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium text-gray-800">
                {selectedUser.name}
              </span>
            </>
          ) : (
            <span className="text-gray-500">Select a user</span>
          )}
        </div>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl border border-gray-200 shadow-lg max-h-96 overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {filteredUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => {
                  onUserSelect(user);
                  setIsOpen(false);
                  setSearchTerm("");
                }}
                className="w-full p-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-500">
                    {user.totalPoints.toLocaleString()} points
                  </div>
                </div>
                <div className="text-sm font-medium text-orange-600">
                  #{user.rank}
                </div>
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-gray-100">
            <button
              onClick={() => {
                onAddUser();
                setIsOpen(false);
                setSearchTerm("");
              }}
              className="w-full flex items-center justify-center space-x-2 p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <Plus size={18} />
              <span>Add New User</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

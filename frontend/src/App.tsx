import { useState, useEffect } from "react";
import { Trophy, Users, BarChart3 } from "lucide-react";
import { UserSelector } from "./components/UserSelector";
import { ClaimButton } from "./components/ClaimButton";
import { Leaderboard } from "./components/Leaderboard";
import { PointsHistory } from "./components/PointsHistory";
import { AddUserModal } from "./components/AddUserModal";
import { NotificationToast } from "./components/NotificationToast";
import { apiService } from "./services/api";
import type { User, ClaimHistory } from "./types";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [history, setHistory] = useState<ClaimHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [activeTab, setActiveTab] = useState<"leaderboard" | "history">(
    "leaderboard"
  );
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
    points?: number;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  useEffect(() => {
    loadUsers();
    loadHistory();
  }, []);

  const loadUsers = async () => {
    const response = await apiService.getUsers();
    if (response.success && response.data) {
      setUsers(response.data);
    }
  };

  const loadHistory = async () => {
    const response = await apiService.getPointsHistory();
    if (response.success && response.data) {
      const history = response.data;
      setHistory(history);
    }
  };

  const handleClaimPoints = async () => {
    if (!selectedUser) return;

    setIsLoading(true);
    try {
      const response = await apiService.claimPoints({
        userId: selectedUser.id,
      });

      if (response.success && response.data) {
        const { pointsClaimed } = response.data;

        // Refresh data
        await loadUsers();
        await loadHistory();

        // Show success notification
        setNotification({
          message: `Successfully claimed points for ${selectedUser.name}!`,
          type: "success",
          isVisible: true,
          points: pointsClaimed,
        });

        // Update selected user with new points
        setSelectedUser((prev) =>
          prev
            ? { ...prev, totalPoints: prev.totalPoints + pointsClaimed }
            : null
        );
      } else {
        setNotification({
          message: response.message || "Failed to claim points",
          type: "error",
          isVisible: true,
        });
      }
    } catch (_error) {
      setNotification({
        message: "An error occurred while claiming points",
        type: "error",
        isVisible: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (name: string, avatar?: string) => {
    setIsAddingUser(true);
    try {
      const response = await apiService.addUser({ name, avatar });

      if (response.success) {
        await loadUsers();
        setIsAddModalOpen(false);
        setNotification({
          message: `User "${name}" added successfully!`,
          type: "success",
          isVisible: true,
        });
      } else {
        setNotification({
          message: response.message || "Failed to add user",
          type: "error",
          isVisible: true,
        });
      }
    } catch (_error) {
      setNotification({
        message: "An error occurred while adding user",
        type: "error",
        isVisible: true,
      });
    } finally {
      setIsAddingUser(false);
    }
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="w-12 h-12 text-orange-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Points Leaderboard
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Claim points and climb the rankings!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Selection */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-bold text-gray-800">Select User</h2>
              </div>
              <UserSelector
                users={users}
                selectedUser={selectedUser}
                onUserSelect={setSelectedUser}
                onAddUser={() => setIsAddModalOpen(true)}
              />
            </div>

            {/* Claim Button */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-bold text-gray-800">
                  Claim Points
                </h2>
              </div>
              <ClaimButton
                selectedUser={selectedUser}
                onClaim={handleClaimPoints}
                isLoading={isLoading}
              />
              {selectedUser && (
                <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <strong>{selectedUser.name}</strong> currently has{" "}
                    <strong>{selectedUser.totalPoints}</strong> points
                  </p>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Users:</span>
                  <span className="font-semibold">{users.length!}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Claims:</span>
                  <span className="font-semibold">{history.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Top Score:</span>
                  <span className="font-semibold">
                    {users.length > 0
                      ? users[0].totalPoints.toLocaleString()
                      : "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Leaderboard & History */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex mb-6 bg-white rounded-xl border border-gray-200 p-2 shadow-sm">
              <button
                onClick={() => setActiveTab("leaderboard")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  activeTab === "leaderboard"
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Leaderboard
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  activeTab === "history"
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                History
              </button>
            </div>

            {/* Content */}
            {activeTab === "leaderboard" ? (
              <Leaderboard users={users} />
            ) : (
              <PointsHistory history={history} />
            )}
          </div>
        </div>
      </div>

      {/* Modals and Notifications */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={handleAddUser}
        isLoading={isAddingUser}
      />

      <NotificationToast
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={closeNotification}
        points={notification.points}
      />
    </div>
  );
}

export default App;

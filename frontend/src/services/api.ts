import type {
  User,
  ClaimHistory,
  ApiResponse,
  ClaimPointsRequest,
  AddUserRequest,
} from "../types";

const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiService = {
  // Get all users
  async getUsers(): Promise<ApiResponse<User[]>> {
    // await delay(500);
    try {
      // This will be replaced with actual API call
      const response = await fetch(`${BASE_API_URL}/api/users`);
      const data = await response.json();

      return {
        success: true,
        data,
      };
    } catch (_error) {
      return {
        success: false,
        message: "Failed to fetch users",
      };
    }
  },

  // Claim points for a user
  async claimPoints(request: ClaimPointsRequest): Promise<
    ApiResponse<{
      pointsClaimed: number;
      updatedUser: User;
    }>
  > {
    try {
      const response = await fetch(`${BASE_API_URL}/api/claimPoints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      const data = await response.json();

      return {
        success: true,
        data,
      };
    } catch (_error) {
      return {
        success: false,
        message: "Failed to claim points",
      };
    }
  },

  // Add new user
  async addUser(request: AddUserRequest): Promise<ApiResponse<User>> {
    // await delay(600);
    try {
      const response = await fetch(`${BASE_API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      const data = await response.json();

      return {
        success: true,
        data: data,
      };
    } catch (_error) {
      return {
        success: false,
        message: "Failed to add user",
      };
    }
  },

  // Get points history
  async getPointsHistory(): Promise<ApiResponse<ClaimHistory[]>> {
    // await delay(400);
    try {
      // This will be replaced with actual API call
      const response = await fetch(`${BASE_API_URL}/api/claimHistory`);
      const data = await response.json();

      return {
        success: true,
        data,
      };
    } catch (_error) {
      return {
        success: false,
        message: "Failed to fetch points history",
      };
    }
  },
};

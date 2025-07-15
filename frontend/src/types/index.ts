export interface User {
  id: string;
  name: string;
  avatar: string;
  totalPoints: number;
  rank: number;
  createdAt: string;
}

interface ClaimedUser {
  _id: string;
  name: string;
  avatar: string;
}

export interface ClaimHistory {
  _id: string;
  userId: ClaimedUser;
  pointsClaimed: number;
  claimedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface ClaimPointsRequest {
  userId: string;
}

export interface AddUserRequest {
  name: string;
  avatar?: string;
}

import { Request, Response } from "express";
import mongoose from "../config/db";
import User, { IUser } from "../models/User";
import ClaimHistory, { IClaimHistory } from "../models/ClaimHistory";

// Define an interface for a leaderboard entry
interface LeaderboardEntry {
  _id: mongoose.Types.ObjectId;
  id: string;
  name: string;
  avatar: string;
  totalPoints: number;
  rank: number;
  createdAt: Date;
}

// Hardcoded default avatars for new users
const defaultAvatars = [
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
];

// Helper function to get the current leaderboard
const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  // Find all users, sort them by totalPoints in descending order
  const users: IUser[] = await User.find().sort({ totalPoints: -1 });

  // Assign ranks based on the sorted order
  return users.map((user, index) => ({
    _id: user._id as mongoose.Types.ObjectId,
    id: user._id!.toString(),
    name: user.name,
    avatar: user.avatar,
    totalPoints: user.totalPoints,
    rank: index + 1,
    createdAt: user.createdAt,
  }));
};

// @desc   Get all users (leaderboard)
// @route  GET /api/users
// @access Public
export const getUser = async (_req: Request, res: Response) => {
  try {
    const leaderboard: LeaderboardEntry[] = await getLeaderboard();
    res.json(leaderboard);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc   Add a new User
// @route  POST /api/users
// @access Public
export const addUser = async (req: Request, res: Response) => {
  const { name, avatar } = req.body;

  if (!name) {
    // if (!avatar) {
    //   return res
    //     .status(400)
    //     .json({ msg: "Please select a avatar from the given defaultAvatars." });
    // }
    return res.status(400).json({ msg: "Please enter a user name." });
  }

  try {
    let user: IUser | null = await User.findOne({ name });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User with this name alredy exists." });
    }

    const userAvatar =
      avatar ||
      defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

    user = new User({ name, avatar: userAvatar });

    await user.save();

    const leaderboard: LeaderboardEntry[] = await getLeaderboard();
    res.status(201).json({ msg: "User added successfully", user, leaderboard });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc   Claim random points for a user
// @route  POST /api/claimPoints
// @access Public
export const claimPoints = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ msg: "User ID is required." });
  }

  try {
    let user: IUser | null = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    const pointsClaimed: number = Math.floor(Math.random() * 10) + 1;

    user.totalPoints += pointsClaimed;
    await user.save();

    const claimedHistory: IClaimHistory = new ClaimHistory({
      userId: user._id,
      pointsClaimed,
    });
    await claimedHistory.save();

    const leaderboard: LeaderboardEntry[] = await getLeaderboard();

    res.status(201).json({
      msg: `Successfully claimed ${pointsClaimed} points for ${user.name}`,
      user: {
        _id: user._id,
        name: user.name,
        totalPoints: user.totalPoints,
      },
      pointsClaimed,
      leaderboard,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// @desc    Get claim history for a specific user or all history
// @route   GET /api/claimHistory/:userId?
// @access  Public
export const getClaimHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    let history: IClaimHistory[];

    if (userId) {
      history = (await ClaimHistory.find({ userId })
        .populate("userId", "name")
        .sort({ claimedAt: -1 })) as IClaimHistory[];
    } else {
      history = (await ClaimHistory.find()
        .populate("userId", "name")
        .sort({ claimedAt: -1 })) as IClaimHistory[];
    }
    res.json(history);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Seed initial users if the collection is empty
// @route   POST /api/seedUsers
// @access  Public (for development purposes)
export const seedUsers = async (req: Request, res: Response) => {
  try {
    const userCount: number = await User.countDocuments();
    if (userCount === 0) {
      const initialUsers: Partial<IUser>[] = [
        {
          id: "1",
          name: "Pritesh",
          avatar:
            "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
          totalPoints: 1614546,
          createdAt: new Date("2024-01-01"),
        },
        {
          id: "2",
          name: "Rimjhim",
          avatar:
            "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
          totalPoints: 1134590,
          createdAt: new Date("2024-01-02"),
        },
        {
          id: "3",
          name: "Krishu Rajput",
          avatar:
            "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
          totalPoints: 942034,
          createdAt: new Date("2024-01-03"),
        },
        {
          id: "4",
          name: "Thakur Ram Vijay Singh",
          avatar:
            "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
          totalPoints: 558378,
          createdAt: new Date("2024-01-04"),
        },
        {
          id: "5",
          name: "Mukku",
          avatar:
            "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
          totalPoints: 503042,
          createdAt: new Date("2024-01-05"),
        },
        {
          id: "6",
          name: "VyHD",
          avatar:
            "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
          totalPoints: 352250,
          createdAt: new Date("2024-01-06"),
        },
        {
          id: "7",
          name: "Ashish",
          avatar:
            "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
          totalPoints: 346392,
          createdAt: new Date("2024-01-07"),
        },
        {
          id: "8",
          name: "Mr. Rajput",
          avatar:
            "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
          totalPoints: 343892,
          createdAt: new Date("2024-01-08"),
        },
        {
          id: "9",
          name: "Ishit",
          avatar:
            "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
          totalPoints: 321932,
          createdAt: new Date("2024-01-09"),
        },
        {
          id: "10",
          name: "Devil",
          avatar:
            "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
          totalPoints: 0,
          createdAt: new Date("2024-01-10"),
        },
      ];

      await User.insertMany(
        initialUsers.map((user) => ({
          ...user,
        }))
      );
      console.log("Initial users seeded.");
      const leaderboard = await getLeaderboard();
      return res
        .status(201)
        .json({ msg: "Initial users seeded successfully", leaderboard });
    }
    res.status(200).json({ msg: "Users already exist, no seeding performed." });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

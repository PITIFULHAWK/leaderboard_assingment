import { Router } from "express";
import {
  getUsers,
  addUser,
  claimPoints,
  getClaimHistory,
  seedUsers,
} from "../controllers/userController";

const router: Router = Router();

// @route   GET /api/users
// @desc    Get all users (leaderboard)
router.get("/users", getUsers);

// @route   POST /api/users
// @desc    Add a new user
router.post("/users", addUser);

// @route   POST /api/claimPoints
// @desc    Claim random points for a user
router.post("/claimPoints", claimPoints);


// @route   GET /api/claimHistory
// @desc    Get all claim history
router.get('/claimHistory', getClaimHistory);

// @route   GET /api/claimHistory/:userId
// @desc    Get claim history for a specific user
router.get('/claimHistory/:userId', getClaimHistory);
;

// @route   POST /api/seedUsers
// @desc    Seed initial users if the collection is empty (for development)
router.post("/seedUsers", seedUsers);

export default router;

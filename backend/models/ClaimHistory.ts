import mongoose, { Document, Schema } from "../config/db";

// Define an interface for ClaimHistory Document
export interface IClaimHistory extends Document {
  userId: mongoose.Types.ObjectId;
  pointsClaimed: number;
  claimedAt: Date;
}

// Define the schema for the ClaimHistory model
const ClaimHistorySchema: Schema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  pointsClaimed: {
    type: Number,
    require: true,
  },
  claimedAt: {
    type: Date,
    default: Date.now(),
  },
});

// Create and export ClaimHistory model based on the schema
export default mongoose.model<IClaimHistory>(
  "ClaimHistory",
  ClaimHistorySchema,
);

import mongoose from "mongoose";

const UsageSchema = new mongoose.Schema({
  apiKey: { type: String, required: true },
  endpoint: { type: String, required: true },
  count: { type: Number, default: 1 },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Usage || mongoose.model("Usage", UsageSchema);

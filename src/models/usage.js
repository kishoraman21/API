import mongoose from "mongoose";

const UsageSchema = new mongoose.Schema({
  apikey: { type: String, required: true },
  endpoint: { type: String, required: true },
  status_code: { type: Number, required: true },
  is_success: { type: Boolean, required: true },
  response_time_ms: { type: Number, required: true },
  method: { type: String, required: true }, // <-- New
  ip: { type: String }, // <-- New
  count: { type: Number, default: 1 },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Usage || mongoose.model("Usage", UsageSchema);

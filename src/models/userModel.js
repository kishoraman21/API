import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: function() { return this.provider === 'credentials'; }
  },
  apikey: { 
    type: String,
    unique: true,
    sparse: true // Allows multiple documents to have a null apikey
  },
  provider: {
    type: String,
    required: true
  }
});

// Use a pre-save hook to handle hashing and API key generation
userSchema.pre("save", async function (next) {
  
  if (this.isModified("password") && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Add the comparePassword instance method for credentials login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", userSchema);

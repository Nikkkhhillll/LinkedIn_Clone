// User model - defines how user data is stored in MongoDB
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the structure of user data
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is required
      trim: true, // Removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true, // No two users can have same email
      lowercase: true, // Converts to lowercase
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Password must be at least 6 characters
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Hash password before saving to database
// This makes passwords secure by converting them to encrypted strings
userSchema.pre("save", async function (next) {
  // Only hash if password is modified
  if (!this.isModified("password")) return next();

  // Hash the password with strength of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
module.exports = mongoose.model("User", userSchema);

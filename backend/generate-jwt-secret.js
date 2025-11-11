// Simple JWT Secret Generator
// Run this file with: node generate-jwt-secret.js

const crypto = require("crypto");

console.log("🔐 JWT Secret Generator for LinkedIn Clone");
console.log("==========================================");
console.log("");

// Generate a secure random secret
const jwtSecret = crypto.randomBytes(64).toString("hex");

console.log("Your JWT Secret:");
console.log(jwtSecret);
console.log("");
console.log("💾 Copy this secret to your .env file:");
console.log(`JWT_SECRET=${jwtSecret}`);
console.log("");
console.log("⚠️  Keep this secret safe and never share it publicly!");

require("dotenv").config();
const mongoose = require("mongoose");
const { Admin } = require("./models/user");

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.URI || process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Create default admin
async function createDefaultAdmin() {
  try {
    // Check if any admin already exists
    const existingAdmin = await Admin.findOne({});
    
    if (existingAdmin) {
      console.log("Admin already exists:");
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Name: ${existingAdmin.firstName} ${existingAdmin.lastName}`);
      return;
    }

    // Create default admin credentials
    const defaultAdmin = new Admin({
      firstName: "Super",
      lastName: "Admin",
      age: 30,
      email: "admin@guftaar.com",
      password: "admin123", // This will be hashed by the pre-save middleware
    });

    await defaultAdmin.save();
    
    console.log("✅ Default admin created successfully!");
    console.log("📧 Email: admin@guftaar.com");
    console.log("🔑 Password: admin123");
    console.log("");
    console.log("⚠️  IMPORTANT: Please change the default password after first login!");
    
  } catch (error) {
    console.error("Error creating default admin:", error);
  }
}

// Main function
async function setup() {
  await connectDB();
  await createDefaultAdmin();
  
  // Close the connection
  await mongoose.connection.close();
  console.log("Database connection closed.");
  process.exit(0);
}

// Run the setup
setup().catch((error) => {
  console.error("Setup failed:", error);
  process.exit(1);
});

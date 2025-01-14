import mongoose from "mongoose";

let isConnected = false; // Track connection status

export const ConnectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Prompt_generator", // Ensure this matches your MongoDB database name
      useNewUrlParser: true, // Optional for Mongoose 6+
      useUnifiedTopology: true, // Optional for Mongoose 6+
    });

    isConnected = connection.connections[0].readyState === 1; // Check if the connection is successful
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message); // Log only the error message
    throw new Error(error.message); // Optional: Re-throw for upstream handling
  }
};

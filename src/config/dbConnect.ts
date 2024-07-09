import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

const dbConnect = async () => {
  if (connection.isConnected) {
    console.log("Database is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_DB_URI || "");

    connection.isConnected = db.connections[0].readyState;

    console.log("Mongoose connected");
  } catch (error) {
    console.log("Error in database connection", error);

    process.exit(1);
  }
};

export default dbConnect;
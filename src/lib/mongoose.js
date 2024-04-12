import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(
      "mongodb+srv://admin:edXQ5GcKHugoKete@tadatodo.spyb54i.mongodb.net/?retryWrites=true&w=majority&appName=TaDaToDo",
      {
        dbName: "TaDaToDo",
      }
    );

    isConnected = true;

    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};

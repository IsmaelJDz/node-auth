import mongoose from "mongoose";

interface Options {
  mongoUrl: string;
  dbName: string;
}

//"mongodb://localhost:27017/express-mongo", {}

export class MongoDatabase {
  static async connect(options: Options) {
    const { dbName, mongoUrl } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });

      console.log("Connected to MongoDB ✅");
      return true;
    } catch (error) {
      console.log("Error connecting to MongoDB ❌", error);
      throw error;
    }
  }
}

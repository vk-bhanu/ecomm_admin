import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
    mongoose.set("strictQuery", true)

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL || "", {
            dbName: "BSCreates_Admin"
        })

        isConnected = true;
        console.log("MonogDB is Connected");
    } catch (err){
        console.log(err)
    }
}
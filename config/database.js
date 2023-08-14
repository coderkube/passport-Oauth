import mongoose from "mongoose";

// * mongodb connection
 
const connectDb = async ()=> {
    try {
        const { connection } = await mongoose
        .connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log(`Connected with mongodb ${connection.host}`);
    } catch (err) {
        console.log(err);
    }
}

export default connectDb;


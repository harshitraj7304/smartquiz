import mongoose from "mongoose";

const mongoDbUri = `mongodb+srv://admin2:admin2@cluster0.ckhcvux.mongodb.net/quiz_app?retryWrites=true&w=majority&appName=Cluster0`;

//definition

async function connectDb() {
  //   console.log("hi db connecting");

  try {
    const response = await mongoose.connect(mongoDbUri);
    console.log("db connected..");
    // console.log(response);
  } catch (error) {
    console.log(error);
    console.log("Error in connecting database");
  }
}

//function call
connectDb();

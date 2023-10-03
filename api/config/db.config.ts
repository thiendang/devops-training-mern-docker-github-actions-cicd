import * as Mongoose from "mongoose";
require('dotenv').config()

let database: Mongoose.Connection;

export const connect = () => {

    const url = process.env.MONGODB_URI;
    console.log("from connect: process.env.MONGODB_URI :::",process.env.MONGODB_URI)

    if (database) {
        return;
    }
    
    Mongoose.connect(url, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    
    database = Mongoose.connection;

    database.once("open", async () => {
        console.log("Connected to database");
    });
      
    database.on("error", () => {
        console.log("Error connecting to database");
    });

};

export const disconnect = () => {
    
    if (!database) {
      return;
    }
    
    Mongoose.disconnect();

    database.once("close", async () => {
        console.log("Diconnected  to database");
    });

};
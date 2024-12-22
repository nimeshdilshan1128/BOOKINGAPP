import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';

dotenv.config();

const app = express();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

//middlewares
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


app.listen(8800, () => {
    connect();
    console.log("connected to backend!");
});
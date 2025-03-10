// require('dotenv').config();
console.clear();
console.log(`[${new Date().toLocaleTimeString()}]`);
// import * as dotenv from "dotenv";
import 'dotenv/config';
import expressApp from "./express.app";
import http from 'http';
import { connectToDatabase } from './db';
import { scheduleDiscountUpdate } from './src/models/products.model';
import { scheduleRecurringOrder } from './src/models/distributedOrder.model';
import redis from './src/services/redis.service';
import { Server } from 'socket.io';
const __port__ = process.env.PORT;


const server = http.createServer(expressApp);
export const io = new Server(server);



async function startServer() {
  await connectToDatabase();
  await redis.connect();
  scheduleDiscountUpdate();
  scheduleRecurringOrder();

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on("joinRoom", ({ userId }: any) => {
      socket.join(`${userId} `);
      console.log(`${userId} joined room`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

  });


  server.listen(__port__, () => {
    console.log(`Listening on http://localhost:${__port__}`);
  });
}

startServer();

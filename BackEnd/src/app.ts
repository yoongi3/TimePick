import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { eventCreateHandler, eventsListHandler, participantHandler } from './Routes/eventRoute';
import { loginHandler, registerHandler, getUserNameByIdHandler } from './Routes/authRoute';
import { createGridHandler, gridListhandler, pushUserGridHandler, getUserGridHandler } from './Routes/gridRoute';


export const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors())

// Event routes
app.get("/events", eventsListHandler)
app.post("/events/create", eventCreateHandler)
app.post("/events/addParticipant/:eventId", participantHandler) 

// User routes
app.get("/users", getUserNameByIdHandler)
app.post("/register", registerHandler)
app.post("/login", loginHandler)

// Grid routes
app.post("/grid/:eventId", createGridHandler)
app.get("/grid", gridListhandler)
app.patch("/grid/:eventId/:userId", pushUserGridHandler);
app.get("/usergrid/:eventId/:userId", getUserGridHandler);
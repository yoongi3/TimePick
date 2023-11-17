import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { eventCreateHandler, eventsListHandler } from './Routes/eventRoute';
import { loginHandler, registerHandler, usersListHandler } from './Routes/authRoute';


export const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors())

// Event routes
app.get("/events", eventsListHandler)
app.post("/events/create", eventCreateHandler)

// User routes
app.get("/users", usersListHandler)
app.post("/register", registerHandler)
app.post("/login", loginHandler)
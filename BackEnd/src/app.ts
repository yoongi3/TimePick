import express from 'express';
import bodyParser from 'body-parser';
import { eventCreateHandler, eventsListHandler } from './Routes/eventRoute';
import cors from 'cors';


export const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors())

app.get("/events", eventsListHandler)
app.post("/events/create", eventCreateHandler)
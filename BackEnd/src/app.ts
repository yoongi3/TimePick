import express from 'express';
import bodyParser from 'body-parser';
import { eventHandler, eventsListHandler } from './Routes/eventRoute';


export const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.get("/events/list", eventsListHandler)
app.post("/events", eventHandler)
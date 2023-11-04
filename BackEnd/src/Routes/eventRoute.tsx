import { Request, Response } from "express";
import { eventsDataBase } from "../Data/EventsDataBase";
import { v4 as uuidv4 } from "uuid";
export const eventHandler = (req: Request, res: Response) => {
    if (req.method != "POST") return;
    if (!req.body) return;

    const requestBody = req.body;
    const name = requestBody.name;
    const timeStart = requestBody.timeStart;
    const timeEnd = requestBody.timeEnd;
    const dateStart = requestBody.dateStart;
    const dateEnd = requestBody.dateEnd;

    const uuid = uuidv4();

    const newEventObj = {
        id: uuid,
        name: name,
        timeStart: timeStart,
        timeEnd: timeEnd,
        dateStart: dateStart,
        dateEnd: dateEnd,
    };

    eventsDataBase.push(newEventObj)

    for (const event of eventsDataBase) {
        console.log(event);
    }

    return res.status(201).json(newEventObj);
}
export const eventsListHandler = (req: Request, res: Response) => {
    const name = req.query.name
    const dateStart = req.query.dateStart;
    console.log(name)
    const events = eventsDataBase.filter(event => {
        console.log(event)
        if(event.name == name && event.dateStart == dateStart){
            return true
        }
        return false;
    })
    console.log(events)
    return res.status(201).json(events);
}

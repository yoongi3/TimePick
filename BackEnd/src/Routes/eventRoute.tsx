import { Request, Response } from "express";
import { eventDatabase } from "../Data/Events";
import { v4 as uuidv4 } from "uuid";

export const eventCreateHandler = (req: Request, res: Response) => {
    if (req.method != "POST") return;
    if (!req.body) return;

    const requestBody = req.body;
    const name = requestBody.name;
    const timeStart = requestBody.timeStart;
    const timeEnd = requestBody.timeEnd;
    const dateStart = requestBody.dateStart;
    const dateEnd = requestBody.dateEnd;
    const participants = [requestBody.participants];

    const uuid = uuidv4();

    const newEventObj = {
        id: uuid,
        name: name,
        timeStart: timeStart,
        timeEnd: timeEnd,
        dateStart: dateStart,
        dateEnd: dateEnd,
        participants: participants,
    };

    eventDatabase.push(newEventObj)

    for (const event of eventDatabase) {
        console.log(event);
    }

    return res.status(201).json(newEventObj);
}

export const eventsListHandler = (req: Request, res: Response) => {
    const id = req.query.id
    if (id){
        const events = eventDatabase.filter(event => {
            console.log(event)
            if(event.id == id){
                return true
            }
            return false;
        })
        console.log(events)
        return res.status(200).json(events);
    }else {
        return res.status(200).json(eventDatabase);
    }
}

export const participantHandler = (req: Request, res: Response) => {
    const eventId = req.params.eventId;
    const { participantId } = req.body;
  
    const event = eventDatabase.find((e) => e.id === eventId);
  
    if (event) {
        if (event.participants.includes(participantId)) {
            res.status(400).json({ error: "User is already a participant in this event" });
        } else {
            event.participants.push(participantId);
            console.log(event.participants);
            res.status(200).json(event);
        }
    } else {
        res.status(404).json({ error: "Event not found" });
    }
};

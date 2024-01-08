import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { GridsDatabase, EventGrid, UserGrid, GridCell } from "../Data/Grids";

export const createGridHandler = (req: Request, res: Response) => {
    if (req.method !== 'POST') return;
    if (!req.body) return;

    const eventId = req.body.eventId;
    const { userId, selectedCells } = req.body;

    const eventGrid: EventGrid = {
        eventId: eventId,
        users: [
            {
                userId,
                selectedCells,
            },
        ],
    };

    GridsDatabase.push(eventGrid);

    return res.status(201).json(eventGrid);
};


function getAllSelectedCells(eventGrid: EventGrid): GridCell[] {
    return eventGrid.users.flatMap((userGrid) => userGrid.selectedCells);
}

export const getEventGridHandler = (req: Request, res: Response) => {
    const eventId = req.params.eventId;
  
    const eventGrid = GridsDatabase.find((grid) => grid.eventId === eventId);
  
    if (eventGrid) {
      const selectedGridsArray: GridCell[] = getAllSelectedCells(eventGrid);
  
      console.log(selectedGridsArray);
      return res.status(200).json(selectedGridsArray);
    } else {
      return res.status(404).json({ error: 'Event grid not found' });
    }
  };

export const pushUserGridHandler = (req: Request, res: Response) => {
    const eventId = req.params.eventId;
    const userId = req.params.userId;
    const { selectedCells } = req.body;
    
    const eventGridIndex = GridsDatabase.findIndex((grid) => grid.eventId === eventId);

    if (eventGridIndex !== -1) {
        const eventGrid = GridsDatabase[eventGridIndex];

        const userGrid = eventGrid.users.findIndex((user) => user.userId === userId);

        if (userGrid !== -1) {
            eventGrid.users[userGrid].selectedCells = selectedCells;
        } else {
            const newUser: UserGrid = {
                userId,
                selectedCells,
            };
            eventGrid.users.push(newUser);
        }

        console.log('Updated Event Grid:', eventGrid);
        console.log('user: ',userId , 'selected cells: ',selectedCells)

        return res.status(200).json(eventGrid);
    } else {
        return res.status(404).json({ error: 'Event grid not found' });
    }
};

export const getUserGridHandler = (req: Request, res: Response) => {
    const eventId = req.params.eventId;
    const userId = req.params.userId;

    const eventGrid = GridsDatabase.find((grid) => grid.eventId === eventId);

    if (eventGrid) {
        const userGridIndex = eventGrid.users.findIndex((user) => user.userId === userId);

        if (userGridIndex !== -1) {
            const selectedCells = eventGrid.users[userGridIndex].selectedCells;
            return res.status(200).json(selectedCells);
        } else {
            return res.status(404).json({ error: 'User not found in the event grid' });
        }
    } else {
        return res.status(404).json({ error: 'Event grid not found' });
    }
};
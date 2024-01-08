export type GridCell = {
    row: number;
    col: number;
}

export type UserGrid = {
    userId: string;
    selectedCells: GridCell[];
}

export type EventGrid = {
    eventId: string;
    users: UserGrid[];
}

export var GridsDatabase: EventGrid[] = [];

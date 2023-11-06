type UserEvent = {
    id: string,
    name: string,
    timeStart: number,
    timeEnd: number,
    dateStart: string,
    dateEnd: string,
}

export var eventsDataBase: UserEvent[] = [];
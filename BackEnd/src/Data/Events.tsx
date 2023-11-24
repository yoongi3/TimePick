type Event = {
    id: string,
    name: string,
    timeStart: number,
    timeEnd: number,
    dateStart: string,
    dateEnd: string,
    participants: string[],
}

export var eventDatabase: Event[] = [];
export class RoomFullError extends Error {
    constructor() {
        super("Room is full!")
    }
}

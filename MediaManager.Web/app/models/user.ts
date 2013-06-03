module MediaManager {
    export class User {
        userId: string;
        name: string;

        constructor(userId: string, name: string) {
            this.userId = userId;
            this.name = name;
        }
    }
}

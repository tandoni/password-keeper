// interface Password {
//     service: string;
//     username: string;
//     password: string;
//     $key?: string;
// }

export class FirebaseFlatSnapshot {
    $key?: string;

    constructor(obj?: any) {
        if (obj && obj.$key) {
            this.$key = obj.$key;
        }
    }
}
export class Password extends FirebaseFlatSnapshot {
    service: string;
    username: string;
    password: string;

    constructor(obj?: any) {
        super(obj);
        this.service = obj && obj.service || "";
        this.username = obj && obj.username || "";
        this.password = obj && obj.password || "";
    }
}
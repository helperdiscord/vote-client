import req from '@helperdiscord/centra';

export interface ClientOptions {
    url: string;
    auth: string;
    bot: string;
}

export class Client {
    public url: string;
    public auth: string;
    public bot: string;
    constructor({ url, auth, bot }: ClientOptions) {
        this.url = new URL(url)?.origin;
        this.auth = auth;
        this.bot = bot;
    }
    
    async check(userId: string): Promise<boolean> {
        const res = await req(`${this.url}/check`, 'POST').header('Authorization', this.auth).body({ user: userId, bot: this.bot }).send();
        if (res.statusCode === 200) {
            return res.json?.voter;
        } else {
            return false;
        };
    }
}
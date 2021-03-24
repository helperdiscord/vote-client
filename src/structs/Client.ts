import req from 'petitio';
import { Client as UClient } from 'undici';

/**
 *
 *
 * @export
 * @interface ClientOptions
 */
export interface ClientOptions {
    url: string;
    auth: string;
    bot: string;
}
/**
 *
 *
 * @export
 * @class Client
 */
export class Client {
    /**
     *
     *
     * @type {string}
     * @memberof Client
     */
    public url: string;
    /**
     *
     *
     * @type {string}
     * @memberof Client
     */
    public auth: string;
    /**
     *
     *
     * @type {string}
     * @memberof Client
     */
    public bot: string;
    private client: UClient;
    /**
     * Creates an instance of Client.
     * @param {ClientOptions} { url, auth, bot }
     * @memberof Client
     */
    constructor({ url, auth, bot }: ClientOptions) {
        this.url = new URL(url)?.origin;
        this.auth = auth;
        this.bot = bot;
        this.client = new UClient(this.url, { pipelining: 10 })
    }
    /**
     *
     * @description checks if somebody has voted for your bot in the past 12 hours
     * @param {string} userId
     * @return {boolean}  {Promise<boolean>}
     * @memberof Client
     */
    async check(userId: string): Promise<boolean> {
        const res = await req(`${this.url}/check`, 'POST').client(this.client, true).header('Authorization', this.auth).body({ user: userId, bot: this.bot }).send();
        if (res.statusCode === 200) {
            return res.json().voter;
        } else {
            return false;
        };
    }
    /**
     *
     * @description shows the total number of voters
     * @return {bigint}  {Promise<BigInt>}
     * @memberof Client
     */
    async count(): Promise<BigInt> {
        const res = await req(`${this.url}/total/${this.bot}`, 'POST').client(this.client, true).header('Authorization', this.auth).send();
        if (res.statusCode === 200) {
            return BigInt(res.json().count);
        } else {
            return BigInt(0);
        };
    }
}
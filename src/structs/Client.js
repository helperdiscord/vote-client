const req = require('@helperdiscord/centra');
module.exports = class Client {
    constructor(url, auth, botId) {
        let api_url;
        try {
            api_url = new URL(url)?.origin;
        } catch (e) {
            throw new Error(e);
        }
        this.url = api_url;
        this.auth = auth;
        this.bot = botId;
    }
    async check(userId) {
        const res = await req(`${this.url}/check`, 'POST').header('Authorization', this.auth).body({user: userId, bot: this.bot}).send();
        if (res.statusCode === 200) {
            return res.json?.voter;
        } else {
            return false;
        };
    }
}
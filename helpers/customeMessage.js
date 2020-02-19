const EventEmitter = require('events');
const events = new EventEmitter;
class CustomeMessage {
    constructor(res) {

        this.response = res;
        this.events = events;
    }

    // custome message for handling success
    async success(event, statusCode, message) {

        let { response, events } = this;
        events.once(event, () => {

            return response.status(statusCode).json(message);
        });

        return await events.emit(event);
    }

    // custome message for handling error
    async error(event, statusCode, message) {

        let { response, events } = this;
        events.once(event, () => {

            return response.status(statusCode).json(message);
        });

        return await events.emit(event);
    }

}

module.exports = { CustomeMessage };
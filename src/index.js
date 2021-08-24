const message = require('./message.js');

 function activate(context) {
    context.subscriptions.push(message);
}

module.exports = {
    activate
}
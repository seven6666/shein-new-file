const showPathInput = require('./showPathInput.js');

 function activate(context) {
    context.subscriptions.push(showPathInput);
}

module.exports = {
    activate
}
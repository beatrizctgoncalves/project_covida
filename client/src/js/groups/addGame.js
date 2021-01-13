const global = require('../global.js');
const api = require('../covida-api.js');

module.exports = {
    getView: () => 
        `<h1>Search For A Game To Add</h1>
        <div id='addGame'></div>`,
    
    authenticationRequired: true,

    run: (request) => {
        return api.addGameToGroup(request.args[2], request.args[1])
        .then(response => {
            if(!response.error) {
                alert(`New Game successfully added`);
                location.assign(`#detailsGroup/${request.args[0]}/${request.args[1]}`);
            } else {
                return Promise.reject(response.error);
            }
        })
        .catch((error) => {
            alert(error);
        })
    }
}
                
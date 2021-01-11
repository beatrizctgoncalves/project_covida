const api = require('../covida-api.js');
const auth = require('../auth.js');
const global = require('../global.js');

const handlebars = global.handlebars;

const modListContentsTemplate =
    handlebars.compile(
        `<div class="card-columns card-groups m-3">
            {{#each groups}}
                <div class="card text-center">
                    <div class="card-header bg-primary">
                        <a href="#detailsGroup/{{name}}/{{id}}" class = "text-dark">
                            {{name}}
                        </a>
                        <a href="#editGroup/{{id}}" class="float-left text-dark">
                            <i class="far fa-edit"></i>
                        </a>
                        <a href="#removeGroup/{{name}}/{{id}}" class="float-right text-dark">
                            <i class="fas fa-trash-alt"></i>
                        </a>
                        
                    </div>
                    <div class="card-body text-center">
                        <p class="card-text"><em>{{desc}}</em></p>
                        
                    </div>
                    <div class="card-footer text-muted">
                        <div class="card-body text-center">
                            <a href="#addGame/{{id}}" class="float-left text-blue">
                                 <i class="fas fa-plus"></i>
                            </a>
                             <a href="#removeGame/{{id}}" class="float-right text-pink">
                                 <i class="fas fa-minus"></i>
                            </a>
                         </div>
                        {{#each games}}
                        
                            <div class="card-body text-center">
                                <a href={{url}}>{{name}}</a>
                            </div>
                        {{/each}}
                    </div>
                </div>
            {{/each}}
        </div>`
    );

module.exports = {
    getView: () => {
        let currentUser = auth.getCurrentUser();
        return `<h1>${currentUser}'s Groups</h1>
            <div id='groups'>
                ${global.spinnerTemplate}
            </div>`
    },

    authenticationRequired: true,

    run: () => {
        let currentUser = auth.getCurrentUser();
        const itemsContainer = document.querySelector('#groups');
        api.getGroups(currentUser)
        .then(allGroups => {
            console.log(allGroups)
            if (!allGroups.error) {
                itemsContainer.innerHTML = modListContentsTemplate({
                    groups: allGroups
                })
            } else {
                return Promise.reject(allGroups.error);
            }
        })
        .catch(error => alert(error));
        //alert("You don't have any group yet!")
    }
}
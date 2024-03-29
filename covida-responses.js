module.exports = {
    //SUCCESS
    OK: 200,
    CREATED: 201,

    URI_MSG: "http://localhost:8080/",

    setSuccessToUri: function (status, index, type, id) { //Send the uri with id
        return {
            status: status,
            body: this.URI_MSG.concat(index).concat(type).concat(id.toString())
        }
    },
    
    setSuccessToList: function (status, obj) { //Lists objects
        return {
            status: status,
            body: obj
        }
    },


    //ERROR
    BAD_REQUEST: 400,
    UNAUTHENTICATED: 401,
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    DB_ERROR: 502,
    API_ERROR: 503,

    BAD_REQUEST_MSG: "Please insert a valid parameter!",
    UNAUTHENTICATED_MSG: "You are unauthenticated, please Sign In",
    RATINGS_WRONG_MSG: "Please insert a valid interval for ratings! It needs to be between 0 and 100 inclusive.",
    GAME_NOT_FOUND_MSG: "Could not find game!",
    GAMES_0_MSG: "Could not find any game with ratings between the given interval!", //When ratings aren't between the given interval
    GROUP_NOT_FOUND_MSG: "Could not find group!",
    GROUPS_0_MSG: "Could not find any group!", //When listGroups 
    FORBIDDEN_GAME_MSG: "This game already exists in this group!",
    DB_ERROR_MSG: "Bad Gateway: Error in DataBase",
    DB_ERROR_REQUESTS_MSG: "Bad Gateway: Error in DataBase, too many requests!",
    API_ERROR_MSG: "Service Unavailable: Error in IGDB API",

    FORBIDDEN_USER_MSG: "This user already exists!",
    USERNAME_USER_MSG: "This username does not exist!",
    PASSWORD_USER_MSG: "Wrong password!",

    setError: function (status, message) {
        return Promise.reject({
            status: status,
            body: message
        })
    }
};
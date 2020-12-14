'use strict'

//const data = require('./igdb-data.js');
//const db = require('./covida-db.js');
const covidaResponses = require('./covida-responses');

function services(data, db) {
    const serv = {
        //Implementation of the route to get a specific game by id which accesses to the api
        getGamesById: function(game_name) {
            return data.getGamesById(game_name)
                .then(gamesObj => {
                    if (gamesObj) {
                        return covidaResponses.setSuccess(
                            covidaResponses.OK,
                            gamesObj
                        )                        
                    } else {
                        return covidaResponses.setError(
                            covidaResponses.NOT_FOUND,
                            covidaResponses.GAME_NOT_FOUND_MSG
                        )
                    }
                })
                .catch(err => {
                    return covidaResponses.setError(err.status, err.body)
                })
        },

        //Implementation of the route to get a specific game which accesses to the api
        getGamesByName: function(game_name) {
            return data.getGamesByName(game_name)
            .then(gamesObj => {
                if (gamesObj) {
                    return covidaResponses.setSuccess(
                        covidaResponses.OK,
                        gamesObj
                    )
                } else {
                    return covidaResponses.setError(
                        covidaResponses.NOT_FOUND,
                        covidaResponses.GAME_NOT_FOUND_MSG
                    )
                }
            })
            .catch(err => {
                return covidaResponses.setError(err.status, err.body)
            })
        },


        //Implementation of the route to create a group which accesses to the database
        createGroup: function(group_name, group_desc) {
            if(group_name && group_desc) {
                return db.createGroup(group_name, group_desc)
                .then(() => {
                    return covidaResponses.setSuccess(
                        covidaResponses.CREATED,
                        covidaResponses.GROUP_CREATED_MSG
                    )
                })
                .catch(err => {
                    return covidaResponses.setError(err.status, err.body)
                })
            } else {
                return covidaResponses.setError(covidaResponses.BAD_REQUEST, covidaResponses.BAD_REQUEST_MSG)
            }
        },

        //Implementation of the route to get all groups which accesses to the database
        listGroups: function() {
            return db.listGroups()
                .then(groupObj => {
                    if(groupObj) {
                        return covidaResponses.setSuccess(
                            covidaResponses.OK,
                            groupObj
                        )
                    } else {
                        return covidaResponses.setError(
                            covidaResponses.NOT_FOUND,
                            covidaResponses.GROUPS_0_MSG
                        )
                    }
                })
                .catch(err => {
                    return covidaResponses.setError(err.status, err.body)
                })
        },

        //Implementation of the route to get a specific group which accesses to the database
        getGroupByName: function(group_name) {
            return db.getGroupByName(group_name)
                .then(groupObj => {
                    if(groupObj) {
                        return covidaResponses.setSuccess(
                            covidaResponses.OK,
                            groupObj
                        )
                    } else {
                        return covidaResponses.setError(
                            covidaResponses.NOT_FOUND,
                            covidaResponses.GROUP_NOT_FOUND_MSG
                        )
                    }
                })
                .catch(err => {
                    return covidaResponses.setError(err.status, err.body)
                })
        },

        //Implementation of the route to update a specific group which accesses to the database
        editGroup: function(group_id, new_name, new_desc) {
            return db.editGroup(group_id, new_name, new_desc)
                .then(groupObj => {
                    if(groupObj) {
                        return covidaResponses.setSuccess(
                            covidaResponses.OK,
                            covidaResponses.GROUP_EDITED_MSG
                        )
                    } else {
                        return covidaResponses.setError(
                            covidaResponses.NOT_FOUND,
                            covidaResponses.GROUP_NOT_FOUND_MSG
                        )
                    }
                })
                .catch(err => {
                    return covidaResponses.setError(err.status, err.body)
                })
        },

        removeGroup: function(group_id){
            return db.removeGroup(group_id)
                .then(groupObj => {
                    if(groupObj) {
                        return covidaResponses.setSuccess(
                            covidaResponses.OK,
                            covidaResponses.GROUP_REMOVED_MSG
                        )
                    } else {
                        return covidaResponses.setError(
                            covidaResponses.NOT_FOUND,
                            covidaResponses.GROUP_NOT_FOUND_MSG
                        )
                    }
                })
                .catch(err => {
                    return covidaResponses.setError(err.status, err.body)
                })
        },


        //Implementation of the route to add a game by name to a specific group which accesses to the database
        addGameToGroup: function(game_name, group_name) {
            return data.getGamesById(game_name) //check if the game exists
            .then(gamesObj => {
                if (gamesObj) {
                    return db.getGroupByName(group_name) //check if the group exists
                    .then(groupObj => {
                        if(groupObj) {
                            if(groupObj.games.filter(g => g.name == game_name) === -1) { //check if the game already exists in the group
                                return covidaResponses.setError(
                                    covidaResponses.CONFLIT_GAME,
                                    covidaResponses.CONFLIT_GAME_MSG
                                )
                            } else {
                                return db.addGameToGroup(gamesObj, group_name) //add game
                                .then(() => {
                                    return covidaResponses.setSuccess(
                                        covidaResponses.OK,
                                        covidaResponses.GAME_ADD_TO_GROUP_MSG
                                    )   
                                })
                            }
                        } else {
                            return covidaResponses.setError(
                                covidaResponses.NOT_FOUND,
                                covidaResponses.GROUP_NOT_FOUND_MSG
                            )
                        }
                    })
                } else {
                    return covidaResponses.setError(
                        covidaResponses.NOT_FOUND,
                        covidaResponses.GAME_NOT_FOUND_MSG
                    )
                }
            })
            .catch(err => covidaResponses.setError(err.status, err.body))
        },

        //Implementation of the route to get a game between the given interval of values which accesses to both database and api
        getRatingsFromGames: function(group_id, max, min) {
            if(max > 100 || min < 0) return covidaResponses.setError(covidaResponses.BAD_REQUEST, covidaResponses.RATINGS_WRONG_MSG)
            return db.getRatingsFromGames(group_id, max, min)
                .then(groupObj => {
                    if(groupObj) {
                        return covidaResponses.setSuccess(
                            covidaResponses.OK,
                            covidaResponses.GROUP_REMOVED_MSG
                        )
                    } else {
                        return covidaResponses.setError(
                            covidaResponses.NOT_FOUND,
                            covidaResponses.GROUP_NOT_FOUND_MSG
                        )
                    }
                })
                .catch(err => {
                    return covidaResponses.setError(err.status, err.body)
                })
        },

        //Implementation of the route to delete a specific game which accesses to the database
        removeGameById: function(group_id, game_id) {
            return db.removeGameById(group_id, game_id)
                .then(groupObj => {
                    if(groupObj) {
                        return covidaResponses.setSuccess(
                            covidaResponses.OK,
                            covidaResponses.GROUP_REMOVED_MSG
                        )
                    } else {
                        return covidaResponses.setError(
                            covidaResponses.NOT_FOUND,
                            covidaResponses.GROUP_NOT_FOUND_MSG
                        )
                    }
                })
                .catch(err => {
                    return covidaResponses.setError(err.status, err.body)
                })
        }
    };
    return serv;
}

module.exports = services;

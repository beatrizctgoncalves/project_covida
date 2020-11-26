'use strict'

const Groups_Database = []

function createGroup(name, desc, processCreateGroup) {
    var group = {
        name: name,
        desc: desc,
        games : []
    }
    Groups_Database.push(group)
    console.log("Group inserted ----> " + group.name)
    processCreateGroup(null, console.log("Number of groups : " + Groups_Database.length))
}

function getGroupByName(name, processGetGroup) {
    processGetGroup(null, Groups_Database.filter( group => group.name = name))
}

function listGroups(processListGroups) {
    return processListGroups(null,Groups_Database)
}


module.exports = {
    createGroup: createGroup,
    getGroupByName: getGroupByName,
    listGroups: listGroups
}
const sessionIdToUserMap = new Map();  // hashmap to store session IDs and corresponding user data

function setUser(id, user) {
    sessionIdToUserMap.set(id, user);
}

function getUser(id) {
    return sessionIdToUserMap.get(id);
}

module.exports = { setUser, getUser };
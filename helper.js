
function sortMap() {
    const userIds = [...cancelMap.keys()];
    userIds.sort((a,b) => {return cancelMap.get(b) - cancelMap.get(a)});
    return userIds;
}

module.exports = {sortMap};
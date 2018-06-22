//TODO: test!
function hashBy(list, keyName){
    return list.reduce( (acc, item) => {
        const key = item[keyName];
        const updatedValue = key in acc? acc[key].concat([item]) : [item];
        return {...acc, [key]: updatedValue}
    }, {})
}

//TODO: Test
function groupBy(list, keyName, constructItem){
    const hashed = hashBy(list, keyName);
    return Object.keys(hashed).reduce((acc, key)=> {
        return acc.concat([constructItem(key, hashed[key])]);
    }, []);
}

export { groupBy, hashBy } //TODO: am i using hashBy?

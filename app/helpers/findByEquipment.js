module.exports = (title, list) => {
    debugger;
    return list && list.filter(item => item.equipment.indexOf(title) > -1);
};
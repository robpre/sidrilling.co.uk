module.exports = (title, list) => {
    return list && list.filter(item => item.equipment.indexOf(title) > -1);
};
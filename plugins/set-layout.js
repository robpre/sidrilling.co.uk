module.exports = function(articles) {
    Object.keys(articles).forEach(key => {
        const art = articles[key];

        art.layout = 'layout.hbs';
    });
};

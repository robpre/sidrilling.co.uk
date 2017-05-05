const cheerio = require('cheerio');

module.exports = (str, block) => {
    const $ = cheerio.load(str);
    var result = '';

    $('ul li').each((i, li) => {
        const $li = $(li);

        result += block.fn($li.html());
    });

    return result;
};

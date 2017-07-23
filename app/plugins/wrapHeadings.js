const cheerio = require('cheerio');

const HEADERS = 'h1, h2, h3, h4, h5, h6';

module.exports = (files) => {
    Object.keys(files).forEach(k => {
        if (k.indexOf('.html') === k.length - 5) {
            console.log(k);
            const v = files[k];
            const $ = cheerio.load(v.contents.toString());

            $(HEADERS).each(function() {
                const $this = $(this);
                const id = `${$this.attr('id')}_wrapper`;
                const classes = `heading-wrapper`;

                var $next = $this;
                var contents = '';
                const kill = [];

                // eslint-disable-next-line
                while(($next = $next.next()).length && !$next.is(HEADERS)) {
                    contents += $.html($next);

                    kill.push($next);
                }

                kill.forEach($n => $n.remove());
                $this.html(`<span>${$this.html()}</span>`);
                $this.replaceWith(`
                    <div id="${id}" class="${classes}">
                        ${$.html($this)}

                        ${contents}
                    </div>
                `);
            });

            files[k].contents = new Buffer($.html());
        }
    });
};

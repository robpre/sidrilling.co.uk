const Metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const assets = require('metalsmith-assets');

module.exports = Metalsmith(__dirname) // __dirname defined by node.js:
    // name of current working directory
    .metadata({ // add any variable you want
        // use them in layout-files
        sitename: 'S I Drilling',
        siteurl: 'http://example.com/',
        description: ''
    })
    .source('./data') // source directory
    .destination('./build') // destination directory
    .clean(true) // clean destination before
    .use(assets({
        origin: 'public',
        destination: 'static'
    }))
    .use(collections({
        jobs: 'jobs/*.md',
        equipment: 'equipment/*.md'
    }))
    .use(function(articles) {
        Object.keys(articles).forEach(key => {
            const art = articles[key];

            art.layout = 'layout.hbs';
        });
    })
    .use(markdown()) // transpile all md into html
    .use(permalinks({ // change URLs to permalink URLs
        relative: false // put css only in /css
    }))
    .use(layouts({ // wrap layouts around html
        engine: 'handlebars', // use the layout engine you like
        partials: './views/partials',
        directory: './views/layouts',
        partialExtension: '.hbs'
    }));

if (!module.parent) {
    module.exports.build(function(err) { // build process
        if (err) throw err; // error handling is required

        console.log('built!');
    });
}

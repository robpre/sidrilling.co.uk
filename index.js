const Metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const assets = require('metalsmith-assets');

const setLayout = require('./plugins/set-layout');

module.exports = Metalsmith(__dirname)
    .metadata({
        sitename: 'S I Drilling',
        siteurl: 'http://example.com/',
        description: ''
    })
    .source('./data')
    .destination('./build')
    .clean(true)
    .use(assets({
        origin: './public/favicons/',
        destination: './'
    }))
    .use(collections({
        jobs: 'jobs/*.md',
        equipment: 'equipment/*.md'
    }))
    .use(setLayout)
    .use(markdown())
    .use(permalinks({
        relative: false
    }))
    .use(layouts({
        engine: 'handlebars',
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

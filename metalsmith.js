const Metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const assets = require('metalsmith-assets');
const browserify = require('metalsmith-browserify');
const postcss = require('metalsmith-postcss');

const addCss = require('./plugins/addCss');

module.exports = Metalsmith(__dirname)
    .metadata({
        sitename: 'S I Drilling',
        siteurl: 'http://example.com/',
        description: ''
    })
    .source('./data')
    .destination('./build')
    .clean(true)
    .use(browserify({
        dest: 'js/script.js',
        entries: ['./src/js/main.js'],
        sourcemaps: process.env.NODE_ENV === 'development'
    }))
    .use(assets({
        origin: './public/',
        destination: './'
    }))
    .use(addCss({
        origin: './src/css/styles.css',
        destination: 'css/styles.css'
    }))
    .use(postcss({
        plugins: {
            'postcss-import': {},
            'autoprefixer': {},
            'cssnano': {}
        },
        map: {
            inline: false
        }
    }))
    .use((...args) => {
        debugger;
    })
    .use(collections({
        jobs: 'jobs/*.md',
        equipment: 'equipment/*.md'
    }))
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

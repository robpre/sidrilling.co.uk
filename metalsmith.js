const Metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const assets = require('metalsmith-assets');
const browserify = require('metalsmith-browserify');
const postcss = require('metalsmith-postcss');
const findHelpers = require('metalsmith-discover-helpers');

const addCss = require('./app/plugins/addCss');

const sidrilling = Metalsmith(__dirname + '/app')
    .metadata({
        sitename: 'S I Drilling',
        siteurl: 'https://sidrilling.co.uk/',
        description: '',
        trackingCode: process.env.TRACKING_CODE || 'UA-96594891-1'
    })
    .source('./data')
    .destination('../build')
    .clean(true)
    .use(browserify({
        dest: 'js/script.js',
        entries: ['./app/src/js/main.js'],
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
            'postcss-import': {
                path: __dirname + '/app'
            },
            'autoprefixer': {},
            'cssnano': {}
        },
        map: {
            inline: false
        }
    }))
    .use(collections({
        jobs: 'jobs/*.md',
        equipment: 'equipment/*.md',
        blocks: 'blocks/*.md'
    }))
    .use(markdown())
    .use(permalinks({
        relative: false
    }))
    .use(findHelpers({
        'directory': 'helpers'
    }))
    .use(layouts({
        engine: 'handlebars',
        partials: './views/partials',
        directory: './views/layouts',
        partialExtension: '.hbs'
    }));

module.exports = sidrilling;

if (!module.parent) {
    sidrilling.build(function(err) { // build process
        if (err) {
            throw err; // error handling is required
        }

        console.log('built!');
    });
}

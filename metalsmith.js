const Metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const assets = require('metalsmith-assets');
const browserify = require('metalsmith-browserify');
const postcss = require('metalsmith-postcss');
const findHelpers = require('metalsmith-discover-helpers');
const externalLinks = require('metalsmith-external-links');
const metaList = require('metalsmith-metadata-as-list');

const copyFile = require('./app/plugins/copyFile');
const wrapHeadings = require('./app/plugins/wrapHeadings');

const entryFiles = ['./app/src/js/main.js'];
var curryPlugin;
// curryPlugin = (factorBundle => (b, opts) => {
//     const options = Object.assign({}, opts, {
//         outputs: ['build/js/script.js']
//     });

//     return factorBundle(b, options);
// })(require('factor-bundle'));

const sidrilling = Metalsmith(__dirname + '/app')
    .metadata({
        sitename: 'S I Drilling',
        siteurl: 'https://www.sidrilling.co.uk/',
        description: '',
        trackingCode: process.env.TRACKING_CODE || 'UA-96594891-1'
    })
    .source('./data')
    .destination('../build')
    .clean(true)
    .use(browserify({
        dest: 'js/common.js',
        entries: entryFiles,
        sourcemaps: process.env.NODE_ENV !== 'production',
        plugin: [curryPlugin]
    }))
    .use(assets({
        origin: './public/',
        destination: './'
    }))
    .use(copyFile({
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
    .use(metaList({handle: 'equipment'}))
    .use(collections({
        jobs: 'jobs/*.md',
        equipment: 'equipment/*.md',
        blocks: 'blocks/*.md'
    }))
    .use(markdown())
    .use(wrapHeadings)
    .use(permalinks({
        relative: false
    }))
    .use(findHelpers({
        'directory': 'helpers'
    }))
    .use(function(files) {
        const names = Object.keys(files);

        names.forEach(f => {
            const obj = files[f];

            obj.fileUrl = '/' + f.replace(/\/?index.html$/, '');
            obj.allFiles = names;
        });
    })
    .use(layouts({
        engine: 'handlebars',
        partials: './views/partials',
        directory: './views/layouts',
        partialExtension: '.hbs'
    }))
    .use(externalLinks({
        domain: 'sidrilling.co.uk'
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

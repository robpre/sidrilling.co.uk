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
const discoverPartials = require('metalsmith-discover-partials')

const copyFile = require('./app/plugins/copyFile');
const wrapHeadings = require('./app/plugins/wrapHeadings');

const sidrilling = Metalsmith(__dirname + '/app')
    .metadata({
        sitename: 'S I Drilling',
        siteurl: 'https://www.sidrilling.co.uk/',
        description: '',
        trackingCode: process.env.TRACKING_CODE || 'UA-96594891-1'
    })
    .source('./')
    .destination('../build')
    .clean(true)
    .use(browserify({
        entries: ['src/js/main.js'],
        browserifyOptions: {
            sourcemaps: process.env.NODE_ENV !== 'production',
            "transform": [[
                "babelify",
                {
                    "presets": ["@babel/preset-env"],
                    ignore: [/\/node_modules\/foundation-sites/]
                }
            ]]
        },
    }))
    .use(assets({
        origin: './public/',
        destination: './'
    }))
    .use(copyFile({
        origin: 'src/css/styles.css',
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
    .use(metaList({ handle: 'equipment' }))
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
    .use(discoverPartials({
        directory: 'views/partials',
        pattern: /\.hbs$/
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
        default: 'layout.hbs',
        directory: 'views/layouts/',
        pattern: '**/*.html',
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

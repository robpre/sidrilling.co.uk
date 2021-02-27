const reload = require('reload');
const express = require('express');
const http = require('http');
const gaze = require('gaze');
const nodePath = require('path');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();
const server = http.createServer(app);
const reloadServer = reload(app);

app.use(bodyParser.json());
app.use(express.static(nodePath.resolve(__dirname, '..', 'build'), {fallthrough: false}));
app.use(function(err, req, res, next) {
    if (err) {
        res.set('Content-Type', 'text/html; charset=utf-8')
            .send(`
                <script src="/reload/reload.js"></script>
                <pre style="font-size: 5rem;">
                    ${err.message}
                    ${err.stack}
                </pre>
            `);
        return;
    }
    next();
});


server.listen(8080, () => console.log('Listening on :8080'));

const globs = [
    '**/*.*',
    '../metalsmith.js'
];
const cwd = nodePath.resolve(__dirname, '..', 'app');

const clearCache = () => {
    for (const key of Object.keys(require.cache)) delete require.cache[key];
};

function build(cb) {
    clearCache();
    var metal;

    try {
        metal = require('../');
    } catch (e) {
        return cb(e);
    }
    metal.use(ms => {
        Object.keys(ms).forEach(k => {
            if (k.match(/\.html?$/)) {
                const $ = cheerio.load(ms[k].contents.toString());

                $('body').append('<script src="/reload/reload.js"></script>');

                ms[k].contents = Buffer.from($.html());
            }
        });
    }).build(cb);
}

build(err => err
    ? console.error('error on initial build, waiting for file change to try again', err)
    : console.log('done initial build')
);

gaze(globs, { cwd }, (err, watcher) => {
    if (err) {
        throw err;
    }
    let building = 0;
    const watched = watcher.watched();

    console.log(`Watching files in ${Object.keys(watched).map(f => f.replace(cwd + '/', '')).join(',')}`);

    watcher.on('all', function(event, filepath) {
        console.log(filepath + ' changed');

        building++;
        build(err => {
            --building;

            if (err) {
                console.error('error during build, waiting for reload');
                return console.error(err);
            }

            if (building <= 0) {
                building = 0;
                reloadServer.then(r => r.reload());
            }
        });
    });
});

const reload = require('reload');
const express = require('express');
const http = require('http');
const gaze = require('gaze');
const nodePath = require('path');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');

const app = express();

app.use(bodyParser.json());
const static = express.static(nodePath.resolve(__dirname, '..', 'build'));
app.use('/', static);

const server = http.createServer(app);

const reloadServer = reload(server, app, true);

server.listen(8080, () => console.log('Listening on :8080'));

const globs = [
    '**/*.*'
];
const cwd = nodePath.resolve(__dirname, '..', 'app');
const appPath = require.resolve('../');

function build(cb) {
    delete require.cache[appPath];
    require(appPath).use(ms => {
        Object.keys(ms).forEach(k => {
            if (k.indexOf(/\.html$/) !== -1) {
                const $ = cheerio.load(ms[k].contents.toString());

                $('body').append('<script src="/reload/reload.js"></script>');

                ms[k].contents = new Buffer($.html());
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

    const watched = watcher.watched();

    console.log(`Watching files in ${Object.keys(watched).map(f => f.replace(cwd + '/', '')).join(',')}`);

    watcher.on('all', function(event, filepath) {
        console.log(filepath + ' changed');

        build(err => {
            if (err) {
                console.error('error during build', err);
            }

            reloadServer.reload();
        });
    });
});

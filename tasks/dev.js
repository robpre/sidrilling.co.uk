const reload = require('reload');
const express = require('express');
const http = require('http');
const gaze = require('gaze');
const nodePath = require('path');

const app = express();

app.use(express.static('../build'));

const server = http.createServer(app);

const reloadServer = reload(server, app, true);

server.listen(8080, () => console.log('Listening on :8080'));

const globs = [
    '!build/*',
    '**/*.{js,css,md,jpg,png,gif}',
    '!node_modules/*)'
];

gaze(globs, {
    cwd: nodePath.resolve(__dirname, '..')
}, (err, watcher) => {
    if (err) {
        throw err;
    }

    const watched = watcher.watched();

    console.log('Watching files: ');
    console.log(watched);

    watcher.on('all', function(event, filepath) {
        console.log(filepath + ' was ' + event);

        console.log(Object.keys(require.cache));
        const builder = require('../');

        builder.build(err => {
            if (err) throw err;

            reloadServer.reload();
        });
    });
});

const fs = require('fs');
const path = require('path');
const Mode = require('stat-mode');

module.exports = ({origin: cssPath, destination}) => (files, metalsmith, done) => {
    cssPath = path.resolve(metalsmith.directory(), cssPath);

    files[destination] = {
        mode: Mode(fs.statSync(cssPath)).toOctal(),
        contents: new Buffer(fs.readFileSync(cssPath))
    };

    done();
};
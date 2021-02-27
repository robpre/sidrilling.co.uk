const fs = require('fs');
const path = require('path');
const Mode = require('stat-mode');

module.exports = ({origin: originFile, destination}) => (files, metalsmith, done) => {
    originFile = path.resolve(metalsmith.directory(), originFile);

    files[destination] = {
        mode: Mode(fs.statSync(originFile)).toOctal(),
        contents: fs.readFileSync(originFile)
    };

    done();
};

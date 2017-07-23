const FtpDeploy = require('ftp-deploy');
const path = require('path');
const barFactory = require('progress-barjs');
const fs = require('fs');

const ftpDeploy = new FtpDeploy();
const localRoot = path.resolve(__dirname, '..', 'build');

let remoteRoot;
if (process.env.NODE_ENV === 'production') {
    remoteRoot = '/public_html/prod/';
    fs.unlinkSync(path.resolve(localRoot, 'robots.txt'));
} else {
    remoteRoot = '/public_html/draft/';
}

function printError (data) {
    console.error(data.err); // data will also include filename, relativePath, and other goodies
}

ftpDeploy.on('upload-error', printError);
ftpDeploy.on('error', printError);

const bar = barFactory({
    info: 'Uploading files...',
    total: 100
});
var lastUploaded = 0;

ftpDeploy.on('uploading', function(data) {
    // data.totalFileCount;       // total file count being transferred
    // data.transferredFileCount; // number of files transferred
    // data.percentComplete;      // percent as a number 1 - 100
    // data.filename;             // partial path with filename being uploaded
    if (lastUploaded < data.percentComplete) {
        bar.tickChunk(data.percentComplete - lastUploaded, 'Percent Complete');
        lastUploaded = data.percentComplete;
    }
});

ftpDeploy.deploy({
    host: process.env.FTP_SERVER,
    username: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD,
    port: 21,
    localRoot,
    remoteRoot,
    exclude: ['.git', '.idea', 'tmp/*']
}, err => {
    if (!bar.complete) {
        bar.tickChunk(100 - lastUploaded, 'Percent Complete');
    }

    if (err) {
        throw err;
    }

    console.log('finished deploy!');
});

// const Client = require('ftp');
const FtpDeploy = require('ftp-deploy');
const path = require('path');
const barFactory = require('progress-barjs');

const ftpDeploy = new FtpDeploy();
// const client = new Client();

ftpDeploy.on('upload-error', function (data) {
    console.error(data.err); // data will also include filename, relativePath, and other goodies
});

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
    localRoot: path.resolve(__dirname, '..', 'build'),
    remoteRoot: '/public_html/draft/',
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
// client
// .on('ready', () => {
// // Delete folder?
// })
// .connect({
//     host: process.env.FTP_SERVER,
//     user: process.env.FTP_USERNAME,
//     password: process.env.FTP_PASSWORD
// });

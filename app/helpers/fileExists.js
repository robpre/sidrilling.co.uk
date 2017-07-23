module.exports = (...args) => {
    const { allFiles } = args.pop().data.root;
    const file = args.join('');

    return !!allFiles.find(fileName => ('/' + fileName) === file);
};
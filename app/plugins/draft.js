module.exports = () => files => {
    if (process.env.NODE_ENV === 'production') {
        Object.keys(files).forEach(k => {
            if (files[k].draft) {
                delete files[k];
            }
        });
    }
};
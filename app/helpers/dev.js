if (process.env.NODE_ENV === 'production') {
    module.exports = () => {};
} else {
    module.exports = (data) => {
        debugger;

        return JSON.stringify(data, null, '\t');
    };
}

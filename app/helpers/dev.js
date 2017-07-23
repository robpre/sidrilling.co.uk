if (process.env.NODE_ENV === 'production') {
    module.exports = () => '';
} else {
    module.exports = (...data) => {
        console.log(...data);

        return '';
    };
}

if (process.env.NODE_ENV === 'production') {
    module.exports = () => {};
} else {
    module.exports = (data) => {
        debugger;

        console.log(data);

        return '';
    };
}

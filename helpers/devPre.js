
module.exports = thing => `<script>console.log(${JSON.stringify(Object.keys(thing), null, '\t')});</script>`;

module.exports = function renderBlock (blockName, renderData) {
    const { blocks } = renderData.data.root.collections;

    const block = blocks.find(block => block.blockName === blockName);

    if (block) {
        return block.contents.toString();
    } else {
        console.warn('Missing block: ' + blockName);
        return '';
    }
};

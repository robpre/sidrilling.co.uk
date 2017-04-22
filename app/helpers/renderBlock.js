module.exports = function renderBlock (nameBlock, renderData) {
    const { blocks } = renderData.data.root.collections;

    const block = blocks.find(block => block.path.substring(-nameBlock.length).indexOf(nameBlock) !== -1);

    if (block) {
        return block.contents.toString();
    } else {
        console.warn('Missing block: ' + nameBlock);
        return '';
    }
};

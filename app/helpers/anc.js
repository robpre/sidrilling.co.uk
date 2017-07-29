module.exports = (path, block) => {
    const active = block.data.root.fileUrl;
    return `<a class="${path === active ? 'active' : ''}" href="${path}">${block.fn(this)}</a>`;
};

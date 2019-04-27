let allowedColors;
let settings;

function updateBlockOrder(clone, order) {
  clone.style.order = order;
}

function updateBlockColor(clone, colorCode) {
  const hash = allowedColors[colorCode].color;
  clone.style.backgroundColor = hash;
}

function updateBlockForm(clone, form) {
  if (form) {
    clone.classList.add('round');
  } else {
    clone.classList.remove('round');
  }
}

function applyCanvasSettings(config, colors) {
  allowedColors = colors;
  settings = config;
  const blocks = Object.entries(settings.blocks);
  for (let i = 0; i < blocks.length; i += 1) {
    const [key, value] = [...blocks[i]];
    const { roundForm, color, order } = { ...value };
    const node = document.querySelector(`.canvas__block--${key}`);
    if (node) {
      const clone = node.cloneNode();
      updateBlockForm(clone, roundForm);
      updateBlockColor(clone, color);
      updateBlockOrder(clone, order);
      node.replaceWith(clone);
    }
  }
}

export { applyCanvasSettings };

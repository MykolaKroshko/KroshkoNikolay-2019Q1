import { allowedColors, buttonsBind } from './config.js';

// set new canvas element position
function updateBlockPosition(clone, x, y) {
  const node = clone;
  node.style.top = `${y}px`;
  node.style.left = `${x}px`;
}

// set new canvas element color
function updateBlockColor(clone, colorCode) {
  const hex = allowedColors[colorCode].color;
  const node = clone;
  node.dataset.colorId = colorCode;
  node.style.backgroundColor = hex;
}

// set new canvas element shape
function updateBlockForm(clone, form) {
  if (form) {
    clone.classList.add('round');
  } else {
    clone.classList.remove('round');
  }
}

// select target element from event obj
function getNodeFromEvent(e) {
  const node = e.target;
  return node;
}

// save updated settings to local storage
function updateLocalSettings(settings) {
  localStorage.setItem('codejam-dom-palette__settings', JSON.stringify(settings));
}

// update color of single item in color picker block of palette
function updateItemColor(clone, colorCode) {
  const node = clone;
  node.dataset.colorName = colorCode;
  const hex = allowedColors[colorCode].color;
  const nodePic = node.querySelector('.pallet__colors_item_pic');
  nodePic.style.backgroundColor = hex;
}

// update colors for current and prev items in color picker block of palette
function updatePaletteColors(currentColor, prevColor) {
  const parent = document.querySelector('.pallet__colors_last .dynamic');
  const clone = parent.cloneNode(true);
  const current = clone.querySelector('.pallet__tools_item[data-tool-id="current_color"]');
  updateItemColor(current, currentColor);
  const prev = clone.querySelector('.pallet__tools_item[data-tool-id="prev_color"]');
  updateItemColor(prev, prevColor);
  parent.replaceWith(clone);
}

// return binded mode id on hotkey press
function bindButtons(e) {
  if (Object.keys(buttonsBind).indexOf(e.key) > -1) {
    return buttonsBind[e.key];
  }
  return null;
}

export {
  updateBlockColor,
  updateBlockForm,
  updateBlockPosition,
  getNodeFromEvent,
  updateLocalSettings,
  updatePaletteColors,
  bindButtons
};

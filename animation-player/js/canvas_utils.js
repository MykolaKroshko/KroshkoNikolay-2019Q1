import { buttonsBind } from './config.js';

// set new canvas element position
function updateBlockPosition(clone, x, y) {
  const node = clone;
  node.style.top = `${y}px`;
  node.style.left = `${x}px`;
}

// set new canvas element color
function updateBlockColor(clone, color) {
  const node = clone;
  node.style.backgroundColor = color;
}

// set new canvas element shape
function updateBlockForm(clone, form) {
  if (form) {
    clone.classList.add('round');
  } else {
    clone.classList.remove('round');
  }
}

function updateNodeViewFromSettings(node, config) {
  const clone = node.cloneNode();
  const { roundForm, color, x, y } = { ...config };
  updateBlockForm(clone, roundForm);
  updateBlockColor(clone, color);
  updateBlockPosition(clone, x, y);
  node.replaceWith(clone);
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
function updateItemColor(clone, colorHex) {
  const node = clone;
  node.dataset.colorHex = colorHex;
  const nodePic = node.querySelector('.pallet__colors_item_pic');
  nodePic.style.backgroundColor = colorHex;
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

// get hex value of decimal number
function decToHex(num) {
  let hex = parseInt(num, 10).toString(16);
  if (hex.length === 1) {
    hex = `0${hex}`;
  }
  return hex;
}

// transform rgb color components to hex color string
function rgbToHex(red, green, blue) {
  return `#${decToHex(red)}${decToHex(green)}${decToHex(blue)}`;
}

export {
  updateNodeViewFromSettings,
  updateBlockColor,
  updateBlockForm,
  updateBlockPosition,
  getNodeFromEvent,
  updateLocalSettings,
  updatePaletteColors,
  bindButtons,
  rgbToHex
};

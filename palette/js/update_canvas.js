import * as utils from './canvas_utils.js';

let settings;
let selectedBLock = null;

// if new color not same to current, change current and prev colors
function updatePaletteColors(color) {
  if (settings.currentColor !== color) {
    settings.prevColor = settings.currentColor;
    settings.currentColor = color;
    utils.updatePaletteColors(settings.currentColor, settings.prevColor);
    utils.updateLocalSettings(settings);
  }
}

// apply new palette mode
function applyNewPaletteMode(mode) {
  const tools = document.querySelectorAll('.pallet__tools--tools .pallet__tools_item');
  for (let i = 0; i < tools.length; i += 1) {
    const tool = tools[i];
    if (tool.classList.contains('current')) {
      tool.classList.remove('current');
    }
    if (mode === tool.dataset.toolId) {
      tool.classList.add('current');
    }
  }
  settings.currentMode = mode;
  selectedBLock = null;
  const current = document.querySelector('.canvas__block.current');
  if (current) {
    current.classList.remove('current');
  }
  utils.updateLocalSettings(settings);
}

// if new color not same to current, change current and prev colors
function updatePaletteMode(node) {
  if (!node.classList.contains('current')) {
    applyNewPaletteMode(node.dataset.toolId);
  }
}

// handle click on block in canvas section
function canvasClick(e) {
  const node = utils.getNodeFromEvent(e);
  if (!node.classList.contains('canvas__block')) {
    return;
  }
  const nodeIndex = node.dataset.elementId;
  if (settings.currentMode === 'picker') {
    const nodeColor = node.dataset.colorId;
    updatePaletteColors(nodeColor);
    return;
  }
  const clone = node.cloneNode();
  if (settings.currentMode === 'bucket') {
    settings.blocks[nodeIndex].color = settings.currentColor;
    utils.updateLocalSettings(settings);
    utils.updateBlockColor(clone, settings.currentColor);
  } else if (settings.currentMode === 'transform') {
    settings.blocks[nodeIndex].roundForm = !settings.blocks[nodeIndex].roundForm;
    utils.updateLocalSettings(settings);
    utils.updateBlockForm(clone, settings.blocks[nodeIndex].roundForm);
  }
  node.replaceWith(clone);
}

function canvasMouseDown(e) {
  if (settings.currentMode !== 'move') {
    return;
  }
  const node = utils.getNodeFromEvent(e);
  if (!node.classList.contains('canvas__block')) {
    return;
  }
  const id = node.dataset.elementId;
  if (id !== selectedBLock) {
    selectedBLock = id;
    const current = document.querySelector('.canvas__block.current');
    if (current) {
      current.classList.remove('current');
    }
    node.classList.add('current');
  }
}

// update current and prev colors selection
function changeColor(e) {
  let node = utils.getNodeFromEvent(e);
  if (!node.classList.contains('pallet__tools_item')) {
    node = node.closest('.pallet__tools_item');
  }
  if (!node) {
    return;
  }
  const nodeColor = node.dataset.colorName;
  updatePaletteColors(nodeColor);
}

// change palette toolbox mode
function changeMode(e) {
  let node = utils.getNodeFromEvent(e);
  if (!node.classList.contains('pallet__tools_item')) {
    node = node.closest('.pallet__tools_item');
  }
  if (!node) {
    return;
  }
  updatePaletteMode(node);
}

function changeModeOnKeyPress(e) {
  const mode = utils.bindButtons(e);
  if (mode && mode !== settings.currentMode) {
    applyNewPaletteMode(mode);
  }
}

// apply all event listeners
function startEventListeners() {
  document.querySelector('.canvas__blocks').addEventListener('click', canvasClick, true);
  document.querySelector('.canvas__blocks').addEventListener('mousedown', canvasMouseDown, true);
  document.querySelector('.pallet__tools--colors').addEventListener('click', changeColor, true);
  document.querySelector('.pallet__tools--tools').addEventListener('click', changeMode, true);
  document.addEventListener('keypress', changeModeOnKeyPress, true);
}

// apply canvas settings from config object on app start
function applyCanvasSettings(config) {
  settings = config;
  const blocks = Object.entries(settings.blocks);
  for (let i = 0; i < blocks.length; i += 1) {
    const [key, value] = [...blocks[i]];
    const { roundForm, color, order } = { ...value };
    const node = document.querySelector(`.canvas__block--${key}`);
    if (node) {
      const clone = node.cloneNode();
      utils.updateBlockForm(clone, roundForm);
      utils.updateBlockColor(clone, color);
      utils.updateBlockOrder(clone, order);
      node.replaceWith(clone);
    }
  }
  startEventListeners();
}

export default applyCanvasSettings;

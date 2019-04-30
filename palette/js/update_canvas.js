import * as utils from './canvas_utils.js';

let settings;
let selectedBLock = null;
let mouseStartCoordinates = null;

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

// get hex color of clicked pixel and set it as current color in color picker mode
function pickPageColor(e) {
  if (settings.currentMode !== 'picker') {
    return;
  }
  const x = e.clientX;
  const y = e.clientY;
  window.html2canvas(document.body).then(canvas => {
    const ctx = canvas.getContext('2d');
    const p = ctx.getImageData(x, y, 1, 1).data;
    const hex = utils.rgbToHex(p[0], p[1], p[2]);
    updatePaletteColors(hex);
  });
}

// handle click on block in canvas section
function canvasClick(e) {
  if (settings.currentMode === 'picker') {
    return;
  }
  const node = utils.getNodeFromEvent(e);
  if (!node.classList.contains('canvas__block')) {
    return;
  }
  const clone = node.cloneNode();
  const nodeIndex = clone.dataset.elementId;
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

// set node as a current current canvas block
function setCurrentCanvasBlock(node) {
  const id = node.dataset.elementId;
  console.log(node);
  if (id !== selectedBLock) {
    selectedBLock = id;
    const current = document.querySelector('.canvas__block.current');
    if (current) {
      current.classList.remove('current');
    }
    node.classList.add('current');
  }
}

// move canvas block to its new position with mouse in move mode
function canvasBlockDrop(e) {
  if (settings.currentMode !== 'move') {
    return;
  }
  const node = document.querySelector('.canvas__block.current');
  const config = settings.blocks[node.dataset.elementId];
  const target = utils.getNodeFromEvent(e);
  if (target.classList.contains('canvas__block')) {
    const targetConfig = settings.blocks[target.dataset.elementId];
    settings.blocks[node.dataset.elementId] = targetConfig;
    settings.blocks[target.dataset.elementId] = config;
    const targetX = targetConfig.x;
    const targetY = targetConfig.y;
    targetConfig.x = config.x;
    targetConfig.y = config.y;
    config.x = targetX;
    config.y = targetY;
    setCurrentCanvasBlock(target);
    utils.updateNodeViewFromSettings(node, targetConfig);
    utils.updateNodeViewFromSettings(target, config);
    utils.updateLocalSettings(settings);
    return;
  }
  const { x, y } = { ...config };
  const targetX = x + e.pageX - mouseStartCoordinates.x;
  const targetY = y + e.pageY - mouseStartCoordinates.y;
  config.x = targetX;
  config.y = targetY;
  utils.updateBlockPosition(node, targetX, targetY);
  mouseStartCoordinates = null;
  utils.updateLocalSettings(settings);
}

// select canvas block in move mode
function canvasBlockDragStart(e) {
  if (settings.currentMode !== 'move') {
    return;
  }
  const node = utils.getNodeFromEvent(e);
  if (!node.classList.contains('canvas__block')) {
    return;
  }
  setCurrentCanvasBlock(node);
  mouseStartCoordinates = {
    x: e.pageX,
    y: e.pageY
  };
}

// update current and prev colors selection with color input change
function pickerColorChange(e) {
  updatePaletteColors(e.target.value || '#000000');
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
  e.stopPropagation();
  const nodeColor = node.dataset.colorHex;
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
  e.stopPropagation();
  updatePaletteMode(node);
}

// update current mode on hotkey press
function changeModeOnKeyPress(e) {
  const mode = utils.bindButtons(e);
  if (mode && mode !== settings.currentMode) {
    applyNewPaletteMode(mode);
  }
}

// update position of canvas block on arrows press
function changeBlockPositionOnKeyPress(e) {
  if (settings.currentMode !== 'move' || !selectedBLock || e.key.indexOf('Arrow') !== 0) {
    return;
  }
  e.preventDefault();
  const direction = e.key.toLowerCase().replace('arrow', '');
  const node = document.querySelector(`.canvas__block--${selectedBLock}`);
  const id = selectedBLock;
  const blockConfig = settings.blocks[id];
  switch (direction) {
    case 'down':
      blockConfig.y += 1;
      break;
    case 'up':
      blockConfig.y -= 1;
      break;
    case 'left':
      blockConfig.x -= 1;
      break;
    case 'right':
      blockConfig.x += 1;
      break;
    default:
  }
  utils.updateLocalSettings(settings);
  utils.updateBlockPosition(node, blockConfig.x, blockConfig.y);
}

// apply all event listeners
function startEventListeners() {
  document.addEventListener('keypress', changeModeOnKeyPress, true);
  document.addEventListener('keydown', changeBlockPositionOnKeyPress, true);
  document.getElementById('colorPicker').addEventListener('change', pickerColorChange, true);
  document.querySelector('.main').addEventListener('click', pickPageColor);
  document.querySelector('.pallet__tools--colors').addEventListener('click', changeColor, true);
  document.querySelector('.pallet__tools--tools').addEventListener('click', changeMode, true);
  document.querySelector('.canvas__blocks').addEventListener('click', canvasClick, true);

  document.addEventListener('drop', canvasBlockDrop);
  document.addEventListener('dragstart', canvasBlockDragStart);
  document.querySelector('.main').addEventListener('dragover', e => e.preventDefault());
}

// apply canvas settings from config object on app start
function applyCanvasSettings(config) {
  settings = config;
  const blocks = Object.entries(settings.blocks);
  for (let i = 0; i < blocks.length; i += 1) {
    const [key, value] = [...blocks[i]];
    const node = document.querySelector(`.canvas__block--${key}`);
    if (node) {
      utils.updateNodeViewFromSettings(node, value);
    }
  }
  startEventListeners();
}

export default applyCanvasSettings;

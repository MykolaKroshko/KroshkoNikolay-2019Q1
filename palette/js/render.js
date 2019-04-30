import { allowedColors, paletteConfig } from './config.js';

// prepare dom node for item of palette colors panel from provided params
function colorItemTemplate(color, title, tool = '') {
  const div = document.createElement('div');
  div.classList.add('pallet__tools_item');
  div.dataset.colorHex = color;
  if (tool) {
    div.dataset.toolId = tool;
  }
  const circle = document.createElement('div');
  circle.classList.add('pallet__colors_item_pic');
  circle.style.backgroundColor = color;
  const name = document.createElement('div');
  name.classList.add('pallet__tools_item_title');
  name.innerText = title;
  div.appendChild(circle);
  div.appendChild(name);
  return div;
}

// prepare dom node for item of palette toolbox panel from provided params
function toolItemTemplate(title, key, icon) {
  const div = document.createElement('div');
  div.classList.add('pallet__tools_item');
  div.dataset.toolId = key;
  const image = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  image.classList.add('pallet__tools_item_icon');
  image.setAttribute('height', '1.125rem');
  image.setAttribute('width', '1.125rem');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `/assets/img/${icon}#root`);
  image.appendChild(use);
  const name = document.createElement('div');
  name.classList.add('pallet__tools_item_title');
  name.innerText = title;
  div.appendChild(image);
  div.appendChild(name);
  return div;
}

// render color panel from config object
function renderColorPanel(colors, current, prev) {
  const colorKeys = Object.keys(colors);
  const lastParentNode = document.querySelector('.pallet__colors_last .dynamic');
  const curr = colorItemTemplate(current || colorKeys[0], 'Current color', 'current_color');
  const last = colorItemTemplate(prev || colorKeys[0], 'Prev color', 'prev_color');
  lastParentNode.appendChild(curr);
  lastParentNode.appendChild(last);

  const fixedParentNode = document.querySelector('.pallet__colors_fixed .dynamic');
  for (let i = 0; i < colorKeys.length; i += 1) {
    const item = colorItemTemplate(colorKeys[i], colors[colorKeys[i]]);
    fixedParentNode.appendChild(item);
  }
}

// prepare palette colors panel node from config object
function renderColorTools(config) {
  const parentNode = document.querySelector('.pallet__color_tools .dynamic');
  const clone = parentNode.cloneNode();
  for (let i = 0; i < config.length; i += 1) {
    const item = toolItemTemplate(config[i].title, config[i].id, config[i].icon);
    clone.appendChild(item);
  }
  parentNode.replaceWith(clone);
}

// prepare palette toolbox panel node from config object
function renderTransformTools(config) {
  const parentNode = document.querySelector('.pallet__transform_tools .dynamic');
  const clone = parentNode.cloneNode();
  for (let i = 0; i < config.length; i += 1) {
    const item = toolItemTemplate(config[i].title, config[i].id, config[i].icon);
    clone.appendChild(item);
  }
  parentNode.replaceWith(clone);
}

function highlightCurrentModeTool(mode) {
  const toolbox = document.querySelector('.pallet__tools--tools');
  const clone = toolbox.cloneNode(true);
  const tools = clone.querySelectorAll('.pallet__tools_item');
  for (let i = 0; i < tools.length; i += 1) {
    const tool = tools[i];
    if (tool.dataset.toolId === mode) {
      tool.classList.add('current');
    } else {
      tool.classList.remove('current');
    }
  }
  toolbox.replaceWith(clone);
}

// render palette from config object
function renderPanel(current, prev, mode) {
  const config = paletteConfig;
  const colors = allowedColors;
  renderColorPanel(colors, current, prev);
  renderColorTools(config.tools.color);
  renderTransformTools(config.tools.transform);
  highlightCurrentModeTool(mode);
}

export default renderPanel;

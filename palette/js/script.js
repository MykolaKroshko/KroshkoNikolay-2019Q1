import { canvasDefaults } from './config.js';
import renderPanel from './render.js';
import applyCanvasSettings from './update_canvas.js';

(function init() {
  const store = JSON.parse(localStorage.getItem('codejam-dom-palette__settings'));
  const canvasSettings = store || canvasDefaults;
  const current = canvasSettings.currentColor || canvasDefaults.currentColor || 'green';
  const prev = canvasSettings.prevColor || canvasDefaults.prevColor || 'grey';
  const mode = canvasSettings.currentMode || canvasDefaults.currentMode || 'bucket';
  renderPanel(current, prev, mode);
  applyCanvasSettings(canvasSettings);
})();

import { allowedColors, palletConfig, canvasDefaults } from './config.js';
import renderPanel from './render.js';
import { applyCanvasSettings } from './update_canvas.js';

(function init() {
  const palletSettings = palletConfig;
  const canvasSettings = localStorage.getItem('CodeJamDomEvents__settings') || canvasDefaults;
  allowedColors.current = canvasSettings.currentColor || canvasDefaults.currentColor || 'green';
  allowedColors.prev = canvasSettings.prevColor || canvasDefaults.prevColor || 'grey';
  renderPanel(palletSettings, allowedColors);
  applyCanvasSettings(canvasSettings, allowedColors);
})();

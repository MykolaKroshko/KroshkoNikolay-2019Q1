import { palletConfig, canvasDefaults } from './config.js';
import renderPanel from './render.js';

(function init() {
  const palletSettings = palletConfig;
  const canvasSettings = localStorage.getItem('CodeJamDomEvents__settings') || canvasDefaults;
  palletSettings.colors.current =
    canvasSettings.currentColor || canvasDefaults.currentColor || 'green';
  palletSettings.colors.prev = canvasSettings.prevColor || canvasDefaults.prevColor || 'grey';
  renderPanel(palletSettings);
})();

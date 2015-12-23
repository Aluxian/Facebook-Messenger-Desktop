import {ipcRenderer as ipcr} from 'electron';
import webView from './webview';
import remote from 'remote';

const prefs = remote.require('../browser/utils/prefs').default;
const files = remote.require('../browser/utils/files').default;

// Log console messages
webView.addEventListener('console-message', function(event) {
  const msg = event.message;
  const label = 'DEBUG: ';

  if (msg.indexOf(label) === 0) {
    log('WV', msg.replace(label, ''));
  } else {
    console.log('WV:', event.message);
  }
});

// Listen for title changes to update the badge
webView.addEventListener('page-title-updated', function() {
  const matches = /\(([\d]+)\)/.exec(webView.getTitle());
  const parsed = parseInt(matches && matches[1], 10);
  const count = isNaN(parsed) || !parsed ? null : '' + parsed;
  log('sending notif-count', count);
  ipcr.send('notif-count', count);
});

// Handle url clicks
webView.addEventListener('new-window', function(event) {
  log('sending open-url', event.url);
  ipcr.send('open-url', event.url, event.options);
});

// Listen for dom-ready
webView.addEventListener('dom-ready', function() {
  log('dom-ready');

  // Inject custom css
  log('injecting custom css');
  files.getStyleCss('mini', css => webView.insertCSS(css));

  // Restore the default theme
  const theme = prefs.get('theme');
  if (theme) {
    log('restoring theme', theme);
    files.getThemeCss(theme, css => {
      webView.send('apply-theme', css);
    });
  }

  // Restore the default zoom level
  const zoomLevel = prefs.get('zoom-level');
  if (zoomLevel) {
    log('restoring zoom level', zoomLevel);
    webView.send('zoom-level', zoomLevel);
  }

  // Restore spell checker and auto correct
  const spellChecker = prefs.get('spell-checker');
  if (spellChecker) {
    const autoCorrect = prefs.get('auto-correct');
    log('restoring spell checker', spellChecker, 'auto correct', autoCorrect);
    webView.send('spell-checker', spellChecker, autoCorrect);
  }
});

export default webView;
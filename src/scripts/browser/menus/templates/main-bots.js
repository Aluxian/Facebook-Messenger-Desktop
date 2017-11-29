import {shell} from 'electron';
import * as piwik from 'browser/services/piwik';

export default {
  label: 'Bots',
  submenu: [{
    label: 'Tomo \t\t Cheap flight alerts, save 70%',
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('fwd-webview', 'open-messenger-thread', 'tomocheapflights?ref=MFD_APP');
      piwik.getTracker().trackEvent('Menu', 'Open Bot', 'tomocheapflights');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Poncho \t\t Personal weather forecasts',
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('fwd-webview', 'open-messenger-thread', 'hiponcho');
      piwik.getTracker().trackEvent('Menu', 'Open Bot', 'hiponcho');
    }
  }, {
    label: 'TechCrunch \t Personalized tech news',
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('fwd-webview', 'open-messenger-thread', 'techcrunch');
      piwik.getTracker().trackEvent('Menu', 'Open Bot', 'techcrunch');
    }
  }, {
    label: 'CNN \t\t Breaking news alerts',
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('fwd-webview', 'open-messenger-thread', 'cnn');
      piwik.getTracker().trackEvent('Menu', 'Open Bot', 'cnn');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Foxsy \t\t Make new friends',
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('fwd-webview', 'open-messenger-thread', 'foxsybot');
      piwik.getTracker().trackEvent('Menu', 'Open Bot', 'foxsybot');
    }
  }, {
    label: 'Icon8 \t\t Turn your selfies into art',
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('fwd-webview', 'open-messenger-thread', 'icon8bot');
      piwik.getTracker().trackEvent('Menu', 'Open Bot', 'icon8bot');
    }
  }, {
    label: 'Sensay \t\t On-demand help from humans',
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('fwd-webview', 'open-messenger-thread', 'sensaybot');
      piwik.getTracker().trackEvent('Menu', 'Open Bot', 'sensaybot');
    }
  }, {
    label: 'Swelly \t\t Better decisions with friends',
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('fwd-webview', 'open-messenger-thread', 'swell.bot');
      piwik.getTracker().trackEvent('Menu', 'Open Bot', 'swell.bot');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Discover More Bots',
    click () {
      shell.openExternal('https://chatbottle.co/bots/messenger?ref=messengerfordesktop.org');
    }
  }]
};

import {shell} from 'electron';

export default {
  role: 'help',
  submenu: [{
    label: 'Open App Website',
    click () {
      shell.openExternal('https://messengerfordesktop.org/');
    }
  }, {
    label: 'Send Feedback',
    click () {
      shell.openExternal('https://aluxian.typeform.com/to/sr2gEc');
    }
  }]
};

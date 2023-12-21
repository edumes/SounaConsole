const { SounaConsole } = require('../dist/SounaConsole');

// Default
SounaConsole.log('Hello Souna! Default');

// No Timestamp
SounaConsole.log('Hello Souna! No Timestamp', { showTimestamp: false });

// Colored
SounaConsole.log('Hello Souna! Colored', { color: 'green' });

// Success
SounaConsole.success('Hello Souna! Success');

// Loading
SounaConsole.loading('Loading', 5);
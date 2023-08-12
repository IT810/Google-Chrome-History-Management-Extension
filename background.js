// Show the demo page once the extension is installed
chrome.runtime.onInstalled.addListener((_reason) => {
    //chrome.alarms.create('myAlarm', { delayInMinutes: 1 }, function(alarm) { console.log('Alarm created:', alarm);});
});

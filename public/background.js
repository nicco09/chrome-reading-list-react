/* global chrome */
//* For testing, open the Browser Console
try {
  //alert() is not supported in Firefox. This forces the Browser Console open.
  //  This abuse of a misfeature works in FF49.0b+, not in FF48
  alert('Open the Browser Console.');
} catch (e) {
  //alert() throws an error in Firefox versions below 49
  console.log('Alert() threw an error. Probably Firefox version below 49.');
}
//*

chrome.browserAction.onClicked.addListener(function (tab) {
  doBrowserAction();
});

function doBrowserAction() {
}
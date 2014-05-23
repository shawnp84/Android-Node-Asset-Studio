Android-Node-Asset-Studio
=========================

ANAS is an asset generator for Android built in Node.js based on the Android Asset Studio library by Roman Nurik

I found myself in need of the features provide by the Android Asset Studio but I wanted a scriptable solution instead of relying on the web browser.

Simply run the "CreatImageAssets.js" from node with the appropriate parameters like so:

node CreateImageAssets.js Example Example sherlock On light_dark solid Off Off '#33B5E5' '#D6D6D6' '#F2F2F2' '#FFFFFF' '#33B5E5' '#E4E4E4' '#33B5E5' '#FFFFFF'

You will need to have the jsdom and canvas modules installed for it to work.

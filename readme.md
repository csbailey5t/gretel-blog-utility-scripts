# Utility scripts for Gretel blog

## Downloading CMS content from Webflow

`download.js` uses the Webflow SDK through a Deno script to download specific collections, and write them to disk as JSON. 

To run the script:

`deno run --allow-env --allow-read --allow-net --allow-write downloads.js`
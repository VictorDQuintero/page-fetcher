const needle = require("needle");
const fs = require("fs");

const URL = process.argv[2];
const filePath = process.argv[3];
/* 
 fetcher function now gets response.body and fs.writeFile writes the html code in the user specified file, 
 then printOutSizePath prints byte size and file path.
 */
const fetcher = function (url, path, callback) {
  // gets URL, filePath and printOutSizePath
  console.log("fetcher doing its thing...");

  needle.get(url, (error, body) => {
    // uses needle.get function to get response body from the url the user provided
    if (!error) {
      //if no error, writes the body of response.body on the file
      fs.writeFile(path, body.body, "utf8", (error, data) => {
        console.log("In writeFile's Callback: it has the data.");

        if (!error) {
          // if no error, calls callback function and sends body and filePath
          data = body;
          callback(data, path);
        }
      });
    }
  });
};

const printOutSizePath = (data, path) => {
  console.log(`Downloaded and saved ${data.bytes} bytes to ${path}`);
};

fetcher(URL, filePath, printOutSizePath);

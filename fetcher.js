const needle = require("needle");
const fs = require("fs");

const URL = process.argv[2];
const filePath = process.argv[3];

const fetcher = function (url, path, callback) {
  console.log("fetcher doing its thing...");

  needle.get(url, (error, body) => {
    if (!error) {
      fs.writeFile(path, body.body, "utf8", (error, data) => {
        console.log("In writeFile's Callback: it has the data.");

        if (!error) {
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

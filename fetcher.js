const needle = require("needle");
const fs = require("fs");

const URL = process.argv[2];
const filePath = process.argv[3];

const fetcher = function (url, path, callback) {
  // whenDone is a callback function
  console.log("fetcher doing its thing...");

  needle.get(url, (error, body) => {
    if (!error) {
      callback(path, body);
    }
  });
};

const writer = function (path, body, callback) {
  fs.writeFile(path, "utf8", (error, data) => {
    console.log("In readFile's Callback: it has the data.");

    if (!error) {
      callback(data); // whenDone takes data and because printOutCarBreed is in its place when calling breedDetailsFromFile(), printOut...() gets data and prints it
    }
  });
};

const printOutResult = (data) => {
  console.log("Return Value: ", data);
};

printOutResult(fetcher(URL, filePath, writer));

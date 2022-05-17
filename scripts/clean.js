const fs = require("fs");

function main() {
  const path = process.argv[2];
  if (!path || !folderOrFileExists(path)) {
    console.log(`${path} doesn't exist`);
    return;
  }

  if (isFile(path)) fs.unlinkSync(path);
  else if (isDir(path))
    fs.rmSync(path, {
      recursive: true,
    });
}

function isFile(path) {
  return fs.lstatSync(path).isFile();
}

function isDir(path) {
  return fs.lstatSync(path).isDirectory();
}

function folderOrFileExists(path) {
  return fs.existsSync(path);
}

main();

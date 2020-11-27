const fs = require('fs')
const child_process = require("child_process");

function update(directory) {
    directory = __dirname + "/../src/" + directory
    if (fs.existsSync(directory)) {
        child_process.execSync(`cd ${directory} && git pull`)
    }
}

update("layouts");
update("LayoutApp");
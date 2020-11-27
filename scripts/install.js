const fs = require('fs')
const child_process = require("child_process");

function clone(url, directory) {
    directory = __dirname + "/../src/" + directory
    if (!fs.existsSync(directory)) {
        child_process.execSync(`git clone -b oraculi ${url} "${directory}"`)
    }
}

clone("https://gitlab.com/protopiahome/pe-modules/layouts", "layouts");
clone("https://gitlab.com/protopiahome/pe-modules/layoutapp", "LayoutApp");
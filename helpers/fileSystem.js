const fs = require('fs');
class FileSystem {
    constructor() {

        this.fs = fs;
    }

    // function for handling create file automatic
    createFile(data) {

        const { fs } = this;

        //create directory
        fs.mkdirSync('../../../dist', { recursive: true });
        //create new file
        return fs.writeFileSync('../../../dist/data.txt', data, 'utf-8');
    }

    // function for handling read file automatic
    readFile() {

        const { fs } = this;

        //read file
        return fs.readFileSync('../../dist/data.txt', 'utf-8');
    }
}

module.exports = { FileSystem };
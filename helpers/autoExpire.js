const User = require('../models/Users.model');
const { FileSystem } = require('../helpers/fileSystem');
class AutoExpired {

    // function for handling expaired token activation login, max 3 minutes
    static autoExpired() {
        setInterval(async() => {

            // read file from disk, hash been create automatic

            const readFile = new FileSystem().readFile();

            // check file math or not with data from database
            await User.findOne({ email: readFile }).then(async result => {

                console.log(result);

                if (!result) {

                    return true;

                } else {

                    // update data if data is match

                    await User.updateOne({ _id: result._id }, { token: null });
                }
            });

        }, 180000);
    }
}

module.exports = { AutoExpired };
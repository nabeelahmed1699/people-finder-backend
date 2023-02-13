const multer = require('multer');
var upload = multer({ dest: __dirname + '/../peopleplatformfiles/' }); //setting the default folder for multer

module.exports = upload
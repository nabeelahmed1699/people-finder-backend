require('dotenv').config();
const express = require('express');
const cors = require('cors')
var bodyParser = require('body-parser')
const app = express();
const foundedPerson = require('./routes/foundPerson');
const MissingPerson = require('./routes/missingPeople');
const organization = require('./routes/organization');
const user = require('./routes/user');
const auth = require('./routes/auth');
const connectToDB = require('./db/db');
const verifyJWTToken = require('./middlewares/jwtVerification');
const roleVerification = require('./middlewares/roles');
const handleErr = require('./HandleFunction/HandleErr');
const handleSuccess = require('./HandleFunction/handleSuccess');
const upload = require('./HandleFunction/UploadFile') 
const fs = require('fs')
const mime = require('mime')
const path = require('path')
const port = process.env.PORT || 5000;

app.use(cors())

// middleware
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true,}));
app.use(express.json());


// app.use('/backend/uploads',express.static("uploads"))
connectToDB((error) => {
	if (!error) {
		app.listen(port, () => console.log(`listening on port ${port}...`));
		return;
	}
	console.log(error);
});
 
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);

// JWT VERIFICATIONS
// app.use(verifyJWTToken);
// app.use(roleVerification);

// routes
app.use('/api/v1/foundedPerson', foundedPerson);
app.use('/api/v1/missingPerson', MissingPerson);
app.use('/api/v1/organization', organization);




//Upload Audio/Image/File for message
app.post('/api/v1/uploadFile', upload.single('fileData'), (req, res) => {    //tested
	console.log('hsfis')
    //below code will read the data from the upload folder. Multer will automatically upload the file in that folder with an  autogenerated name
    fs.readFile(req.file.path, (err, contents) => {
        if (err) {
            return res.json(handleErr(err))
        } else {
            let response = {
                filePath: req.file.filename
            }
            return res.json(handleSuccess(response))
        }
    });
})

//Get File
app.get('/api/getFile/:path', (req, res) => {
    try {
        if (req.params.path !== undefined && req.params.path !== "undefined" && req.params.path !== null && req.params.path !== "null") {
            var file = __dirname + '/peopleplatformfiles/' + req.params.path;
            var filename = path.basename(file);
            var mimetype = mime.getType(file);
            console.log('file->', file)
            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);

            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        }
        else {
            return res.json(handleErr('File name is required'))
        }
    } catch (error) {
        return res.json(handleErr(error))
    }
})

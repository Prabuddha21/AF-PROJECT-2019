const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const Bundler = require("parcel-bundler");
const cors = require("cors");

const bundler = new Bundler('./src/index.html', {});
const Routes = require('./Routes');

server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use('/', Routes);
server.use(bundler.middleware());
server.use(express.static('./dist'));


server.listen(3000, err => {
    if (err) {
        console.error(err);
        process.exit(-1)
    }
    console.log('Application is running on port 3000');
});


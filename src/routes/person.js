let express = require("express");
let router = express.Router();

//send GET request to http://127.0.0.1:3000/person?name=echu
router.get('/person', (req, resp) => {
    if (req.query.name) {
        resp.send(`You have make a request to person ${req.query.name}.`);
    } else {
        resp.send("You have make a request to person.");
    }
});

//send GET request to http://127.0.0.1:3000/person/echu
router.get('/person/:name', (req, resp) => {
    resp.send(`You have make a request to person ${req.params.name}.`);
});

//send GET request to http://127.0.0.1:3000/person/echu
router.get('/error', (req, resp) => {
    throw new Error('this is a forced error to test erorr handler!');
});

module.exports = router;
let express = require("express");
let router = express.Router();
let customerModel = require("../models/customer.model");

//CREATE
//send POST request to http://127.0.0.1:3000/customer
router.post("/customer", (req, resp) => {
    if(!req.body) {
        resp.status(400).send("Request body is missing!");
    }
    // let user = {
    //     name: 'firstname',
    //     email: 'email@gmail.com'
    // }
    let model = new customerModel(req.body);

    model.save()
    .then(doc => {
        //if fail
        if(!doc || doc.length == 0){
            resp.status(500).send(doc);
        }

        //if success
        resp.status(201).send(doc)
        })
        .catch(err => {
            resp.status(500).json(err);
        });
});


//READ
//send GET request to http://127.0.0.1:3000/customer?email=echu@gmail.com
router.get("/customer", (req, resp) => {
    if(!req.query.email) {
        resp.status(400).send("Missing URL Parameter: email");
    }

    customerModel.findOne({
        email: req.query.email
    })
    .then(doc => {
        resp.json(doc);
    })
    .catch(err => {
        resp.status(500).json(err);
    })
    
});


//UPDATE
//send PUT request to http://127.0.0.1:3000/customer?email=echu@gmail.com
router.put("/customer", (req, resp) => {
    if(!req.query.email) {
        resp.status(400).send("Missing URL Parameter: email");
    }

    customerModel.findOneAndUpdate({
        email: req.query.email
    }, req.body, {
        new: true
    })
    .then(doc => {
        resp.json(doc);
    })
    .catch(err => {
        resp.status(500).json(err);
    })
    
});


//DELETE
//send DELETE request to http://127.0.0.1:3000/customer?email=echu@gmail.com
router.delete("/customer", (req, resp) => {
    if(!req.query.email) {
        resp.status(400).send("Missing URL Parameter: email");
    }

    customerModel.findOneAndRemove({
        email: req.query.email
    })
    .then(doc => {
        resp.json(doc);
    })
    .catch(err => {
        resp.status(500).json(err);
    })
    
});

module.exports = router;
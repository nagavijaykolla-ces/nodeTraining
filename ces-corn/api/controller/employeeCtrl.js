const express = require('express');
let router = express.Router(); // To separate routes.
let ObjectId = require('mongoose').Types.ObjectId; // To check based on ID whether the object is present in the collection
let Employees = require('../model/employeeModel.js'); // Importing Model

// Get all records from Database by ID
router.get('/', (req, res) => {
  Employees.find({}, function (err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

// Get  a record from Database by ID
router.get('/:id', (req, res) => {
  // Check whether the id is present in database
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send('No record is there with this ID');
  }

  Employees.findById(req.params.id, function (err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

// Save a record into collection.
router.post('/save', (req, res) => {
  emp = new Employees({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    gender: req.body.gender
  });

  emp.save((err, doc) => {
    if (err) {
      res.send(err);
    } else {
      console.log('You have created one employee record in database');
      res.send(doc);

    }
  });
});

// Update  a record from Database by ID
router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send('No record is there with this ID');
  }

  let emp = {
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    gender: req.body.gender
  };

  Employees.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, function (
    err,
    doc
  ) {
    if (err) {
      res.send(err);
    } else {
      console.log('You have updated one employee record in database');
      res.send(doc);

    }
  });
});

// Delete a record from Database by ID
module.exports = {
  deleteAnEmployee : deleteAnEmployee
}
function deleteAnEmployee(){
  console.log('Entered into ')
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send('No record is there with this ID');
  } 
  Employees.deleteEmployee();
}

module.exports = router;

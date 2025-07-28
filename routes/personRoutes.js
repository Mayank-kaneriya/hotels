const express = require('express');
const router = express.Router();
const Person = require('../models/Person.js');


router.post('/', async (req, res) => {
  try {

    const data = req.body; //assuming the req.body contains the person data

    const newPerson = new Person(data);  //create a new person document

    const savedPerson = await newPerson.save();
    console.log('data saved');
    res.status(200).json({
      message: 'Person saved',
      savedPerson
    })

  } catch (error) {
    res.status(400).json({ message: error });

  }
})

router.get('/', async (req, res) => {
  try {

    const data = await Person.find();
    console.log("checking");
    res.status(200).json({
      message: "peoples",
      data
    });

  } catch (error) {
    console.log("error");
    res.status(400).json({ message: error });

  }
})

router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
      const data = await Person.find({ work: workType });
      res.status(200).json(data);

    }
    else {
      res.status(404).json({
        message: "Invalid work type"
      });
    }

  } catch (error) {
    res.status(400).json({ message: error });
  }
})


router.put('/:id', async (req, res) => {
  try {
    const personid = req.params.id;
    const updatedata = req.body;

    const response = await Person.findByIdAndUpdate(personid, updatedata, {
      new: true, //Return the Updated document
      runValidators: true  //Run moongose validation
    })

    if (!response) {
      res.status(404).json({
        message: "Person not found"
      })
    }

    res.status(200).json(response);



  } catch (error) {
    res.status(400).json({ message: "error in updating" });
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const personid = req.params.id;
    const response = Person.findByIdAndDelete(personid);
    if (!response) {
      res.status(404).json({
        message: "Person not found"
      })
    }

    res.status(200).json({
      message: "person deleted"
    });
  } catch (error) {
    res.status(400).json({ message: "error in deleting" });
  }
})

module.exports = router;

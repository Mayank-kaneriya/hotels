const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menuitem.js');

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("Data Saved");
    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error in creating menu item",
    })

  }

})

router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("fetching data");
    res.status(200).json(data);


  } catch (error) {
    res.status(400).json({
      message: "error in fetching data",
    })

  }
})

router.get('/:taste', async (req, res) => {
  try {
    const tasteType = req.params.taste;
    if (tasteType == 'sour' || tasteType == 'spicy' || tasteType == 'sweet') {
      const data = await MenuItem.find({ taste: tasteType });
      res.status(200).json(data);

    }
    else {
      res.status(404).json({
        message: "Invalid taste type"
      });
    }

  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;



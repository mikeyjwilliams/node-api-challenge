const express = require('express');
const router = express.Router();
const actionModel = require('../data/helpers/actionModel');

router.get('/', async (req, res, next) => {
  try {
    const getActions = await actionModel.get();
    res.status(200).json(getActions);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;

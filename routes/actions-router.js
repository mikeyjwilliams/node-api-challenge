const express = require('express');
const router = express.Router({ mergeParams: true });
const actionModel = require('../data/helpers/actionModel');

router.get('/', async (req, res, next) => {
  try {
    const getActions = await actionModel.get();
    res.status(200).json(getActions);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const project_id = req.params.id;
  const { description, notes } = req.body;

  if (!description) {
    res.status(400).json({ message: 'description required for action post' });
  }
  if (!notes) {
    res.status(400).json({ message: 'notes required for action post' });
  }
  const actionPost = {
    project_id: project_id,
    description: description,
    notes: notes,
    completed: req.body.completed,
  };
  try {
    const insertAction = await actionModel.insert(actionPost);
    res.status(201).json(insertAction);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;

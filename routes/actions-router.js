const express = require('express');
const router = express.Router({ mergeParams: true });
const actionModel = require('../data/helpers/actionModel');

router.get('/:actionId', async (req, res, next) => {
  const id = req.params.actionId;
  try {
    const getAction = await actionModel.get(id);
    if (getAction) {
      res.status(200).json(getAction);
    } else {
      res.status(404).json({ message: '404 action id not found' });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const project_id = req.params.id;
  const { description, notes } = req.body;

  if (!description) {
    return res
      .status(400)
      .json({ message: 'description required for action post' });
  }
  if (!notes) {
    return res.status(400).json({ message: 'notes required for action post' });
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

router.put('/:actionId', async (req, res, next) => {
  const id = req.params.actionId;
  const project_id = req.params.id;
  const { description, notes } = req.body;

  if (!description) {
    return res
      .status(400)
      .json({ message: 'description required for action post' });
  }
  if (!notes) {
    return res.status(400).json({ message: 'notes required for action post' });
  }
  const updatePost = {
    project_id: project_id,
    description: description,
    notes: notes,
    completed: req.body.completed,
  };
  try {
    const insertUpdate = await actionModel.update(id, updatePost);
    res.status(200).json(insertUpdate);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete('/:actionId', async (req, res, next) => {
  const id = req.params.actionId;
  try {
    const removeAction = await actionModel.remove(id);
    if (removeAction) {
      res
        .status(204)
        .json(removeAction)
        .end();
    } else {
      res.status(404).json({ message: 'could not delete action with id' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const projectModel = require('../data/helpers/projectModel');
const actionRouter = require('./actions-router');

router.use('/:id/actions', actionRouter);

router.get('/', async (req, res, next) => {
  try {
    const getProjects = await projectModel.get();
    res.status(200).json(getProjects);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const getProject = await projectModel.get(id);
    if (getProject) {
      res.status(200).json(getProject);
    } else {
      res.status(404).json({ message: 'project ID is not found' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/:id/actions', async (req, res, next) => {
  const { id } = req.params;
  try {
    const getActions = await projectModel.getProjectActions(id);
    if (getActions) {
      res.status(200).json(getProjects);
    } else {
      res.status(404).json({ message: 'could not ID of project' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'name required for project' });
  }
  if (!description) {
    return res
      .status(400)
      .json({ message: 'description required for project' });
  }
  const projectPost = {
    name: name,
    description: description,
    completed: req.body.completed || false,
  };
  try {
    const post = await projectModel.insert(projectPost);
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'name required for project' });
  }
  if (!description) {
    return res
      .status(400)
      .json({ message: 'description required for project' });
  }
  const projectUpdate = {
    name: name,
    description: description,
    completed: req.body.completed || false,
  };
  try {
    const post = await projectModel.update(id, projectUpdate);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'user ID not found on update' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const removeProject = await projectModel.remove(id);
    if (removeProject) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'user ID not found on delete' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;

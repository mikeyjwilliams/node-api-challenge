const express = require('express');
const server = express();
const projectsRouter = require('./routes/projects-router');

server.use(express.json());

server.get('/', (req, res) => {
  res.send('projects and actions up');
});

server.use('/api/projects', projectsRouter);

server.use((req, res) => {
  res.status(404).json({ message: '404 page not found' });
});

server.use((err, req, res, next) => {
  res.status(500).json({ message: 'server internal error' });
});

module.exports = server;

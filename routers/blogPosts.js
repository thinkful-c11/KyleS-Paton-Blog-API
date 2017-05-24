'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('../models');

router.get('/', (req, res) => {
  res.json(BlogPosts.get(req.body.id));
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  requiredFields.forEach(el => {
    if(!(el in req.body)){
      const message = `Missing ${el} in body request.`;
      console.error(message);
      return res.status(400).send(message);
    }
  });
  const body = req.body;
  const blog = BlogPosts.create(body.title, body.content, body.author, body.publishDate);
  res.status(201).json(blog);
});

router.put('/:id', jsonParser, (req, res)=> {
  const requiredFields = ['title', 'content', 'author'];
  requiredFields.forEach(el => {
    if(!(el in req.body)){
      const message = `Missing ${el} in body request.`;
      console.error(message);
      return res.status(400).send(message);
    }
  });
  if(req.params.id !== req.body.id){
    const message = `Request path id ${req.params.id} does not match request body id ${req.body.id}.`;
    console.error(message);
    return res.status(400).send(message);
  }
  const body = req.body;
  BlogPosts.update({
    'title': body.title,
    'content': body.content,
    'author': body.author,
    'publishDate': body.publishDate || Date.now(),
    'id': body.id 
  });
  res.status(204).end();
});

router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted Blog post id ${req.params.id}`);
  res.status(204).end();
});

module.exports = router;





const express = require('express');
const router = express.Router();
const Task = require("../models/tasks");

//GET all tasks
router.get('/', async (req, res)=>{
  const tasks = await Task.find({userId: req.user,id});
  res.json(tasks);
})


//POST all tasks
router.post('/',  async (req, res)=>{
  const newTask = new Task({
    title:req.body.title,
  });
  const savedTask = await newTask.save();
  res.json(savedTask);
})

//PUT (update) task
router.put('/:id',  async (req, res)=>{
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(updatedTask);
})

//DELETE task
router.delete('/:id',  async (req, res)=>{
  await Task.findByIdAndDelete(req.params.id);
  res.json({message : "Task Deleted"});
})


module.exports = router;
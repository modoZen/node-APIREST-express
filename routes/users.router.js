const express = require('express');

const UsersService = require('../services/users.service');

const validatorHandler = require('./../middlewares/validator.handler');
const { createUserSchema, getUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const services = new UsersService();

router.get('/', async (req, res, next)=>{
  try {
    const users = await services.find();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }

});

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  (req, res)=>{
  const body = req.body;
  const newUser = services.create(body);
  res.status(201).send(newUser);
});

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next)=>{
  try {
    const { id } = req.params;
    const response = await services.delete(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
})


module.exports = router;

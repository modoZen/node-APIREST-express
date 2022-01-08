const express = require('express');

const ProductsService = require('./../services/products.service')

const router = express.Router();
const services = new ProductsService();

router.get('/',(req, res)=>{
  const products = services.find();
  res.json(products);
});

router.get('/filter',(req, res)=>{
  res.send('Yo soy un filter');
})

router.get('/:id',(req, res)=>{
  const { id } = req.params;
  const product = services.findOne(id);
  res.json(product);
});

router.post('/',(req, res)=>{
  const body = req.body;
  const newProduct = services.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',(req, res)=>{
  const { id } = req.params;
  const body = req.body;
  const product = services.update(id, body);
  res.json(product);
});

router.delete('/:id',(req, res)=>{
  const { id } = req.params;
  const response = services.delete(id);
  res.json(response);
});


module.exports = router;

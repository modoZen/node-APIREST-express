const express = require('express');

const ProductsService = require('./../services/products.service')

const router = express.Router();
const services = new ProductsService();

router.get('/',async (req, res)=>{
  const products = await services.find();
  res.json(products);
});

router.get('/filter',(req, res)=>{
  res.send('Yo soy un filter');
})

router.get('/:id',async (req, res)=>{
  const { id } = req.params;
  const product = await services.findOne(id);
  res.json(product);
});

router.post('/',async (req, res)=>{
  const body = req.body;
  const newProduct = await services.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',async (req, res)=>{
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await services.update(id, body);
    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

});

router.delete('/:id',async (req, res)=>{
  const { id } = req.params;
  const response = await services.delete(id);
  res.json(response);
});


module.exports = router;

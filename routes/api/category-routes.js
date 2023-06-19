const router = require('express').Router();
const { Category, Product } = require('../../models');
const sequelize = require("../../config/connection");
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const getCategory = await Category.findAll();
    res.status(200).json(getCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const getOneCat = await Category.findByPk(req.params.id);
    res.status(200).json(getOneCat);

    if (!getOneCat) {
      res.status(404).json({ message: "Sorry, we didn't find an entry with that id" });
      return;
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCat = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(updateCat);

    if (!updateCat) {
      res.status(404).json({ message: "This is gonna make me cry..." });
      return;
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catDeleteCall = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(catDeleteCall);

    if (!catDeleteCall) {
      res.status(404).json({ message: 'Oh no..... it happened again...' });
      return;
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

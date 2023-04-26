const router = require('express').Router();
const { Category, Product } = require('../../models');
const sequelize = require("../../config/connection");
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
  sequelize.query("SELECT category.*, product.product_name FROM category INNER JOIN product ON category.id = product.category_id;")
    .then(results => {
      res.status(200).json(results)
    })

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategory = await Driver.findByPk(req.params.id, {
      include: [{ model: Product }],
      attributes: {
        include: [
          [
            // Use plain SQL to add up the total mileage
            sequelize.literal(
              'SELECT category.*, product.product_name FROM category INNER JOIN product ON category.id = product.category_id;'
            ),
            'associatedProducts',
          ],
        ],
      },
    });

    if (!oneCategory) {
      res.status(404).json({ message: "It's over for me!" });
      return;
    }

    res.status(200).json(oneCategory);
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
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCat = await Category.update({
      where: {
        id: req.params.id,
      }
    });

    if (!updateCat) {
      res.status(404).json({ message: "This is gonna make me cry..." });
      return;
    }

    res.status(200).json(updateCat);
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

    if (!catDeleteCall) {
      res.status(404).json({ message: 'Oh no..... it happened again...' });
      return;
    }

    res.status(200).json(catDeleteCall);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

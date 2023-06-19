const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const allTags = await Tag.findAll({ include: { model: Product }});
    res.status(200).json(allTags);
    } catch (err) {
    res.status(500).json(err)
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id, { include: { model: Product }});
    console.log(singleTag);
    res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      //id: req.body.id,
      tag_name: req.body.tag_name
    })
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    )
  
  if (!updateTag) {
    res.status(404).json( { message: "There was no tag by that id"})
    return
  }
  res.status(200).json(updateTag)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDelete = await Tag.destroy(
      { where: { id: req.params.id } },
    )
    if (!tagDelete) {
      res.status(404).json({ message: "Oh no. We couldn't find it );" })
      return
    }
    res.status(200).json(tagDelete)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;

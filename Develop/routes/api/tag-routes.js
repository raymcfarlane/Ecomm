const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
          through: {
            model: ProductTag,
            attributes: [],
          },
        },
      ],
    }).then((tags) => {
      return res.json(tags);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagId = req.params.id;
    Tag.findByPk(tagId, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
          through: {
            model: ProductTag,
            attributes: [],
          },
        },
      ],
    }).then((tag) => {
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      return res.json(tag);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const { tag_name } = req.body;
    Tag.create({ tag_name }).then((newTag) => {
      return res.status(201).json(newTag);
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagId = req.params.id;
    const { tag_name } = req.body;
    Tag.update({ tag_name }, { where: { id: tagId } }).then((updatedTag) => {
      return res.json(updatedTag);
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagId = req.params.id;

    Tag.destroy({ where: { id: tagId } }).then(() => {
      return res.json({ message: 'Tag deleted successfully' });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});


module.exports = router;

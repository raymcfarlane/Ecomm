const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all categories and include associated Products
    const categories = await Category.findAll({
      include: [Product],
    });

    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find a category by its ID and include associated Products
    const category = await Category.findByPk(categoryId, {
      include: [Product],
    });

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    // Create a new category
    const category = await Category.create(req.body);

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Update a category by its ID
    const updatedCategory = await Category.update(req.body, {
      where: { id: categoryId },
    });

    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Delete a category by its ID
    const deletedCategory = await Category.destroy({
      where: { id: categoryId },
    });

    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

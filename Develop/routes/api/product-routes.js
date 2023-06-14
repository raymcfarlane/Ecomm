const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
    
// The `/api/products` endpoint
    
// get all products
router.get('/', (req, res) => {
      try {
        Product.findAll({
          include: [Category, Tag],
        })
          .then((products) => res.json(products))
          .catch((err) => res.status(500).json(err));
      } catch (err) {
        res.status(500).json(err);
      }
    });
    
 // get one product
router.get('/:id', (req, res) => {
      try {
        const productId = req.params.id;
        Product.findByPk(productId, {
          include: [Category, Tag],
        })
          .then((product) => {
            if (!product) {
              res.status(404).json({ message: 'Product not found' });
              return;
            }
            res.json(product);
          })
          .catch((err) => res.status(500).json(err));
      } catch (err) {
        res.status(500).json(err);
      }
    });
    
// create new product
router.post('/', (req, res) => {
  try {
    const { product_name, price, stock, tagIds } = req.body;
      
      Product.create(req.body)
          .then((product) => {
            if (req.body.tagIds.length) {
              const productTagIdArr = req.body.tagIds.map((tag_id) => {
                return {
                  product_id: product.id,
                  tag_id,
                };
              });
              return ProductTag.bulkCreate(productTagIdArr);
            } else {
              res.status(200).json(product);
            }
          })
          .then((productTagIds) => res.status(200).json(productTagIds))
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
    });
    
// update product
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
            const productTagsToRemove = productTags
              .filter(({ tag_id }) => !tagIds.includes(tag_id))
              .map(({ id }) => id);
    
            return Promise.all([
              ProductTag.destroy({ where: { id: productTagsToRemove } }),
              ProductTag.bulkCreate(newProductTags),
            ]);
          })
          .then((updatedProductTags) => res.json(updatedProductTags))
          .catch((err) => {
      // console.log(err);
          res.status(400).json(err);
    });
});
    
router.delete('/:id', (req, res) => {
      try {
        const productId = req.params.id;
        Product.destroy({ where: { id: productId } })
          .then(() => res.json({ message: 'Product deleted successfully' }))
          .catch((err) => res.status(400).json(err));
      } catch (err) {
        res.status(400).json(err);
      }
    });
    
module.exports = router;
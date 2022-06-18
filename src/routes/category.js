const express = require('express');
const controller = require('../controllers/category');
const { verifyMongooseID, verifyCategory } = require('../middlewares');

const router = express.Router();

router.get('/', controller.getCategories);
router.get('/:id/', verifyMongooseID, controller.getCategory);
router.post('/', verifyCategory, controller.createCategory);
router.delete('/:id/', verifyMongooseID, controller.deleteCategory);
router.put('/:id/', verifyMongooseID, verifyCategory, controller.updateCategory);

module.exports = router;

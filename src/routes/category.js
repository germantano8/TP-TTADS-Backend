let express = require('express');
let controller = require('../controllers/category');
const { verifyMongooseID, verifyCategory } = require('../middlewares');

let router = express.Router();

router.get('/', controller.getCategories);
router.get('/:id/', verifyMongooseID, controller.getCategory);
router.post('/', verifyCategory, controller.createCategory);
router.delete('/:id/', verifyMongooseID, controller.deleteCategory);1
router.put('/:id/', verifyMongooseID, verifyCategory, controller.updateCategory);

module.exports = router;
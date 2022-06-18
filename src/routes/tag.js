const express = require('express');
const controller = require('../controllers/tag');
const { verifyMongooseID, verifyTag } = require('../middlewares/index');

const router = express.Router();

router.get('/', controller.getTags);
router.get('/:id', verifyMongooseID, controller.getTag);
router.post('/', verifyTag, controller.createTag);
router.delete('/:id', verifyMongooseID, controller.deleteTag);
router.put('/:id', verifyMongooseID, verifyTag, controller.updateTag);

module.exports = router;

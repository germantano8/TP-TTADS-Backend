import {Category} from '../models/index';

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find({}).exec();
      return res.status(200).send(categories);
    } catch (error) {
      return res.status(500).send({ message: 'Error finding categories' });
    }
  },

  getCategory: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id).exec();

      if (!category) return res.status(404).send({ message: `There is no category with ID: ${req.params.id}` });

      return res.status(200).send(category);
    } catch {
      return res.status(500).send({ message: 'Error finding category' });
    }
  },

  createCategory: async (req, res) => {
    try {
      const category = new Category({
        description: req.body.description,
        restaurant: req.body.restaurant,
      });

      await category.save();
      return res.status(201).send({message:'Category created successfully'});

    } catch {
      return res.status(500).send({ message: 'Error creating category' });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const removedCategory = await Category.findByIdAndRemove(req.params.id).exec();

      if (!removedCategory) return res.status(404).send({ message: `There is no category with ID: ${req.params.id}` });

      return res.status(200).send({message: 'Category deleted successfully'});
    } catch {
      return res.status(500).send({ message: 'Error deleting category' });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { description: req.body.description },
      )
        .exec();

      if (!updatedCategory) return res.status(404).send({ message: `There is no category with ID: ${req.params.id}` });

      return res.status(200).send({message: 'Category updated successfully'});
    } catch {
      return res.status(500).send({ message: 'Error updating category' });
    }
  },
};

export {categoryController};

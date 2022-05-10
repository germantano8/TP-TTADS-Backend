const {Category} = require('../models/index');

const categoryController = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find({}).exec();
            res.status(200).send({success:true,categories});

        } catch (error) {
            res.status(500).send({success:false,message: "Error finding categories"})
        }
    },

    getCategory: async (req, res) => {
        try{
            const category = await Category.findById(req.params.id).exec();
            
            if(!category) return res.status(404).send({success:false,message: `There is no category with ID: ${req.params.id}`});

            res.status(200).send({success:true,category});
        }catch{
            res.status(500).send({success:false,message: "Error finding category"})
        }
    },

    createCategory: async (req, res) => {
        try{
            const category = new Category({
                description: req.body.description,
                restaurant: req.body.restaurant
            });

            await category.save();
            res.status(200).send({success:true,category});
        }catch{
            res.status(500).send({success:false,message: "Error creating category"})
        }
    },

    deleteCategory: async (req, res) => {
        try{
            const removedCategory = await Category.findByIdAndRemove(req.params.id).exec();

            if(!removedCategory) return res.status(404).send({success:false,message: `There is no category with ID: ${req.params.id}`});

            res.status(200).send({success:true,removedCategory});
        }catch{
            res.status(500).send({success:false,message: "Error deleting category"})
        }
    },

    updateCategory: async (req, res) => {
        try{
            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {description: req.body.description}).exec();

            if(!updatedCategory) return res.status(404).send({success:false,message: `There is no category with ID: ${req.params.id}`});

            res.status(200).send({success:true,updatedCategory});
        }catch{
            res.status(500).send({success:false,message: "Error updating category"})
        }
    }
}

module.exports = categoryController;
const validator = require('validator');
const { Category, Restaurant } = require('../models/index');
const mongoose = require('mongoose');

const verifyMeal = async(req, res, next) => {

    try{
        const errors = {
            name:null,
            description:null,
            price:null,
            category:null,
            restaurant:null,
        }

        function verifyLength(field){
            if(!(field && validator.isLength(field, {min: 4, max:20}))){
                return true;
            }
        }

        verifyLength(req.body.name) ? errors.name = 'Name must be between 4 and 20 characters' : null;
        verifyLength(req.body.description) ? errors.description = 'Description must be between 4 and 20 characters' : null;

        validator.isNumber(req.body.price) ? null : errors.price = 'Price must be a number';

        if(req.body.category){
            if(mongoose.isValidObjectId(req.body.category)){
                let category = await Category.findById(req.body.category);
                category ? null : errors.category = 'Category is not valid';
            }
        }

        if(!req.body.restaurant){
            errors.restaurant = 'Restaurant is required';
        }else{
            if(mongoose.isValidObjectId(req.body.restaurant)){
                let restaurant = await Restaurant.findById(req.body.restaurant);
                restaurant ? null : errors.restaurant = 'Restaurant is not valid';
            }
        }

        if(Object.entries(errors).some(e => e[1] != null)){
            return res.status(400).send({
                success: false,
                errors: errors
            });
        }

        return next();

    }catch{
        return res.status(500).send({
            success: false,
            errors: {
                message: "Error creating meal",
            }
        });
    }

}

module.exports = verifyMeal;
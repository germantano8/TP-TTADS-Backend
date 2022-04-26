const validator = require('validator');
const { User, Role } = require('../models/index');
const mongoose = require('mongoose');

const verifyUser = async (req,res,next) => {

    try{
        // falta imageurl y pw

        const errors = {
            name:null, 
            surname:null,
            phone:null,
            email:null,
            imageUrl:null,
            password:null,
            role:null,
        };

        function verifyLength(field){
            if(!(field && validator.isLength(field, {min: 4, max:undefined}))){
                return true;
            }
        }

        // Name and Surname
        verifyLength(req.body.name) ? errors.name = 'Name must be at least 4 characters' : null;
        verifyLength(req.body.surname) ? errors.surname = 'Surname must be at least 4 characters' : null;

        // Phone
        if(req.body.phone){
            if(!validator.isMobilePhone(req.body.phone)){
                errors.phone = 'Phone number is not valid';
            }
        }

        // Email
        if(!(req.body.email && validator.isEmail(req.body.email))){
            errors.email = 'Email is required';
        }else{
            if(!req.params.id){
                let email = await User.findOne({email: req.body.email});
                if(email){
                    errors.email = 'Email is already in use';
                }
            }
        }

        // ImageUrl
        if(req.body.imageUrl){
            if(!validator.isURL(req.body.imageUrl)){
                errors.imageUrl = 'Image URL is not valid';
            }
        }

        // Password
        if(!(req.body.password && validator.isLength(req.body.password, {min: 8, max:undefined}))){
            errors.password = 'Password must be at least 8 characters';
        }

        // Role
        if(!req.body.role){
            errors.role = "There is no role";
        }else{
            if(mongoose.isValidObjectId(req.body.role)){
                let role = await Role.findById(req.body.role);
                role ? null : errors.role = "Role is not valid";
            }
        }
        
        // If there are errors, return the errors
        if(Object.entries(errors).some(e => e[1] != null)){
            return res.status(400).send({
                success: false,
                errors: errors
            });
        }

        
        return next();
    }catch{
        return res.status(500).send({
            success:false, 
            errors:{
                message: "Error creating user",
            }
        });
    }

};

module.exports = {verifyUser};
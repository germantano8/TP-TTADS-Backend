import {Types} from 'mongoose';
import {isValidLength, isValidImageURL } from '../utils/isValidLength';

const verifyRestaurant = async (req, res, next) => {
    try{
        const errors = {
            name: null,
            description: null,
            image: null,
            deliveryPricePerKm: null,
            deliveryPriceBase: null,
            location: null,
            tags: null,
        };

        errors.name = isValidLength(req.body.name) ? null : 'Name must be between 4 and 20 characters';

        errors.description = isValidLength(req.body.description) ? null : 'Description must be between 4 and 20 characters';
        
        if(req.body.image){
            errors.image = isValidImageURL(req.body.image) ? null : 'Image must be between 4 and 20 characters';
        };

        errors.deliveryPricePerKm = typeof req.body.deliveryPricePerKm === 'number' && req.body.deliveryPricePerKm > 0 ? null : 'Delivery price per km must be a number greater than 0';

        errors.deliveryPriceBase = typeof req.body.deliveryPriceBase === 'number' && req.body.deliveryPriceBase > 0 ? null : 'Delivery price base must be a number greater than 0';

        errors.location = Types.ObjectId.isValid(req.body.location) ? null : 'Location must be a valid id';

        errors.tags = req.body.tags.every((tag) => Types.ObjectId.isValid(tag)) ? null : 'Tags must be valid ids';

        if(Object.entries(errors).some((e) => e[1] != null)){
            return res.status(400).send(errors);
        };

        next()

    }catch(error){
        res.status(500).json({message: 'Error creating restaurant'});
    }
};

export{verifyRestaurant};
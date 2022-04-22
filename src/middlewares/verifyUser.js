const validator = require('validator');

const verifyUser = (req,res,next) => {
    const fields = [
        'name',
        'surname',
        'phone',
        'email',
        'username',
        'imageUrl',
        'password',
        'role'
    ];

    if(fields && validator.isLength(fields, {min: 4, max:undefined}) && validator.ltrim(fields, ' ')
        && validator.isNumeric(fields['phone'])
        && validator.isEmail(fields['email'])
        && validator.normalizeEmail(fields['email'])
        && validator.isURL(fields['imageUrl'])
    ) return next();

    res.status(400).send({success:false, errors:{
        // acá enumerar loss errores, tipo como debería ser el nombre, user más de 8 letras y cada campo etc
        description: "description must be at least 4 characters"
    }})

};

module.exports = {verifyUser};
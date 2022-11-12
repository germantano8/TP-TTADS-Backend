const validator = require('validator');
const mongoose = require('mongoose');
const { User, Role } = require('../models/index');
const { isValidLength } = require('../utils/isValidLength');

const verifyUserWrapper = (isUpdate = false) => {
  return (req, res, next) => {

    /*SI isUpdate = true, EL CHEQUEO DE LOS DATOS SE VAN A HACER SOLO SI ESTÁN EN EL BODY DE LA PETICIÓN*/

    try {
      const errors = {
        name: null,
        surname: null,
        phone: null,
        email: null,
        imageUrl: null,
        password: null,
        role: null,
      };


      // Name
      if ((isUpdate && req.body.name) || !isUpdate) {
        errors.name = isValidLength(req.body.name)
          ? null : 'Name must be between 4 and 20 characters';
      };

      // Surname
      if ((isUpdate && req.body.surname) || !isUpdate) {
        errors.surname = isValidLength(req.body.surname)
          ? null : 'Surname must be between 4 and 20 characters';
      };

      // Phone
      if ((isUpdate && req.body.phone) || !isUpdate) {
        if (req.body.phone) {
          if (!validator.isMobilePhone(req.body.phone)) {
            errors.phone = 'Not a valid Phone number';
          }
        }
      };


      // Email
      if ((isUpdate && req.body.email) || !isUpdate) {
        if (!validator.isEmail(req.body.email ?? "")) {
          errors.email = "Not a valid Email";

        } else {

          const email = User.findOne({ email: req.body.email });
          if (email) {
            errors.email = 'Email is already in use';
          };

        };
      };


      // ImageUrl
      /*ESTO LO VEMOS DESPUÉS, 
     PERO EN PRINCIPIO BASTA CON GUARDAR UN STRING CON EL NOMBRE DEL ARCHIVO, NO LA URL ENTERA*/
      if ((isUpdate && req.body.imageUrl) || !isUpdate) {
        if (req.body.imageUrl) {
          if (!validator.isURL(req.body.imageUrl)) {
            errors.imageUrl = 'Not a valid Image URL';
          }
        };
      };

      // Password
      if ((isUpdate && req.body.password) || !isUpdate) {
        errors.password = isValidLength(req.body.password, 8, 32)
          ? null : 'Password must be between 8 and 32 characters';
      };

      // Role
      if ((isUpdate && req.body.role) || !isUpdate) {
        if (!mongoose.isValidObjectId(req.body.role)) {
          errors.role = 'Not a valid Role';
        } else {
          const role = Role.findById(req.body.role);
          errors.role = role ? null : 'Role does not exist';
        };
      };

      // If there are errors, return the errors
      if (Object.entries(errors).some((e) => e[1] != null)) {
        return res.status(400).send(errors);
      }

      return next();
    } catch {
      return res.status(500).send({ message: 'Error creating User' });
    }
  };
}
module.exports = { verifyUserWrapper, };

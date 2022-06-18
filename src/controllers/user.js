const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();

      return res.status(200).send({
        success: true,
        users,
      });
    } catch {
      return res.status(500).send({
        success: false,
        message: 'Error getting users',
      });
    }
  },

  getUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (user) {
        return res.status(200).send({
          success: true,
          user,
        });
      }
      return res.status(400).send({
        success: false,
        message: 'User not found',
      });
    } catch {
      return res.status(500).send({
        success: false,
        message: 'Error getting user',
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const { password } = req.body;
      console.log(`Password ${password}`);
      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        email: req.body.email,
        imageUrl: req.body.imageUrl,
        password: encryptedPassword,
        role: req.body.role,
      });

      await user.save();
      return res.status(200).send({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: 'Error creating user',
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        return res.status(400).send({
          success: false,
          message: 'Email and password are required',
        });
      }
      console.log(`${email} - ${password}`);
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .send({ success: false, message: 'No user found' });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res
          .status(400)
          .send({ success: false, message: 'Invalid credentials' });
      }
      console.log('Everything valid');

      const key = process.env.TOKEN_KEY || '';
      const token = jwt.sign({ user_id: user._id, email }, key, {
        expiresIn: '2h',
      });

      return res.status(200).send({ success: true, user, token });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, message: 'Error while logging in' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      // new:true returns the updated user and not the old one

      if (user) {
        return res.status(200).send({
          success: true,
          message: 'User updated successfully',
        });
      }
      return res.status(400).send({
        success: false,
        message: 'User not found',
      });
    } catch {
      return res.status(500).send({
        success: false,
        message: 'Error updating user',
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;

      const userResponse = await User.findByIdAndRemove(userId);

      if (userResponse) {
        return res.status(200).send({
          success: true,
          message: 'User deleted successfully',
        });
      }
      return res.status(400).send({
        success: false,
        message: 'User not found',
      });
    } catch {
      return res.status(500).send({
        success: false,
        message: 'Error deleting user',
      });
    }
  },

  addMainLocation: async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ success: false, message: 'User not found' });
    }
    user.mainLocation = req.body.locationId;
    const { locations } = user;
    if (locations.indexOf(req.body.locationId) === -1) {
      locations.push(req.body.locationId);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(500).send({
        success: false,
        message: 'Error trying to add location',
      });
    }

    return res.status(200).send({
      success: true,
      message: 'User updated successfully',
      user: updatedUser,
    });
  },
  addLocation: async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ success: false, message: 'User not found' });
    }

    if (user.locations.indexOf(req.body.locationId) === -1) {
      user.locations.push(req.body.locationId);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(500).send({
        success: false,
        message: 'Error trying to add location',
      });
    }

    return res.status(200).send({
      success: true,
      message: 'User updated successfully',
      user: updatedUser,
    });
  },
  removeMainLocation: async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ success: false, message: 'User not found' });
    }

    const locationId = user.mainLocation;
    const index = user.locations.indexOf(locationId);
    if (index === -1) {
      res.status(404).send({ success: false, message: 'Location not found' });
    }
    user.locations.splice(index, 1);
    user.mainLocation = null;

    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(500).send({
        success: false,
        message: 'Error trying to remove location',
      });
    }

    return res.status(200).send({
      success: true,
      message: 'User updated successfully',
      user: updatedUser,
    });
  },
  removeLocation: async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ success: false, message: 'User not found' });
    }

    const { locationId } = req.body;
    const index = user.locations.indexOf(locationId);
    if (index === -1) {
      res.status(404).send({ success: false, message: 'Location not found' });
    }
    user.locations.splice(index, 1);

    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(500).send({
        success: false,
        message: 'Error trying to remove location',
      });
    }

    return res.status(200).send({
      success: true,
      message: 'User updated successfully',
      user: updatedUser,
    });
  },
};

module.exports = userController;

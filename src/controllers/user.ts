import {compare, hash} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import {User} from '../models/index';

const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();

      return res.status(200).send(users);
    } catch {
      return res.status(500).send({ message: 'Error getting users' });
    }
  },

  getUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const { detailed } = req.query;

      const user = detailed ? await User.findById(userId).populate({ path: 'locations', model: 'location' }).populate({ path: 'role' }).populate({ path: 'mainLocation' }) : await User.findById(userId);

      if (user) {
        return res.status(200).send(user);
      }
      return res.status(400).send({ message: 'User not found' });
    } catch {
      return res.status(500).send({ message: 'Error getting user' });
    }
  },

  getSession: async (req, res) => {
    res.status(200).send(req.user);
  },

  createUser: async (req, res) => {
    try {
      const { password } = req.body;
      const encryptedPassword = await hash(password, 10);

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
      return res.status(201).send(user);
    } catch (error) {
      return res.status(500).send({ message: 'Error creating user' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        return res.status(400).send({ message: 'Email and password are required' });
      }
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .send({ message: 'No user found' });
      }

      if (!(await compare(password, user.password))) {
        return res
          .status(400)
          .send({ message: 'Invalid credentials' });
      }

      let payload = { ...user._doc };

      delete payload.password;

      const key = process.env.TOKEN_KEY || '';
      const token = sign(payload, key, {
        expiresIn: '2h',
      });

      res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true })

      return res.status(200).send({ payload, token });
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Error while logging in' });
    }
  },

  logout: async (req, res) => {
    res.clearCookie("token");
    res.status(200).send({message:'Logged out successfully'});
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      // new:true returns the updated user and not the old one

      if (user) {
        return res.status(200).send(user);
      }
      return res.status(400).send({ message: 'User not found' });
    } catch {
      return res.status(500).send({ message: 'Error updating user' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;

      const userResponse = await User.findByIdAndRemove(userId);

      if (userResponse) {
        return res.status(200).send({ message: 'User deleted successfully' });
      }
      return res.status(400).send({ message: 'User not found' });
    } catch {
      return res.status(500).send({ message: 'Error deleting user' });
    }
  },

  addMainLocation: async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
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
      return res.status(500).send({ message: 'Error trying to add location' });
    }

    return res.status(200).send({ message: 'User updated successfully' });
  },
  addLocation: async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user.locations.indexOf(req.body.locationId) === -1) {
      user.locations.push(req.body.locationId);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(500).send({ message: 'Error trying to add location' });
    }

    return res.status(200).send({ message: 'User updated successfully' });
  },
  removeMainLocation: async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const locationId = user.mainLocation;
    const index = user.locations.indexOf(locationId);
    if (index === -1) {
      return res.status(404).send({ message: 'Location not found' });
    }
    user.locations.splice(index, 1);
    user.mainLocation = null;

    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(500).send({ message: 'Error trying to remove location' });
    }

    return res.status(200).send({ message: 'User updated successfully' });
  },
  removeLocation: async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const { locationId } = req.body;
    const index = user.locations.indexOf(locationId);
    if (index === -1) {
      return res.status(404).send({ message: 'Location not found' });
    }
    user.locations.splice(index, 1);

    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(500).send({ message: 'Error trying to remove location' });
    }

    return res.status(200).send({ message: 'User updated successfully' });
  },
};

export {userController};

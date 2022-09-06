const { Role } = require('../models/index');

const roleController = {
  getRoles: async (req, res) => {
    await Role.find({}).exec((err, roles) => {
      if (err) {
        return res
          .status(500)
          .send({ message: 'Error finding roles' });
      }

      if (!roles) {
        return res
          .status(404)
          .send({ message: 'There are no roles' });
      }

      return res.status(200).send(roles);
    });
  },

  getRole: async (req, res) => {
    const roleId = req.params.id;
    if (roleId == null) {
      return res.status(400).send({ message: 'Wrong request' });
    }
    try {
      const role = await Role.findById(roleId);

      if (!role) {
        return res
          .status(404)
          .send({ message: 'Could not find role' });
      }
      return res.status(200).send(role);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Error finding role' });
    }
  },

  createRole: (req, res) => {
    const role = new Role();

    role.description = req.body.description;

    Role.create(role, (err, insertedRole) => {
      if (err) {
        return res
          .status(500)
          .send({ message: 'Error creating role' });
      }

      if (!insertedRole) {
        return res
          .status(500)
          .send({ message: 'Error creating role' });
      }

      return res.status(201).send({message:"Role created successfully"});
    });
  },

  updateRole: async (req, res) => {
    const roleId = req.params.id;

    const newRole = {
      description: req.body.description,
    };

    await Role.findOneAndUpdate(roleId, newRole, (err, roleUpdated) => {
      if (err) {
        return res
          .status(500)
          .send({ message: `Error updating role${err.message}` });
      }

      if (!roleUpdated) {
        return res
          .status(500)
          .send({ message: 'Error updating role' });
      }

      return res.status(200).send({message:"Role updated successfully"});
    });
  },

  deleteRole: async (req, res) => {
    const roleId = req.params.id;

    await Role.findByIdAndRemove(roleId, (err, roleRemoved) => {
      if (err) return res.status(500).send({ message: 'Could not delete role' });

      if (!roleRemoved) return res.status(404).send({ message: 'Did not find role' });

      return res.status(200).send({message:"Role deleted successfully"});
    });
  },
};

module.exports = roleController;

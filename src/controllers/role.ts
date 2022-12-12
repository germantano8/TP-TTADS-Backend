import { default as ApiError } from "../errors/api-error";
import { Role } from "../models/index";

const roleController = {
  getRoles: async (_req, res, next) => {
    Role.find({}).exec((err, roles) => {
      if (err) {
        return next(new ApiError(500, err.message));
      }

      return res.send(roles);
    });
  },

  getRole: async (req, res, next) => {
    const roleId = req.params.id;
    if (roleId == null) {
      return next(new ApiError(400, "Bad request"));
    }

    Role.findById(roleId).exec((err, role) => {
      if (err) {
        return next(new ApiError(500, err.message));
      }

      if (!role)
        return next(new ApiError(404, `Role id = ${roleId} not found`));

      return res.send(role);
    });
  },

  createRole: (req, res, next) => {
    const newRole = req.body;

    const role = new Role({
      description: newRole.description,
    });

    Role.create(role, (err, insertedRole) => {
      if (err) {
        return next(new ApiError(500, err.message));
      }

      return res.send({ role: insertedRole });
    });
  },

  updateRole: async (req, res, next) => {
    const roleId = req.params.id;

    const newRole = req.body;

    const role = new Role({
      description: newRole.description,
    });

    await Role.findOneAndUpdate(roleId, role, (err, roleUpdated) => {
      if (err) {
        return next(new ApiError(500, err.message));
      }

      return res.send({ role: roleUpdated });
    });
  },

  deleteRole: async (req, res, next) => {
    const roleId = req.params.id;

    await Role.findByIdAndRemove(roleId, (err, found) => {
      if (err) {
        return next(new ApiError(500, err.message));
      }

      if (!found) {
        next(new ApiError(404, `Role id = ${roleId} not found`));
      }

      return res.status(200);
    });
  },
};

export {roleController};
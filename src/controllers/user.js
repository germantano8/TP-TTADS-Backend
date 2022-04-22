const {User, Role} = require('../models/index');
const {existsRole} = require('../middlewares/index');

const userController = {
    getUsers: async (req, res) => {
        try{
            const users = await User.find();
            
            return res.status(200).send({
                success: true,
                users: users
            });
        }catch{
            return res.status(500).send({
                success: false,
                message: "Error getting users"
            });
        }
    },

    getUser: async (req, res) => {
        try{
            let userId = req.params.id;
            const user = await User.findById(userId);

            if(user){
                return res.status(200).send({
                    success: true,
                    user: user
                });
            }else{
                return res.status(400).send({
                    success: false,
                    message: "User not found",
                })
            }
        }catch{
            return res.status(500).send({
                success: false,
                message: "Error getting user"
            });
        }
    },

    createUser: async (req, res) => {
        try{
            const user = new User({
                name: req.body.name,
                surname: req.body.surname,
                phone: req.body.phone,
                email: req.body.email,
                username: req.body.username,
                imageUrl: req.body.imageUrl,
                password: req.body.password,
                role: req.body.role
            });

            const role = await existsRole(req.body.role);
            
            if(!role){
                return res.status(400).send({
                    success: false,
                    messag:"Role doesn't exist"
                })
            }

            await user.save();
            return res.status(200).send({
                success: true,
                user: user
            });
        }catch{
            return res.status(500).send({
                success: false,
                message: "Error creating user"
            });
        }
    },

    updateUser: async (req, res) => {
        try{
            let userId = req.params.id;

            const role = await Role.findById(req.body.role);

            if(!role){
                res.status(400).send({
                    success:false,
                    message:"Role doesn't exist",
                });
            }

            const user = await User.findByIdAndUpdate(userId, req.body, {new: true});
            // new:true returns the updated user and not the old one
            console.log(user);

            if(user){
                res.status(200).send({
                    success:true,
                    message:"User updated successfully",
                })
            }else{
                res.status(400).send({
                    success:false,
                    message:"User not found",
                })
            }
        }catch{
            return res.status(500).send({
                success: false,
                message: "Error updating user"
            });
        }
    },

    deleteUser: async (req, res) => {
        try{
            const userId = req.params.id;

            let userResponse = await User.findByIdAndRemove(userId);
            
            if(userResponse){
                res.status(200).send({
                    success:true,
                    message:"User deleted successfully",
                })
            }else{
                res.status(400).send({
                    success:false,
                    message:"User not found",
                })
            }
        }catch{
            return res.status(500).send({
                success: false,
                message: "Error deleting user"
            });
        }
    }
}

module.exports = userController;
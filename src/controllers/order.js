const { Order } = require('../models/index');

const orderController = {
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find({}).exec();
      return res.status(200).send({ success: true, orders });
    } catch (error) {
      return res.status(500).send({ success: false, message: 'Error finding orders' });
    }
  },

  getOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).exec();

      if (!order) return res.status(404).send({ success: false, message: `There is no order with ID: ${req.params.id}` });

      return res.status(200).send({ success: true, order });
    } catch {
      return res.status(500).send({ success: false, message: 'Error finding order' });
    }
  },

  createOrder: async (req, res) => {
    try {
      const order = new Order({
        idRestaurant: req.body.idRestaurant,
        idUser: req.body.idUser,
        totalPrice: req.body.totalPrice,
      });

      await order.save();
      return res.status(200).send({ success: true, order });
    } catch {
      return res.status(500).send({ success: false, message: 'Error creating order' });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const removedOrder = await Order.findByIdAndRemove(req.params.id).exec();

      if (!removedOrder) return res.status(404).send({ success: false, message: `There is no order with ID: ${req.params.id}` });

      return res.status(200).send({ success: true, removedOrder });
    } catch {
      return res.status(500).send({ success: false, message: 'Error deleting order' });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { idRestaurant: req.body.idRestaurant, idUser: req.body.idUser, totalPrice: req.body.totalPrice },
      )
        .exec();

      if (!updatedOrder) return res.status(404).send({ success: false, message: `There is no order with ID: ${req.params.id}` });

      return res.status(200).send({ success: true, updatedOrder });
    } catch {
      return res.status(500).send({ success: false, message: 'Error updating order' });
    }
  },
};

module.exports = orderController;

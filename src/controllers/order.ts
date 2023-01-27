import { Order, Meal } from '../models/index';

const orderController = {
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find({}).exec();
      return res.status(200).send(orders);
    } catch (error) {
      return res.status(500).send({ message: 'Error finding orders' });
    }
  },

  getOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).exec();

      if (!order) return res.status(404).send({ message: `There is no order with ID: ${req.params.id}` });

      return res.status(200).send(order);
    } catch {
      return res.status(500).send({ message: 'Error finding order' });
    }
  },

  createOrder: async (req, res) => {
    try {

      const requiredMeals = await Meal.find({ _id: { $in: req.body.meals } });

      const newOrder = {
        restaurant: req.body.restaurant,
        meals: req.body.meals,
        user: req.user.user_id,
        totalPrice: requiredMeals.reduce((prev, curr) => prev.price + curr.price),
      };

      const order = new Order(newOrder);

      await order.save();
      return res.status(201).send({ message: "Order created successfully" });
    } catch (error) {
      return res.status(500).send({ message: 'Error creating order' });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const removedOrder = await Order.findByIdAndRemove(req.params.id).exec();

      if (!removedOrder) return res.status(404).send({ message: `There is no order with ID: ${req.params.id}` });

      return res.status(200).send({ message: "Order deleted successfully" });
    } catch {
      return res.status(500).send({ message: 'Error deleting order' });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { restaurant: req.body.idRestaurant, user: req.body.idUser, totalPrice: req.body.totalPrice },
      )
        .exec();

      if (!updatedOrder) return res.status(404).send({ message: `There is no order with ID: ${req.params.id}` });

      return res.status(200).send({ message: "Order updated successfully" });
    } catch {
      return res.status(500).send({ message: 'Error updating order' });
    }
  },
};

export {orderController};

import {Location} from '../models/index';

const locationController = {

  createLocation: async (req, res) => {
    try {
      const newLocation = new Location(
        {
          street: req.body.street,
          number: req.body.number,
          floor: req.body.floor,
          apartment: req.body.apartment,
          longitude: req.body.longitude,
          latitude: req.body.latitude,
        },
      );

      await newLocation.save();

      return res.status(201).send({ message: 'Location created successfully' });
    } catch (error) {
      return res.status(500).send({ message: 'Error creating location' });
    }
  },

  getLocation: async (req, res) => {
    try {
      const location = await Location.findById(req.params.id).exec();

      if (!location) return res.status(404).send({ message: `There is no location with ID: ${req.params.id}` });

      return res.status(200).send(location);
    } catch (error) {
      return res.status(500).send({ message: 'Error finding location' });
    }
  },

  deleteLocation: async (req, res) => {
    try {
      const removedLocation = await Location.findByIdAndRemove(req.params.id).exec();

      if (!removedLocation) return res.status(404).send({ message: `There is no location with ID: ${req.params.id}` });

      return res.status(200).send({ message: 'Location deleted successfully' });
    } catch (error) {
      return res.status(500).send({ message: 'Error deleting location' });
    }
  },

  updateLocation: async (req, res) => {
    try {
      const updatedLocation = await Location.findByIdAndUpdate(req.params.id, {
        street: req.body.street,
        number: req.body.number,
        floor: req.body.floor,
        apartment: req.body.apartment,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
      }).exec();

      if (!updatedLocation) return res.status(404).send({ message: `There is no location with ID: ${req.params.id}` });

      return res.status(200).send({ message: 'Location updated successfully' });
    } catch (error) {
      return res.status(500).send({ message: 'Error updating location' });
    }
  },

};

export {locationController};

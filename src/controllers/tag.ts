import { Tag } from '../models/index';

const tagController = {
  getTags: async (req, res) => {
    try {
      const tags = await Tag.find({}).exec();
      return res.status(200).send(tags);
    } catch (error) {
      return res.status(500).send({ message: 'Error finding tags' });
    }
  },

  getTag: async (req, res) => {
    try {
      const tag = await Tag.findById(req.params.id).exec();

      if (!tag) return res.status(404).send({ message: `There is no tag with ID: ${req.params.id}` });

      return res.status(200).send(tag);
    } catch (error) {
      return res.status(500).send({ message: 'Error finding tag' });
    }
  },

  createTag: async (req, res) => {
    try {
      const newTag = new Tag({ description: req.body.description });

      await newTag.save();

      return res.status(201).send({ message: "Tag created successfully" });
    } catch (error) {
      return res.status(500).send({ message: 'Error creating tag' });
    }
  },

  deleteTag: async (req, res) => {
    try {
      const removedTag = await Tag.findByIdAndRemove(req.params.id).exec();

      if (!removedTag) return res.status(404).send({ message: `There is no tag with ID: ${req.params.id}` });

      return res.status(200).send({ message: "Tag deleted successfully" });
    } catch (error) {
      return res.status(500).send({ message: 'Error deleting tag' });
    }
  },

  updateTag: async (req, res) => {
    try {
      const updatedTag = await Tag.findByIdAndUpdate(
        req.params.id,
        { description: req.body.description },
      )
        .exec();

      if (!updatedTag) return res.status(404).send({ message: `There is no tag with ID: ${req.params.id}` });

      return res.status(200).send({ message: "Tag updated successfully" });
    } catch (error) {
      return res.status(500).send({ message: 'Error updating tag' });
    }
  },
};

export {tagController};

const { isURL } = require('validator');
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Поле "link" должно быть валидным URL-адресом',
    },
  },

  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);

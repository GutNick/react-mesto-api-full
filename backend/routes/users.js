const { celebrate, Joi } = require('celebrate');
const routerUsers = require('express').Router();

const {
  getUserID,
  getUsers,
  updateProfileUser,
  updateAvatarUser,
  getUserAuth,
} = require('../controllers/users');

routerUsers.get('/users', getUsers);
routerUsers.get('/users/me', getUserAuth);

routerUsers.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUserID);

routerUsers.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfileUser);

routerUsers.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().min(10).max(300),
  }),
}), updateAvatarUser);

module.exports = routerUsers;

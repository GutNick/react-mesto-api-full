const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

const { NODE_ENV, JWT_SECRET = 'some-secret-key' } = process.env; // eslint-disable-line

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта (или пароль)'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные (почта или) пароль'));
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    })
      .then((user) => res.send({
        about: user.about,
        avatar: user.avatar,
        name: user.name,
        _id: user.id,
      })))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictError('такой пользователь уже зарегистрирован'));
      } else { next(err); }
    });
};

module.exports.getUserAuth = (req, res, next) => {
  User.findById(req.user._id)
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      } else {
        res.send({
          name: users.name,
          about: users.about,
          avatar: users.avatar,
          _id: users._id,
          email: users.email,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else { next(err); }
    });
};

module.exports.getUserID = (req, res, next) => {
  User.findById(req.params.id)
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      } else {
        res.send({
          about: users.about,
          avatar: users.avatar,
          name: users.name,
          _id: users.id,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else { next(err); }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.updateProfileUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({
      about: user.about,
      avatar: user.avatar,
      name: user.name,
      _id: user.id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else { next(err); }
    });
};

module.exports.updateAvatarUser = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({
      about: user.about,
      avatar: user.avatar,
      name: user.name,
      _id: user.id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара'));
      } else { next(err); }
    });
};

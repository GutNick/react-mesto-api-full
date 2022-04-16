const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (String(card.owner) === req.user._id) {
        Card.findByIdAndRemove(req.params.id)
          .then(() => {
            res.send({ message: 'Пост удален' });
          });
      } else {
        throw new ForbiddenError('Нельзя удалять чужую карточку');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else { next(err); }
    });
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  const likes = [];

  Card.create({
    name, link, owner, likes,
  })
    .then((card) => res.send({
      createdAt: card.createdAt,
      likes: card.likes,
      link: card.link,
      name: card.name,
      owner: card.owner,
      _id: card.id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else { next(err); }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      } else {
        res.send({
          createdAt: card.createdAt,
          likes: card.likes,
          link: card.link,
          name: card.name,
          owner: card.owner,
          _id: card.id,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else { next(err); }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      } else {
        res.send({
          createdAt: card.createdAt,
          likes: card.likes,
          link: card.link,
          name: card.name,
          owner: card.owner,
          _id: card.id,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else { next(err); }
    });
};

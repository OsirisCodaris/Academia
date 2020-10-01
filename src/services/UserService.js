const { Op } = require('sequelize')
const { Users } = require('../models')
const userUtils = require('../utils/UserUtils')

module.exports = {
  async create(req, res, next) {
    try {
      const userExist = await Users.findOne({
        where: {
          [Op.or]: [
            { fullname: req.body.user.fullname },
            { email: req.body.user.email },
          ],
        },
      })
      if (userExist) {
        // si une instance de cet utilisateur existe déja on renvoie une erreur
        if (await userUtils.UserRole(userExist)) {
          const errorMessage =
            userExist.fullname === req.body.user.fullname
              ? "Ce nom d'utilisateur"
              : 'Cet email'
          return res
            .status(400)
            .send({ error: `${errorMessage} existe déja`, status: 400 })
        }
        await userExist.destroy()
      }
      const user = await Users.create(req.body.user)
      req.user = user
      return next()
    } catch (err) {
      return res.status(500).send({
        error: `Une s'est produite sur le serveur !${err}`,
        status: 500,
      })
    }
  },
}
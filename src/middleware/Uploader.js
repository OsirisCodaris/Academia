const multer = require('multer')
const uploadBook = require('../config/multer').fields([
  { name: 'pathfile', maxCount: 1 },
  { name: 'answerfile', maxCount: 1 },
])

const error = {
  fields: 'LIMIT_UNEXPECTED_FILE',
  fileSize: 'LIMIT_FILE_SIZE',
}

module.exports = {
  docUpload(req, res, next) {
    uploadBook(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        switch (err.code) {
          case error.fields:
            return res.status(400).send({
              message: 'Pas de document envoyé',
            })
          case error.fileSize:
            return res.status(400).send({
              message:
                'La taille du fichier est trop grande (taille autorisée < 20 MB)',
            })
          default:
            return res.status(500).send({
              message:
                "Une erreur s'est produite lors du transfert des fichiers",
            })
        }
      } else if (err) {
        return res.status(400).send({
          message: err.message,
        })
      }
      // changement des valeur des variables cover et file en nouveaux nom enregistrer
      if (req.files) {
        req.body.pathfile = req.files.pathfile
          ? req.files.pathfile[0].filename
          : undefined
        req.body.answerfile = req.files.answerfile
          ? req.files.answerfile[0].filename
          : undefined
      }
      return next()
    })
  },
}

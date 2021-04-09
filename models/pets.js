const conexao = require('../infra/database/connection')
const upload = require('../infra/arquivos/upload')

class Pet {
  adiciona (pet, res) {
    const sql = 'INSERT INTO PETS SET ?'

    upload(pet.imagem, pet.nome, (error, path) => {
      if (error) {
        res.status(400).json({error})
      } else {
        pet.imagem = path
  
        conexao.query(sql, pet, (error) => {
          if (error) {
            res.status(400).json(error)
          } else {
            res.status(200).json(pet)
          }
        })
      }
    })
  }
}

module.exports = new Pet()
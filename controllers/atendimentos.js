const atendimento_model = require('../models/atendimentos')

module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    atendimento_model.lista()
      .then(lista => res.json(lista))
      .catch(error => res.status(400).json(error))
  })

  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    atendimento_model.busca_por_id(id)
      .then(atendimento => res.json(atendimento))
      .catch(error => res.status(400).json(error))
  })

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body

    atendimento_model.adiciona(atendimento)
      .then(atendimento => res.json(atendimento))
      .catch(error => res.status(400).json(error))
  })

  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const valores = req.body

    atendimento_model.altera(id, valores)
      .then(valores => res.json(valores))
      .catch(error => res.status(400).json(error))
  })

  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    atendimento_model.deleta(id)
      .then(id => res.json(id))
      .catch(error => res.status(400).json(error))
  })
}
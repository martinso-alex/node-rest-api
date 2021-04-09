const atendimento_model = require('../models/atendimentos')

module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    atendimento_model.lista(res)
  })

  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    atendimento_model.busca_por_id(id, res)
  })

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body

    atendimento_model.adiciona(atendimento, res)
  })

  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const valores = req.body

    atendimento_model.altera(id, valores, res)
  })

  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    atendimento_model.deleta(id, res)
  })
}

module.exports = app => {
  app.get('/atendimentos', (req, res) => res.send('GET /atendimentos'))

  app.post('/atendimentos', (req, res) => {
    console.log(req.body)
    res.send('POST /atendimentos')
  })
}
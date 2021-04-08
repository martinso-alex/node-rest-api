const customExpress = require('./configs/customExpress')
const conexao = require('./configs/connection')
const tabelas = require('./infra/tabelas')

conexao.connect(error => {
  if (error) {
    console.log(error)
  } else {
    const app = customExpress()
    
    console.log('conectado ao banco de dados')

    tabelas.init(conexao)
    app.listen(3000, () => console.log('server rodando na porta 3000'))
  }
})

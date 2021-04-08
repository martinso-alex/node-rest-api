const customExpress = require('./configs/customExpress')

const app = customExpress()

app.listen(3000, () => console.log('server rodando na porta 3000'))

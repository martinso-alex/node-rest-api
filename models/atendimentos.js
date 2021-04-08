const moment = require('moment')
const conexao = require('../configs/connection')

class Atendimento {
  adiciona (atendimento) {
    const data_criacao = moment().format('YYYY-MM-DD HH:MM:SS')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    
    atendimento.data_criacao = data_criacao
    atendimento.data = data
    
    const sql = 'INSERT INTO ATENDIMENTOS SET ?'

    conexao.query(sql, atendimento, (error, output) => {
       if (error) {
         console.log(error)
       } else {
         console.log(output)
       }
    })
  }
}

module.exports = new Atendimento()
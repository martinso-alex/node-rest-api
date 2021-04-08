const moment = require('moment')
const conexao = require('../configs/connection')

class Atendimento {
  adiciona (atendimento, res) {
    const data_criacao = moment().format('YYYY-MM-DD HH:MM:SS')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    
    const data_valida = moment(data).isSameOrAfter(data_criacao)
    const cliente_valido = atendimento.cliente.length >= 5

    const validacoes = [
      {
        nome: 'data',
        valido: data_valida,
        mensagem: "Data deve ser maior ou igual a data atual"
      },
      {
        nome: 'cliente',
        valido: cliente_valido,
        mensagem: "Cliente deve ter pelo menos cinco caracteres"
      }
    ]

    const erros = validacoes.filter(campo => !campo.valido)
    const existem_erros = erros.length

    if (existem_erros) {
      res.status(400).json(erros)
    } else {
      atendimento.data_criacao = data_criacao
      atendimento.data = data
      
      const sql = 'INSERT INTO ATENDIMENTOS SET ?'

      conexao.query(sql, atendimento, (error, output) => {
        if (error) {
          res.status(400).json(error)
        } else {
          res.status(201).json(output)
        }
      })
    }
  }
}

module.exports = new Atendimento()
const conexao = require('../configs/connection')
const moment = require('moment')
const axios = require('axios')

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
          res.status(201).json(atendimento)
        }
      })
    }
  }

  lista (res) {
    const sql = 'SELECT * FROM ATENDIMENTOS'

    conexao.query(sql, (error, output) => {
      if (error) {
        res.status(400).json(error)
      } else {
        res.status(200).json(output)
      }
    })
  }

  busca_por_id (id, res) {
    const sql = `SELECT * FROM ATENDIMENTOS WHERE ID=${id}`

    conexao.query(sql, async (error, output) => {
      if (error) {
        res.status(400).json(error)
      } else {
        const atendimento = output[0]
        const cpf = atendimento.CLIENTE
        const { data } = await axios.get(`http://localhost:8082/${cpf}`)

        atendimento.CLIENTE = data

        res.status(200).json(atendimento)
      }
    })
  }

  altera (id, valores, res) {
    const sql = 'UPDATE ATENDIMENTOS SET ? WHERE ID=?'

    if (valores.data) valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

    conexao.query(sql, [valores, id], (error, output) => {
      if (error) {
        res.status(400).json(error)
      } else {
        res.status(200).json({...valores, id})
      }
    })
  }

  deleta (id, res) {
    const sql = 'DELETE FROM ATENDIMENTOS WHERE ID=?'

    conexao.query(sql, id, (error, output) => {
      if (error) {
        res.status(400).json(error)
      } else {
        res.status(200).json({id})
      }
    })
  }
}

module.exports = new Atendimento()
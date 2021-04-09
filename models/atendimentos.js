const repositorio = require('../repositories/atendimentos')
const conexao = require('../infra/database/connection')
const moment = require('moment')
const axios = require('axios')

class Atendimento {
  constructor() {
    this.data_valida = ({data, data_criacao}) => moment(data).isSameOrAfter(data_criacao)
    this.cliente_valido = (cliente) => cliente.length >= 5

    this.valida = params => this.validacoes.filter(campo => !campo.valido(params[campo.nome]))

    this.validacoes = [
      {
        nome: 'data',
        valido: this.data_valida,
        mensagem: "Data deve ser maior ou igual a data atual"
      },
      {
        nome: 'cliente',
        valido: this.cliente_valido,
        mensagem: "Cliente deve ter pelo menos cinco caracteres"
      }
    ]
  }

  adiciona (atendimento) {
    const data_criacao = moment().format('YYYY-MM-DD HH:MM:SS')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    
    const params = {
      data: {data, data_criacao},
      cliente: atendimento.cliente
    }

    const erros = this.valida(params)
    const existem_erros = erros.length  

    if (existem_erros) {
      return Promise.reject(erros)
    } else {
      atendimento.data_criacao = data_criacao
      atendimento.data = data
      
      return repositorio.adiciona(atendimento)
        .then(res => {
          const id = res.insertId
          return {...atendimento, id}
        })
    }
  }

  lista () {
    return repositorio.lista()
  }

  busca_por_id (id) {
    return repositorio.busca_por_id(id)
      .then(async res => {
        const atendimento = res[0]
        const cpf = atendimento.CLIENTE
        const { data } = await axios.get(`http://localhost:8082/${cpf}`)
        atendimento.CLIENTE = data
        return atendimento
      })
  }

  altera (id, valores) {
    if (valores.data) valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

    return repositorio.altera(id, valores).then(() => ({...valores, id}))
  }

  deleta (id) {
    return repositorio.deleta(id).then(() => id)
  }
}

module.exports = new Atendimento()
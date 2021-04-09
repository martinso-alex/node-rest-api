const query = require('../infra/database/queries')

class Atendimento {
  adiciona (atendimento) {
    const sql = 'INSERT INTO ATENDIMENTOS SET ?'
    
    return query(sql, atendimento)
  }

  lista () {
    const sql = 'SELECT * FROM ATENDIMENTOS'

    return query(sql)
  }

  busca_por_id (id) {
    const sql = `SELECT * FROM ATENDIMENTOS WHERE ID=${id}`

    return query(sql, id)
  }

  altera (id, valores) {
    const sql = 'UPDATE ATENDIMENTOS SET ? WHERE ID=?'

    return query(sql, [valores, id])
  }

  deleta (id) {
    const sql = 'DELETE FROM ATENDIMENTOS WHERE ID=?'

    return query(sql, id)
  }
}

module.exports = new Atendimento()
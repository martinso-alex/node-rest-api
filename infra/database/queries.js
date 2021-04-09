  const connection = require('./connection')

  const executaQuery = (query, params = null) => {
    return new Promise((resolve, reject) => {
      connection.query(query, params, (error, output) => {
        if (error) reject(error)
        else resolve(output)
      })
    })
  }

  module.exports = executaQuery
  
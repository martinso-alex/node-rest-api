class Tabelas {
  init (conexao) {
    this.conexao = conexao

    this.criarAtendimentos()
    this.criarPets()
  }

  criarAtendimentos() {
    const sql = 
      `CREATE TABLE IF NOT EXISTS ATENDIMENTOS 
        ( 
          ID INT NOT NULL AUTO_INCREMENT,
          CLIENTE VARCHAR(50) NOT NULL,
          PET VARCHAR(20),
          SERVICO VARCHAR(20) NOT NULL, 
          DATA DATETIME NOT NULL, 
          DATA_CRIACAO DATETIME NOT NULL, 
          STATUS VARCHAR(20) NOT NULL,
          OBSERVACOES TEXT,
          PRIMARY KEY(ID)
        )`

    this.conexao.query(sql, error => {
      if (error) {
        console.log(error)
      } else {
        console.log('Tabela ATENDIMENTOS criada')
      }
    })
  }

  criarPets() {
    const sql =
     `CREATE TABLE IF NOT EXISTS PETS
        (
          ID INT NOT NULL AUTO_INCREMENT,
          NOME VARCHAR(50),
          IMAGEM VARCHAR(200),
          PRIMARY KEY(ID)
        )`

    this.conexao.query(sql, error => {
      if (error) {
        console.log(error)
      } else {
        console.log('Tabela PETS criada')
      }
    })
  }
}

module.exports = new Tabelas()
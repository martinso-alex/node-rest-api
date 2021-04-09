const fs = require('fs')
const path = require('path')

module.exports = (read_path, file, callback) => {
  const valid_types = ['.jpg', '.jpeg', '.png']
  const type = path.extname(read_path)
  const is_type_valid = valid_types.indexOf(type) !== -1

  if (!is_type_valid) {
    const error = 'tipo de imagem invalido'
    callback (error)
  } else {
    const write_path = `./assets/img/${file}${type}`
  
    fs.createReadStream(read_path)
      .pipe(fs.createWriteStream(write_path))
      .on('finish', () => callback(false, write_path))
  }

}

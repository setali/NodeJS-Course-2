import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3302,
  user: 'root',
  password: '123456',
  database: 'blog'
})

connection.connect()

export class BaseModel {
  constructor ({ id, ...params }) {
    this.id = id

    this.fieldNames.forEach(field => {
      this[field] = params[field]
    })
  }

  get fields () {
    return this.constructor.fields
  }

  get fieldNames () {
    return this.fields.map(field => field.name)
  }

  get entityName () {
    return this.constructor.entityName
  }

  save () {
    const q = this.id
      ? `UPDATE ${this.entityName} SET ${this.fieldNames
          .map(
            name =>
              `${name} = ${
                this[name] === undefined ? 'NULL' : `'${this[name]}'`
              }`
          )
          .join(', ')} WHERE id = ${this.id}`
      : `INSERT INTO ${this.entityName} (${this.fieldNames.join(
          ', '
        )}) VALUES (${this.fieldNames
          .map(name => (this[name] === undefined ? 'NULL' : `'${this[name]}'`))
          .join(', ')})`

    return query(q)
  }

  generateId () {
    return Date.now()
  }

  static findAll () {
    return query(`SELECT * FROM ${this.entityName}`)
  }

  static async find (id) {
    const data = await query(
      `SELECT * FROM ${this.entityName} WHERE id = ${id}`
    )

    return data[0] ? new this(data[0]) : undefined
  }

  static remove (id) {
    return query(`DELETE FROM ${this.entityName} WHERE id = ${id}`)
  }

  remove () {
    if (this.id) {
      return this.constructor.remove(this.id)
    }
  }
}

function query (q) {
  return new Promise((resolve, reject) => {
    connection.query(q, (err, results) => {
      err ? reject(err) : resolve(results)
    })
  })
}

export function create (Entity) {
  query(`SHOW TABLES LIKE '${Entity.entityName}'`).then(results => {
    if (results.length === 0) {
      query(`CREATE TABLE IF NOT EXISTS ${Entity.entityName}
        (id INT NOT NULL AUTO_INCREMENT, 
          ${Entity.fields
            .map(
              field =>
                `${field.name} ${field.type} ${
                  field.nullable ? '' : 'NOT NULL'
                }`
            )
            .join(', ')},
          PRIMARY KEY (id)
          );
      `).then(() => console.log(`${Entity.entityName} table created.`))
    }
  })

  return Entity
}

import fs from 'fs'
import path from 'path'

const store = {}

export class BaseModel {
  constructor ({ id, ...params }) {
    this.id = id

    this.fields.forEach(field => {
      this[field] = params[field]
    })
  }

  get fields () {
    return this.constructor.fields
  }

  get entityName () {
    return this.constructor.entityName
  }

  static get data () {
    return getData(this.entityName)
  }

  get data () {
    return getData(this.entityName)
  }

  save () {
    const data = this.data

    if (this.id) {
      const entity = data.find(el => el.id === this.id)

      this.fields.forEach(field => {
        entity[field] = this[field]
      })
    } else {
      const entity = {
        id: this.generateId()
      }

      this.fields.forEach(field => {
        entity[field] = this[field]
      })

      data.push(entity)
    }

    saveData(this.entityName, data)
  }

  generateId () {
    return Date.now()
  }

  static findAll () {
    return this.data
  }

  static find (id) {
    const data = this.data.find(el => el.id === id)

    return data ? new this(data) : undefined
  }

  static remove (id) {
    const data = this.data
    const index = data.findIndex(el => el.id === id)

    if (index >= 0) {
      data.splice(index, 1)
      saveData(this.entityName, data)
    }
  }

  remove () {
    if (this.id) {
      this.constructor.remove(this.id)
    }
  }
}

export function create (Entity) {
  const filePath = getFilePath(Entity.entityName)

  if (!fs.existsSync(filePath)) {
    saveData(Entity.entityName, [])
  }

  return Entity
}

function getFilePath (entityName) {
  return path.resolve(__dirname, `${entityName}.data`)
}

function getData (entityName) {
  const filePath = getFilePath(entityName)

  const data = fs.readFileSync(filePath)

  return JSON.parse(data)
}

function saveData (entityName, data) {
  const filePath = getFilePath(entityName)

  fs.writeFileSync(filePath, JSON.stringify(data))
}

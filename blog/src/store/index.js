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
    return store[this.entityName]
  }

  get data () {
    return store[this.entityName]
  }

  save () {
    if (this.id) {
      const entity = this.data.find(el => el.id === this.id)

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

      this.data.push(entity)
    }
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
    const index = this.data.findIndex(el => el.id === id)

    if (index >= 0) {
      this.data.splice(index, 1)
    }
  }

  remove () {
    if (this.id) {
      this.constructor.remove(this.id)
    }
  }
}

export function create (Entity) {
  if (!store[Entity.entityName]) {
    store[Entity.entityName] = []
  }

  return Entity
}

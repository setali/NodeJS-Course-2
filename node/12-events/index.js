const myEvent = require('./my-event')
require('./event-handler')

setTimeout(() => {
  myEvent.emit('hello', 'ali', 'mousavi')
}, 2000)

setTimeout(() => {
  myEvent.emit('pow', 4, 5)
}, 3000)

setTimeout(() => {
  myEvent.emit('mul', 2, 3, 4, 5)
}, 4000)


DATABASE_URL = 'localhost'
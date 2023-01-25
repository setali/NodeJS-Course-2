const userList = document.getElementById('users')
const messageListWrapper = document.getElementById('message-list-wrapper')
const form = document.getElementById('chat-form')
const input = document.getElementById('chat-input')

const socket = io()

let user, selectedUser

socket.on('user_connected', data => {
  console.log(data)
  user = data
})

socket.on('message', data => {
  printMessage(data)
})

getPersons().then(persons => {
  persons.forEach(person => createUserChat(person))
})

function getPersons () {
  return fetch('/api/person').then(response => response.json())
}

form.addEventListener('submit', event => {
  event.preventDefault()

  if (!input.value) {
    return
  }

  if (!selectedUser) {
    return alert('Please select a user for start chatting.')
  }

  socket.emit('message', {
    message: input.value,
    from: user.id,
    to: selectedUser.id
  })

  input.value = ''
  input.focus()
})

function createUserChat (person) {
  const userWrapper = document.createElement('div')
  userWrapper.textContent = person.username
  userWrapper.addEventListener('click', event => {
    selectedUser = person

    document.querySelector('#users > .active')?.classList.remove('active')
    document.querySelector('.message-list.active')?.classList.remove('active')

    event.target.classList.add('active')
    const messages = document.getElementById(`messages-${person.id}`)
    messages.classList.add('active')

    loadMessage(messages)
  })

  users.appendChild(userWrapper)

  const messageWrapper = document.createElement('div')
  messageWrapper.setAttribute('id', `messages-${person.id}`)
  messageWrapper.classList.add('message-list')

  messageWrapper.addEventListener('scroll', event => {
    const element = event.target
    if (element.scrollTop === 0) {
      loadMessageByScroll(element)
    }
  })

  messageListWrapper.appendChild(messageWrapper)
}

function printMessage (data, type = 'append', scrollElement) {
  const message = document.createElement('div')
  message.classList.add('message')

  const text = document.createElement('div')
  text.textContent = data.message

  const time = document.createElement('div')
  time.textContent = data.createdAt
  time.classList.add('time')

  message.appendChild(text)
  message.appendChild(time)

  message.setAttribute('message-id', data.id)

  if (data.from === user.id) {
    message.classList.add('owner')
  }

  const elementId = user.id === data.from ? data.to : data.from

  const messages = document.getElementById(`messages-${elementId}`)

  if (type === 'append') {
    messages.appendChild(message)
  } else {
    messages.prepend(message)
  }

  if (scrollElement) {
    scrollElement.scrollIntoView()
  } else {
    message.scrollIntoView()
  }
}

function loadMessage (messageWrapper) {
  if (messageWrapper.childNodes.length) return

  getMessages().then(messages => {
    messages.forEach(message =>
      printMessage(message, 'prepend', messageWrapper.lastChild)
    )
  })
}

function loadMessageByScroll (messageWrapper) {
  const { firstChild } = messageWrapper
  const messageId = firstChild.getAttribute('message-id')

  getMessages({ messageId }).then(messages => {
    messages.forEach(message => printMessage(message, 'prepend', firstChild))
  })
}

function getMessages (options) {
  const url =
    `/api/message?` +
    new URLSearchParams({
      selectedUser: selectedUser.id,
      ...options
    })

  return fetch(url).then(res => res.json())
}

import '../src/config/loadTestEnv'
import supertest from 'supertest'
import { bootstrap } from '../src/app'
import { redisClient } from '../src/config/redis'
import { logger, mongoTransport } from '../src/utils/logger'
import User from '../src/models/user'
import Article from '../src/models/article'
import { Op } from 'sequelize'

let request, user, article

const fakeUser = {
  username: 'ali',
  email: 'ali@gmail.com',
  password: '123'
}

const fakeArticle = {
  title: 'Article title',
  text: 'Article text',
  image: 'Article image'
}

beforeAll(async () => {
  const server = await bootstrap()
  request = supertest(server)

  await request.post('/register').send(fakeUser)

  const response = await request
    .post('/api/login')
    .send({ username: fakeUser.username, password: fakeUser.password })

  user = response.body

  await User.update(
    { role: 'ADMIN' },
    { where: { username: fakeUser.username } }
  )
})

afterAll(async () => {
  await User.destroy({ where: { username: fakeUser.username } })

  await Article.destroy({ where: { id: { [Op.gt]: 0 } } })

  await redisClient.disconnect()

  logger.clear()
  logger.remove(mongoTransport)
})

describe('Admin article api', () => {
  test('list article 401', async () => {
    const response = await request.get('/api/admin/article')
    expect(response.statusCode).toBe(401)
  })

  test('list article 200', async () => {
    const response = await request
      .get('/api/admin/article')
      .set('Authorization', `Bearer ${user.token}`)
    expect(response.statusCode).toBe(200)
  })

  test('create article', async () => {
    const response = await request
      .post('/api/admin/article')
      .set('Authorization', `Bearer ${user.token}`)
      .send(fakeArticle)

    article = response.body

    expect(response.statusCode).toBe(200)

    checkArticle(article)
  })

  test('get article', async () => {
    const response = await request
      .get(`/api/admin/article/${article.id}`)
      .set('Authorization', `Bearer ${user.token}`)

    expect(response.statusCode).toBe(200)

    checkArticle(article)
  })

  test('update article', async () => {
    const response = await request
      .put(`/api/admin/article/${article.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .send({ ...article, title: 'New article', text: 'New text' })

    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe('New article')
    expect(response.body.text).toBe('New text')
  })

  test('delete article', async () => {
    const response = await request
      .delete(`/api/admin/article/${article.id}`)
      .set('Authorization', `Bearer ${user.token}`)

    expect(response.statusCode).toBe(200)
  })

  test('get deleted article', async () => {
    const response = await request
      .get(`/api/admin/article/${article.id}`)
      .set('Authorization', `Bearer ${user.token}`)

    expect(response.statusCode).toBe(404)
  })
})

function checkArticle (article) {
  expect(article.title).toBe(fakeArticle.title)
  expect(article.text).toBe(fakeArticle.text)
  expect(article.image).toBe(fakeArticle.image)
  expect(article).toHaveProperty('id')
}

const user = require('../handlers/user')
const article = require('../handlers/article')
const api = require('../handlers/api')
const pre = require('../handlers/pre')

module.exports = function (router) {
  router.post('/post', article.post)
  router.post('/update', article.update)
  router.post('/upload', article.upload)
  router.post('/delete', article.delete)
  router.get('/find', article.find)
  
  router.options('*', pre.options)
  
  router.post('/login', user.login)
  router.post('/logout', user.logout)
  router.post('/register', user.register)
  router.get('/query', user.query)
  
  router.get('/api/hotnews', api.hotNews)
  router.get('/api/search', api.search)
  router.get('/api/answer', api.answer)
  router.get('/api/comment', api.comment)
  router.get('/api/agent', api.agent)

  return router
}
import db from '@/persistence'

import lodashId from 'lodash-id'

db._.mixin(lodashId)

db.defaults({
  posts: []
}).write()

export default {
  get () {
    console.log(`${JSON.stringify(db.getState())}`)
  },
  saveNewPost (newPost) {
    db
      .get('posts')
      .insert(newPost)
      .write()
  },
  getPost (postId) {
    return db
      .get('posts')
      .getById(postId)
      .value()
  },
  getList () {
    return db
      .get('projects')
      .map((item) => (
        {
          id: item.id,
          name: item.name,
          path: item.path
        }
      ))
      .value()
  },
  removeProject (projectId) {
    db
      .get('projects')
      .remove({id: projectId})
      .write()
  }
}

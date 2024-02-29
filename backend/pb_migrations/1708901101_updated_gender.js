/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mt35gax0jybgwih")

  collection.name = "Gender"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mt35gax0jybgwih")

  collection.name = "gender"

  return dao.saveCollection(collection)
})

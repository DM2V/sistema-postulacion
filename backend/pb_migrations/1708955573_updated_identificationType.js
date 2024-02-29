/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dd2rrfnne5kqiu7")

  collection.name = "IdentificationType"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dd2rrfnne5kqiu7")

  collection.name = "identificationType"

  return dao.saveCollection(collection)
})

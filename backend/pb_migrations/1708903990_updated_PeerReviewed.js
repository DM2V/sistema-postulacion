/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("df6r0633e0vt7xx")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("df6r0633e0vt7xx")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})

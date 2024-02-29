/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wvn9d6wp8h4no5j")

  collection.createRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wvn9d6wp8h4no5j")

  collection.createRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})

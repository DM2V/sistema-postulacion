/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4omg7lykrcvuq86")

  collection.listRule = ""
  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4omg7lykrcvuq86")

  collection.listRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})

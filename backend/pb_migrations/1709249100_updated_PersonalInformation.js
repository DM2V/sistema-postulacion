/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t5iuu12g6ybf224")

  collection.name = "HomeAddress"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t5iuu12g6ybf224")

  collection.name = "PersonalInformation"

  return dao.saveCollection(collection)
})

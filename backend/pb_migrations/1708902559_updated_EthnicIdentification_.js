/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7w47i13pkww2u0j")

  collection.name = "EthnicIdentification"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7w47i13pkww2u0j")

  collection.name = "EthnicIdentification_"

  return dao.saveCollection(collection)
})

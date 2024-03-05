/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tb7v77k6xzmdvem")

  collection.listRule = "@request.auth.role != \"candidate\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tb7v77k6xzmdvem")

  collection.listRule = "@request.auth.role != \"evaluator\""

  return dao.saveCollection(collection)
})

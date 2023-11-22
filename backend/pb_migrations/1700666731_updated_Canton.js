/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p04n31ddvdic7cl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9bbtywc5",
    "name": "field",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "3ucsaqhpqfrjxp4",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p04n31ddvdic7cl")

  // remove
  collection.schema.removeField("9bbtywc5")

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wvn9d6wp8h4no5j")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f62ataxv",
    "name": "homeAddress",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "t5iuu12g6ybf224",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wvn9d6wp8h4no5j")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f62ataxv",
    "name": "personalInformation",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "t5iuu12g6ybf224",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})

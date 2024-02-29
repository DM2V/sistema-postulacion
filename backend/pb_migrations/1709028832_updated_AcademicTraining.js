/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shooy4evthtntg0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a1jvgsoo",
    "name": "senescytRegistrationDate",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shooy4evthtntg0")

  // remove
  collection.schema.removeField("a1jvgsoo")

  return dao.saveCollection(collection)
})

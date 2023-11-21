/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wvn9d6wp8h4no5j")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "idm3ynqe",
    "name": "emergencyContact",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ddtgdnwvvbb78v2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4n1wgzuy",
    "name": "academicTraining",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "shooy4evthtntg0",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6tpyd5bz",
    "name": "languages",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "lsdwjudfij7rk5z",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "degtu2jx",
    "name": "publications",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "om53vgf9xk0i73h",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bgwztit8",
    "name": "trainings",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "0cglimm7kisqh3h",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bu2d4z4a",
    "name": "professionalExperience",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "n1ajbde3zrqqe1d",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bi9o7vup",
    "name": "extraPoints",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "p942lmz8z26mz92",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q4qvhgqh",
    "name": "postulacionDocument",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "usvdmjhns576x4q",
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

  // remove
  collection.schema.removeField("idm3ynqe")

  // remove
  collection.schema.removeField("4n1wgzuy")

  // remove
  collection.schema.removeField("6tpyd5bz")

  // remove
  collection.schema.removeField("degtu2jx")

  // remove
  collection.schema.removeField("bgwztit8")

  // remove
  collection.schema.removeField("bu2d4z4a")

  // remove
  collection.schema.removeField("bi9o7vup")

  // remove
  collection.schema.removeField("q4qvhgqh")

  return dao.saveCollection(collection)
})

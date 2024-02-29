/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "xxvrgsb80vuhsin",
    "created": "2024-02-25 23:08:16.279Z",
    "updated": "2024-02-25 23:08:16.279Z",
    "name": "BloodType",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lomts4xq",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("xxvrgsb80vuhsin");

  return dao.deleteCollection(collection);
})

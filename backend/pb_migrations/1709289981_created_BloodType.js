/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "xxvrgsb80vuhsin",
    "created": "2024-03-01 10:46:21.212Z",
    "updated": "2024-03-01 10:46:21.212Z",
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
    "listRule": "",
    "viewRule": "",
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

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "vp9zxca9sduyf48",
    "created": "2024-01-27 19:06:21.796Z",
    "updated": "2024-01-27 19:06:21.796Z",
    "name": "SpecificField",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mvvxshgm",
        "name": "name",
        "type": "text",
        "required": true,
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
  const collection = dao.findCollectionByNameOrId("vp9zxca9sduyf48");

  return dao.deleteCollection(collection);
})

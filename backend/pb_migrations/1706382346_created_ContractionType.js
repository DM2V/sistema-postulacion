/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "fw85pl7g225er0h",
    "created": "2024-01-27 19:05:46.027Z",
    "updated": "2024-01-27 19:05:46.027Z",
    "name": "ContractionType",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sgwnnmmt",
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
  const collection = dao.findCollectionByNameOrId("fw85pl7g225er0h");

  return dao.deleteCollection(collection);
})

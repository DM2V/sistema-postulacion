/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "p04n31ddvdic7cl",
    "created": "2023-11-22 15:23:32.085Z",
    "updated": "2023-11-22 15:23:32.085Z",
    "name": "Canton",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lzj3ebap",
        "name": "canton",
        "type": "text",
        "required": true,
        "presentable": true,
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
  const collection = dao.findCollectionByNameOrId("p04n31ddvdic7cl");

  return dao.deleteCollection(collection);
})

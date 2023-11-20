/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("a4l6x3r4r3xlamv");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "a4l6x3r4r3xlamv",
    "created": "2023-11-20 17:38:01.449Z",
    "updated": "2023-11-20 17:38:01.449Z",
    "name": "ff",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "eecaqn8o",
        "name": "pais",
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
})

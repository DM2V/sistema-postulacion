/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "3ucsaqhpqfrjxp4",
    "created": "2023-11-22 15:21:05.130Z",
    "updated": "2023-11-22 15:21:05.130Z",
    "name": "Province",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sqfxzeag",
        "name": "province",
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
  const collection = dao.findCollectionByNameOrId("3ucsaqhpqfrjxp4");

  return dao.deleteCollection(collection);
})

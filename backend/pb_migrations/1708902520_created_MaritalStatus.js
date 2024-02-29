/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "s8121ew23eo9r76",
    "created": "2024-02-25 23:08:40.692Z",
    "updated": "2024-02-25 23:08:40.692Z",
    "name": "MaritalStatus",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "n9gknt6f",
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
  const collection = dao.findCollectionByNameOrId("s8121ew23eo9r76");

  return dao.deleteCollection(collection);
})

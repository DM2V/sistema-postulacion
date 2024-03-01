/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "s8121ew23eo9r76",
    "created": "2024-03-01 10:46:21.211Z",
    "updated": "2024-03-01 10:46:21.211Z",
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
  const collection = dao.findCollectionByNameOrId("s8121ew23eo9r76");

  return dao.deleteCollection(collection);
})

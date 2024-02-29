/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "yvkwgw5dazk85vk",
    "created": "2024-01-27 19:08:22.863Z",
    "updated": "2024-01-27 19:08:22.863Z",
    "name": "Activity",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qnqeexdr",
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
  const collection = dao.findCollectionByNameOrId("yvkwgw5dazk85vk");

  return dao.deleteCollection(collection);
})

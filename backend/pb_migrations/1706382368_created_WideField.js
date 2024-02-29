/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mqgtxsa9s4rghm1",
    "created": "2024-01-27 19:06:08.460Z",
    "updated": "2024-01-27 19:06:08.460Z",
    "name": "WideField",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "77a9ugmy",
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
  const collection = dao.findCollectionByNameOrId("mqgtxsa9s4rghm1");

  return dao.deleteCollection(collection);
})

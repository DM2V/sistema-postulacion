/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("xvjjoaedvvpjgw8");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "xvjjoaedvvpjgw8",
    "created": "2024-02-25 22:57:49.502Z",
    "updated": "2024-02-25 23:33:04.268Z",
    "name": "Participation",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "9nog3dkz",
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
})

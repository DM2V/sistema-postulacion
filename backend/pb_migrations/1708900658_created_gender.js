/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mt35gax0jybgwih",
    "created": "2024-02-25 22:37:38.168Z",
    "updated": "2024-02-25 22:37:38.168Z",
    "name": "gender",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "eutyoto3",
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
  const collection = dao.findCollectionByNameOrId("mt35gax0jybgwih");

  return dao.deleteCollection(collection);
})

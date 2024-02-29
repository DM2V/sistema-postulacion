/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("mt35gax0jybgwih");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "mt35gax0jybgwih",
    "created": "2024-02-25 22:37:38.168Z",
    "updated": "2024-02-25 23:30:27.398Z",
    "name": "Gender",
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
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("w1mqk6zgikwbab4");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "w1mqk6zgikwbab4",
    "created": "2024-05-12 19:05:50.373Z",
    "updated": "2024-05-12 19:08:19.531Z",
    "name": "hola",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "16iouqa5",
        "name": "field",
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
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})

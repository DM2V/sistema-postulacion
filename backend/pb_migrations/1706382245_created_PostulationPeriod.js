/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "m7sbcal6rtz6ovc",
    "created": "2024-01-27 19:04:05.916Z",
    "updated": "2024-01-27 19:04:05.916Z",
    "name": "PostulationPeriod",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "9q4ldf1q",
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
  const collection = dao.findCollectionByNameOrId("m7sbcal6rtz6ovc");

  return dao.deleteCollection(collection);
})

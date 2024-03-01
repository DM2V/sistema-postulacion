/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "2upf7isq0sq105u",
    "created": "2024-03-01 10:46:21.210Z",
    "updated": "2024-03-01 10:46:21.210Z",
    "name": "DisabilityType",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bc36rl7m",
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
  const collection = dao.findCollectionByNameOrId("2upf7isq0sq105u");

  return dao.deleteCollection(collection);
})

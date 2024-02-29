/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "2upf7isq0sq105u",
    "created": "2024-02-25 23:03:01.777Z",
    "updated": "2024-02-25 23:03:01.777Z",
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
  const collection = dao.findCollectionByNameOrId("2upf7isq0sq105u");

  return dao.deleteCollection(collection);
})

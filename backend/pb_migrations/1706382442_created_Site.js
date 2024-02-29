/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "71b8voyi84mxrpe",
    "created": "2024-01-27 19:07:22.957Z",
    "updated": "2024-01-27 19:07:22.957Z",
    "name": "Site",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "brilman3",
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
  const collection = dao.findCollectionByNameOrId("71b8voyi84mxrpe");

  return dao.deleteCollection(collection);
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "3ffsdxkus3rmle5",
    "created": "2024-03-01 10:46:21.211Z",
    "updated": "2024-03-01 10:46:21.211Z",
    "name": "InstitutionType",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lcp5obyv",
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
  const collection = dao.findCollectionByNameOrId("3ffsdxkus3rmle5");

  return dao.deleteCollection(collection);
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3ffsdxkus3rmle5");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "3ffsdxkus3rmle5",
    "created": "2024-02-25 22:54:40.831Z",
    "updated": "2024-02-25 23:32:43.249Z",
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
})

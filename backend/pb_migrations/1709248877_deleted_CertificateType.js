/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("snsh3kw87m7z4ab");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "snsh3kw87m7z4ab",
    "created": "2024-02-25 22:47:54.075Z",
    "updated": "2024-02-29 02:52:36.095Z",
    "name": "CertificateType",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "d8rjpala",
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
    "createRule": "",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})

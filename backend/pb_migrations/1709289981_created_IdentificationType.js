/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "dd2rrfnne5kqiu7",
    "created": "2024-03-01 10:46:21.213Z",
    "updated": "2024-03-01 10:46:21.213Z",
    "name": "IdentificationType",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gz2gf4gp",
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
  const collection = dao.findCollectionByNameOrId("dd2rrfnne5kqiu7");

  return dao.deleteCollection(collection);
})

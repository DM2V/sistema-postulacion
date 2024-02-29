/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dd2rrfnne5kqiu7");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "dd2rrfnne5kqiu7",
    "created": "2024-02-26 13:49:39.860Z",
    "updated": "2024-02-26 13:52:53.016Z",
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
})

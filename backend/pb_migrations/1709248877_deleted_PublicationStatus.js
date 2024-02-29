/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("fcfqsujhqimumko");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "fcfqsujhqimumko",
    "created": "2024-02-25 22:58:38.359Z",
    "updated": "2024-02-28 06:49:25.875Z",
    "name": "PublicationStatus",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ibckdkxl",
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

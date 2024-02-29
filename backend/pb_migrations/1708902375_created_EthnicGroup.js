/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "itptz71i2fosns8",
    "created": "2024-02-25 23:06:15.986Z",
    "updated": "2024-02-25 23:06:15.986Z",
    "name": "EthnicGroup",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "uk2kbbsp",
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
  const collection = dao.findCollectionByNameOrId("itptz71i2fosns8");

  return dao.deleteCollection(collection);
})

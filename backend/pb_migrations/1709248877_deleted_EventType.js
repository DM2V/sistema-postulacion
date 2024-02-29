/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("bz75y0zodk5rtne");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "bz75y0zodk5rtne",
    "created": "2024-02-25 22:40:12.588Z",
    "updated": "2024-02-25 23:32:32.546Z",
    "name": "EventType",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ukqbbfji",
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

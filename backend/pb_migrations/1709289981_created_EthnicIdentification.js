/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "7w47i13pkww2u0j",
    "created": "2024-03-01 10:46:21.211Z",
    "updated": "2024-03-01 10:46:21.211Z",
    "name": "EthnicIdentification",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5nlfvdrd",
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
  const collection = dao.findCollectionByNameOrId("7w47i13pkww2u0j");

  return dao.deleteCollection(collection);
})

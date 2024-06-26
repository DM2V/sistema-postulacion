/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mre53i3tophprmm",
    "created": "2024-03-03 06:16:48.963Z",
    "updated": "2024-03-03 06:16:48.963Z",
    "name": "EmergencyContactData",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2eosrvpj",
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
  const collection = dao.findCollectionByNameOrId("mre53i3tophprmm");

  return dao.deleteCollection(collection);
})

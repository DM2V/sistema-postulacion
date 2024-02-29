/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "hheqo8awrckngg6",
    "created": "2024-01-27 19:07:38.646Z",
    "updated": "2024-01-27 19:07:38.646Z",
    "name": "Department",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6mt8fykq",
        "name": "name",
        "type": "text",
        "required": true,
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
  const collection = dao.findCollectionByNameOrId("hheqo8awrckngg6");

  return dao.deleteCollection(collection);
})

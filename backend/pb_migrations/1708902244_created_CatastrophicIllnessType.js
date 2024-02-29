/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "uhvcj0ltfcgyl6o",
    "created": "2024-02-25 23:04:04.653Z",
    "updated": "2024-02-25 23:04:04.653Z",
    "name": "CatastrophicIllnessType",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7qughae2",
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
  const collection = dao.findCollectionByNameOrId("uhvcj0ltfcgyl6o");

  return dao.deleteCollection(collection);
})

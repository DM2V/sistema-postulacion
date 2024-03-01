/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "uhvcj0ltfcgyl6o",
    "created": "2024-03-01 10:46:21.212Z",
    "updated": "2024-03-01 10:46:21.212Z",
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
  const collection = dao.findCollectionByNameOrId("uhvcj0ltfcgyl6o");

  return dao.deleteCollection(collection);
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "4omg7lykrcvuq86",
    "created": "2023-11-20 18:02:36.647Z",
    "updated": "2023-11-20 18:02:36.647Z",
    "name": "Country",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mmimqezj",
        "name": "CODIGO",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "8nktcwaq",
        "name": "DESCRIPCION",
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
  const collection = dao.findCollectionByNameOrId("4omg7lykrcvuq86");

  return dao.deleteCollection(collection);
})

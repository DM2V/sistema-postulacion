/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "uhlsa9dyv5baxku",
    "created": "2023-11-22 15:29:31.509Z",
    "updated": "2023-11-22 15:29:31.509Z",
    "name": "Parish",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gzwp0ler",
        "name": "parish",
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
        "id": "vfzfx3fl",
        "name": "canton",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "p04n31ddvdic7cl",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
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
  const collection = dao.findCollectionByNameOrId("uhlsa9dyv5baxku");

  return dao.deleteCollection(collection);
})

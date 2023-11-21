/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "wvn9d6wp8h4no5j",
    "created": "2023-11-20 17:14:30.553Z",
    "updated": "2023-11-20 17:14:30.553Z",
    "name": "CV",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "shfybwom",
        "name": "personalData",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "a7upmrm44olwz6l",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "f62ataxv",
        "name": "personalInformation",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "t5iuu12g6ybf224",
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
  const collection = dao.findCollectionByNameOrId("wvn9d6wp8h4no5j");

  return dao.deleteCollection(collection);
})

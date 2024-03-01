/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "l4cblqiyibym7eq",
    "created": "2024-03-01 10:46:21.212Z",
    "updated": "2024-03-01 10:46:21.212Z",
    "name": "ReasonJobExit",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nmwp3f9k",
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
  const collection = dao.findCollectionByNameOrId("l4cblqiyibym7eq");

  return dao.deleteCollection(collection);
})

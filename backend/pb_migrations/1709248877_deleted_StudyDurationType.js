/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("r4p9lk7jxpyfdap");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "r4p9lk7jxpyfdap",
    "created": "2024-02-25 22:49:35.541Z",
    "updated": "2024-02-27 08:50:24.334Z",
    "name": "StudyDurationType",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "q4wzldqt",
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

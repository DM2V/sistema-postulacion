/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "r4p9lk7jxpyfdap",
    "created": "2024-02-25 22:49:35.541Z",
    "updated": "2024-02-25 22:49:35.541Z",
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
  const collection = dao.findCollectionByNameOrId("r4p9lk7jxpyfdap");

  return dao.deleteCollection(collection);
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "fqleyuibmih8kci",
    "created": "2024-02-25 22:57:28.285Z",
    "updated": "2024-02-25 22:57:28.285Z",
    "name": "ResearchType",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4p6nzkb5",
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
  const collection = dao.findCollectionByNameOrId("fqleyuibmih8kci");

  return dao.deleteCollection(collection);
})

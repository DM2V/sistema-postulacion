/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "afz8i2o544snv9t",
    "created": "2024-02-25 22:49:25.495Z",
    "updated": "2024-02-25 22:49:25.495Z",
    "name": "EducationLevel",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "y5jvfp1u",
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
  const collection = dao.findCollectionByNameOrId("afz8i2o544snv9t");

  return dao.deleteCollection(collection);
})

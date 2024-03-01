/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "afz8i2o544snv9t",
    "created": "2024-03-01 10:46:21.210Z",
    "updated": "2024-03-01 10:46:21.210Z",
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
  const collection = dao.findCollectionByNameOrId("afz8i2o544snv9t");

  return dao.deleteCollection(collection);
})

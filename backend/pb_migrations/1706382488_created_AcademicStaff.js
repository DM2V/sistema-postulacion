/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "66v001qjup5oprc",
    "created": "2024-01-27 19:08:08.623Z",
    "updated": "2024-01-27 19:08:08.623Z",
    "name": "AcademicStaff",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tfzoslue",
        "name": "name",
        "type": "text",
        "required": true,
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
  const collection = dao.findCollectionByNameOrId("66v001qjup5oprc");

  return dao.deleteCollection(collection);
})

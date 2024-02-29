/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3cpxc70hw6wwl5k");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "3cpxc70hw6wwl5k",
    "created": "2024-02-25 22:52:14.717Z",
    "updated": "2024-02-25 23:32:16.928Z",
    "name": "EmploymentModality",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bpbkzzki",
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

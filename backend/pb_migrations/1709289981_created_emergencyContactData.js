/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "wtg8rni23p77gac",
    "created": "2024-03-01 10:46:21.212Z",
    "updated": "2024-03-01 10:46:21.212Z",
    "name": "emergencyContactData",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4onbip4f",
        "name": "relationship",
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
  const collection = dao.findCollectionByNameOrId("wtg8rni23p77gac");

  return dao.deleteCollection(collection);
})

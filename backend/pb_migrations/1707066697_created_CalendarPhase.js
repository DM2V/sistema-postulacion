/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "2eufqt7afnphmxa",
    "created": "2024-02-04 17:11:37.921Z",
    "updated": "2024-02-04 17:11:37.921Z",
    "name": "CalendarPhase",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tgk05ugf",
        "name": "activity",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "qadx10pd",
        "name": "start",
        "type": "date",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "lxzwsnuc",
        "name": "end",
        "type": "date",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2eufqt7afnphmxa");

  return dao.deleteCollection(collection);
})

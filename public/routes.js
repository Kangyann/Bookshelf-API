const {
  storeDataHandler,
  indexDataHandler,
  showDataHandler,
  updateDataHandler,
  deleteDataHandler,
} = require("./index");
const routes = [
  {
    path: "/books",
    method: "GET",
    handler: indexDataHandler,
  },
  {
    path: "/books",
    method: "POST",
    handler: storeDataHandler,
  },
  {
    path: "/books/{bookId}",
    method: "GET",
    handler: showDataHandler,
  },
  {
    path: "/books/{bookId}",
    method: "PUT",
    handler: updateDataHandler,
  },
  {
    path: "/books/{bookId}",
    method: "DELETE",
    handler: deleteDataHandler,
  },
];

module.exports = routes;

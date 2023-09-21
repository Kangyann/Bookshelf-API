// REQUIRE / GET DATA HANDLER FROM INDEX.JS
const { storeDataHandler, indexDataHandler, showDataHandler, updateDataHandler, deleteDataHandler } = require("./index");
// CREATE ROUTES SERVER
const routes = [
  {
    // PATH /books -> GET ALL DATA BOOK AND SHOW IT
    path: "/books",
    method: "GET",
    handler: indexDataHandler,
  },
  {
    // PATH /books -> POST or STORE DATA WITH REQUEST PAYLOAD FROM storeDataHandler FUNCTION
    path: "/books",
    method: "POST",
    handler: storeDataHandler,
  },
  {
    // GET /books/{bookId} -> GET SPECIFIC DATA WITH bookId, AND DISPLAYING ON PARAM /books/{bookId}
    path: "/books/{bookId}",
    method: "GET",
    handler: showDataHandler,
  },
  {
    // PUT /books/{bookId} -> PUT or PATCH , THIS METHODE CAN UPDATE DATA ACCORD WITH bookId
    path: "/books/{bookId}",
    method: "PUT",
    handler: updateDataHandler,
  },
  {
    // DELETE /books/{bookId} -> DELETE METHOD, ITS LAST METHODE FOR DELETING DATA ACCROD WITH bookId
    path: "/books/{bookId}",
    method: "DELETE",
    handler: deleteDataHandler,
  },
];

// Exports Routes
module.exports = routes;

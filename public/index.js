// IMPORT MODULE NANOID FOR GENERATE ID
const { nanoid } = require("nanoid");
const books = [];

// STORE FUNCTION, FUNCTIONS FOR SENDING DATA WITH PAYLOAD
const storeDataHandler = (req, h) => {
  let finished = false;
  // GENERATE 8 ID FROM LIBRARY nanoid
  const id = nanoid(10);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  // POST / SEND PAYLOAD
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;
  // CONDITION FOR WHEN PAGECOUNT SAME AS READPAGE
  // VALUE FINISHED WILL BE TRUE
  if (pageCount === readPage) finished = true;
  const data = { id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt };
  // CONDITION IF NAME IS NULL / NOT FOUND
  if (!name) {
    // RESPONSE FAILS
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      }).code(400);
    // FAILS RESPONSE FOR READPAGE WHEN ITS MORE THAN PAGECOUNT
  } else if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      }).code(400);
  }
  books.push(data);
  // RESPONSE SUCCESS WHEN ID FOUNDED
  return h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    }).code(201);
};

// GET & SHOW ALL DATA FOR VIEWS AT WEBPAGE
const indexDataHandler = (req, h) => {
  // GET QUERY FROM URL
  const { reading, name, finished } = req.query;
  // CONDITION WHEN READING QUERY SAME AS 1
  if (reading == 1) {
    // FILTERING AND MAPPING DATA OF BOOKS, WHERE IS IT BOOK.READING SAME AS TRUE
    const data = books
      .filter((book) => book.reading == true)
      .map(({ id, name, publisher }) => ({ id, name, publisher }));
    // RETURN SUCCESS WITH DATA VARIABLE
    return h
      .response({
        status: "success",
        data: {
          books: data,
        },
      }).code(200);
    // ELSE IF / OR READING NOT SAME AS 1 BUT SAME AS 0, THIS CODE ON BELOW WILL BE RUN
  } else if (reading == 0) {
    // FILTERING AND MAPPING
    const data = books
      .filter((book) => book.reading == false)
      .map(({ id, name, publisher }) => ({ id, name, publisher }));
    // RETURNING SUCCESS WITH DATA
    return h
      .response({
        status: "success",
        data: {
          books: data,
        },
      }).code(200);
    // NEXT IF WHEN QUERY(FINISHED) HAS SAME AS 1
  } else if (finished == 1) {
    // FILTERING AND MAPPING
    const data = books
      .filter((book) => book.finished == true)
      .map(({ id, name, publisher }) => ({ id, name, publisher }));
    // AGAIN RETURN RESPONSE SUCCESS WITH DATA
    return h
      .response({
        status: "success",
        data: {
          books: data,
        },
      }).code(200);
    // IF QUERY FINISHED IS 0 SAME AS READING
  } else if (finished == 0) {
    // FILTER AND MAP
    const data = books
      .filter((book) => book.finished == false)
      .map(({ id, name, publisher }) => ({ id, name, publisher }));
    // RESPONSE SUCCESS WITH DATA
    return h
      .response({
        status: "success",
        data: {
          books: data,
        },
      }).code(200);
  } else if (name) {
    // IF QUERY HAVE NAME, CODE WILL RUN
    // THIS QUERY WILL BE TO LOWERCASE
    const queryname = name.toLowerCase();
    // MAP AND FILTERING ,SEARCH DATA FROM BOOK.NAME ,WHERE IS IT INCLUDES LIKE QUERYNAME
    const data = books
      .filter((book) => book.name.toLowerCase().includes(queryname))
      .map(({ id, name, publisher }) => ({ id, name, publisher }));
    // IF CONDITION GET DATA ON FILTER AND MAP, RETURN SUCCESS
    return h
      .response({
        status: "success",
        data: {
          books: data,
        },
      }).code(200);
  }
  // SHOW ALL DATA WHEN URL / REQUEST NOT HAVE PAYLOAD OR QUERY
  // ONLY PARAMETER /books
  const data = books.map(({ id, name, publisher }) => ({
    id,
    name,
    publisher,
  }));
  return h
    .response({
      status: "success",
      data: {
        books: data,
      },
    }).code(200);
};

// SHOW SPECIFIC DATA WITH PARAMETER URL (BOOKID)
const showDataHandler = (req, h) => {
  // GET PARAMETER FOR BOOKID
  const { bookId } = req.params;
  const booksFilter = books.filter((book) => book.id === bookId)[0];
  // RESPONSE SUCCESS WHEN BooksFilter.ID SAME AS PARAMETER URL
  if (booksFilter) {
    return h
      .response({
        status: "success",
        data: {
          book: booksFilter,
        },
      }).code(200);
  }
  // CANT FOUND ID, AND RESPONSE IS FAILS
  return h
    .response({
      status: "fail",
      message: "Buku tidak ditemukan",
    }).code(404);
};

// UPDATING DATA REQUEST
const updateDataHandler = (req, h) => {
  // GET ID FROM PARAMETERS URL
  const { bookId } = req.params;
  // GET URL FROM PAYLOAD SENDED
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((x) => x.id === bookId);
  // FAILS WHEN INDEX SAME AS -1 / ID NOTFOUND
  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      }).code(404);
    // FAILS RESPONSE IF READPAGE MORE THAN PAGECOUNT
  } else if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      }).code(400);
  } else if (!name) {
    // RESPONSE FAILS
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      }).code(400);
    // FAILS RESPONSE FOR READPAGE WHEN ITS MORE THAN PAGECOUNT
  }
  // SUCCESS RESPONSE
  books[index] = {...books[index], name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt };
  return h
    .response({
      status: "success",
      message: "Buku berhasil diperbarui",
    }).code(200);
};

// DELETE SOME DATA WITH PARAMETER URL (BOOKID)
const deleteDataHandler = (req, h) => {
  const { bookId } = req.params;
  // FIND INDEX WHEN THATS PARAM SAME AS ARRAY OF BOOKS.ID
  const index = books.findIndex((book) => book.id === bookId);
  // SUCCESS RESPONSE IF INDEX NOT SAME AS -1
  if (index !== -1) {
    books.splice(index, 1);
    return h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      }).code(200);
  }
  // IF INDEX SAME AS -1 RESPONSE IS FAILS
  return h
    .response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    }).code(404);
};
// EXPORTS MODULE FOR HANDLE USING
module.exports = { storeDataHandler, indexDataHandler, showDataHandler, updateDataHandler, deleteDataHandler };

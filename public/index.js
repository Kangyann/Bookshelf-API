const { nanoid } = require("nanoid");
const typeData = require("./types");
const books = [];
const storeDataHandler = (req, h) => {
  let finished = false;
  const id = nanoid(8);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const {name,year,author,summary,publisher,pageCount,readPage,reading} = req.payload;
  if (pageCount === readPage) finished = true;
  if (!typeData(req.payload)) {
    return h
      .response({
        status: "fail",
        message: "error",
      })
      .code(400);
  }
  const data = {id,name,year,author,summary,publisher,pageCount,readPage,reading,finished,insertedAt ,updatedAt};
  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  } else if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }
  books.push(data);
  return h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
      statusCode: 201,
    })
    .code(201);
};

const indexDataHandler = (req, h) => {
  const indexData = [];
  books.forEach((x) => {
    const { id, name, publisher } = x;
    const data = { id, name, publisher };
    indexData.push(data);
  });
  return h
    .response({
      status: "success",
      data: {
        books: indexData,
      },
      statusCode: 200,
    })
    .code(200);
};
const showDataHandler = (req, h) => {
  const { bookId } = req.params;
  const booksFilter = books.filter((book) => book.id === bookId)[0];
  if (booksFilter) {
    return h
      .response({
        status: "success",
        data: {
          books: books,
        },
        statusCode: 200,
      })
      .code(200);
  }
  return h
    .response({
      status: "fail",
      message: "Buku tidak ditemukan",
      statusCode: 404,
    })
    .code(404);
};
// {
//     "name": string,
//     "year": number,
//     "author": string,
//     "summary": string,
//     "publisher": string,
//     "pageCount": number,
//     "readPage": number,
//     "reading": boolean
// }
const updateDataHandler = (req, h) => {
  const { bookId } = req.params;
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
  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
        statusCode: 404,
      })
      .code(404);
  } else if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        statusCode: 400,
      })
      .code(400);
  }
  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };
  return h
    .response({
      status: "success",
      message: "Buku berhasil diperbarui",
      statusCode: 200,
    })
    .code(200);
};

const deleteDataHandler = (req, h) => {
  const { bookId } = req.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    return h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
        statusCode: 200,
      })
      .code(200);
  }
  return h
    .response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
      statusCode: 404,
    })
    .code(404);
};
module.exports = {
  storeDataHandler,
  indexDataHandler,
  showDataHandler,
  updateDataHandler,
  deleteDataHandler,
};

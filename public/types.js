function typeData(params) {
  return (
    typeof params === "object" &&
    typeof params.name === "string" &&
    typeof params.year === "number" &&
    typeof params.author === "string" &&
    typeof params.summary === "string" &&
    typeof params.publisher === "string" &&
    typeof params.pageCount === "number" &&
    typeof params.readPage === "number" &&
    typeof params.reading === "boolean"
  );
}

module.exports = typeData;

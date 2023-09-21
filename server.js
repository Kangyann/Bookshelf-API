// REQUIRE MODULE
const hapi = require("@hapi/hapi");
const routes = require("./public/routes");

// CREATE SERVER BY HAPI
const init = async () => {
  // SET HOST AND PORT -> http://localhost:9000/
  const server = hapi.server({
    port: 9000,
    host: "localhost",
  });
  // GET INFORMATION ROUTES FROM REQUIRE ROUTES
  server.route(routes);
  // ASYNC N AWAIT SERVER STARTED
  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();

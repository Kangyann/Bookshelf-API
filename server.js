const hapi = require("@hapi/hapi");
const routes  = require("./public/routes");

const run = async () => {
  const server = hapi.server({
    port: 9000,
    host: "localhost",
  });
  server.route(routes);
  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

run();

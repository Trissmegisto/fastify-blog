import Fastify from "fastify";
import env from "./config/env.js";
import loggerConfig from "./config/logger.js"; // Importa a configuração
import routes from "./routes/routes.js"
import dbConnector from "./config/db.js"
import path from "node:path"
import fastifyView from "@fastify/view";
import ejs from "ejs";
import fastifyStatic from "@fastify/static";
import fastifyFormbody from "@fastify/formbody";

const __dirname = import.meta.dirname;

const fastify = Fastify({
  logger: loggerConfig, // Usa a configuração importada
});

await fastify.register(fastifyView, {
  engine: {
    ejs,
  },
  root: path.join(__dirname, "views"),
  viewExt: "ejs",
  layout: "layout.ejs",
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

await fastify.register(fastifyFormbody);

fastify.register(dbConnector);

await fastify.register(routes);

fastify.listen({ port: env.port }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Blog App is running in ${env.nodeEnv} mode at ${address}`);
});

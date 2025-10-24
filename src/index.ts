import { app, serverLogger } from "@/server";
import { env } from "@/common/utils/envConfig";

const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  serverLogger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`)
});

const onCloseSignal = () => {
  serverLogger.info("sigint received, shutting down");
  server.close(() => {
    serverLogger.info("server closed");
    process.exit();
  });

  setTimeout(() => process.exit(), 10000).unref();
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);

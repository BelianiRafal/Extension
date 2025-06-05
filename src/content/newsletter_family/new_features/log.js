const createLogger = () => {
  const log = (prefix, args) => {
    console.log(prefix, ...args);
  };

  return {
    info: (...messages) => {
      log("[INFO]", messages);
    },
    error: (...messages) => {
      log("[ERROR]", messages);
    },
    warn: (...messages) => {
      log("[WARN]", messages);
    },
    debug: (...messages) => {
      log("[DEBUG]", messages);
    },
  };
};

const logger = createLogger();

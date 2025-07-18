const createLogger = () => {
  const COLORS = {
    "[INFO]": "color: white; font-weight: bold",
    "[ERROR]": "color: red; font-weight: bold",
    "[WARN]": "color: orange; font-weight: bold",
    "[DEBUG]": "color: purple; font-weight: bold",
  };

  const log = (prefix, args) => {
    const color = COLORS[prefix] || COLORS["[INFO]"];
    const hasTable = args.some(
      (arg) => arg && typeof arg === "object" && arg.table
    );

    if (hasTable) {
      args.forEach((arg) => {
        if (arg && typeof arg === "object" && arg.table) {
          const filteredArgs = args.filter((a) => a !== arg);
          if (filteredArgs.length) {
            console.log(`%c${prefix}`, color, ...filteredArgs);
          } else {
            console.log(`%c${prefix}`, color);
          }
          console.table(arg.table);
        }
      });
    } else {
      console.log(`%c${prefix}`, color, ...args);
    }
  };

  return {
    info: (...messages) => log("[INFO]", messages),
    error: (...messages) => log("[ERROR]", messages),
    warn: (...messages) => log("[WARN]", messages),
    debug: (...messages) => log("[DEBUG]", messages),
  };
};

const logger = createLogger();

import os from "os";
import path from "path";
import _ from "lodash";
import { omit } from "lodash/fp";
import dotenv from "dotenv";
import { getConfigUrls, getAbsoluteServerUrl, getAbsoluteAdminUrl } from "./urls.mjs";
import loadConfigDir from "./config-loader.mjs";
import { getDirs } from "./get-dirs.mjs";
dotenv.config({ path: process.env.ENV_PATH });
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const { version: strapiVersion } = require(path.join(__dirname, "../../package.json"));
const defaultConfig = {
  server: {
    host: process.env.HOST || os.hostname() || "localhost",
    port: Number(process.env.PORT) || 1337,
    proxy: false,
    cron: { enabled: false },
    admin: { autoOpen: false },
    dirs: { public: "./public" },
    transfer: {
      remote: {
        enabled: true
      }
    },
    logger: {
      updates: {
        enabled: true
      },
      startup: {
        enabled: true
      }
    }
  },
  admin: {},
  api: {
    rest: {
      prefix: "/api"
    }
  }
};
const loadConfiguration = (opts) => {
  const { appDir, distDir, autoReload = false, serveAdminPanel = true } = opts;
  const pkgJSON = require(path.resolve(appDir, "package.json"));
  const configDir = path.resolve(distDir || process.cwd(), "config");
  const rootConfig = {
    launchedAt: Date.now(),
    autoReload,
    environment: process.env.NODE_ENV,
    uuid: _.get(pkgJSON, "strapi.uuid"),
    packageJsonStrapi: _.omit(_.get(pkgJSON, "strapi", {}), "uuid"),
    info: {
      ...pkgJSON,
      strapi: strapiVersion
    },
    admin: {
      serveAdminPanel
    }
  };
  const baseConfig = omit("plugins", loadConfigDir(configDir));
  const envDir = path.resolve(configDir, "env", process.env.NODE_ENV);
  const envConfig = loadConfigDir(envDir);
  const config = _.merge(rootConfig, defaultConfig, baseConfig, envConfig);
  const { serverUrl, adminUrl, adminPath } = getConfigUrls(config);
  _.set(config, "server.url", serverUrl);
  _.set(config, "server.absoluteUrl", getAbsoluteServerUrl(config));
  _.set(config, "admin.url", adminUrl);
  _.set(config, "admin.path", adminPath);
  _.set(config, "admin.absoluteUrl", getAbsoluteAdminUrl(config));
  _.set(config, "dirs", getDirs(opts, config));
  return config;
};
export {
  loadConfiguration
};
//# sourceMappingURL=index.mjs.map

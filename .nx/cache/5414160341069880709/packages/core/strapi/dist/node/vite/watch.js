"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const path = require("node:path");
const http = require("node:http");
const fs = require("node:fs/promises");
const config = require("./config.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const path__default = /* @__PURE__ */ _interopDefault(path);
const http__default = /* @__PURE__ */ _interopDefault(http);
const fs__default = /* @__PURE__ */ _interopDefault(fs);
const HMR_DEFAULT_PORT = 5173;
const createHMRServer = () => {
  return http__default.default.createServer(
    // http server request handler. keeps the same with
    // https://github.com/websockets/ws/blob/45e17acea791d865df6b255a55182e9c42e5877a/lib/websocket-server.js#L88-L96
    (_, res) => {
      const body = http__default.default.STATUS_CODES[426];
      res.writeHead(426, {
        "Content-Length": body?.length ?? 0,
        "Content-Type": "text/plain"
      });
      res.end(body);
    }
  );
};
const watch = async (ctx) => {
  const hmrServer = createHMRServer();
  ctx.options.hmrServer = hmrServer;
  ctx.options.hmrClientPort = HMR_DEFAULT_PORT;
  const config$1 = await config.resolveDevelopmentConfig(ctx);
  const finalConfig = await config.mergeConfigWithUserConfig(config$1, ctx);
  const hmrConfig = config$1.server?.hmr;
  if (typeof hmrConfig === "object" && hmrConfig.server === hmrServer) {
    strapi.server.httpServer.on("listening", async () => {
      hmrServer.listen(hmrConfig.clientPort ?? hmrConfig.port ?? HMR_DEFAULT_PORT);
    });
  }
  ctx.logger.debug("Vite config", finalConfig);
  const { createServer } = await import("vite");
  const vite = await createServer(finalConfig);
  ctx.strapi.server.app.use((ctx2, next) => {
    return new Promise((resolve, reject) => {
      vite.middlewares(ctx2.req, ctx2.res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(next());
        }
      });
    });
  });
  const serveAdmin = async (koaCtx, next) => {
    await next();
    if (koaCtx.method !== "HEAD" && koaCtx.method !== "GET") {
      return;
    }
    if (koaCtx.body != null || koaCtx.status !== 404) {
      return;
    }
    const url = koaCtx.originalUrl;
    let template = await fs__default.default.readFile(path__default.default.relative(ctx.cwd, ".strapi/client/index.html"), "utf-8");
    template = await vite.transformIndexHtml(url, template);
    koaCtx.type = "html";
    koaCtx.body = template;
  };
  ctx.strapi.server.routes([
    {
      method: "GET",
      path: `${ctx.basePath}:path*`,
      handler: serveAdmin,
      config: { auth: false }
    }
  ]);
  return {
    async close() {
      await vite.close();
      if (hmrServer.listening) {
        await new Promise((resolve, reject) => {
          hmrServer.close((err) => err ? reject(err) : resolve());
        });
      }
    }
  };
};
exports.watch = watch;
//# sourceMappingURL=watch.js.map

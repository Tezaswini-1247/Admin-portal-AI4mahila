"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const os = require("node:os");
const path = require("node:path");
const node_util = require("node:util");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpack = require("webpack");
const config = require("./config.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const os__default = /* @__PURE__ */ _interopDefault(os);
const path__default = /* @__PURE__ */ _interopDefault(path);
const webpackDevMiddleware__default = /* @__PURE__ */ _interopDefault(webpackDevMiddleware);
const webpackHotMiddleware__default = /* @__PURE__ */ _interopDefault(webpackHotMiddleware);
const watch = async (ctx) => {
  const config$1 = await config.resolveDevelopmentConfig(ctx);
  const finalConfig = await config.mergeConfigWithUserConfig(config$1, ctx);
  ctx.logger.debug("Final webpack config:", os__default.default.EOL, finalConfig);
  return new Promise((res) => {
    const compiler = webpack.webpack(finalConfig);
    const devMiddleware = webpackDevMiddleware__default.default(compiler);
    const hotMiddleware = webpackHotMiddleware__default.default(compiler, {
      log: false,
      path: "/__webpack_hmr"
    });
    ctx.strapi.server.app.use((ctx2, next) => {
      return new Promise((resolve, reject) => {
        hotMiddleware(ctx2.req, ctx2.res, (err) => {
          if (err) reject(err);
          else resolve(next());
        });
      });
    });
    ctx.strapi.server.app.use((context, next) => {
      const ready = new Promise((resolve) => {
        devMiddleware.waitUntilValid(() => {
          resolve(true);
        });
      });
      const init = new Promise((resolve) => {
        devMiddleware(
          context.req,
          {
            // @ts-expect-error ignored
            end(content) {
              context.body = content;
              resolve(true);
            },
            getHeader: context.get.bind(context),
            // @ts-expect-error ignored
            setHeader: context.set.bind(context),
            locals: context.state
          },
          () => resolve(next())
        );
      });
      return Promise.all([ready, init]);
    });
    const serveAdmin = async (ctx2, next) => {
      await next();
      if (devMiddleware.context.outputFileSystem.createReadStream) {
        if (ctx2.method !== "HEAD" && ctx2.method !== "GET") {
          return;
        }
        if (ctx2.body != null || ctx2.status !== 404) {
          return;
        }
        const filename = path__default.default.resolve(finalConfig.output?.path, "index.html");
        ctx2.type = "html";
        ctx2.body = devMiddleware.context.outputFileSystem.createReadStream(filename);
      }
    };
    ctx.strapi.server.routes([
      {
        method: "GET",
        path: `${ctx.basePath}:path*`,
        handler: serveAdmin,
        config: { auth: false }
      }
    ]);
    devMiddleware.waitUntilValid(() => {
      res({
        async close() {
          await Promise.all([
            node_util.promisify(devMiddleware.close.bind(devMiddleware))(),
            hotMiddleware.close(),
            node_util.promisify(compiler.close.bind(compiler))()
          ]);
        }
      });
    });
  });
};
exports.watch = watch;
//# sourceMappingURL=watch.js.map

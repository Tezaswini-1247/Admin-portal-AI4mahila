"use strict";
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const name$1 = "@strapi/plugin-graphql";
const version = "5.4.2";
const description = "Adds GraphQL endpoint with default API methods.";
const repository = {
  type: "git",
  url: "https://github.com/strapi/strapi.git",
  directory: "packages/plugins/graphql"
};
const license = "SEE LICENSE IN LICENSE";
const author = {
  name: "Strapi Solutions SAS",
  email: "hi@strapi.io",
  url: "https://strapi.io"
};
const maintainers = [
  {
    name: "Strapi Solutions SAS",
    email: "hi@strapi.io",
    url: "https://strapi.io"
  }
];
const exports$1 = {
  "./strapi-admin": {
    types: "./dist/admin/src/index.d.ts",
    source: "./admin/src/index.ts",
    "import": "./dist/admin/index.mjs",
    require: "./dist/admin/index.js",
    "default": "./dist/admin/index.js"
  },
  "./strapi-server": {
    types: "./dist/server/src/index.d.ts",
    source: "./server/src/index.ts",
    "import": "./dist/server/index.mjs",
    require: "./dist/server/index.js",
    "default": "./dist/server/index.js"
  },
  "./package.json": "./package.json"
};
const files = [
  "dist/",
  "strapi-server.js"
];
const scripts = {
  build: "strapi-plugin build",
  clean: "run -T rimraf ./dist",
  lint: "run -T eslint .",
  watch: "strapi-plugin watch"
};
const dependencies = {
  "@apollo/server": "4.11.0",
  "@as-integrations/koa": "1.1.1",
  "@graphql-tools/schema": "10.0.3",
  "@graphql-tools/utils": "^10.1.3",
  "@koa/cors": "5.0.0",
  "@strapi/design-system": "2.0.0-rc.14",
  "@strapi/icons": "2.0.0-rc.14",
  "@strapi/utils": "5.4.2",
  graphql: "^16.8.1",
  "graphql-depth-limit": "^1.1.0",
  "graphql-playground-middleware-koa": "^1.6.21",
  "graphql-scalars": "1.22.2",
  "koa-bodyparser": "4.4.1",
  "koa-compose": "^4.1.0",
  lodash: "4.17.21",
  nexus: "1.3.0",
  pluralize: "8.0.0"
};
const devDependencies = {
  "@strapi/sdk-plugin": "^5.2.0",
  "@strapi/strapi": "5.4.2",
  "@strapi/types": "5.4.2",
  "@types/graphql-depth-limit": "1.1.5",
  "@types/koa-bodyparser": "4.3.12",
  "@types/koa__cors": "5.0.0",
  "cross-env": "^7.0.3",
  "eslint-config-custom": "5.4.2",
  koa: "2.15.2",
  react: "18.3.1",
  "react-dom": "18.3.1",
  "react-router-dom": "6.22.3",
  "styled-components": "6.1.8",
  tsconfig: "5.4.2",
  typescript: "5.3.2"
};
const peerDependencies = {
  "@strapi/strapi": "^5.0.0",
  react: "^17.0.0 || ^18.0.0",
  "react-dom": "^17.0.0 || ^18.0.0",
  "react-router-dom": "^6.0.0",
  "styled-components": "^6.0.0"
};
const engines = {
  node: ">=18.0.0 <=22.x.x",
  npm: ">=6.0.0"
};
const strapi = {
  displayName: "GraphQL",
  name: "graphql",
  description: "Adds GraphQL endpoint with default API methods.",
  kind: "plugin"
};
const gitHead = "7d785703f52464577d077c4618cbe68b44f8a9cd";
const pluginPkg = {
  name: name$1,
  version,
  description,
  repository,
  license,
  author,
  maintainers,
  exports: exports$1,
  files,
  scripts,
  dependencies,
  devDependencies,
  peerDependencies,
  engines,
  strapi,
  gitHead
};
const pluginId = "graphql";
const prefixPluginTranslations = (trad, pluginId2) => {
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId2}.${current}`] = trad[current];
    return acc;
  }, {});
};
const name = pluginPkg.strapi.name;
const index = {
  // TODO: we need to have the type for StrapiApp done from `@strapi/admin` package.
  register(app) {
    app.registerPlugin({
      id: pluginId,
      name
    });
  },
  bootstrap() {
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/dk.json": () => Promise.resolve().then(() => require("../_chunks/dk-C9NcSzyg.js")), "./translations/en.json": () => Promise.resolve().then(() => require("../_chunks/en-BiKpmhCU.js")), "./translations/es.json": () => Promise.resolve().then(() => require("../_chunks/es-DE22V9D4.js")), "./translations/fr.json": () => Promise.resolve().then(() => require("../_chunks/fr-Ca-HowfR.js")), "./translations/pl.json": () => Promise.resolve().then(() => require("../_chunks/pl-DVnJGR87.js")), "./translations/ru.json": () => Promise.resolve().then(() => require("../_chunks/ru-o4zaP02C.js")), "./translations/sv.json": () => Promise.resolve().then(() => require("../_chunks/sv-9qK4y9fb.js")), "./translations/tr.json": () => Promise.resolve().then(() => require("../_chunks/tr-fBBDNMBY.js")), "./translations/zh-Hans.json": () => Promise.resolve().then(() => require("../_chunks/zh-Hans-Btuz6Y7W.js")), "./translations/zh.json": () => Promise.resolve().then(() => require("../_chunks/zh-CyCKPuL0.js")) }), `./translations/${locale}.json`, 3).then(({ default: data }) => {
          return {
            data: prefixPluginTranslations(data, pluginId),
            locale
          };
        }).catch(() => {
          return {
            data: {},
            locale
          };
        });
      })
    );
    return Promise.resolve(importedTrads);
  }
};
module.exports = index;

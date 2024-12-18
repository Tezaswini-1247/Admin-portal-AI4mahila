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
const node_path = require("node:path");
const nodePlop = require("node-plop");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const nodePlop__default = /* @__PURE__ */ _interopDefault(nodePlop);
const runCLI = async () => {
  const { Plop, run } = await import("plop");
  Plop.prepare(
    {
      configPath: node_path.join(__dirname, "plopfile.js")
    },
    (env) => {
      const argv = process.argv.slice(2);
      Plop.execute(env, argv, (env2, argv2) => run(env2, argv2, true));
    }
  );
};
const generate = async (generatorName, options, { dir = process.cwd(), plopFile = "plopfile.js" } = {}) => {
  const plop = nodePlop__default.default(node_path.join(__dirname, plopFile), {
    destBasePath: node_path.join(dir, "src"),
    force: false
  });
  const generator = plop.getGenerator(generatorName);
  await generator.runActions(options, {
    onSuccess() {
    },
    onFailure() {
    },
    onComment() {
    }
  });
};
exports.generate = generate;
exports.runCLI = runCLI;
//# sourceMappingURL=index.js.map

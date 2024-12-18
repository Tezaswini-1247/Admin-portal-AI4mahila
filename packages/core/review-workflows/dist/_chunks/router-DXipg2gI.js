"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const reactRouterDom = require("react-router-dom");
const ProtectedListPage = React.lazy(
  () => Promise.resolve().then(() => require("./index-B05ot-RJ.js")).then((mod) => ({ default: mod.ProtectedListPage }))
);
const ProtectedEditPage = React.lazy(
  () => Promise.resolve().then(() => require("./id-BI6AAFQF.js")).then((mod) => ({ default: mod.ProtectedEditPage }))
);
const routes = [
  {
    path: "/",
    Component: ProtectedListPage
  },
  {
    path: ":id",
    Component: ProtectedEditPage
  }
];
const Router = () => /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Routes, { children: routes.map((route) => /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { ...route }, route.path)) });
exports.Router = Router;
//# sourceMappingURL=router-DXipg2gI.js.map

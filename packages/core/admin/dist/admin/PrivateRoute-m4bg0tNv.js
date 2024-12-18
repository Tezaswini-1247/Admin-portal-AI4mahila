'use strict';

const jsxRuntime = require('react/jsx-runtime');
const reactRouterDom = require('react-router-dom');
const Theme = require('./Theme-B3Vl7PO-.js');

const PrivateRoute = ({ children }) => {
  const token = Theme.useAuth("PrivateRoute", (state) => state.token);
  const { pathname, search } = reactRouterDom.useLocation();
  return token !== null ? children : /* @__PURE__ */ jsxRuntime.jsx(
    reactRouterDom.Navigate,
    {
      to: {
        pathname: "/auth/login",
        search: pathname !== "/" ? `?redirectTo=${encodeURIComponent(`${pathname}${search}`)}` : void 0
      }
    }
  );
};

exports.PrivateRoute = PrivateRoute;
//# sourceMappingURL=PrivateRoute-m4bg0tNv.js.map

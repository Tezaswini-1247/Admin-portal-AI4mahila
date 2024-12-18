'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactIntl = require('react-intl');
const index = require('./index-EeNFKp50.js');
const SelectRoles = require('./SelectRoles-CIOWmS2a.js');

const MagicLinkEE = ({ registrationToken }) => {
  const { formatMessage } = reactIntl.useIntl();
  if (registrationToken) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      SelectRoles.MagicLinkWrapper,
      {
        target: `${window.location.origin}${index.getBasename()}/auth/register?registrationToken=${registrationToken}`,
        children: formatMessage({
          id: "app.components.Users.MagicLink.connect",
          defaultMessage: "Copy and share this link to give access to this user"
        })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(SelectRoles.MagicLinkWrapper, { target: `${window.location.origin}${index.getBasename()}/auth/login`, children: formatMessage({
    id: "app.components.Users.MagicLink.connect.sso",
    defaultMessage: "Send this link to the user, the first login can be made via a SSO provider."
  }) });
};

exports.MagicLinkEE = MagicLinkEE;
//# sourceMappingURL=MagicLinkEE-BKqXkRzw.js.map

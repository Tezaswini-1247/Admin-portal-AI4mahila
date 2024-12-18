import { jsx, jsxs } from "react/jsx-runtime";
import { Layouts } from "@strapi/admin/strapi-admin";
import { Main, Box, EmptyStateLayout, LinkButton } from "@strapi/design-system";
import { ExternalLink } from "@strapi/icons";
import { EmptyPermissions } from "@strapi/icons/symbols";
import { useIntl } from "react-intl";
const PurchaseReviewWorkflows = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Layouts.Root, { children: /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(
      Layouts.Header,
      {
        title: formatMessage({
          id: "Settings.review-workflows.list.page.title",
          defaultMessage: "Review Workflows"
        }),
        subtitle: formatMessage({
          id: "Settings.review-workflows.list.page.subtitle",
          defaultMessage: "Manage your content review process"
        })
      }
    ),
    /* @__PURE__ */ jsx(Box, { paddingLeft: 10, paddingRight: 10, children: /* @__PURE__ */ jsx(
      EmptyStateLayout,
      {
        icon: /* @__PURE__ */ jsx(EmptyPermissions, { width: "16rem" }),
        content: formatMessage({
          id: "Settings.review-workflows.not-available",
          defaultMessage: "Review Workflows is only available as part of a paid plan. Upgrade to create and manage workflows."
        }),
        action: /* @__PURE__ */ jsx(
          LinkButton,
          {
            variant: "default",
            endIcon: /* @__PURE__ */ jsx(ExternalLink, {}),
            href: "https://strp.cc/3tdNfJq",
            isExternal: true,
            target: "_blank",
            children: formatMessage({
              id: "global.learn-more",
              defaultMessage: "Learn more"
            })
          }
        )
      }
    ) })
  ] }) });
};
export {
  PurchaseReviewWorkflows
};
//# sourceMappingURL=purchase-review-workflows-BN-5Ube7.mjs.map

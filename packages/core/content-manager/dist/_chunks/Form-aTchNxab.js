"use strict";
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const designSystem = require("@strapi/design-system");
const fractionalIndexing = require("fractional-indexing");
const pipe = require("lodash/fp/pipe");
const reactIntl = require("react-intl");
const index = require("./index-BN1pPa5v.js");
const Icons = require("@strapi/icons");
const reactDndHtml5Backend = require("react-dnd-html5-backend");
const reactRouterDom = require("react-router-dom");
const styledComponents = require("styled-components");
const useDragAndDrop = require("./useDragAndDrop-BMtgCYzL.js");
const ComponentIcon = require("./ComponentIcon-CRbtQEUV.js");
const yup = require("yup");
const FieldTypeIcon = require("./FieldTypeIcon-Dnwq_IRF.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const React__namespace = /* @__PURE__ */ _interopNamespace(React);
const pipe__default = /* @__PURE__ */ _interopDefault(pipe);
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const FIELD_SCHEMA = yup__namespace.object().shape({
  label: yup__namespace.string().required().nullable(),
  description: yup__namespace.string(),
  editable: yup__namespace.boolean(),
  size: yup__namespace.number().required()
});
const EditFieldForm = ({ attribute, name, onClose }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { value, onChange } = strapiAdmin.useField(name);
  const { data: mainFieldOptions } = index.useGetInitialDataQuery(void 0, {
    selectFromResult: (res) => {
      if (attribute?.type !== "relation" || !res.data) {
        return { data: [] };
      }
      if ("targetModel" in attribute && typeof attribute.targetModel === "string") {
        const targetSchema = res.data.contentTypes.find(
          (schema) => schema.uid === attribute.targetModel
        );
        if (targetSchema) {
          return {
            data: Object.entries(targetSchema.attributes).reduce((acc, [key, attribute2]) => {
              if (!index.ATTRIBUTE_TYPES_THAT_CANNOT_BE_MAIN_FIELD.includes(attribute2.type)) {
                acc.push({
                  label: key,
                  value: key
                });
              }
              return acc;
            }, [])
          };
        }
      }
      return { data: [] };
    },
    skip: attribute?.type !== "relation"
  });
  if (!value || value.name === TEMP_FIELD_NAME || !attribute) {
    console.error(
      "You've opened a field to edit without it being part of the form, this is likely a bug with Strapi. Please open an issue."
    );
    toggleNotification({
      message: formatMessage({
        id: "content-manager.containers.edit-settings.modal-form.error",
        defaultMessage: "An error occurred while trying to open the form."
      }),
      type: "danger"
    });
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(
    strapiAdmin.Form,
    {
      method: "PUT",
      initialValues: value,
      validationSchema: FIELD_SCHEMA,
      onSubmit: (data) => {
        onChange(name, data);
        onClose();
      },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 3, children: [
          /* @__PURE__ */ jsxRuntime.jsx(FieldTypeIcon.FieldTypeIcon, { type: attribute.type }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: formatMessage(
            {
              id: "content-manager.containers.edit-settings.modal-form.label",
              defaultMessage: "Edit {fieldName}"
            },
            { fieldName: index.capitalise(value.name) }
          ) })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: [
          {
            name: "label",
            label: formatMessage({
              id: index.getTranslation("containers.edit-settings.modal-form.label"),
              defaultMessage: "Label"
            }),
            size: 6,
            type: "string"
          },
          {
            name: "description",
            label: formatMessage({
              id: index.getTranslation("containers.edit-settings.modal-form.description"),
              defaultMessage: "Description"
            }),
            size: 6,
            type: "string"
          },
          {
            name: "placeholder",
            label: formatMessage({
              id: index.getTranslation("containers.edit-settings.modal-form.placeholder"),
              defaultMessage: "Placeholder"
            }),
            size: 6,
            type: "string"
          },
          {
            name: "editable",
            label: formatMessage({
              id: index.getTranslation("containers.edit-settings.modal-form.editable"),
              defaultMessage: "Editable"
            }),
            size: 6,
            type: "boolean"
          },
          {
            name: "mainField",
            label: formatMessage({
              id: index.getTranslation("containers.edit-settings.modal-form.mainField"),
              defaultMessage: "Entry title"
            }),
            hint: formatMessage({
              id: index.getTranslation(
                "containers.SettingPage.edit-settings.modal-form.mainField.hint"
              ),
              defaultMessage: "Set the displayed field"
            }),
            size: 6,
            options: mainFieldOptions,
            type: "enumeration"
          },
          {
            name: "size",
            label: formatMessage({
              id: index.getTranslation("containers.ListSettingsView.modal-form.size"),
              defaultMessage: "Size"
            }),
            size: 6,
            options: [
              { value: "4", label: "33%" },
              { value: "6", label: "50%" },
              { value: "8", label: "66%" },
              { value: "12", label: "100%" }
            ],
            type: "enumeration"
          }
        ].filter(filterFieldsBasedOnAttributeType(attribute.type)).map(({ size, ...field }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: size, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.InputRenderer, { ...field }) }, field.name)) }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Close, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "submit", children: formatMessage({ id: "global.finish", defaultMessage: "Finish" }) })
        ] })
      ]
    }
  ) });
};
const filterFieldsBasedOnAttributeType = (type) => (field) => {
  switch (type) {
    case "blocks":
    case "richtext":
      return field.name !== "size" && field.name !== "mainField";
    case "boolean":
    case "media":
      return field.name !== "placeholder" && field.name !== "mainField";
    case "component":
    case "dynamiczone":
      return field.name === "label" || field.name === "editable";
    case "json":
      return field.name !== "placeholder" && field.name !== "mainField" && field.name !== "size";
    case "relation":
      return true;
    default:
      return field.name !== "mainField";
  }
};
const Fields = ({ attributes, fieldSizes, components, metadatas = {} }) => {
  const { formatMessage } = reactIntl.useIntl();
  const layout = strapiAdmin.useForm(
    "Fields",
    (state) => state.values.layout ?? []
  );
  const onChange = strapiAdmin.useForm("Fields", (state) => state.onChange);
  const addFieldRow = strapiAdmin.useForm("Fields", (state) => state.addFieldRow);
  const removeFieldRow = strapiAdmin.useForm("Fields", (state) => state.removeFieldRow);
  const existingFields = layout.map((row) => row.children.map((field) => field.name)).flat();
  const remainingFields = Object.entries(metadatas).reduce((acc, current) => {
    const [name, { visible, ...field }] = current;
    if (!existingFields.includes(name) && visible === true) {
      const type = attributes[name]?.type;
      const size = type ? fieldSizes[type] : 12;
      acc.push({
        ...field,
        label: field.label ?? name,
        name,
        size
      });
    }
    return acc;
  }, []);
  const handleMoveField = ([newRowIndex, newFieldIndex], [currentRowIndex, currentFieldIndex]) => {
    const newLayout = structuredClone(layout);
    const [field] = newLayout[currentRowIndex].children.splice(currentFieldIndex, 1);
    if (!field || field.name === TEMP_FIELD_NAME) {
      return;
    }
    const newRow = newLayout[newRowIndex].children;
    const [newFieldKey] = generateNKeysBetween(newRow, 1, currentFieldIndex, newFieldIndex);
    newRow.splice(newFieldIndex, 0, { ...field, __temp_key__: newFieldKey });
    if (newLayout[newRowIndex].children.reduce((acc, curr) => acc + curr.size, 0) > 12) {
      const recalculatedRows = chunkArray(
        newLayout[newRowIndex].children.filter((field2) => field2.name !== TEMP_FIELD_NAME)
      );
      const rowKeys = generateNKeysBetween(
        newLayout,
        recalculatedRows.length,
        currentRowIndex,
        newRowIndex
      );
      newLayout.splice(
        newRowIndex,
        1,
        ...recalculatedRows.map((row, index2) => ({
          __temp_key__: rowKeys[index2],
          children: row
        }))
      );
    }
    const newLayoutWithSpacers = newLayout.map((row) => ({
      ...row,
      children: row.children.filter((field2) => field2.name !== TEMP_FIELD_NAME)
    })).filter((row) => row.children.length > 0).map((row) => {
      const totalSpaceTaken = row.children.reduce((acc, curr) => acc + curr.size, 0);
      if (totalSpaceTaken < 12) {
        const [spacerKey] = fractionalIndexing.generateNKeysBetween(
          row.children.at(-1)?.__temp_key__,
          void 0,
          1
        );
        return {
          ...row,
          children: [
            ...row.children,
            {
              name: TEMP_FIELD_NAME,
              size: 12 - totalSpaceTaken,
              __temp_key__: spacerKey
            }
          ]
        };
      }
      return row;
    });
    onChange("layout", newLayoutWithSpacers);
  };
  const handleRemoveField = (rowIndex, fieldIndex) => () => {
    if (layout[rowIndex].children.length === 1) {
      removeFieldRow(`layout`, rowIndex);
    } else {
      onChange(`layout.${rowIndex}.children`, [
        ...layout[rowIndex].children.slice(0, fieldIndex),
        ...layout[rowIndex].children.slice(fieldIndex + 1)
      ]);
    }
  };
  const handleAddField = (field) => () => {
    addFieldRow("layout", { children: [field] });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { paddingTop: 6, direction: "column", alignItems: "stretch", gap: 4, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "flex-start", direction: "column", justifyContent: "space-between", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", children: formatMessage({
        id: index.getTranslation("containers.list.displayedFields"),
        defaultMessage: "Displayed fields"
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: formatMessage({
        id: "containers.SettingPage.editSettings.description",
        defaultMessage: "Drag & drop the fields to build the layout"
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: 4, hasRadius: true, borderStyle: "dashed", borderWidth: "1px", borderColor: "neutral300", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
      layout.map((row, rowIndex) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 2, children: row.children.map(({ size, ...field }, fieldIndex) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: size, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
        Field,
        {
          attribute: attributes[field.name],
          components,
          index: [rowIndex, fieldIndex],
          name: `layout.${rowIndex}.children.${fieldIndex}`,
          onMoveField: handleMoveField,
          onRemoveField: handleRemoveField(rowIndex, fieldIndex)
        }
      ) }, field.name)) }, row.__temp_key__)),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Root, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Menu.Trigger,
          {
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, {}),
            endIcon: null,
            disabled: remainingFields.length === 0,
            fullWidth: true,
            variant: "secondary",
            children: formatMessage({
              id: index.getTranslation("containers.SettingPage.add.field"),
              defaultMessage: "Insert another field"
            })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Content, { children: remainingFields.map((field) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Item, { onSelect: handleAddField(field), children: field.label }, field.name)) })
      ] })
    ] }) })
  ] });
};
const generateNKeysBetween = (field, count, currInd, newInd) => {
  const startKey = currInd > newInd ? field[newInd - 1]?.__temp_key__ : field[newInd]?.__temp_key__;
  const endKey = currInd > newInd ? field[newInd]?.__temp_key__ : field[newInd + 1]?.__temp_key__;
  return fractionalIndexing.generateNKeysBetween(startKey, endKey, count);
};
const chunkArray = (array) => {
  const result = [];
  let temp = [];
  array.reduce((acc, field) => {
    if (acc + field.size > 12) {
      result.push(temp);
      temp = [field];
      return field.size;
    } else {
      temp.push(field);
      return acc + field.size;
    }
  }, 0);
  if (temp.length > 0) {
    result.push(temp);
  }
  return result;
};
const TEMP_FIELD_NAME = "_TEMP_";
const Field = ({ attribute, components, name, index: index$1, onMoveField, onRemoveField }) => {
  const [isModalOpen, setIsModalOpen] = React__namespace.useState(false);
  const { formatMessage } = reactIntl.useIntl();
  const { value } = strapiAdmin.useField(name);
  const [{ isDragging }, objectRef, dropRef, dragRef, dragPreviewRef] = useDragAndDrop.useDragAndDrop(true, {
    dropSensitivity: "immediate",
    type: useDragAndDrop.ItemTypes.EDIT_FIELD,
    item: { index: index$1, label: value?.label, name },
    index: index$1,
    onMoveItem: onMoveField
  });
  React__namespace.useEffect(() => {
    dragPreviewRef(reactDndHtml5Backend.getEmptyImage(), { captureDraggingState: false });
  }, [dragPreviewRef]);
  const composedRefs = designSystem.useComposedRefs(dragRef, objectRef);
  const handleRemoveField = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemoveField(e);
  };
  const onEditFieldMeta = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const tempRefs = designSystem.useComposedRefs(dropRef, objectRef);
  if (!value) {
    return null;
  }
  if (value.name === TEMP_FIELD_NAME) {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { tag: "span", height: "100%", style: { opacity: 0 }, ref: tempRefs });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Root, { open: isModalOpen, onOpenChange: setIsModalOpen, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Flex,
      {
        borderColor: "neutral150",
        background: "neutral100",
        hasRadius: true,
        style: { opacity: isDragging ? 0.5 : 1 },
        ref: dropRef,
        gap: 3,
        cursor: "pointer",
        onClick: () => {
          setIsModalOpen(true);
        },
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            DragButton,
            {
              tag: "span",
              withTooltip: false,
              label: formatMessage(
                {
                  id: index.getTranslation("components.DraggableCard.move.field"),
                  defaultMessage: "Move {item}"
                },
                { item: value.label }
              ),
              onClick: (e) => e.stopPropagation(),
              ref: composedRefs,
              children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Drag, {})
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "flex-start", grow: 1, overflow: "hidden", children: [
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 3, justifyContent: "space-between", width: "100%", children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { ellipsis: true, fontWeight: "bold", children: value.label }),
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.IconButton,
                  {
                    type: "button",
                    variant: "ghost",
                    background: "transparent",
                    onClick: onEditFieldMeta,
                    withTooltip: false,
                    label: formatMessage(
                      {
                        id: index.getTranslation("components.DraggableCard.edit.field"),
                        defaultMessage: "Edit {item}"
                      },
                      { item: value.label }
                    ),
                    children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Pencil, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.IconButton,
                  {
                    type: "button",
                    variant: "ghost",
                    onClick: handleRemoveField,
                    background: "transparent",
                    withTooltip: false,
                    label: formatMessage(
                      {
                        id: index.getTranslation("components.DraggableCard.delete.field"),
                        defaultMessage: "Delete {item}"
                      },
                      { item: value.label }
                    ),
                    children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Cross, {})
                  }
                )
              ] })
            ] }),
            attribute?.type === "component" ? /* @__PURE__ */ jsxRuntime.jsxs(
              designSystem.Flex,
              {
                paddingTop: 3,
                paddingRight: 3,
                paddingBottom: 3,
                paddingLeft: 0,
                alignItems: "flex-start",
                direction: "column",
                gap: 2,
                width: "100%",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, width: "100%", children: components[attribute.component].layout.map(
                    (row) => row.map(({ size, ...field }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: size, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.Flex,
                      {
                        alignItems: "center",
                        background: "neutral0",
                        paddingTop: 2,
                        paddingBottom: 2,
                        paddingLeft: 3,
                        paddingRight: 3,
                        hasRadius: true,
                        borderColor: "neutral200",
                        children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: field.name })
                      }
                    ) }, field.name))
                  ) }),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Link,
                    {
                      onClick: (e) => e.stopPropagation(),
                      startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Cog, {}),
                      tag: reactRouterDom.NavLink,
                      to: `../components/${attribute.component}/configurations/edit`,
                      children: formatMessage({
                        id: index.getTranslation("components.FieldItem.linkToComponentLayout"),
                        defaultMessage: "Set the component's layout"
                      })
                    }
                  )
                ]
              }
            ) : null,
            attribute?.type === "dynamiczone" ? /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Flex,
              {
                paddingTop: 3,
                paddingRight: 3,
                paddingBottom: 3,
                paddingLeft: 0,
                alignItems: "flex-start",
                gap: 2,
                width: "100%",
                children: attribute?.components.map((uid) => /* @__PURE__ */ jsxRuntime.jsxs(
                  ComponentLink,
                  {
                    onClick: (e) => e.stopPropagation(),
                    to: `../components/${uid}/configurations/edit`,
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx(ComponentIcon.ComponentIcon, { icon: components[uid].settings.icon }),
                      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontSize: 1, textColor: "neutral600", fontWeight: "bold", children: components[uid].settings.displayName })
                    ]
                  },
                  uid
                ))
              }
            ) : null
          ] })
        ]
      }
    ),
    value.name !== TEMP_FIELD_NAME && /* @__PURE__ */ jsxRuntime.jsx(EditFieldForm, { attribute, name, onClose: () => setIsModalOpen(false) })
  ] });
};
const DragButton = styledComponents.styled(designSystem.IconButton)`
  height: unset;
  align-self: stretch;
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  background-color: transparent;
  border-radius: 0px;
  border-right: 1px solid ${({ theme }) => theme.colors.neutral150};
  cursor: all-scroll;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;
const ComponentLink = styledComponents.styled(reactRouterDom.NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spaces[1]};
  padding: ${(props) => props.theme.spaces[2]};
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  background: ${({ theme }) => theme.colors.neutral0};
  width: 14rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  text-decoration: none;

  &:focus,
  &:hover {
    ${({ theme }) => `
      background-color: ${theme.colors.primary100};
      border-color: ${theme.colors.primary200};

      ${designSystem.Typography} {
          color: ${theme.colors.primary600};
      }
    `}

    /* > ComponentIcon */
    > div:first-child {
      background: ${({ theme }) => theme.colors.primary200};
      color: ${({ theme }) => theme.colors.primary600};

      svg {
        path {
          fill: ${({ theme }) => theme.colors.primary600};
        }
      }
    }
  }
`;
const ConfigurationForm = ({
  attributes,
  fieldSizes,
  layout: editLayout,
  onSubmit
}) => {
  const { components, settings, layout, metadatas } = editLayout;
  const { formatMessage } = reactIntl.useIntl();
  const initialValues = React__namespace.useMemo(() => {
    const transformations = pipe__default.default(
      flattenPanels,
      replaceMainFieldWithNameOnly,
      extractMetadata,
      addTmpSpaceToLayout,
      addTmpKeysToLayout
    );
    return {
      layout: transformations(layout),
      settings
    };
  }, [layout, settings]);
  return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Layouts.Root, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Main, { children: /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Form, { initialValues, onSubmit, method: "PUT", children: [
    /* @__PURE__ */ jsxRuntime.jsx(Header, { name: settings.displayName ?? "" }),
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Flex,
      {
        alignItems: "stretch",
        background: "neutral0",
        direction: "column",
        gap: 6,
        hasRadius: true,
        shadow: "tableShadow",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 7,
        paddingRight: 7,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h2", children: formatMessage({
            id: index.getTranslation("containers.SettingPage.settings"),
            defaultMessage: "Settings"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
              strapiAdmin.InputRenderer,
              {
                type: "enumeration",
                label: formatMessage({
                  id: index.getTranslation("containers.SettingPage.editSettings.entry.title"),
                  defaultMessage: "Entry title"
                }),
                hint: formatMessage({
                  id: index.getTranslation(
                    "containers.SettingPage.editSettings.entry.title.description"
                  ),
                  defaultMessage: "Set the display field of your entry"
                }),
                name: "settings.mainField",
                options: Object.entries(attributes).reduce((acc, [key, attribute]) => {
                  if (!attribute) {
                    return acc;
                  }
                  if (!index.ATTRIBUTE_TYPES_THAT_CANNOT_BE_MAIN_FIELD.includes(attribute.type)) {
                    acc.push({
                      label: key,
                      value: key
                    });
                  }
                  return acc;
                }, [])
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Grid.Item,
              {
                paddingTop: 6,
                paddingBottom: 6,
                col: 12,
                s: 12,
                direction: "column",
                alignItems: "stretch",
                children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {})
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 12, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h3", children: formatMessage({
              id: index.getTranslation("containers.SettingPage.view"),
              defaultMessage: "View"
            }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 12, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
              Fields,
              {
                attributes,
                components,
                fieldSizes,
                metadatas
              }
            ) })
          ] })
        ]
      }
    ) })
  ] }) }) });
};
const flattenPanels = (layout) => layout.flat(1);
const replaceMainFieldWithNameOnly = (layout) => layout.map(
  (row) => row.map((field) => ({
    ...field,
    mainField: field.mainField?.name
  }))
);
const extractMetadata = (layout) => {
  return layout.map(
    (row) => row.map(({ label, disabled, hint, placeholder, size, name, mainField }) => ({
      label,
      editable: !disabled,
      description: hint,
      mainField,
      placeholder,
      size,
      name,
      __temp_key__: ""
    }))
  );
};
const addTmpSpaceToLayout = (layout) => [
  ...layout.map((row) => {
    const totalSpaceTaken = row.reduce((acc, field) => acc + field.size, 0);
    if (totalSpaceTaken < 12) {
      return [
        ...row,
        {
          name: TEMP_FIELD_NAME,
          size: 12 - totalSpaceTaken,
          __temp_key__: ""
        }
      ];
    }
    return row;
  })
];
const addTmpKeysToLayout = (layout) => {
  const keys = fractionalIndexing.generateNKeysBetween(void 0, void 0, layout.length);
  return layout.map((row, rowIndex) => {
    const fieldKeys = fractionalIndexing.generateNKeysBetween(void 0, void 0, row.length);
    return {
      __temp_key__: keys[rowIndex],
      children: row.map((field, fieldIndex) => {
        return {
          ...field,
          __temp_key__: fieldKeys[fieldIndex]
        };
      })
    };
  });
};
const Header = ({ name }) => {
  const { formatMessage } = reactIntl.useIntl();
  const modified = strapiAdmin.useForm("Header", (state) => state.modified);
  const isSubmitting = strapiAdmin.useForm("Header", (state) => state.isSubmitting);
  return /* @__PURE__ */ jsxRuntime.jsx(
    strapiAdmin.Layouts.Header,
    {
      title: formatMessage(
        {
          id: index.getTranslation("components.SettingsViewWrapper.pluginHeader.title"),
          defaultMessage: `Configure the view - {name}`
        },
        { name: index.capitalise(name) }
      ),
      subtitle: formatMessage({
        id: index.getTranslation("components.SettingsViewWrapper.pluginHeader.description.edit-settings"),
        defaultMessage: "Customize how the edit view will look like."
      }),
      navigationAction: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.BackButton, {}),
      primaryAction: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { disabled: !modified, loading: isSubmitting, type: "submit", children: formatMessage({ id: "global.save", defaultMessage: "Save" }) })
    }
  );
};
exports.ConfigurationForm = ConfigurationForm;
exports.TEMP_FIELD_NAME = TEMP_FIELD_NAME;
//# sourceMappingURL=Form-aTchNxab.js.map

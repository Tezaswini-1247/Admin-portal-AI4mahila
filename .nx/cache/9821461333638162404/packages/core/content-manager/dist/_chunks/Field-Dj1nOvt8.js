"use strict";
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const designSystem = require("@strapi/design-system");
const pipe$1 = require("lodash/fp/pipe");
const reactIntl = require("react-intl");
const index = require("./index-BN1pPa5v.js");
const fractionalIndexing = require("fractional-indexing");
const Relations = require("./Relations-CkECnBOd.js");
const Icons = require("@strapi/icons");
const styledComponents = require("styled-components");
const ComponentIcon = require("./ComponentIcon-CRbtQEUV.js");
const reactDndHtml5Backend = require("react-dnd-html5-backend");
const useDragAndDrop = require("./useDragAndDrop-BMtgCYzL.js");
const objects = require("./objects-BcXOv6_9.js");
const slate = require("slate");
const slateHistory = require("slate-history");
const slateReact = require("slate-react");
const useDebounce = require("./useDebounce-CtcjDB3L.js");
const Toolbar = require("@radix-ui/react-toolbar");
const reactRouterDom = require("react-router-dom");
const CodeMirror = require("codemirror5");
const sanitizeHtml = require("sanitize-html");
const highlight_js = require("highlight.js");
const Markdown = require("markdown-it");
const abbr = require("markdown-it-abbr");
const container = require("markdown-it-container");
const deflist = require("markdown-it-deflist");
const emoji = require("markdown-it-emoji");
const footnote = require("markdown-it-footnote");
const ins = require("markdown-it-ins");
const mark = require("markdown-it-mark");
const sub = require("markdown-it-sub");
const sup = require("markdown-it-sup");
require("highlight.js/styles/solarized-dark.css");
require("codemirror5/addon/display/placeholder");
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
const pipe__default = /* @__PURE__ */ _interopDefault(pipe$1);
const Toolbar__namespace = /* @__PURE__ */ _interopNamespace(Toolbar);
const CodeMirror__default = /* @__PURE__ */ _interopDefault(CodeMirror);
const sanitizeHtml__default = /* @__PURE__ */ _interopDefault(sanitizeHtml);
const Markdown__default = /* @__PURE__ */ _interopDefault(Markdown);
const abbr__default = /* @__PURE__ */ _interopDefault(abbr);
const container__default = /* @__PURE__ */ _interopDefault(container);
const deflist__default = /* @__PURE__ */ _interopDefault(deflist);
const emoji__default = /* @__PURE__ */ _interopDefault(emoji);
const footnote__default = /* @__PURE__ */ _interopDefault(footnote);
const ins__default = /* @__PURE__ */ _interopDefault(ins);
const mark__default = /* @__PURE__ */ _interopDefault(mark);
const sub__default = /* @__PURE__ */ _interopDefault(sub);
const sup__default = /* @__PURE__ */ _interopDefault(sup);
const BLOCK_LIST_ATTRIBUTE_KEYS = ["__component", "__temp_key__"];
const traverseData = (predicate, transform) => (schema, components = {}) => (data = {}) => {
  const traverse = (datum, attributes) => {
    return Object.entries(datum).reduce((acc, [key, value]) => {
      const attribute = attributes[key];
      if (BLOCK_LIST_ATTRIBUTE_KEYS.includes(key) || value === null || value === void 0) {
        acc[key] = value;
        return acc;
      }
      if (attribute.type === "component") {
        if (attribute.repeatable) {
          const componentValue = predicate(attribute, value) ? transform(value, attribute) : value;
          acc[key] = componentValue.map(
            (componentData) => traverse(componentData, components[attribute.component]?.attributes ?? {})
          );
        } else {
          const componentValue = predicate(attribute, value) ? transform(value, attribute) : value;
          acc[key] = traverse(componentValue, components[attribute.component]?.attributes ?? {});
        }
      } else if (attribute.type === "dynamiczone") {
        const dynamicZoneValue = predicate(attribute, value) ? transform(value, attribute) : value;
        acc[key] = dynamicZoneValue.map(
          (componentData) => traverse(componentData, components[componentData.__component]?.attributes ?? {})
        );
      } else if (predicate(attribute, value)) {
        acc[key] = transform(value, attribute);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
  };
  return traverse(data, schema.attributes);
};
const removeProhibitedFields = (prohibitedFields) => traverseData(
  (attribute) => prohibitedFields.includes(attribute.type),
  () => ""
);
const prepareRelations = traverseData(
  (attribute) => attribute.type === "relation",
  () => ({
    connect: [],
    disconnect: []
  })
);
const prepareTempKeys = traverseData(
  (attribute) => attribute.type === "component" && attribute.repeatable || attribute.type === "dynamiczone",
  (data) => {
    if (Array.isArray(data) && data.length > 0) {
      const keys = fractionalIndexing.generateNKeysBetween(void 0, void 0, data.length);
      return data.map((datum, index2) => ({
        ...datum,
        __temp_key__: keys[index2]
      }));
    }
    return data;
  }
);
const removeFieldsThatDontExistOnSchema = (schema) => (data) => {
  const schemaKeys = Object.keys(schema.attributes);
  const dataKeys = Object.keys(data);
  const keysToRemove = dataKeys.filter((key) => !schemaKeys.includes(key));
  const revisedData = [...keysToRemove, ...index.DOCUMENT_META_FIELDS].reduce((acc, key) => {
    delete acc[key];
    return acc;
  }, structuredClone(data));
  return revisedData;
};
const removeNullValues = (data) => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (value === null) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
};
const transformDocument = (schema, components = {}) => (document2) => {
  const transformations = pipe__default.default(
    removeFieldsThatDontExistOnSchema(schema),
    removeProhibitedFields(["password"])(schema, components),
    removeNullValues,
    prepareRelations(schema, components),
    prepareTempKeys(schema, components)
  );
  return transformations(document2);
};
const componentStore = /* @__PURE__ */ new Map();
const useLazyComponents = (componentUids = []) => {
  const [lazyComponentStore, setLazyComponentStore] = React.useState(Object.fromEntries(componentStore));
  const newUids = componentUids.filter((uid) => !componentStore.get(uid));
  const [loading, setLoading] = React.useState(() => !!newUids.length);
  const getCustomField = strapiAdmin.useStrapiApp("useLazyComponents", (state) => state.customFields.get);
  React.useEffect(() => {
    const setStore = (store) => {
      setLazyComponentStore(store);
      setLoading(false);
    };
    const lazyLoadComponents = async (uids, components) => {
      const modules = await Promise.all(components);
      uids.forEach((uid, index2) => {
        componentStore.set(uid, modules[index2].default);
      });
      setStore(Object.fromEntries(componentStore));
    };
    if (newUids.length > 0) {
      setLoading(true);
      const componentPromises = newUids.reduce((arrayOfPromises, uid) => {
        const customField = getCustomField(uid);
        if (customField) {
          arrayOfPromises.push(customField.components.Input());
        }
        return arrayOfPromises;
      }, []);
      if (componentPromises.length > 0) {
        lazyLoadComponents(newUids, componentPromises);
      }
    }
  }, [newUids, getCustomField]);
  const cleanup = React.useCallback(() => {
    componentStore.clear();
    setLazyComponentStore({});
  }, []);
  return { isLazyLoading: loading, lazyComponentStore, cleanup };
};
const codeLanguages = [
  {
    value: "asm",
    label: "Assembly"
  },
  {
    value: "bash",
    label: "Bash"
  },
  {
    value: "c",
    label: "C"
  },
  {
    value: "clojure",
    label: "Clojure"
  },
  {
    value: "cobol",
    label: "COBOL"
  },
  {
    value: "cpp",
    label: "C++"
  },
  {
    value: "csharp",
    label: "C#"
  },
  {
    value: "css",
    label: "CSS"
  },
  {
    value: "dart",
    label: "Dart"
  },
  {
    value: "dockerfile",
    label: "Dockerfile"
  },
  {
    value: "elixir",
    label: "Elixir"
  },
  {
    value: "erlang",
    label: "Erlang"
  },
  {
    value: "fortran",
    label: "Fortran"
  },
  {
    value: "fsharp",
    label: "F#"
  },
  {
    value: "go",
    label: "Go"
  },
  {
    value: "graphql",
    label: "GraphQL"
  },
  {
    value: "groovy",
    label: "Groovy"
  },
  {
    value: "haskell",
    label: "Haskell"
  },
  {
    value: "haxe",
    label: "Haxe"
  },
  {
    value: "html",
    label: "HTML"
  },
  {
    value: "ini",
    label: "INI"
  },
  {
    value: "java",
    label: "Java"
  },
  {
    value: "javascript",
    label: "JavaScript"
  },
  {
    value: "jsx",
    label: "JavaScript (React)"
  },
  {
    value: "json",
    label: "JSON"
  },
  {
    value: "julia",
    label: "Julia"
  },
  {
    value: "kotlin",
    label: "Kotlin"
  },
  {
    value: "latex",
    label: "LaTeX"
  },
  {
    value: "lua",
    label: "Lua"
  },
  {
    value: "markdown",
    label: "Markdown"
  },
  {
    value: "matlab",
    label: "MATLAB"
  },
  {
    value: "makefile",
    label: "Makefile"
  },
  {
    value: "objectivec",
    label: "Objective-C"
  },
  {
    value: "perl",
    label: "Perl"
  },
  {
    value: "php",
    label: "PHP"
  },
  {
    value: "plaintext",
    label: "Plain text"
  },
  {
    value: "powershell",
    label: "PowerShell"
  },
  {
    value: "python",
    label: "Python"
  },
  {
    value: "r",
    label: "R"
  },
  {
    value: "ruby",
    label: "Ruby"
  },
  {
    value: "rust",
    label: "Rust"
  },
  {
    value: "sas",
    label: "SAS"
  },
  {
    value: "scala",
    label: "Scala"
  },
  {
    value: "scheme",
    label: "Scheme"
  },
  {
    value: "shell",
    label: "Shell"
  },
  {
    value: "sql",
    label: "SQL"
  },
  {
    value: "stata",
    label: "Stata"
  },
  {
    value: "swift",
    label: "Swift"
  },
  {
    value: "typescript",
    label: "TypeScript"
  },
  {
    value: "tsx",
    label: "TypeScript (React)"
  },
  {
    value: "vbnet",
    label: "VB.NET"
  },
  {
    value: "xml",
    label: "XML"
  },
  {
    value: "yaml",
    label: "YAML"
  }
];
const baseHandleConvert = (editor, attributesToSet) => {
  const [_, lastNodePath] = slate.Editor.last(editor, []);
  slate.Transforms.unwrapNodes(editor, {
    match: (node) => !slate.Editor.isEditor(node) && node.type === "list",
    split: true,
    at: editor.selection ?? lastNodePath
  });
  const [, updatedLastNodePath] = slate.Editor.last(editor, []);
  const entry = slate.Editor.above(editor, {
    match: (node) => !slate.Editor.isEditor(node) && node.type !== "text" && node.type !== "link",
    at: editor.selection ?? updatedLastNodePath
  });
  if (!entry || slate.Editor.isEditor(entry[0])) {
    return;
  }
  const [element, elementPath] = entry;
  slate.Transforms.setNodes(
    editor,
    {
      ...getAttributesToClear(element),
      ...attributesToSet
    },
    { at: elementPath }
  );
  return elementPath;
};
const getAttributesToClear = (element) => {
  const { children: _children, type: _type, ...extra } = element;
  const attributesToClear = Object.keys(extra).reduce(
    (currentAttributes, key) => ({ ...currentAttributes, [key]: null }),
    {}
  );
  return attributesToClear;
};
const isText$2 = (node) => {
  return slate.Node.isNode(node) && !slate.Editor.isEditor(node) && node.type === "text";
};
const pressEnterTwiceToExit = (editor) => {
  const nodeEntry = slate.Editor.above(editor, {
    match: (node2) => !slate.Editor.isEditor(node2) && !["link", "text"].includes(node2.type)
  });
  if (!nodeEntry || !editor.selection) {
    return;
  }
  const [node, nodePath] = nodeEntry;
  const isNodeEnd = slate.Editor.isEnd(editor, editor.selection.anchor, nodePath);
  const lastTextNode = node.children.at(-1);
  const isEmptyLine = isText$2(lastTextNode) && lastTextNode.text.endsWith("\n");
  if (isNodeEnd && isEmptyLine) {
    slate.Transforms.delete(editor, { distance: 1, unit: "character", reverse: true });
    slate.Transforms.insertNodes(editor, {
      type: "paragraph",
      children: [{ type: "text", text: "" }]
    });
    return;
  }
  slate.Transforms.insertText(editor, "\n");
  if (isNodeEnd) {
    ["bold", "italic", "underline", "strikethrough", "code"].forEach((modifier) => {
      slate.Editor.removeMark(editor, modifier);
    });
  }
};
const CodeBlock = styledComponents.styled.pre`
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.neutral100};
  max-width: 100%;
  overflow: auto;
  padding: ${({ theme }) => `${theme.spaces[3]} ${theme.spaces[4]}`};
  flex-shrink: 1;

  & > code {
    font-family: 'SF Mono', SFMono-Regular, ui-monospace, 'DejaVu Sans Mono', Menlo, Consolas,
      monospace;
    color: ${({ theme }) => theme.colors.neutral800};
    overflow: auto;
    max-width: 100%;
  }
`;
const CodeEditor = (props) => {
  const { editor } = useBlocksEditorContext("ImageDialog");
  const editorIsFocused = slateReact.useFocused();
  const imageIsSelected = slateReact.useSelected();
  const { formatMessage } = reactIntl.useIntl();
  const [isSelectOpen, setIsSelectOpen] = React__namespace.useState(false);
  const shouldDisplayLanguageSelect = editorIsFocused && imageIsSelected || isSelectOpen;
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { position: "relative", width: "100%", children: [
    /* @__PURE__ */ jsxRuntime.jsx(CodeBlock, { ...props.attributes, children: /* @__PURE__ */ jsxRuntime.jsx("code", { children: props.children }) }),
    shouldDisplayLanguageSelect && /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Box,
      {
        position: "absolute",
        background: "neutral0",
        borderColor: "neutral150",
        borderStyle: "solid",
        borderWidth: "0.5px",
        shadow: "tableShadow",
        top: "100%",
        marginTop: 1,
        right: 0,
        padding: 1,
        hasRadius: true,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.SingleSelect,
          {
            onChange: (open) => {
              slate.Transforms.setNodes(
                editor,
                { language: open.toString() },
                { match: (node) => !slate.Editor.isEditor(node) && node.type === "code" }
              );
            },
            value: props.element.type === "code" && props.element.language || "plaintext",
            onOpenChange: (open) => {
              setIsSelectOpen(open);
              if (!open) {
                slateReact.ReactEditor.focus(editor);
              }
            },
            onCloseAutoFocus: (e) => e.preventDefault(),
            "aria-label": formatMessage({
              id: "components.Blocks.blocks.code.languageLabel",
              defaultMessage: "Select a language"
            }),
            children: codeLanguages.map(({ value, label }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value, children: label }, value))
          }
        )
      }
    )
  ] });
};
const codeBlocks = {
  code: {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(CodeEditor, { ...props }),
    icon: Icons.CodeBlock,
    label: {
      id: "components.Blocks.blocks.code",
      defaultMessage: "Code block"
    },
    matchNode: (node) => node.type === "code",
    isInBlocksSelector: true,
    handleConvert(editor) {
      baseHandleConvert(editor, { type: "code", language: "plaintext" });
    },
    handleEnterKey(editor) {
      pressEnterTwiceToExit(editor);
    },
    snippets: ["```"],
    dragHandleTopMargin: "10px"
  }
};
const H1 = styledComponents.styled(designSystem.Typography).attrs({ tag: "h1" })`
  font-size: 4.2rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const H2 = styledComponents.styled(designSystem.Typography).attrs({ tag: "h2" })`
  font-size: 3.5rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const H3 = styledComponents.styled(designSystem.Typography).attrs({ tag: "h3" })`
  font-size: 2.9rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const H4 = styledComponents.styled(designSystem.Typography).attrs({ tag: "h4" })`
  font-size: 2.4rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const H5 = styledComponents.styled(designSystem.Typography).attrs({ tag: "h5" })`
  font-size: 2rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const H6 = styledComponents.styled(designSystem.Typography).attrs({ tag: "h6" })`
  font-size: 1.6rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const handleConvertToHeading = (editor, level) => {
  baseHandleConvert(editor, { type: "heading", level });
};
const headingBlocks = {
  "heading-one": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(H1, { ...props.attributes, children: props.children }),
    icon: Icons.HeadingOne,
    label: {
      id: "components.Blocks.blocks.heading1",
      defaultMessage: "Heading 1"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 1),
    matchNode: (node) => node.type === "heading" && node.level === 1,
    isInBlocksSelector: true,
    snippets: ["#"],
    dragHandleTopMargin: "14px"
  },
  "heading-two": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(H2, { ...props.attributes, children: props.children }),
    icon: Icons.HeadingTwo,
    label: {
      id: "components.Blocks.blocks.heading2",
      defaultMessage: "Heading 2"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 2),
    matchNode: (node) => node.type === "heading" && node.level === 2,
    isInBlocksSelector: true,
    snippets: ["##"],
    dragHandleTopMargin: "10px"
  },
  "heading-three": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(H3, { ...props.attributes, children: props.children }),
    icon: Icons.HeadingThree,
    label: {
      id: "components.Blocks.blocks.heading3",
      defaultMessage: "Heading 3"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 3),
    matchNode: (node) => node.type === "heading" && node.level === 3,
    isInBlocksSelector: true,
    snippets: ["###"],
    dragHandleTopMargin: "7px"
  },
  "heading-four": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(H4, { ...props.attributes, children: props.children }),
    icon: Icons.HeadingFour,
    label: {
      id: "components.Blocks.blocks.heading4",
      defaultMessage: "Heading 4"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 4),
    matchNode: (node) => node.type === "heading" && node.level === 4,
    isInBlocksSelector: true,
    snippets: ["####"],
    dragHandleTopMargin: "4px"
  },
  "heading-five": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(H5, { ...props.attributes, children: props.children }),
    icon: Icons.HeadingFive,
    label: {
      id: "components.Blocks.blocks.heading5",
      defaultMessage: "Heading 5"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 5),
    matchNode: (node) => node.type === "heading" && node.level === 5,
    isInBlocksSelector: true,
    snippets: ["#####"]
  },
  "heading-six": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(H6, { ...props.attributes, children: props.children }),
    icon: Icons.HeadingSix,
    label: {
      id: "components.Blocks.blocks.heading6",
      defaultMessage: "Heading 6"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 6),
    matchNode: (node) => node.type === "heading" && node.level === 6,
    isInBlocksSelector: true,
    snippets: ["######"],
    dragHandleTopMargin: "-2px"
  }
};
const ImageWrapper = styledComponents.styled(designSystem.Flex)`
  transition-property: box-shadow;
  transition-duration: 0.2s;
  ${(props) => props.$isFocused && styledComponents.css`
      box-shadow: ${props.theme.colors.primary600} 0px 0px 0px 3px;
    `}

  & > img {
    height: auto;
    // The max-height is decided with the design team, the 56px is the height of the toolbar
    max-height: calc(512px - 56px);
    max-width: 100%;
    object-fit: contain;
  }
`;
const IMAGE_SCHEMA_FIELDS = [
  "name",
  "alternativeText",
  "url",
  "caption",
  "width",
  "height",
  "formats",
  "hash",
  "ext",
  "mime",
  "size",
  "previewUrl",
  "provider",
  "provider_metadata",
  "createdAt",
  "updatedAt"
];
const pick = (object, keys) => {
  const entries = keys.map((key) => [key, object[key]]);
  return Object.fromEntries(entries);
};
const isImage = (element) => {
  return element.type === "image";
};
const Image = ({ attributes, children, element }) => {
  const editorIsFocused = slateReact.useFocused();
  const imageIsSelected = slateReact.useSelected();
  if (!isImage(element)) {
    return null;
  }
  const { url, alternativeText, width, height } = element.image;
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { ...attributes, children: [
    children,
    /* @__PURE__ */ jsxRuntime.jsx(
      ImageWrapper,
      {
        background: "neutral100",
        contentEditable: false,
        justifyContent: "center",
        $isFocused: editorIsFocused && imageIsSelected,
        hasRadius: true,
        children: /* @__PURE__ */ jsxRuntime.jsx("img", { src: url, alt: alternativeText, width, height })
      }
    )
  ] });
};
const ImageDialog = () => {
  const [isOpen, setIsOpen] = React__namespace.useState(true);
  const { editor } = useBlocksEditorContext("ImageDialog");
  const components = strapiAdmin.useStrapiApp("ImageDialog", (state) => state.components);
  if (!components || !isOpen) return null;
  const MediaLibraryDialog = components["media-library"];
  const insertImages = (images) => {
    slate.Transforms.unwrapNodes(editor, {
      match: (node) => !slate.Editor.isEditor(node) && node.type === "list",
      split: true
    });
    const nodeEntryBeingReplaced = slate.Editor.above(editor, {
      match(node) {
        if (slate.Editor.isEditor(node)) return false;
        const isInlineNode = ["text", "link"].includes(node.type);
        return !isInlineNode;
      }
    });
    if (!nodeEntryBeingReplaced) return;
    const [, pathToInsert] = nodeEntryBeingReplaced;
    slate.Transforms.removeNodes(editor);
    const nodesToInsert = images.map((image) => {
      const imageNode = {
        type: "image",
        image,
        children: [{ type: "text", text: "" }]
      };
      return imageNode;
    });
    slate.Transforms.insertNodes(editor, nodesToInsert, { at: pathToInsert });
    slate.Transforms.select(editor, pathToInsert);
  };
  const handleSelectAssets = (images) => {
    const formattedImages = images.map((image) => {
      const expectedImage = pick(image, IMAGE_SCHEMA_FIELDS);
      const nodeImage = {
        ...expectedImage,
        alternativeText: expectedImage.alternativeText || expectedImage.name,
        url: useDebounce.prefixFileUrlWithBackendUrl(image.url)
      };
      return nodeImage;
    });
    insertImages(formattedImages);
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    MediaLibraryDialog,
    {
      allowedTypes: ["images"],
      onClose: () => setIsOpen(false),
      onSelectAssets: handleSelectAssets
    }
  );
};
const imageBlocks = {
  image: {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(Image, { ...props }),
    icon: Icons.Image,
    label: {
      id: "components.Blocks.blocks.image",
      defaultMessage: "Image"
    },
    matchNode: (node) => node.type === "image",
    isInBlocksSelector: true,
    handleBackspaceKey(editor) {
      if (editor.children.length === 1) {
        slate.Transforms.setNodes(editor, {
          type: "paragraph",
          // @ts-expect-error we're only setting image as null so that Slate deletes it
          image: null,
          children: [{ type: "text", text: "" }]
        });
      } else {
        slate.Transforms.removeNodes(editor);
      }
    },
    handleEnterKey(editor) {
      slate.Transforms.insertNodes(editor, {
        type: "paragraph",
        children: [{ type: "text", text: "" }]
      });
    },
    handleConvert: () => {
      return () => /* @__PURE__ */ jsxRuntime.jsx(ImageDialog, {});
    },
    snippets: ["!["]
  }
};
const removeLink = (editor) => {
  slate.Transforms.unwrapNodes(editor, {
    match: (node) => !slate.Editor.isEditor(node) && slate.Element.isElement(node) && node.type === "link"
  });
};
const insertLink = (editor, { url }) => {
  if (editor.selection) {
    const linkNodes = Array.from(
      slate.Editor.nodes(editor, {
        at: editor.selection,
        match: (node) => !slate.Editor.isEditor(node) && node.type === "link"
      })
    );
    linkNodes.forEach(([, path]) => {
      slate.Transforms.unwrapNodes(editor, { at: path });
    });
    if (slate.Range.isCollapsed(editor.selection)) {
      const link = {
        type: "link",
        url: url ?? "",
        children: [{ type: "text", text: url }]
      };
      slate.Transforms.insertNodes(editor, link);
    } else {
      slate.Transforms.wrapNodes(editor, { type: "link", url: url ?? "" }, {
        split: true
      });
    }
  }
};
const editLink = (editor, link) => {
  const { url, text } = link;
  if (!editor.selection) {
    return;
  }
  const linkEntry = slate.Editor.above(editor, {
    match: (node) => !slate.Editor.isEditor(node) && node.type === "link"
  });
  if (linkEntry) {
    const [, linkPath] = linkEntry;
    slate.Transforms.setNodes(editor, { url }, { at: linkPath });
    if (text !== "" && text !== slate.Editor.string(editor, linkPath)) {
      const linkNodeChildrens = Array.from(slate.Node.children(editor, linkPath, { reverse: true }));
      linkNodeChildrens.forEach(([, childPath]) => {
        slate.Transforms.removeNodes(editor, { at: childPath });
      });
      slate.Transforms.insertNodes(editor, [{ type: "text", text }], { at: linkPath.concat(0) });
    }
  }
};
const getEntries = (object) => Object.entries(object);
const getKeys = (object) => Object.keys(object);
const isLinkNode = (element) => {
  return element.type === "link";
};
const isListNode$1 = (element) => {
  return element.type === "list";
};
const StyledBaseLink = styledComponents.styled(designSystem.BaseLink)`
  text-decoration: none;
`;
const RemoveButton = styledComponents.styled(designSystem.Button)`
  visibility: ${(props) => props.$visible ? "visible" : "hidden"};
`;
const LinkContent = React__namespace.forwardRef(
  ({ link, children, attributes }, forwardedRef) => {
    const { formatMessage } = reactIntl.useIntl();
    const { editor } = useBlocksEditorContext("Link");
    const path = slateReact.ReactEditor.findPath(editor, link);
    const [popoverOpen, setPopoverOpen] = React__namespace.useState(
      editor.lastInsertedLinkPath ? slate.Path.equals(path, editor.lastInsertedLinkPath) : false
    );
    const elementText = link.children.map((child) => child.text).join("");
    const [linkText, setLinkText] = React__namespace.useState(elementText);
    const [linkUrl, setLinkUrl] = React__namespace.useState(link.url);
    const linkInputRef = React__namespace.useRef(null);
    const isLastInsertedLink = editor.lastInsertedLinkPath ? !slate.Path.equals(path, editor.lastInsertedLinkPath) : true;
    const [isSaveDisabled, setIsSaveDisabled] = React__namespace.useState(false);
    const onLinkChange = (e) => {
      setIsSaveDisabled(false);
      setLinkUrl(e.target.value);
      try {
        new URL(
          e.target.value?.startsWith("/") ? `https://strapi.io${e.target.value}` : e.target.value
        );
      } catch (error) {
        setIsSaveDisabled(true);
      }
    };
    const handleSave = (e) => {
      e.stopPropagation();
      if (editor.selection && slate.Range.isCollapsed(editor.selection)) {
        const [, parentPath] = slate.Editor.parent(editor, editor.selection.focus?.path);
        slate.Transforms.select(editor, parentPath);
      }
      editLink(editor, { url: linkUrl, text: linkText });
      setPopoverOpen(false);
      editor.lastInsertedLinkPath = null;
      slateReact.ReactEditor.focus(editor);
    };
    const handleClose = () => {
      if (link.url === "") {
        removeLink(editor);
      }
      setPopoverOpen(false);
      slateReact.ReactEditor.focus(editor);
    };
    React__namespace.useEffect(() => {
      if (popoverOpen) linkInputRef.current?.focus();
    }, [popoverOpen]);
    const inputNotDirty = !linkText || !linkUrl || link.url && link.url === linkUrl && elementText && elementText === linkText;
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Popover.Root, { open: popoverOpen, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
        StyledBaseLink,
        {
          ...attributes,
          ref: forwardedRef,
          href: link.url,
          onClick: () => setPopoverOpen(true),
          color: "primary600",
          children
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Content, { onPointerDownOutside: handleClose, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { padding: 4, direction: "column", gap: 4, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Root, { width: "368px", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, alignItems: "stretch", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
            id: "components.Blocks.popover.text",
            defaultMessage: "Text"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Field.Input,
            {
              name: "text",
              placeholder: formatMessage({
                id: "components.Blocks.popover.text.placeholder",
                defaultMessage: "Enter link text"
              }),
              value: linkText,
              onChange: (e) => {
                setLinkText(e.target.value);
              }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Root, { width: "368px", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, alignItems: "stretch", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
            id: "components.Blocks.popover.link",
            defaultMessage: "Link"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Field.Input,
            {
              ref: linkInputRef,
              name: "url",
              placeholder: formatMessage({
                id: "components.Blocks.popover.link.placeholder",
                defaultMessage: "Paste link"
              }),
              value: linkUrl,
              onChange: onLinkChange
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", width: "100%", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            RemoveButton,
            {
              variant: "danger-light",
              onClick: () => removeLink(editor),
              $visible: isLastInsertedLink,
              children: formatMessage({
                id: "components.Blocks.popover.remove",
                defaultMessage: "Remove"
              })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", onClick: handleClose, children: formatMessage({
              id: "components.Blocks.popover.cancel",
              defaultMessage: "Cancel"
            }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { disabled: Boolean(inputNotDirty) || isSaveDisabled, onClick: handleSave, children: formatMessage({
              id: "components.Blocks.popover.save",
              defaultMessage: "Save"
            }) })
          ] })
        ] })
      ] }) })
    ] });
  }
);
const Link = React__namespace.forwardRef((props, forwardedRef) => {
  if (!isLinkNode(props.element)) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(LinkContent, { ...props, link: props.element, ref: forwardedRef });
});
const linkBlocks = {
  link: {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(Link, { element: props.element, attributes: props.attributes, children: props.children }),
    // No handleConvert here, links are created via the link button in the toolbar
    matchNode: (node) => node.type === "link",
    isInBlocksSelector: false
  }
};
const listStyle = styledComponents.css`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces[2]};
  margin-inline-start: ${({ theme }) => theme.spaces[0]};
  margin-inline-end: ${({ theme }) => theme.spaces[0]};
  padding-inline-start: ${({ theme }) => theme.spaces[2]};

  ol,
  ul {
    margin-block-start: ${({ theme }) => theme.spaces[0]};
    margin-block-end: ${({ theme }) => theme.spaces[0]};
  }

  li {
    margin-inline-start: ${({ theme }) => theme.spaces[3]};
  }
`;
const Orderedlist = styledComponents.styled.ol`
  list-style-type: ${(props) => props.$listStyleType};
  ${listStyle}
`;
const Unorderedlist = styledComponents.styled.ul`
  list-style-type: ${(props) => props.$listStyleType};
  ${listStyle}
`;
const orderedStyles = ["decimal", "lower-alpha", "upper-roman"];
const unorderedStyles = ["disc", "circle", "square"];
const List = ({ attributes, children, element }) => {
  if (!isListNode$1(element)) {
    return null;
  }
  const listStyles = element.format === "ordered" ? orderedStyles : unorderedStyles;
  const nextIndex = (element.indentLevel || 0) % listStyles.length;
  const listStyleType = listStyles[nextIndex];
  if (element.format === "ordered") {
    return /* @__PURE__ */ jsxRuntime.jsx(Orderedlist, { $listStyleType: listStyleType, ...attributes, children });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(Unorderedlist, { $listStyleType: listStyleType, ...attributes, children });
};
const replaceListWithEmptyBlock = (editor, currentListPath) => {
  slate.Transforms.removeNodes(editor, { at: currentListPath });
  if (currentListPath[0] === 0) {
    slate.Transforms.insertNodes(
      editor,
      {
        type: "paragraph",
        children: [{ type: "text", text: "" }]
      },
      { at: currentListPath }
    );
    slate.Transforms.select(editor, currentListPath);
  }
};
const isText$1 = (node) => {
  return slate.Node.isNode(node) && !slate.Editor.isEditor(node) && node.type === "text";
};
const handleBackspaceKeyOnList = (editor, event) => {
  if (!editor.selection) return;
  const [currentListItem, currentListItemPath] = slate.Editor.parent(editor, editor.selection.anchor);
  const [currentList, currentListPath] = slate.Editor.parent(editor, currentListItemPath);
  const isListEmpty = currentList.children.length === 1 && isText$1(currentListItem.children[0]) && currentListItem.children[0].text === "";
  const isListItemEmpty = currentListItem.children.length === 1 && isText$1(currentListItem.children[0]) && currentListItem.children[0].text === "";
  const isFocusAtTheBeginningOfAChild = editor.selection.focus.offset === 0 && editor.selection.focus.path.at(-2) === 0;
  if (isListEmpty) {
    const parentListEntry = slate.Editor.above(editor, {
      at: currentListPath,
      match: (node) => !slate.Editor.isEditor(node) && node.type === "list"
    });
    if (!parentListEntry) {
      event.preventDefault();
      replaceListWithEmptyBlock(editor, currentListPath);
    }
  } else if (isFocusAtTheBeginningOfAChild) {
    slate.Transforms.liftNodes(editor, {
      match: (node) => !slate.Editor.isEditor(node) && node.type === "list-item"
    });
    slate.Transforms.setNodes(editor, { type: "paragraph" });
  } else if (isListItemEmpty) {
    const previousEntry = slate.Editor.previous(editor, {
      at: currentListItemPath
    });
    const nextEntry = slate.Editor.next(editor, {
      at: currentListItemPath
    });
    if (previousEntry && nextEntry) {
      event.preventDefault();
      slate.Transforms.removeNodes(editor, {
        at: currentListItemPath
      });
      const [previousList] = previousEntry;
      const [nextList] = nextEntry;
      if (!slate.Editor.isEditor(previousList) && !isText$1(previousList) && isListNode$1(previousList) && !slate.Editor.isEditor(nextList) && !isText$1(nextList) && isListNode$1(nextList)) {
        if (previousList.type === "list" && nextList.type === "list" && previousList.format === nextList.format && previousList.indentLevel === nextList.indentLevel) {
          slate.Transforms.mergeNodes(editor, {
            at: currentListItemPath
          });
        }
      }
    }
  }
};
const handleEnterKeyOnList = (editor) => {
  const currentListItemEntry = slate.Editor.above(editor, {
    match: (node) => !slate.Editor.isEditor(node) && node.type === "list-item"
  });
  if (!currentListItemEntry || !editor.selection) {
    return;
  }
  const [currentListItem, currentListItemPath] = currentListItemEntry;
  const [currentList, currentListPath] = slate.Editor.parent(editor, currentListItemPath);
  const isListEmpty = currentList.children.length === 1 && isText$1(currentListItem.children[0]) && currentListItem.children[0].text === "";
  const isListItemEmpty = currentListItem.children.length === 1 && isText$1(currentListItem.children[0]) && currentListItem.children[0].text === "";
  const isFocusAtTheBeginningOfAChild = editor.selection.focus.offset === 0 && editor.selection.focus.path.at(-1) === 0;
  if (isListEmpty) {
    replaceListWithEmptyBlock(editor, currentListPath);
  } else if (isFocusAtTheBeginningOfAChild && !isListItemEmpty) {
    const currentNode = slate.Editor.above(editor, { at: editor.selection.anchor });
    slate.Transforms.insertNodes(editor, { type: "list-item", children: [{ type: "text", text: "" }] });
    if (currentNode) {
      const path = currentNode[1];
      const updatedPath = [...path.slice(0, -1), path[path.length - 1] + 1];
      slate.Transforms.select(editor, {
        anchor: { path: updatedPath.concat(0), offset: 0 },
        focus: { path: updatedPath.concat(0), offset: 0 }
      });
    }
  } else if (isListItemEmpty) {
    if (!slate.Editor.isEditor(currentList) && isListNode$1(currentList) && currentList?.indentLevel && currentList.indentLevel > 0) {
      const previousIndentLevel = currentList.indentLevel - 1;
      const parentListNodeEntry = slate.Editor.above(editor, {
        match: (node) => !slate.Editor.isEditor(node) && node.type === "list" && (node.indentLevel || 0) === previousIndentLevel
      });
      if (parentListNodeEntry) {
        const modifiedPath = currentListItemPath.slice(0, -1);
        if (modifiedPath.length > 0) {
          modifiedPath[modifiedPath.length - 1] += 1;
        }
        slate.Transforms.moveNodes(editor, {
          at: currentListItemPath,
          to: modifiedPath
        });
        return;
      }
    }
    slate.Transforms.removeNodes(editor, { at: currentListItemPath });
    const createdParagraphPath = slate.Path.next(currentListPath);
    slate.Transforms.insertNodes(
      editor,
      {
        type: "paragraph",
        children: [{ type: "text", text: "" }]
      },
      { at: createdParagraphPath }
    );
    slate.Transforms.select(editor, createdParagraphPath);
  } else {
    const isNodeEnd = slate.Editor.isEnd(editor, editor.selection.anchor, currentListItemPath);
    if (isNodeEnd) {
      slate.Transforms.insertNodes(editor, { type: "list-item", children: [{ type: "text", text: "" }] });
    } else {
      slate.Transforms.splitNodes(editor);
    }
  }
};
const handleConvertToList = (editor, format) => {
  const convertedPath = baseHandleConvert(editor, { type: "list-item" });
  if (!convertedPath) return;
  slate.Transforms.wrapNodes(editor, { type: "list", format, children: [] }, { at: convertedPath });
};
const handleTabOnList = (editor) => {
  const currentListItemEntry = slate.Editor.above(editor, {
    match: (node) => !slate.Editor.isEditor(node) && node.type === "list-item"
  });
  if (!currentListItemEntry || !editor.selection) {
    return;
  }
  const [currentListItem, currentListItemPath] = currentListItemEntry;
  const [currentList] = slate.Editor.parent(editor, currentListItemPath);
  if (currentListItem === currentList.children[0]) return;
  const currentListItemIndex = currentList.children.findIndex((item) => item === currentListItem);
  const previousNode = currentList.children[currentListItemIndex - 1];
  if (previousNode.type === "list") {
    const nodePath = slateReact.ReactEditor.findPath(editor, previousNode);
    const insertAtPath = previousNode.children.length;
    slate.Transforms.moveNodes(editor, {
      at: currentListItemPath,
      to: nodePath.concat(insertAtPath)
    });
    return;
  }
  if (!slate.Editor.isEditor(currentList) && isListNode$1(currentList)) {
    slate.Transforms.wrapNodes(editor, {
      type: "list",
      format: currentList.format,
      indentLevel: (currentList.indentLevel || 0) + 1,
      children: []
    });
  }
};
const listBlocks = {
  "list-ordered": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(List, { ...props }),
    label: {
      id: "components.Blocks.blocks.orderedList",
      defaultMessage: "Numbered list"
    },
    icon: Icons.NumberList,
    matchNode: (node) => node.type === "list" && node.format === "ordered",
    isInBlocksSelector: true,
    handleConvert: (editor) => handleConvertToList(editor, "ordered"),
    handleEnterKey: handleEnterKeyOnList,
    handleBackspaceKey: handleBackspaceKeyOnList,
    handleTab: handleTabOnList,
    snippets: ["1."]
  },
  "list-unordered": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(List, { ...props }),
    label: {
      id: "components.Blocks.blocks.unorderedList",
      defaultMessage: "Bulleted list"
    },
    icon: Icons.BulletList,
    matchNode: (node) => node.type === "list" && node.format === "unordered",
    isInBlocksSelector: true,
    handleConvert: (editor) => handleConvertToList(editor, "unordered"),
    handleEnterKey: handleEnterKeyOnList,
    handleBackspaceKey: handleBackspaceKeyOnList,
    handleTab: handleTabOnList,
    snippets: ["-", "*", "+"]
  },
  "list-item": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "li", ...props.attributes, children: props.children }),
    // No handleConvert, list items are created when converting to the parent list
    matchNode: (node) => node.type === "list-item",
    isInBlocksSelector: false,
    dragHandleTopMargin: "-2px"
  }
};
const paragraphBlocks = {
  paragraph: {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "p", variant: "omega", ...props.attributes, children: props.children }),
    icon: Icons.Paragraph,
    label: {
      id: "components.Blocks.blocks.text",
      defaultMessage: "Text"
    },
    matchNode: (node) => node.type === "paragraph",
    isInBlocksSelector: true,
    dragHandleTopMargin: "-2px",
    handleConvert(editor) {
      baseHandleConvert(editor, { type: "paragraph" });
    },
    handleEnterKey(editor) {
      if (!editor.selection) {
        return;
      }
      const anchorPathInitialPosition = editor.selection.anchor.path;
      slate.Transforms.splitNodes(editor, {
        // Makes sure we always create a new node,
        // even if there's nothing to the right of the cursor in the node.
        always: true
      });
      const parentBlockEntry = slate.Editor.above(editor, {
        match: (node) => !slate.Editor.isEditor(node) && node.type !== "text"
      });
      if (!parentBlockEntry) {
        return;
      }
      const [, parentBlockPath] = parentBlockEntry;
      const isNodeEnd = slate.Editor.isEnd(editor, editor.selection.anchor, parentBlockPath);
      const [fragmentedNode] = slate.Editor.parent(editor, editor.selection.anchor.path);
      slate.Transforms.removeNodes(editor);
      const hasNextNode = editor.children.length - anchorPathInitialPosition[0] > 1;
      slate.Transforms.insertNodes(
        editor,
        {
          type: "paragraph",
          // Don't carry over the modifiers from the previous node if there was no text after the cursor
          children: isNodeEnd ? [{ type: "text", text: "" }] : fragmentedNode.children
        },
        {
          at: hasNextNode ? [anchorPathInitialPosition[0] + 1] : [editor.children.length]
        }
      );
      slate.Transforms.select(editor, editor.start([anchorPathInitialPosition[0] + 1]));
    }
  }
};
const Blockquote = styledComponents.styled.blockquote.attrs({ role: "blockquote" })`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  border-left: ${({ theme }) => `${theme.spaces[1]} solid ${theme.colors.neutral200}`};
  padding: ${({ theme }) => theme.spaces[2]} ${({ theme }) => theme.spaces[4]};
  color: ${({ theme }) => theme.colors.neutral600};
`;
const quoteBlocks = {
  quote: {
    renderElement: (props) => (
      // The div is needed to make sure the padding bottom from BlocksContent is applied properly
      // when the quote is the last block in the editor
      /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsx(Blockquote, { ...props.attributes, children: props.children }) })
    ),
    icon: Icons.Quotes,
    label: {
      id: "components.Blocks.blocks.quote",
      defaultMessage: "Quote"
    },
    matchNode: (node) => node.type === "quote",
    isInBlocksSelector: true,
    handleConvert(editor) {
      baseHandleConvert(editor, { type: "quote" });
    },
    handleEnterKey(editor) {
      pressEnterTwiceToExit(editor);
    },
    snippets: [">"],
    dragHandleTopMargin: "6px"
  }
};
const ToolbarWrapper = styledComponents.styled(designSystem.Flex)`
  &[aria-disabled='true'] {
    cursor: not-allowed;
  }
`;
const Separator = styledComponents.styled(Toolbar__namespace.Separator)`
  background: ${({ theme }) => theme.colors.neutral150};
  width: 1px;
  height: 2.4rem;
`;
const FlexButton = styledComponents.styled(designSystem.Flex)`
  // Inherit the not-allowed cursor from ToolbarWrapper when disabled
  &[aria-disabled] {
    cursor: inherit;
  }

  &[aria-disabled='false'] {
    cursor: pointer;

    // Only apply hover styles if the button is enabled
    &:hover {
      background: ${({ theme }) => theme.colors.primary100};
    }
  }
`;
const SelectWrapper = styledComponents.styled(designSystem.Box)`
  // Styling changes to SingleSelect component don't work, so adding wrapper to target SingleSelect
  div[role='combobox'] {
    border: none;
    cursor: pointer;
    min-height: unset;
    padding-top: 6px;
    padding-bottom: 6px;

    &[aria-disabled='false']:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.colors.primary100};
    }

    &[aria-disabled] {
      background: transparent;
      cursor: inherit;

      // Select text and icons should also have disabled color
      span {
        color: ${({ theme }) => theme.colors.neutral600};
      }
    }
  }
`;
function useConversionModal() {
  const [modalElement, setModalComponent] = React__namespace.useState(null);
  const handleConversionResult = (renderModal) => {
    if (renderModal) {
      setModalComponent(React__namespace.cloneElement(renderModal(), { key: Date.now() }));
    }
  };
  return { modalElement, handleConversionResult };
}
const ToolbarButton = ({
  icon: Icon,
  name: name2,
  label,
  isActive,
  disabled,
  handleClick
}) => {
  const { editor } = useBlocksEditorContext("ToolbarButton");
  const { formatMessage } = reactIntl.useIntl();
  const labelMessage = formatMessage(label);
  const enabledColor = isActive ? "primary600" : "neutral600";
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tooltip, { description: labelMessage, children: /* @__PURE__ */ jsxRuntime.jsx(
    Toolbar__namespace.ToggleItem,
    {
      value: name2,
      "data-state": isActive ? "on" : "off",
      onMouseDown: (e) => {
        e.preventDefault();
        handleClick();
        slateReact.ReactEditor.focus(editor);
      },
      "aria-disabled": disabled,
      disabled,
      "aria-label": labelMessage,
      asChild: true,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        FlexButton,
        {
          tag: "button",
          background: isActive ? "primary100" : "",
          alignItems: "center",
          justifyContent: "center",
          width: 7,
          height: 7,
          hasRadius: true,
          children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { fill: disabled ? "neutral300" : enabledColor })
        }
      )
    }
  ) });
};
const BlocksDropdown = () => {
  const { editor, blocks, disabled } = useBlocksEditorContext("BlocksDropdown");
  const { formatMessage } = reactIntl.useIntl();
  const { modalElement, handleConversionResult } = useConversionModal();
  const blockKeysToInclude = getEntries(blocks).reduce((currentKeys, entry) => {
    const [key, block] = entry;
    return block.isInBlocksSelector ? [...currentKeys, key] : currentKeys;
  }, []);
  const [blockSelected, setBlockSelected] = React__namespace.useState("paragraph");
  const handleSelect = (optionKey) => {
    if (!isSelectorBlockKey(optionKey)) {
      return;
    }
    const editorIsEmpty = editor.children.length === 1 && slate.Editor.isEmpty(editor, editor.children[0]);
    if (!editor.selection && !editorIsEmpty) {
      slate.Transforms.insertNodes(
        editor,
        {
          type: "quote",
          children: [{ type: "text", text: "" }]
        },
        {
          select: true
          // Since there's no selection, Slate will automatically insert the node at the end
        }
      );
    } else if (!editor.selection && editorIsEmpty) {
      slate.Transforms.select(editor, slate.Editor.start(editor, [0, 0]));
    }
    const currentListEntry = slate.Editor.above(editor, {
      match: (node) => !slate.Editor.isEditor(node) && node.type === "list"
    });
    if (currentListEntry && ["list-ordered", "list-unordered"].includes(optionKey)) {
      const [currentList, currentListPath] = currentListEntry;
      const format = optionKey === "list-ordered" ? "ordered" : "unordered";
      if (!slate.Editor.isEditor(currentList) && isListNode(currentList)) {
        if (currentList.format !== format) {
          slate.Transforms.setNodes(editor, { format }, { at: currentListPath });
        }
      }
      return;
    }
    const maybeRenderModal = blocks[optionKey].handleConvert?.(editor);
    handleConversionResult(maybeRenderModal);
    setBlockSelected(optionKey);
    slateReact.ReactEditor.focus(editor);
  };
  const preventSelectFocus = (e) => e.preventDefault();
  React__namespace.useEffect(() => {
    if (editor.selection) {
      let selectedNode;
      const currentListEntry = slate.Editor.above(editor, {
        match: (node) => !slate.Editor.isEditor(node) && node.type === "list",
        at: editor.selection.anchor
      });
      if (currentListEntry) {
        const [currentList] = currentListEntry;
        selectedNode = currentList;
      } else {
        const [anchorNode] = slate.Editor.parent(editor, editor.selection.anchor, {
          edge: "start",
          depth: 2
        });
        if (anchorNode.type === "list-item") {
          slate.Transforms.setNodes(editor, { type: "paragraph" });
          selectedNode = { ...anchorNode, type: "paragraph" };
        } else {
          selectedNode = anchorNode;
        }
      }
      const anchorBlockKey = getKeys(blocks).find(
        (blockKey) => !slate.Editor.isEditor(selectedNode) && blocks[blockKey].matchNode(selectedNode)
      );
      if (anchorBlockKey && anchorBlockKey !== blockSelected) {
        setBlockSelected(anchorBlockKey);
      }
    }
  }, [editor.selection, editor, blocks, blockSelected]);
  const Icon = blocks[blockSelected].icon;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(SelectWrapper, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.SingleSelect,
      {
        startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icon, {}),
        onChange: handleSelect,
        placeholder: formatMessage(blocks[blockSelected].label),
        value: blockSelected,
        onCloseAutoFocus: preventSelectFocus,
        "aria-label": formatMessage({
          id: "components.Blocks.blocks.selectBlock",
          defaultMessage: "Select a block"
        }),
        disabled,
        children: blockKeysToInclude.map((key) => /* @__PURE__ */ jsxRuntime.jsx(
          BlockOption,
          {
            value: key,
            label: blocks[key].label,
            icon: blocks[key].icon,
            blockSelected
          },
          key
        ))
      }
    ) }),
    modalElement
  ] });
};
const BlockOption = ({ value, icon: Icon, label, blockSelected }) => {
  const { formatMessage } = reactIntl.useIntl();
  const isSelected = value === blockSelected;
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.SingleSelectOption,
    {
      startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icon, { fill: isSelected ? "primary600" : "neutral600" }),
      value,
      children: formatMessage(label)
    }
  );
};
const isListNode = (node) => {
  return slate.Node.isNode(node) && !slate.Editor.isEditor(node) && node.type === "list";
};
const ListButton = ({ block, format }) => {
  const { editor, disabled, blocks } = useBlocksEditorContext("ListButton");
  const isListActive = () => {
    if (!editor.selection) return false;
    const currentListEntry = slate.Editor.above(editor, {
      match: (node) => !slate.Editor.isEditor(node) && node.type === "list",
      at: editor.selection.anchor
    });
    if (currentListEntry) {
      const [currentList] = currentListEntry;
      if (!slate.Editor.isEditor(currentList) && isListNode(currentList) && currentList.format === format)
        return true;
    }
    return false;
  };
  const isListDisabled = () => {
    if (disabled) {
      return true;
    }
    if (!editor.selection) {
      return false;
    }
    const anchorNodeEntry = slate.Editor.above(editor, {
      at: editor.selection.anchor,
      match: (node) => !slate.Editor.isEditor(node) && node.type !== "text"
    });
    const focusNodeEntry = slate.Editor.above(editor, {
      at: editor.selection.focus,
      match: (node) => !slate.Editor.isEditor(node) && node.type !== "text"
    });
    if (!anchorNodeEntry || !focusNodeEntry) {
      return false;
    }
    return anchorNodeEntry[0] !== focusNodeEntry[0];
  };
  const toggleList = (format2) => {
    let currentListEntry;
    if (editor.selection) {
      currentListEntry = slate.Editor.above(editor, {
        match: (node) => !slate.Editor.isEditor(node) && node.type === "list"
      });
    } else {
      const [_, lastNodePath] = slate.Editor.last(editor, []);
      currentListEntry = slate.Editor.above(editor, {
        match: (node) => !slate.Editor.isEditor(node) && node.type === "list",
        at: lastNodePath
      });
    }
    if (!currentListEntry) {
      blocks[`list-${format2}`].handleConvert(editor);
      return;
    }
    const [currentList, currentListPath] = currentListEntry;
    if (!slate.Editor.isEditor(currentList) && isListNode(currentList)) {
      if (currentList.format !== format2) {
        slate.Transforms.setNodes(editor, { format: format2 }, { at: currentListPath });
      } else {
        blocks["paragraph"].handleConvert(editor);
      }
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToolbarButton,
    {
      icon: block.icon,
      name: format,
      label: block.label,
      isActive: isListActive(),
      disabled: isListDisabled(),
      handleClick: () => toggleList(format)
    }
  );
};
const LinkButton = ({ disabled }) => {
  const { editor } = useBlocksEditorContext("LinkButton");
  const isLinkActive = () => {
    const { selection } = editor;
    if (!selection) return false;
    const [match] = Array.from(
      slate.Editor.nodes(editor, {
        at: slate.Editor.unhangRange(editor, selection),
        match: (node) => slate.Element.isElement(node) && node.type === "link"
      })
    );
    return Boolean(match);
  };
  const isLinkDisabled = () => {
    if (disabled) {
      return true;
    }
    if (!editor.selection) {
      return false;
    }
    const anchorNodeEntry = slate.Editor.above(editor, {
      at: editor.selection.anchor,
      match: (node) => !slate.Editor.isEditor(node) && node.type !== "text"
    });
    const focusNodeEntry = slate.Editor.above(editor, {
      at: editor.selection.focus,
      match: (node) => !slate.Editor.isEditor(node) && node.type !== "text"
    });
    if (!anchorNodeEntry || !focusNodeEntry) {
      return false;
    }
    return anchorNodeEntry[0] !== focusNodeEntry[0];
  };
  const addLink = () => {
    editor.shouldSaveLinkPath = true;
    insertLink(editor, { url: "" });
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToolbarButton,
    {
      icon: Icons.Link,
      name: "link",
      label: {
        id: "components.Blocks.link",
        defaultMessage: "Link"
      },
      isActive: isLinkActive(),
      handleClick: addLink,
      disabled: isLinkDisabled()
    }
  );
};
const BlocksToolbar = () => {
  const { editor, blocks, modifiers: modifiers2, disabled } = useBlocksEditorContext("BlocksToolbar");
  const checkButtonDisabled = () => {
    if (disabled) {
      return true;
    }
    if (!editor.selection) {
      return false;
    }
    const selectedNode = editor.children[editor.selection.anchor.path[0]];
    if (["image", "code"].includes(selectedNode.type)) {
      return true;
    }
    return false;
  };
  const isButtonDisabled = checkButtonDisabled();
  return /* @__PURE__ */ jsxRuntime.jsx(Toolbar__namespace.Root, { "aria-disabled": disabled, asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(ToolbarWrapper, { gap: 2, padding: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsx(BlocksDropdown, {}),
    /* @__PURE__ */ jsxRuntime.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntime.jsx(Toolbar__namespace.ToggleGroup, { type: "multiple", asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 1, children: [
      Object.entries(modifiers2).map(([name2, modifier]) => /* @__PURE__ */ jsxRuntime.jsx(
        ToolbarButton,
        {
          name: name2,
          icon: modifier.icon,
          label: modifier.label,
          isActive: modifier.checkIsActive(editor),
          handleClick: () => modifier.handleToggle(editor),
          disabled: isButtonDisabled
        },
        name2
      )),
      /* @__PURE__ */ jsxRuntime.jsx(LinkButton, { disabled: isButtonDisabled })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntime.jsx(Toolbar__namespace.ToggleGroup, { type: "single", asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 1, children: [
      /* @__PURE__ */ jsxRuntime.jsx(ListButton, { block: blocks["list-unordered"], format: "unordered" }),
      /* @__PURE__ */ jsxRuntime.jsx(ListButton, { block: blocks["list-ordered"], format: "ordered" })
    ] }) })
  ] }) });
};
const StyledEditable = styledComponents.styled(slateReact.Editable)`
  // The outline style is set on the wrapper with :focus-within
  outline: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces[3]};
  height: 100%;
  // For fullscreen align input in the center with fixed width
  width: ${(props) => props.isExpandedMode ? "512px" : "100%"};
  margin: auto;

  > *:last-child {
    padding-bottom: ${({ theme }) => theme.spaces[3]};
  }
`;
const Wrapper$1 = styledComponents.styled(designSystem.Box)`
  position: ${({ isOverDropTarget }) => isOverDropTarget && "relative"};
`;
const DropPlaceholder = styledComponents.styled(designSystem.Box)`
  position: absolute;
  right: 0;

  // Show drop placeholder 8px above or below the drop target
  ${({ dragDirection, theme, placeholderMargin }) => styledComponents.css`
    top: ${dragDirection === useDragAndDrop.DIRECTIONS.UPWARD && `-${theme.spaces[placeholderMargin]}`};
    bottom: ${dragDirection === useDragAndDrop.DIRECTIONS.DOWNWARD && `-${theme.spaces[placeholderMargin]}`};
  `}
`;
const DragItem = styledComponents.styled(designSystem.Flex)`
  // Style each block rendered using renderElement()
  & > [data-slate-node='element'] {
    width: 100%;
    opacity: inherit;
  }

  // Set the visibility of drag button
  [role='button'] {
    visibility: ${(props) => props.$dragVisibility};
    opacity: inherit;
  }
  &[aria-disabled='true'] {
    user-drag: none;
  }
`;
const DragIconButton = styledComponents.styled(designSystem.IconButton)`
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  width: ${({ theme }) => theme.spaces[4]};
  height: ${({ theme }) => theme.spaces[6]};
  visibility: hidden;
  cursor: grab;
  opacity: inherit;
  margin-top: ${(props) => props.$dragHandleTopMargin ?? 0};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral200};
  }
  &:active {
    cursor: grabbing;
  }
  &[aria-disabled='true'] {
    cursor: not-allowed;
    background: transparent;
  }
  svg {
    height: auto;
    min-width: ${({ theme }) => theme.spaces[3]};

    path {
      fill: ${({ theme }) => theme.colors.neutral700};
    }
  }
`;
const DragAndDropElement = ({
  children,
  index: index$1,
  setDragDirection,
  dragDirection,
  dragHandleTopMargin
}) => {
  const { editor, disabled, name: name2, setLiveText } = useBlocksEditorContext("drag-and-drop");
  const { formatMessage } = reactIntl.useIntl();
  const [dragVisibility, setDragVisibility] = React__namespace.useState("hidden");
  const handleMoveBlock = React__namespace.useCallback(
    (newIndex, currentIndex) => {
      slate.Transforms.moveNodes(editor, {
        at: currentIndex,
        to: newIndex
      });
      const currentIndexPosition = [currentIndex[0] + 1, ...currentIndex.slice(1)];
      const newIndexPosition = [newIndex[0] + 1, ...newIndex.slice(1)];
      setLiveText(
        formatMessage(
          {
            id: index.getTranslation("components.Blocks.dnd.reorder"),
            defaultMessage: "{item}, moved. New position in the editor: {position}."
          },
          {
            item: `${name2}.${currentIndexPosition.join(",")}`,
            position: `${newIndexPosition.join(",")} of ${editor.children.length}`
          }
        )
      );
    },
    [editor, formatMessage, name2, setLiveText]
  );
  const [{ handlerId, isDragging, isOverDropTarget, direction }, blockRef, dropRef, dragRef] = useDragAndDrop.useDragAndDrop(!disabled, {
    type: `${useDragAndDrop.ItemTypes.BLOCKS}_${name2}`,
    index: index$1,
    item: {
      index: index$1,
      displayedValue: children
    },
    onDropItem(currentIndex, newIndex) {
      if (newIndex) handleMoveBlock(newIndex, currentIndex);
    }
  });
  const composedBoxRefs = designSystem.useComposedRefs(blockRef, dropRef);
  React__namespace.useEffect(() => {
    if (direction) {
      setDragDirection(direction);
    }
  }, [direction, setDragDirection]);
  React__namespace.useEffect(() => {
    setDragVisibility("hidden");
  }, [editor.selection]);
  return /* @__PURE__ */ jsxRuntime.jsxs(Wrapper$1, { ref: composedBoxRefs, isOverDropTarget, children: [
    isOverDropTarget && /* @__PURE__ */ jsxRuntime.jsx(
      DropPlaceholder,
      {
        borderStyle: "solid",
        borderColor: "secondary200",
        borderWidth: "2px",
        width: "calc(100% - 24px)",
        marginLeft: "auto",
        dragDirection,
        placeholderMargin: children.props.as && children.props.as === "li" ? 1 : 2
      }
    ),
    isDragging ? /* @__PURE__ */ jsxRuntime.jsx(CloneDragItem, { dragHandleTopMargin, children }) : /* @__PURE__ */ jsxRuntime.jsxs(
      DragItem,
      {
        ref: dragRef,
        "data-handler-id": handlerId,
        gap: 2,
        paddingLeft: 2,
        alignItems: "start",
        onDragStart: (event) => {
          const target = event.target;
          const currentTarget = event.currentTarget;
          if (target.getAttribute("role") !== "button") {
            event.preventDefault();
          } else {
            currentTarget.style.opacity = "0.5";
          }
        },
        onDragEnd: (event) => {
          const currentTarget = event.currentTarget;
          currentTarget.style.opacity = "1";
        },
        onMouseMove: () => setDragVisibility("visible"),
        onSelect: () => setDragVisibility("visible"),
        onMouseLeave: () => setDragVisibility("hidden"),
        "aria-disabled": disabled,
        $dragVisibility: dragVisibility,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            DragIconButton,
            {
              tag: "div",
              contentEditable: false,
              role: "button",
              tabIndex: 0,
              withTooltip: false,
              label: formatMessage({
                id: index.getTranslation("components.DragHandle-label"),
                defaultMessage: "Drag"
              }),
              onClick: (e) => e.stopPropagation(),
              "aria-disabled": disabled,
              disabled,
              draggable: true,
              $dragHandleTopMargin: dragHandleTopMargin,
              children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Drag, { color: "primary500" })
            }
          ),
          children
        ]
      }
    )
  ] });
};
const CloneDragItem = ({ children, dragHandleTopMargin }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(DragItem, { gap: 2, paddingLeft: 2, alignItems: "start", $dragVisibility: "visible", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      DragIconButton,
      {
        tag: "div",
        role: "button",
        withTooltip: false,
        label: formatMessage({
          id: index.getTranslation("components.DragHandle-label"),
          defaultMessage: "Drag"
        }),
        $dragHandleTopMargin: dragHandleTopMargin,
        children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Drag, { color: "neutral600" })
      }
    ),
    children
  ] });
};
const baseRenderLeaf = (props, modifiers2) => {
  const wrappedChildren = getEntries(modifiers2).reduce((currentChildren, modifierEntry) => {
    const [name2, modifier] = modifierEntry;
    if (props.leaf[name2]) {
      return modifier.renderLeaf(currentChildren);
    }
    return currentChildren;
  }, props.children);
  return /* @__PURE__ */ jsxRuntime.jsx("span", { ...props.attributes, children: wrappedChildren });
};
const baseRenderElement = ({
  props,
  blocks,
  editor,
  setDragDirection,
  dragDirection
}) => {
  const { element } = props;
  const blockMatch = Object.values(blocks).find((block2) => block2.matchNode(element));
  const block = blockMatch || blocks.paragraph;
  const nodePath = slateReact.ReactEditor.findPath(editor, element);
  if (isLinkNode(element) || isListNode$1(element) && element.indentLevel && element.indentLevel > 0 || element.type === "list-item") {
    return block.renderElement(props);
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    DragAndDropElement,
    {
      index: nodePath,
      setDragDirection,
      dragDirection,
      dragHandleTopMargin: block.dragHandleTopMargin,
      children: block.renderElement(props)
    }
  );
};
const BlocksContent = ({ placeholder, ariaLabelId }) => {
  const { editor, disabled, blocks, modifiers: modifiers2, setLiveText, isExpandedMode } = useBlocksEditorContext("BlocksContent");
  const blocksRef = React__namespace.useRef(null);
  const { formatMessage } = reactIntl.useIntl();
  const [dragDirection, setDragDirection] = React__namespace.useState(null);
  const { modalElement, handleConversionResult } = useConversionModal();
  const renderLeaf = React__namespace.useCallback(
    (props) => baseRenderLeaf(props, modifiers2),
    [modifiers2]
  );
  const handleMoveBlocks = (editor2, event) => {
    if (!editor2.selection) return;
    const start = slate.Range.start(editor2.selection);
    const currentIndex = [start.path[0]];
    let newIndexPosition = 0;
    if (event.key === "ArrowUp") {
      newIndexPosition = currentIndex[0] > 0 ? currentIndex[0] - 1 : currentIndex[0];
    } else {
      newIndexPosition = currentIndex[0] < editor2.children.length - 1 ? currentIndex[0] + 1 : currentIndex[0];
    }
    const newIndex = [newIndexPosition];
    if (newIndexPosition !== currentIndex[0]) {
      slate.Transforms.moveNodes(editor2, {
        at: currentIndex,
        to: newIndex
      });
      setLiveText(
        formatMessage(
          {
            id: index.getTranslation("components.Blocks.dnd.reorder"),
            defaultMessage: "{item}, moved. New position in the editor: {position}."
          },
          {
            item: `${name}.${currentIndex[0] + 1}`,
            position: `${newIndex[0] + 1} of ${editor2.children.length}`
          }
        )
      );
      event.preventDefault();
    }
  };
  const renderElement = React__namespace.useCallback(
    (props) => baseRenderElement({ props, blocks, editor, dragDirection, setDragDirection }),
    [blocks, editor, dragDirection, setDragDirection]
  );
  const checkSnippet = (event) => {
    if (!editor.selection) {
      return;
    }
    const [textNode, textNodePath] = slate.Editor.node(editor, editor.selection.anchor.path);
    if (slate.Editor.isEditor(textNode) || textNode.type !== "text") {
      return;
    }
    if (textNodePath.at(-1) !== 0) {
      return;
    }
    const blockMatchingSnippet = Object.values(blocks).find((block) => {
      return block.snippets?.includes(textNode.text);
    });
    if (blockMatchingSnippet?.handleConvert) {
      event.preventDefault();
      slate.Transforms.delete(editor, {
        distance: textNode.text.length,
        unit: "character",
        reverse: true
      });
      const maybeRenderModal = blockMatchingSnippet.handleConvert(editor);
      handleConversionResult(maybeRenderModal);
    }
  };
  const handleEnter = (event) => {
    if (!editor.selection) {
      return;
    }
    const selectedNode = editor.children[editor.selection.anchor.path[0]];
    const selectedBlock = Object.values(blocks).find((block) => block.matchNode(selectedNode));
    if (!selectedBlock) {
      return;
    }
    if (event.shiftKey && selectedNode.type !== "image") {
      slate.Transforms.insertText(editor, "\n");
      return;
    }
    if (selectedBlock.handleEnterKey) {
      selectedBlock.handleEnterKey(editor);
    } else {
      blocks.paragraph.handleEnterKey(editor);
    }
  };
  const handleBackspaceEvent = (event) => {
    if (!editor.selection) {
      return;
    }
    const selectedNode = editor.children[editor.selection.anchor.path[0]];
    const selectedBlock = Object.values(blocks).find((block) => block.matchNode(selectedNode));
    if (!selectedBlock) {
      return;
    }
    if (selectedBlock.handleBackspaceKey) {
      selectedBlock.handleBackspaceKey(editor, event);
    }
  };
  const handleTab = (event) => {
    if (!editor.selection) {
      return;
    }
    const selectedNode = editor.children[editor.selection.anchor.path[0]];
    const selectedBlock = Object.values(blocks).find((block) => block.matchNode(selectedNode));
    if (!selectedBlock) {
      return;
    }
    if (selectedBlock.handleTab) {
      event.preventDefault();
      selectedBlock.handleTab(editor);
    }
  };
  const handleKeyboardShortcuts = (event) => {
    const isCtrlOrCmd = event.metaKey || event.ctrlKey;
    if (isCtrlOrCmd) {
      Object.values(modifiers2).forEach((value) => {
        if (value.isValidEventKey(event)) {
          value.handleToggle(editor);
          return;
        }
      });
      if (event.shiftKey && ["ArrowUp", "ArrowDown"].includes(event.key)) {
        handleMoveBlocks(editor, event);
      }
    }
  };
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        return handleEnter(event);
      case "Backspace":
        return handleBackspaceEvent(event);
      case "Tab":
        return handleTab(event);
      case "Escape":
        return slateReact.ReactEditor.blur(editor);
    }
    handleKeyboardShortcuts(event);
    if (event.key === " ") {
      checkSnippet(event);
    }
  };
  const handleScrollSelectionIntoView = () => {
    if (!editor.selection) return;
    const domRange = slateReact.ReactEditor.toDOMRange(editor, editor.selection);
    const domRect = domRange.getBoundingClientRect();
    const blocksInput = blocksRef.current;
    if (!blocksInput) {
      return;
    }
    const editorRect = blocksInput.getBoundingClientRect();
    if (domRect.top < editorRect.top || domRect.bottom > editorRect.bottom) {
      blocksInput.scrollBy({
        top: 28,
        // 20px is the line-height + 8px line gap
        behavior: "smooth"
      });
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Box,
    {
      ref: blocksRef,
      grow: 1,
      width: "100%",
      overflow: "auto",
      fontSize: 2,
      background: "neutral0",
      color: "neutral800",
      lineHeight: 6,
      paddingRight: 4,
      paddingTop: 6,
      paddingBottom: 3,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          StyledEditable,
          {
            "aria-labelledby": ariaLabelId,
            readOnly: disabled,
            placeholder,
            isExpandedMode,
            renderElement,
            renderLeaf,
            onKeyDown: handleKeyDown,
            scrollSelectionIntoView: handleScrollSelectionIntoView,
            onDrop: () => {
              return true;
            },
            onDragStart: () => {
              return true;
            }
          }
        ),
        modalElement
      ]
    }
  );
};
const CollapseIconButton = styledComponents.styled(designSystem.IconButton)`
  position: absolute;
  bottom: 1.2rem;
  right: 1.2rem;
`;
const ExpandWrapper$1 = styledComponents.styled(designSystem.Flex)`
  // Background with 20% opacity
  background: ${({ theme }) => `${theme.colors.neutral800}1F`};
`;
const EditorLayout$1 = ({
  children,
  error,
  disabled,
  onCollapse,
  ariaDescriptionId
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const { isExpandedMode } = useBlocksEditorContext("editorLayout");
  React__namespace.useEffect(() => {
    if (isExpandedMode) {
      document.body.classList.add("lock-body-scroll");
    }
    return () => {
      document.body.classList.remove("lock-body-scroll");
    };
  }, [isExpandedMode]);
  if (isExpandedMode) {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Portal, { role: "dialog", "aria-modal": false, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.FocusTrap, { onEscape: onCollapse, children: /* @__PURE__ */ jsxRuntime.jsx(
      ExpandWrapper$1,
      {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 4,
        justifyContent: "center",
        onClick: onCollapse,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Box,
          {
            background: "neutral0",
            hasRadius: true,
            shadow: "popupShadow",
            overflow: "hidden",
            width: "90%",
            height: "90%",
            onClick: (e) => e.stopPropagation(),
            "aria-describedby": ariaDescriptionId,
            position: "relative",
            children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { height: "100%", alignItems: "flex-start", direction: "column", children: [
              children,
              /* @__PURE__ */ jsxRuntime.jsx(
                CollapseIconButton,
                {
                  label: formatMessage({
                    id: index.getTranslation("components.Blocks.collapse"),
                    defaultMessage: "Collapse"
                  }),
                  onClick: onCollapse,
                  children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Collapse, {})
                }
              )
            ] })
          }
        )
      }
    ) }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    InputWrapper,
    {
      direction: "column",
      alignItems: "flex-start",
      height: "512px",
      $disabled: disabled,
      $hasError: Boolean(error),
      style: { overflow: "hidden" },
      "aria-describedby": ariaDescriptionId,
      position: "relative",
      children
    }
  );
};
const InputWrapper = styledComponents.styled(designSystem.Flex)`
  border: 1px solid
    ${({ theme, $hasError }) => $hasError ? theme.colors.danger600 : theme.colors.neutral200};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};

  ${({ theme, $hasError = false }) => styledComponents.css`
    outline: none;
    box-shadow: 0;
    transition-property: border-color, box-shadow, fill;
    transition-duration: 0.2s;

    &:focus-within {
      border: 1px solid ${$hasError ? theme.colors.danger600 : theme.colors.primary600};
      box-shadow: ${$hasError ? theme.colors.danger600 : theme.colors.primary600} 0px 0px 0px 2px;
    }
  `}

  ${({ theme, $disabled }) => $disabled ? styledComponents.css`
          color: ${theme.colors.neutral600};
          background: ${theme.colors.neutral150};
        ` : void 0}
`;
const stylesToInherit = styledComponents.css`
  font-size: inherit;
  color: inherit;
  line-height: inherit;
`;
const BoldText = styledComponents.styled(designSystem.Typography).attrs({ fontWeight: "bold" })`
  ${stylesToInherit}
`;
const ItalicText = styledComponents.styled(designSystem.Typography)`
  font-style: italic;
  ${stylesToInherit}
`;
const UnderlineText = styledComponents.styled(designSystem.Typography).attrs({
  textDecoration: "underline"
})`
  ${stylesToInherit}
`;
const StrikeThroughText = styledComponents.styled(designSystem.Typography).attrs({
  textDecoration: "line-through"
})`
  ${stylesToInherit}
`;
const InlineCode = styledComponents.styled.code`
  background-color: ${({ theme }) => theme.colors.neutral150};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => `0 ${theme.spaces[2]}`};
  font-family: 'SF Mono', SFMono-Regular, ui-monospace, 'DejaVu Sans Mono', Menlo, Consolas,
    monospace;
  color: inherit;
`;
const baseCheckIsActive = (editor, name2) => {
  const marks = slate.Editor.marks(editor);
  if (!marks) return false;
  return Boolean(marks[name2]);
};
const baseHandleToggle = (editor, name2) => {
  const marks = slate.Editor.marks(editor);
  if (!editor.selection) {
    const endOfEditor = slate.Editor.end(editor, []);
    slate.Transforms.select(editor, endOfEditor);
  }
  if (marks?.[name2]) {
    slate.Editor.removeMark(editor, name2);
  } else {
    slate.Editor.addMark(editor, name2, true);
  }
};
const modifiers = {
  bold: {
    icon: Icons.Bold,
    isValidEventKey: (event) => event.key === "b",
    label: { id: "components.Blocks.modifiers.bold", defaultMessage: "Bold" },
    checkIsActive: (editor) => baseCheckIsActive(editor, "bold"),
    handleToggle: (editor) => baseHandleToggle(editor, "bold"),
    renderLeaf: (children) => /* @__PURE__ */ jsxRuntime.jsx(BoldText, { children })
  },
  italic: {
    icon: Icons.Italic,
    isValidEventKey: (event) => event.key === "i",
    label: { id: "components.Blocks.modifiers.italic", defaultMessage: "Italic" },
    checkIsActive: (editor) => baseCheckIsActive(editor, "italic"),
    handleToggle: (editor) => baseHandleToggle(editor, "italic"),
    renderLeaf: (children) => /* @__PURE__ */ jsxRuntime.jsx(ItalicText, { children })
  },
  underline: {
    icon: Icons.Underline,
    isValidEventKey: (event) => event.key === "u",
    label: { id: "components.Blocks.modifiers.underline", defaultMessage: "Underline" },
    checkIsActive: (editor) => baseCheckIsActive(editor, "underline"),
    handleToggle: (editor) => baseHandleToggle(editor, "underline"),
    renderLeaf: (children) => /* @__PURE__ */ jsxRuntime.jsx(UnderlineText, { children })
  },
  strikethrough: {
    icon: Icons.StrikeThrough,
    isValidEventKey: (event) => event.key === "S" && event.shiftKey,
    label: { id: "components.Blocks.modifiers.strikethrough", defaultMessage: "Strikethrough" },
    checkIsActive: (editor) => baseCheckIsActive(editor, "strikethrough"),
    handleToggle: (editor) => baseHandleToggle(editor, "strikethrough"),
    renderLeaf: (children) => /* @__PURE__ */ jsxRuntime.jsx(StrikeThroughText, { children })
  },
  code: {
    icon: Icons.Code,
    isValidEventKey: (event) => event.key === "e",
    label: { id: "components.Blocks.modifiers.code", defaultMessage: "Inline code" },
    checkIsActive: (editor) => baseCheckIsActive(editor, "code"),
    handleToggle: (editor) => baseHandleToggle(editor, "code"),
    renderLeaf: (children) => /* @__PURE__ */ jsxRuntime.jsx(InlineCode, { children })
  }
};
const withImages = (editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };
  return editor;
};
const withLinks = (editor) => {
  const { isInline, apply, insertText: insertText2, insertData } = editor;
  editor.isInline = (element) => {
    return element.type === "link" ? true : isInline(element);
  };
  editor.lastInsertedLinkPath = null;
  editor.apply = (operation) => {
    if (operation.type === "insert_node") {
      if (!slate.Editor.isEditor(operation.node) && operation.node.type === "link" && editor.shouldSaveLinkPath) {
        editor.lastInsertedLinkPath = operation.path;
      }
    } else if (operation.type === "move_node") {
      if (slate.Path.hasPrevious(operation.path) && editor.lastInsertedLinkPath && editor.shouldSaveLinkPath) {
        editor.lastInsertedLinkPath = slate.Path.transform(editor.lastInsertedLinkPath, operation);
      }
    }
    apply(operation);
  };
  editor.insertText = (text) => {
    if (editor.selection && slate.Range.isCollapsed(editor.selection) && text === " ") {
      const linksInSelection = Array.from(
        slate.Editor.nodes(editor, {
          at: editor.selection,
          match: (node) => !slate.Editor.isEditor(node) && node.type === "link"
        })
      );
      const selectionIsInLink = editor.selection && linksInSelection.length > 0;
      const selectionIsAtEndOfLink = selectionIsInLink && slate.Point.equals(editor.selection.anchor, slate.Editor.end(editor, linksInSelection[0][1]));
      if (selectionIsAtEndOfLink) {
        slate.Transforms.insertNodes(
          editor,
          { text: " ", type: "text" },
          { at: slate.Path.next(linksInSelection[0][1]), select: true }
        );
        return;
      }
    }
    insertText2(text);
  };
  editor.insertData = (data) => {
    const pastedText = data.getData("text/plain");
    if (pastedText) {
      try {
        new URL(pastedText);
        editor.shouldSaveLinkPath = false;
        insertLink(editor, { url: pastedText });
        return;
      } catch (error) {
      }
    }
    insertData(data);
  };
  return editor;
};
const isText = (node) => {
  return slate.Node.isNode(node) && !slate.Editor.isEditor(node) && node.type === "text";
};
const withStrapiSchema = (editor) => {
  const { normalizeNode } = editor;
  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    if (!slate.Element.isElement(node) && !isText(node)) {
      slate.Transforms.setNodes(editor, { type: "text" }, { at: path });
      return;
    }
    normalizeNode(entry);
  };
  return editor;
};
const selectorBlockKeys = [
  "paragraph",
  "heading-one",
  "heading-two",
  "heading-three",
  "heading-four",
  "heading-five",
  "heading-six",
  "list-ordered",
  "list-unordered",
  "image",
  "quote",
  "code"
];
const isSelectorBlockKey = (key) => {
  return typeof key === "string" && selectorBlockKeys.includes(key);
};
const [BlocksEditorProvider, usePartialBlocksEditorContext] = strapiAdmin.createContext("BlocksEditor");
function useBlocksEditorContext(consumerName) {
  const context = usePartialBlocksEditorContext(consumerName, (state) => state);
  const editor = slateReact.useSlate();
  return {
    ...context,
    editor
  };
}
const EditorDivider = styledComponents.styled(designSystem.Divider)`
  background: ${({ theme }) => theme.colors.neutral200};
`;
const ExpandIconButton = styledComponents.styled(designSystem.IconButton)`
  position: absolute;
  bottom: 1.2rem;
  right: 1.2rem;
`;
function useResetKey(value) {
  const slateUpdatesCount = React__namespace.useRef(0);
  const valueUpdatesCount = React__namespace.useRef(0);
  const [key, setKey] = React__namespace.useState(0);
  React__namespace.useEffect(() => {
    valueUpdatesCount.current += 1;
    if (valueUpdatesCount.current !== slateUpdatesCount.current) {
      setKey((previousKey) => previousKey + 1);
      slateUpdatesCount.current = valueUpdatesCount.current;
    }
  }, [value]);
  return { key, incrementSlateUpdatesCount: () => slateUpdatesCount.current += 1 };
}
const pipe = (...fns) => (value) => fns.reduce((prev, fn) => fn(prev), value);
const BlocksEditor = React__namespace.forwardRef(
  ({ disabled = false, name: name2, onChange, value, error, ...contentProps }, forwardedRef) => {
    const { formatMessage } = reactIntl.useIntl();
    const [editor] = React__namespace.useState(
      () => pipe(slateHistory.withHistory, withImages, withStrapiSchema, slateReact.withReact, withLinks)(slate.createEditor())
    );
    const [liveText, setLiveText] = React__namespace.useState("");
    const ariaDescriptionId = React__namespace.useId();
    const [isExpandedMode, setIsExpandedMode] = React__namespace.useState(false);
    const handleToggleExpand = () => {
      setIsExpandedMode((prev) => !prev);
    };
    React__namespace.useImperativeHandle(
      forwardedRef,
      () => ({
        focus() {
          slateReact.ReactEditor.focus(editor);
        }
      }),
      [editor]
    );
    const { key, incrementSlateUpdatesCount } = useResetKey(value);
    const handleSlateChange = (state) => {
      const isAstChange = editor.operations.some((op) => op.type !== "set_selection");
      if (isAstChange) {
        incrementSlateUpdatesCount();
        onChange(name2, state);
      }
    };
    const blocks = {
      ...paragraphBlocks,
      ...headingBlocks,
      ...listBlocks,
      ...linkBlocks,
      ...imageBlocks,
      ...quoteBlocks,
      ...codeBlocks
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { id: ariaDescriptionId, children: formatMessage({
        id: index.getTranslation("components.Blocks.dnd.instruction"),
        defaultMessage: `To reorder blocks, press Command or Control along with Shift and the Up or Down arrow keys`
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { "aria-live": "assertive", children: liveText }),
      /* @__PURE__ */ jsxRuntime.jsx(
        slateReact.Slate,
        {
          editor,
          initialValue: value || [{ type: "paragraph", children: [{ type: "text", text: "" }] }],
          onChange: handleSlateChange,
          children: /* @__PURE__ */ jsxRuntime.jsx(
            BlocksEditorProvider,
            {
              blocks,
              modifiers,
              disabled,
              name: name2,
              setLiveText,
              isExpandedMode,
              children: /* @__PURE__ */ jsxRuntime.jsxs(
                EditorLayout$1,
                {
                  error,
                  disabled,
                  onCollapse: handleToggleExpand,
                  ariaDescriptionId,
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(BlocksToolbar, {}),
                    /* @__PURE__ */ jsxRuntime.jsx(EditorDivider, { width: "100%" }),
                    /* @__PURE__ */ jsxRuntime.jsx(BlocksContent, { ...contentProps }),
                    !isExpandedMode && /* @__PURE__ */ jsxRuntime.jsx(
                      ExpandIconButton,
                      {
                        label: formatMessage({
                          id: index.getTranslation("components.Blocks.expand"),
                          defaultMessage: "Expand"
                        }),
                        onClick: handleToggleExpand,
                        children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Expand, {})
                      }
                    )
                  ]
                }
              )
            }
          )
        },
        key
      )
    ] });
  }
);
const BlocksInput = React__namespace.forwardRef(
  ({ label, name: name2, required = false, hint, labelAction, ...editorProps }, forwardedRef) => {
    const id = React__namespace.useId();
    const field = strapiAdmin.useField(name2);
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Root, { id, name: name2, hint, error: field.error, required, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { action: labelAction, children: label }),
      /* @__PURE__ */ jsxRuntime.jsx(
        BlocksEditor,
        {
          name: name2,
          error: field.error,
          ref: forwardedRef,
          value: field.value,
          onChange: field.onChange,
          ariaLabelId: id,
          ...editorProps
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {}),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
    ] }) });
  }
);
const MemoizedBlocksInput = React__namespace.memo(BlocksInput);
const createDefaultForm = (contentType, components = {}) => {
  const traverseSchema = (attributes) => {
    return Object.entries(attributes).reduce((acc, [key, attribute]) => {
      if ("default" in attribute) {
        acc[key] = attribute.default;
      } else if (attribute.type === "component" && attribute.required) {
        const defaultComponentForm = traverseSchema(components[attribute.component].attributes);
        if (attribute.repeatable) {
          acc[key] = attribute.min ? [...Array(attribute.min).fill(defaultComponentForm)] : [];
        } else {
          acc[key] = defaultComponentForm;
        }
      } else if (attribute.type === "dynamiczone" && attribute.required) {
        acc[key] = [];
      }
      return acc;
    }, {});
  };
  return traverseSchema(contentType.attributes);
};
const Initializer = ({ disabled, name: name2, onClick }) => {
  const { formatMessage } = reactIntl.useIntl();
  const field = strapiAdmin.useField(name2);
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Box,
    {
      tag: "button",
      background: disabled ? "neutral150" : "neutral100",
      borderColor: field.error ? "danger600" : "neutral200",
      hasRadius: true,
      disabled,
      onClick,
      paddingTop: 9,
      paddingBottom: 9,
      type: "button",
      style: { cursor: disabled ? "not-allowed" : "pointer" },
      children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", color: disabled ? "neutral500" : "primary600", children: /* @__PURE__ */ jsxRuntime.jsx(Icons.PlusCircle, { width: "3.2rem", height: "3.2rem" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Typography,
          {
            textColor: disabled ? "neutral600" : "primary600",
            variant: "pi",
            fontWeight: "bold",
            children: formatMessage({
              id: index.getTranslation("components.empty-repeatable"),
              defaultMessage: "No entry yet. Click to add one."
            })
          }
        ) })
      ] })
    }
  ) });
};
const NonRepeatableComponent = ({
  attribute,
  name: name2,
  children,
  layout
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const { value } = strapiAdmin.useField(name2);
  const level = Relations.useComponent("NonRepeatableComponent", (state) => state.level);
  const isNested = level > 0;
  return /* @__PURE__ */ jsxRuntime.jsx(Relations.ComponentProvider, { id: value?.id, uid: attribute.component, level: level + 1, type: "component", children: /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Box,
    {
      background: "neutral100",
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 6,
      paddingBottom: 6,
      hasRadius: isNested,
      borderColor: isNested ? "neutral200" : void 0,
      children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: layout.map((row, index2) => {
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: row.map(({ size, ...field }) => {
          const completeFieldName = `${name2}.${field.name}`;
          const translatedLabel = formatMessage({
            id: `content-manager.components.${attribute.component}.${field.name}`,
            defaultMessage: field.label
          });
          return /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Grid.Item,
            {
              col: size,
              s: 12,
              xs: 12,
              direction: "column",
              alignItems: "stretch",
              children: children({ ...field, label: translatedLabel, name: completeFieldName })
            },
            completeFieldName
          );
        }) }, index2);
      }) })
    }
  ) });
};
const RepeatableComponent = ({
  attribute,
  disabled,
  name: name2,
  mainField,
  children,
  layout
}) => {
  const { toggleNotification } = strapiAdmin.useNotification();
  const { formatMessage } = reactIntl.useIntl();
  const { search: searchString } = reactRouterDom.useLocation();
  const search = React__namespace.useMemo(() => new URLSearchParams(searchString), [searchString]);
  const { components } = index.useDoc();
  const {
    value = [],
    error,
    rawError
  } = strapiAdmin.useField(name2);
  const addFieldRow = strapiAdmin.useForm("RepeatableComponent", (state) => state.addFieldRow);
  const moveFieldRow = strapiAdmin.useForm("RepeatableComponent", (state) => state.moveFieldRow);
  const removeFieldRow = strapiAdmin.useForm("RepeatableComponent", (state) => state.removeFieldRow);
  const { max = Infinity } = attribute;
  const [collapseToOpen, setCollapseToOpen] = React__namespace.useState("");
  const [liveText, setLiveText] = React__namespace.useState("");
  React__namespace.useEffect(() => {
    const hasNestedErrors = rawError && Array.isArray(rawError) && rawError.length > 0;
    const hasNestedValue = value && Array.isArray(value) && value.length > 0;
    if (hasNestedErrors && hasNestedValue) {
      const errorOpenItems = rawError.map((_, idx) => {
        return value[idx] ? value[idx].__temp_key__ : null;
      }).filter((value2) => !!value2);
      if (errorOpenItems && errorOpenItems.length > 0) {
        setCollapseToOpen((collapseToOpen2) => {
          if (!errorOpenItems.includes(collapseToOpen2)) {
            return errorOpenItems[0];
          }
          return collapseToOpen2;
        });
      }
    }
  }, [rawError, value]);
  const componentTmpKeyWithFocussedField = React__namespace.useMemo(() => {
    if (search.has("field")) {
      const fieldParam = search.get("field");
      if (!fieldParam) {
        return void 0;
      }
      const [, path] = fieldParam.split(`${name2}.`);
      if (objects.getIn(value, path, void 0) !== void 0) {
        const [subpath] = path.split(".");
        return objects.getIn(value, subpath, void 0)?.__temp_key__;
      }
    }
    return void 0;
  }, [search, name2, value]);
  const prevValue = useDebounce.usePrev(value);
  React__namespace.useEffect(() => {
    if (prevValue && prevValue.length < value.length) {
      setCollapseToOpen(value[value.length - 1].__temp_key__);
    }
  }, [value, prevValue]);
  React__namespace.useEffect(() => {
    if (typeof componentTmpKeyWithFocussedField === "string") {
      setCollapseToOpen(componentTmpKeyWithFocussedField);
    }
  }, [componentTmpKeyWithFocussedField]);
  const toggleCollapses = () => {
    setCollapseToOpen("");
  };
  const handleClick = () => {
    if (value.length < max) {
      const schema = components[attribute.component];
      const form = createDefaultForm(schema, components);
      const data = transformDocument(schema, components)(form);
      addFieldRow(name2, data);
    } else if (value.length >= max) {
      toggleNotification({
        type: "info",
        message: formatMessage({
          id: index.getTranslation("components.notification.info.maximum-requirement")
        })
      });
    }
  };
  const handleMoveComponentField = (newIndex, currentIndex) => {
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.reorder"),
          defaultMessage: "{item}, moved. New position in list: {position}."
        },
        {
          item: `${name2}.${currentIndex}`,
          position: getItemPos(newIndex)
        }
      )
    );
    moveFieldRow(name2, currentIndex, newIndex);
  };
  const handleValueChange = (key) => {
    setCollapseToOpen(key);
  };
  const getItemPos = (index2) => `${index2 + 1} of ${value.length}`;
  const handleCancel = (index$1) => {
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.cancel-item"),
          defaultMessage: "{item}, dropped. Re-order cancelled."
        },
        {
          item: `${name2}.${index$1}`
        }
      )
    );
  };
  const handleGrabItem = (index$1) => {
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.grab-item"),
          defaultMessage: `{item}, grabbed. Current position in list: {position}. Press up and down arrow to change position, Spacebar to drop, Escape to cancel.`
        },
        {
          item: `${name2}.${index$1}`,
          position: getItemPos(index$1)
        }
      )
    );
  };
  const handleDropItem = (index$1) => {
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.drop-item"),
          defaultMessage: `{item}, dropped. Final position in list: {position}.`
        },
        {
          item: `${name2}.${index$1}`,
          position: getItemPos(index$1)
        }
      )
    );
  };
  const ariaDescriptionId = React__namespace.useId();
  const level = Relations.useComponent("RepeatableComponent", (state) => state.level);
  if (value.length === 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(Initializer, { disabled, name: name2, onClick: handleClick });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { hasRadius: true, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { id: ariaDescriptionId, children: formatMessage({
      id: index.getTranslation("dnd.instructions"),
      defaultMessage: `Press spacebar to grab and re-order`
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { "aria-live": "assertive", children: liveText }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      AccordionRoot,
      {
        $error: error,
        value: collapseToOpen,
        onValueChange: handleValueChange,
        "aria-describedby": ariaDescriptionId,
        children: [
          value.map(({ __temp_key__: key, id }, index2) => {
            const nameWithIndex = `${name2}.${index2}`;
            return /* @__PURE__ */ jsxRuntime.jsx(
              Relations.ComponentProvider,
              {
                id,
                uid: attribute.component,
                level: level + 1,
                type: "repeatable",
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  Component,
                  {
                    disabled,
                    name: nameWithIndex,
                    attribute,
                    index: index2,
                    mainField,
                    onMoveItem: handleMoveComponentField,
                    onDeleteComponent: () => {
                      removeFieldRow(name2, index2);
                      toggleCollapses();
                    },
                    toggleCollapses,
                    onCancel: handleCancel,
                    onDropItem: handleDropItem,
                    onGrabItem: handleGrabItem,
                    __temp_key__: key,
                    children: layout.map((row, index22) => {
                      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: row.map(({ size, ...field }) => {
                        const completeFieldName = `${nameWithIndex}.${field.name}`;
                        const translatedLabel = formatMessage({
                          id: `content-manager.components.${attribute.component}.${field.name}`,
                          defaultMessage: field.label
                        });
                        return /* @__PURE__ */ jsxRuntime.jsx(
                          designSystem.Grid.Item,
                          {
                            col: size,
                            s: 12,
                            xs: 12,
                            direction: "column",
                            alignItems: "stretch",
                            children: children({
                              ...field,
                              label: translatedLabel,
                              name: completeFieldName
                            })
                          },
                          completeFieldName
                        );
                      }) }, index22);
                    })
                  }
                )
              },
              key
            );
          }),
          /* @__PURE__ */ jsxRuntime.jsx(TextButtonCustom, { disabled, onClick: handleClick, startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, {}), children: formatMessage({
            id: index.getTranslation("containers.EditView.add.new-entry"),
            defaultMessage: "Add an entry"
          }) })
        ]
      }
    )
  ] });
};
const AccordionRoot = styledComponents.styled(designSystem.Accordion.Root)`
  border: 1px solid
    ${({ theme, $error }) => $error ? theme.colors.danger600 : theme.colors.neutral200};
`;
const TextButtonCustom = styledComponents.styled(designSystem.TextButton)`
  width: 100%;
  display: flex;
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral200};
  padding-inline: ${(props) => props.theme.spaces[6]};
  padding-block: ${(props) => props.theme.spaces[3]};

  &:not([disabled]) {
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.colors.primary100};
    }
  }

  span {
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 2.4rem;
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: background-color 120ms ${(props) => props.theme.motion.easings.easeOutQuad};
  }
`;
const Component = ({
  disabled,
  index: index$1,
  name: name2,
  mainField = {
    name: "id",
    type: "integer"
  },
  children,
  onDeleteComponent,
  toggleCollapses,
  __temp_key__,
  ...dragProps
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const displayValue = strapiAdmin.useForm("RepeatableComponent", (state) => {
    return objects.getIn(state.values, [...name2.split("."), mainField.name]);
  });
  const accordionRef = React__namespace.useRef(null);
  const componentKey = name2.split(".").slice(0, -1).join(".");
  const [{ handlerId, isDragging, handleKeyDown }, boxRef, dropRef, dragRef, dragPreviewRef] = useDragAndDrop.useDragAndDrop(!disabled, {
    type: `${useDragAndDrop.ItemTypes.COMPONENT}_${componentKey}`,
    index: index$1,
    item: {
      index: index$1,
      displayedValue: displayValue
    },
    onStart() {
      toggleCollapses();
    },
    ...dragProps
  });
  React__namespace.useEffect(() => {
    dragPreviewRef(reactDndHtml5Backend.getEmptyImage(), { captureDraggingState: false });
  }, [dragPreviewRef, index$1]);
  const composedAccordionRefs = designSystem.useComposedRefs(accordionRef, dragRef);
  const composedBoxRefs = designSystem.useComposedRefs(
    boxRef,
    dropRef
  );
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: isDragging ? /* @__PURE__ */ jsxRuntime.jsx(Preview$1, {}) : /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Accordion.Item, { ref: composedBoxRefs, value: __temp_key__, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Accordion.Header, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Trigger, { children: displayValue }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Accordion.Actions, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            variant: "ghost",
            onClick: onDeleteComponent,
            label: formatMessage({
              id: index.getTranslation("containers.Edit.delete"),
              defaultMessage: "Delete"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Trash, {})
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            ref: composedAccordionRefs,
            variant: "ghost",
            onClick: (e) => e.stopPropagation(),
            "data-handler-id": handlerId,
            label: formatMessage({
              id: index.getTranslation("components.DragHandle-label"),
              defaultMessage: "Drag"
            }),
            onKeyDown: handleKeyDown,
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Drag, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Flex,
      {
        direction: "column",
        alignItems: "stretch",
        background: "neutral100",
        padding: 6,
        gap: 6,
        children
      }
    ) })
  ] }) });
};
const Preview$1 = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(StyledSpan, { tag: "span", padding: 6, background: "primary100" });
};
const StyledSpan = styledComponents.styled(designSystem.Box)`
  display: block;
  outline: 1px dashed ${({ theme }) => theme.colors.primary500};
  outline-offset: -1px;
`;
const ComponentInput = ({
  label,
  required,
  name: name2,
  attribute,
  disabled,
  labelAction,
  ...props
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const field = strapiAdmin.useField(name2);
  const showResetComponent = !attribute.repeatable && field.value && !disabled;
  const { components } = index.useDoc();
  const handleInitialisationClick = () => {
    const schema = components[attribute.component];
    const form = createDefaultForm(schema, components);
    const data = transformDocument(schema, components)(form);
    field.onChange(name2, data);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { error: field.error, required, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Label, { action: labelAction, children: [
        label,
        attribute.repeatable && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          " (",
          Array.isArray(field.value) ? field.value.length : 0,
          ")"
        ] })
      ] }),
      showResetComponent && /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.IconButton,
        {
          label: formatMessage({
            id: index.getTranslation("components.reset-entry"),
            defaultMessage: "Reset Entry"
          }),
          variant: "ghost",
          onClick: () => {
            field.onChange(name2, null);
          },
          children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Trash, {})
        }
      )
    ] }),
    !attribute.repeatable && !field.value && /* @__PURE__ */ jsxRuntime.jsx(Initializer, { disabled, name: name2, onClick: handleInitialisationClick }),
    !attribute.repeatable && field.value ? /* @__PURE__ */ jsxRuntime.jsx(NonRepeatableComponent, { attribute, name: name2, disabled, ...props, children: props.children }) : null,
    attribute.repeatable && /* @__PURE__ */ jsxRuntime.jsx(RepeatableComponent, { attribute, name: name2, disabled, ...props, children: props.children }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
  ] });
};
const MemoizedComponentInput = React__namespace.memo(ComponentInput);
const AddComponentButton = ({
  hasError,
  isDisabled,
  isOpen,
  children,
  onClick
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    StyledButton,
    {
      type: "button",
      onClick,
      disabled: isDisabled,
      background: "neutral0",
      style: { cursor: isDisabled ? "not-allowed" : "pointer" },
      variant: "tertiary",
      children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { tag: "span", gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(StyledAddIcon, { "aria-hidden": true, $isOpen: isOpen, $hasError: hasError && !isOpen }),
        /* @__PURE__ */ jsxRuntime.jsx(
          AddComponentTitle,
          {
            variant: "pi",
            fontWeight: "bold",
            textColor: hasError && !isOpen ? "danger600" : "neutral500",
            children
          }
        )
      ] })
    }
  );
};
const StyledAddIcon = styledComponents.styled(Icons.PlusCircle)`
  height: ${({ theme }) => theme.spaces[6]};
  width: ${({ theme }) => theme.spaces[6]};
  transform: ${({ $isOpen }) => $isOpen ? "rotate(45deg)" : "rotate(0deg)"};

  > circle {
    fill: ${({ theme, $hasError }) => $hasError ? theme.colors.danger200 : theme.colors.neutral150};
  }
  > path {
    fill: ${({ theme, $hasError }) => $hasError ? theme.colors.danger600 : theme.colors.neutral600};
  }
`;
const AddComponentTitle = styledComponents.styled(designSystem.Typography)``;
const StyledButton = styledComponents.styled(designSystem.Button)`
  border-radius: 26px;
  border-color: ${({ theme }) => theme.colors.neutral150};
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  height: 5rem;

  &:hover {
    ${AddComponentTitle} {
      color: ${({ theme }) => theme.colors.primary600};
    }

    ${StyledAddIcon} {
      > circle {
        fill: ${({ theme }) => theme.colors.primary600};
      }
      > path {
        fill: ${({ theme }) => theme.colors.primary600};
      }
    }
  }
  &:active {
    ${AddComponentTitle} {
      color: ${({ theme }) => theme.colors.primary600};
    }
    ${StyledAddIcon} {
      > circle {
        fill: ${({ theme }) => theme.colors.primary600};
      }
      > path {
        fill: ${({ theme }) => theme.colors.neutral100};
      }
    }
  }
`;
const ComponentCategory = ({
  category,
  components = [],
  variant = "primary",
  onAddComponent
}) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Accordion.Item, { value: category, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Header, { variant, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Trigger, { children: formatMessage({ id: category, defaultMessage: category }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(Grid, { paddingTop: 4, paddingBottom: 4, paddingLeft: 3, paddingRight: 3, children: components.map(({ uid, displayName, icon }) => /* @__PURE__ */ jsxRuntime.jsx(
      ComponentBox,
      {
        tag: "button",
        type: "button",
        background: "neutral100",
        justifyContent: "center",
        onClick: onAddComponent(uid),
        hasRadius: true,
        height: "8.4rem",
        shrink: 0,
        borderColor: "neutral200",
        children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, alignItems: "center", justifyContent: "center", children: [
          /* @__PURE__ */ jsxRuntime.jsx(ComponentIcon.ComponentIcon, { color: "currentColor", background: "primary200", icon }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", fontWeight: "bold", children: displayName })
        ] })
      },
      uid
    )) }) })
  ] });
};
const Grid = styledComponents.styled(designSystem.Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, 14rem);
  grid-gap: ${({ theme }) => theme.spaces[1]};
`;
const ComponentBox = styledComponents.styled(designSystem.Flex)`
  color: ${({ theme }) => theme.colors.neutral600};
  cursor: pointer;

  @media (prefers-reduced-motion: no-preference) {
    transition: color 120ms ${(props) => props.theme.motion.easings.easeOutQuad};
  }

  &:focus,
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary200};
    background: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.primary600};
  }
`;
const ComponentPicker = ({
  dynamicComponentsByCategory = {},
  isOpen,
  onClickAddComponent
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const handleAddComponentToDz = (componentUid) => () => {
    onClickAddComponent(componentUid);
  };
  if (!isOpen) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Box,
    {
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 5,
      paddingRight: 5,
      background: "neutral0",
      shadow: "tableShadow",
      borderColor: "neutral150",
      hasRadius: true,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", textColor: "neutral600", children: formatMessage({
          id: index.getTranslation("components.DynamicZone.ComponentPicker-label"),
          defaultMessage: "Pick one component"
        }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 2, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Root, { defaultValue: Object.keys(dynamicComponentsByCategory)[0], children: Object.entries(dynamicComponentsByCategory).map(([category, components], index2) => /* @__PURE__ */ jsxRuntime.jsx(
          ComponentCategory,
          {
            category,
            components,
            onAddComponent: handleAddComponentToDz,
            variant: index2 % 2 === 1 ? "primary" : "secondary"
          },
          category
        )) }) })
      ]
    }
  );
};
const NotAllowedInput = ({ hint, label, required, name: name2 }) => {
  const { formatMessage } = reactIntl.useIntl();
  const placeholder = formatMessage({
    id: "components.NotAllowedInput.text",
    defaultMessage: "No permissions to see this field"
  });
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { id: name2, hint, name: name2, required, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: label }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.TextInput,
      {
        disabled: true,
        placeholder,
        startAction: /* @__PURE__ */ jsxRuntime.jsx(Icons.EyeStriked, { fill: "neutral600" }),
        type: "text",
        value: ""
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
  ] });
};
const uidApi = index.contentManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getDefaultUID: builder.query({
      query: ({ params, ...data }) => {
        return {
          url: "/content-manager/uid/generate",
          method: "POST",
          data,
          config: {
            params
          }
        };
      },
      transformResponse: (response) => response.data
    }),
    generateUID: builder.mutation({
      query: ({ params, ...data }) => ({
        url: "/content-manager/uid/generate",
        method: "POST",
        data,
        config: {
          params
        }
      }),
      transformResponse: (response) => response.data
    }),
    getAvailability: builder.query({
      query: ({ params, ...data }) => ({
        url: "/content-manager/uid/check-availability",
        method: "POST",
        data,
        config: {
          params
        }
      }),
      providesTags: (_res, _error, params) => [
        { type: "UidAvailability", id: params.contentTypeUID }
      ]
    })
  })
});
const { useGenerateUIDMutation, useGetDefaultUIDQuery, useGetAvailabilityQuery } = uidApi;
const UID_REGEX = /^[A-Za-z0-9-_.~]*$/;
const UIDInput = React__namespace.forwardRef(
  ({ hint, label, labelAction, name: name2, required, ...props }, ref) => {
    const { model, id } = index.useDoc();
    const allFormValues = strapiAdmin.useForm("InputUID", (form) => form.values);
    const [availability, setAvailability] = React__namespace.useState();
    const [showRegenerate, setShowRegenerate] = React__namespace.useState(false);
    const isCloning = reactRouterDom.useMatch(index.CLONE_PATH) !== null;
    const field = strapiAdmin.useField(name2);
    const debouncedValue = useDebounce.useDebounce(field.value, 300);
    const hasChanged = debouncedValue !== field.initialValue;
    const { toggleNotification } = strapiAdmin.useNotification();
    const { _unstableFormatAPIError: formatAPIError } = strapiAdmin.useAPIErrorHandler();
    const { formatMessage } = reactIntl.useIntl();
    const [{ query }] = strapiAdmin.useQueryParams();
    const params = React__namespace.useMemo(() => index.buildValidParams(query), [query]);
    const {
      data: defaultGeneratedUID,
      isLoading: isGeneratingDefaultUID,
      error: apiError
    } = useGetDefaultUIDQuery(
      {
        contentTypeUID: model,
        field: name2,
        data: {
          id: id ?? "",
          ...allFormValues
        },
        params
      },
      {
        skip: field.value || !required
      }
    );
    React__namespace.useEffect(() => {
      if (apiError) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(apiError)
        });
      }
    }, [apiError, formatAPIError, toggleNotification]);
    React__namespace.useEffect(() => {
      if (defaultGeneratedUID && field.value === void 0) {
        field.onChange(name2, defaultGeneratedUID);
      }
    }, [defaultGeneratedUID, field, name2]);
    const [generateUID, { isLoading: isGeneratingUID }] = useGenerateUIDMutation();
    const handleRegenerateClick = async () => {
      try {
        const res = await generateUID({
          contentTypeUID: model,
          field: name2,
          data: { id: id ?? "", ...allFormValues },
          params
        });
        if ("data" in res) {
          field.onChange(name2, res.data);
        } else {
          toggleNotification({
            type: "danger",
            message: formatAPIError(res.error)
          });
        }
      } catch (err) {
        toggleNotification({
          type: "danger",
          message: formatMessage({
            id: "notification.error",
            defaultMessage: "An error occurred."
          })
        });
      }
    };
    const {
      data: availabilityData,
      isLoading: isCheckingAvailability,
      error: availabilityError
    } = useGetAvailabilityQuery(
      {
        contentTypeUID: model,
        field: name2,
        value: debouncedValue ? debouncedValue.trim() : "",
        params
      },
      {
        // Don't check availability if the value is empty or wasn't changed
        skip: !Boolean(
          (hasChanged || isCloning) && debouncedValue && UID_REGEX.test(debouncedValue.trim())
        )
      }
    );
    React__namespace.useEffect(() => {
      if (availabilityError) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(availabilityError)
        });
      }
    }, [availabilityError, formatAPIError, toggleNotification]);
    React__namespace.useEffect(() => {
      setAvailability(availabilityData);
      let timer;
      if (availabilityData?.isAvailable) {
        timer = window.setTimeout(() => {
          setAvailability(void 0);
        }, 4e3);
      }
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }, [availabilityData]);
    const isLoading = isGeneratingDefaultUID || isGeneratingUID || isCheckingAvailability;
    const fieldRef = strapiAdmin.useFocusInputField(name2);
    const composedRefs = designSystem.useComposedRefs(ref, fieldRef);
    const shouldShowAvailability = (hasChanged || isCloning) && debouncedValue != null && availability && !showRegenerate;
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { hint, name: name2, error: field.error, required, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { action: labelAction, children: label }),
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.TextInput,
        {
          ref: composedRefs,
          disabled: props.disabled,
          endAction: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { position: "relative", gap: 1, children: [
            shouldShowAvailability && /* @__PURE__ */ jsxRuntime.jsxs(
              TextValidation,
              {
                alignItems: "center",
                gap: 1,
                justifyContent: "flex-end",
                $available: !!availability?.isAvailable,
                "data-not-here-outer": true,
                position: "absolute",
                pointerEvents: "none",
                right: 6,
                width: "100px",
                children: [
                  availability?.isAvailable ? /* @__PURE__ */ jsxRuntime.jsx(Icons.CheckCircle, {}) : /* @__PURE__ */ jsxRuntime.jsx(Icons.WarningCircle, {}),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Typography,
                    {
                      textColor: availability.isAvailable ? "success600" : "danger600",
                      variant: "pi",
                      children: formatMessage(
                        availability.isAvailable ? {
                          id: "content-manager.components.uid.available",
                          defaultMessage: "Available"
                        } : {
                          id: "content-manager.components.uid.unavailable",
                          defaultMessage: "Unavailable"
                        }
                      )
                    }
                  )
                ]
              }
            ),
            !props.disabled && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              showRegenerate && /* @__PURE__ */ jsxRuntime.jsx(TextValidation, { alignItems: "center", justifyContent: "flex-end", gap: 1, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "primary600", variant: "pi", children: formatMessage({
                id: "content-manager.components.uid.regenerate",
                defaultMessage: "Regenerate"
              }) }) }),
              /* @__PURE__ */ jsxRuntime.jsx(
                FieldActionWrapper,
                {
                  onClick: handleRegenerateClick,
                  label: formatMessage({
                    id: "content-manager.components.uid.regenerate",
                    defaultMessage: "Regenerate"
                  }),
                  onMouseEnter: () => setShowRegenerate(true),
                  onMouseLeave: () => setShowRegenerate(false),
                  children: isLoading ? /* @__PURE__ */ jsxRuntime.jsx(LoadingWrapper, { "data-testid": "loading-wrapper", children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Loader, {}) }) : /* @__PURE__ */ jsxRuntime.jsx(Icons.ArrowClockwise, {})
                }
              )
            ] })
          ] }),
          onChange: field.onChange,
          value: field.value ?? "",
          ...props
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {}),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
    ] });
  }
);
const FieldActionWrapper = styledComponents.styled(designSystem.Field.Action)`
  width: 1.6rem;

  svg {
    height: 1.6rem;
    width: 1.6rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral400};
    }
  }

  svg:hover {
    path {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`;
const TextValidation = styledComponents.styled(designSystem.Flex)`
  svg {
    height: 1.2rem;
    width: 1.2rem;

    path {
      fill: ${({ theme, $available }) => $available ? theme.colors.success600 : theme.colors.danger600};
    }
  }
`;
const rotation = styledComponents.keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;
const LoadingWrapper = styledComponents.styled(designSystem.Flex)`
  animation: ${rotation} 2s infinite linear;
`;
const MemoizedUIDInput = React__namespace.memo(UIDInput);
const md = new Markdown__default.default({
  html: true,
  // Enable HTML tags in source
  xhtmlOut: false,
  breaks: true,
  langPrefix: "language-",
  linkify: true,
  typographer: true,
  // Code from: https://github.com/markdown-it/markdown-it/blob/master/support/demo_template/index.js#L83
  highlight(str, lang) {
    if (lang && lang !== "auto" && highlight_js.getLanguage(lang)) {
      return '<pre class="hljs language-' + md.utils.escapeHtml(lang.toLowerCase()) + '"><code>' + highlight_js.highlight(lang, str, true).value + "</code></pre>";
    }
    if (lang === "auto") {
      const result = highlight_js.highlightAuto(str);
      return '<pre class="hljs language-' + md.utils.escapeHtml(result.language) + '"><code>' + result.value + "</code></pre>";
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>";
  }
}).use(abbr__default.default).use(container__default.default, "warning").use(container__default.default, "tip").use(deflist__default.default).use(emoji__default.default).use(footnote__default.default).use(ins__default.default).use(mark__default.default).use(sub__default.default).use(sup__default.default);
md.renderer.rules.footnote_ref = (tokens, idx, options, env, slf) => {
  const caption = slf.rules.footnote_caption?.(tokens, idx, options, env, slf);
  return '<sup class="footnote-ref"><span>' + caption + "</span></sup>";
};
md.renderer.rules.footnote_anchor = () => {
  return ' <span class="footnote-backref">↩︎</span>';
};
const PreviewWysiwyg = ({ data = "" }) => {
  const html = React__namespace.useMemo(
    () => sanitizeHtml__default.default(md.render(data.replaceAll("\\n", "\n") || ""), {
      ...sanitizeHtml__default.default.defaults,
      allowedTags: false,
      allowedAttributes: {
        "*": ["href", "align", "alt", "center", "width", "height", "type", "controls", "target"],
        img: ["src", "alt"],
        source: ["src", "type"]
      }
    }),
    [data]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(Wrapper, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { dangerouslySetInnerHTML: { __html: html } }) });
};
const Wrapper = styledComponents.styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: ${({ theme }) => `${theme.spaces[3]} ${theme.spaces[4]}`};
  font-size: 1.4rem;
  background-color: ${({ theme }) => theme.colors.neutral0};
  color: ${({ theme }) => theme.colors.neutral800};
  line-height: ${({ theme }) => theme.lineHeights[6]};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-block-start: ${({ theme }) => theme.spaces[2]};
    margin-block-end: ${({ theme }) => theme.spaces[2]};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spaces[2]};
  }

  h1 {
    font-size: 3.6rem;
    font-weight: 600;
  }

  h2 {
    font-size: 3rem;
    font-weight: 500;
  }

  h3 {
    font-size: 2.4rem;
    font-weight: 500;
  }

  h4 {
    font-size: 2rem;
    font-weight: 500;
  }

  strong {
    font-weight: 800;
  }

  em {
    font-style: italic;
  }

  blockquote {
    margin-top: ${({ theme }) => theme.spaces[8]};
    margin-bottom: ${({ theme }) => theme.spaces[7]};
    font-size: 1.4rem;
    font-weight: 400;
    border-left: 4px solid ${({ theme }) => theme.colors.neutral150};
    font-style: italic;
    padding: ${({ theme }) => theme.spaces[2]} ${({ theme }) => theme.spaces[5]};
  }

  img {
    max-width: 100%;
  }

  table {
    thead {
      background: ${({ theme }) => theme.colors.neutral150};

      th {
        padding: ${({ theme }) => theme.spaces[4]};
      }
    }
    tr {
      border: 1px solid ${({ theme }) => theme.colors.neutral200};
    }
    th,
    td {
      padding: ${({ theme }) => theme.spaces[4]};
      border: 1px solid ${({ theme }) => theme.colors.neutral200};
      border-bottom: 0;
      border-top: 0;
    }
  }

  pre,
  code {
    font-size: 1.4rem;
    border-radius: 4px;
    /* 
      Hard coded since the color is the same between themes,
      theme.colors.neutral800 changes between themes.

      Matches the color of the JSON Input component.
    */
    background-color: #32324d;
    max-width: 100%;
    overflow: auto;
    padding: ${({ theme }) => theme.spaces[2]};
  }

  /* Inline code */
  p,
  pre,
  td {
    > code {
      color: #839496;
    }
  }

  ol {
    list-style-type: decimal;
    margin-block-start: ${({ theme }) => theme.spaces[4]};
    margin-block-end: ${({ theme }) => theme.spaces[4]};
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: ${({ theme }) => theme.spaces[4]};

    ol,
    ul {
      margin-block-start: 0px;
      margin-block-end: 0px;
    }
  }

  ul {
    list-style-type: disc;
    margin-block-start: ${({ theme }) => theme.spaces[4]};
    margin-block-end: ${({ theme }) => theme.spaces[4]};
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: ${({ theme }) => theme.spaces[4]};

    ul,
    ol {
      margin-block-start: 0px;
      margin-block-end: 0px;
    }
  }
`;
var listRE = /^(\s*)(>[> ]*|[*+-] \[[x ]\]\s|[*+-]\s|(\d+)([.)]))(\s*)/, emptyListRE = /^(\s*)(>[> ]*|[*+-] \[[x ]\]|[*+-]|(\d+)[.)])(\s*)$/, unorderedListRE = /[*+-]\s/;
function newlineAndIndentContinueMarkdownList(cm) {
  if (cm.getOption("disableInput")) return CodeMirror__default.default.Pass;
  var ranges = cm.listSelections(), replacements = [];
  for (var i = 0; i < ranges.length; i++) {
    var pos = ranges[i].head;
    var eolState = cm.getStateAfter(pos.line);
    var inList = eolState.list !== false;
    var inQuote = eolState.quote !== 0;
    var line = cm.getLine(pos.line), match = listRE.exec(line);
    var cursorBeforeBullet = /^\s*$/.test(line.slice(0, pos.ch));
    if (!ranges[i].empty() || !inList && !inQuote || !match || cursorBeforeBullet) {
      cm.execCommand("newlineAndIndent");
      return;
    }
    if (emptyListRE.test(line)) {
      var endOfQuote = inQuote && />\s*$/.test(line);
      var endOfList = !/>\s*$/.test(line);
      if (endOfQuote || endOfList)
        cm.replaceRange(
          "",
          {
            line: pos.line,
            ch: 0
          },
          {
            line: pos.line,
            ch: pos.ch + 1
          }
        );
      replacements[i] = "\n";
    } else {
      var indent = match[1], after = match[5];
      var numbered = !(unorderedListRE.test(match[2]) || match[2].indexOf(">") >= 0);
      var bullet = numbered ? parseInt(match[3], 10) + 1 + match[4] : match[2].replace("x", " ");
      replacements[i] = "\n" + indent + bullet + after;
      if (numbered) incrementRemainingMarkdownListNumbers(cm, pos);
    }
  }
  cm.replaceSelections(replacements);
}
function incrementRemainingMarkdownListNumbers(cm, pos) {
  var startLine = pos.line, lookAhead = 0, skipCount = 0;
  var startItem = listRE.exec(cm.getLine(startLine)), startIndent = startItem[1];
  do {
    lookAhead += 1;
    var nextLineNumber = startLine + lookAhead;
    var nextLine = cm.getLine(nextLineNumber);
    var nextItem = listRE.exec(nextLine);
    if (nextItem) {
      var nextIndent = nextItem[1];
      var newNumber = parseInt(startItem[3], 10) + lookAhead - skipCount;
      var nextNumber = parseInt(nextItem[3], 10), itemNumber = nextNumber;
      if (startIndent === nextIndent && !isNaN(nextNumber)) {
        if (newNumber === nextNumber) itemNumber = nextNumber + 1;
        if (newNumber > nextNumber) itemNumber = newNumber + 1;
        cm.replaceRange(
          nextLine.replace(listRE, nextIndent + itemNumber + nextItem[4] + nextItem[5]),
          {
            line: nextLineNumber,
            ch: 0
          },
          {
            line: nextLineNumber,
            ch: nextLine.length
          }
        );
      } else {
        if (startIndent.length > nextIndent.length) return;
        if (startIndent.length < nextIndent.length && lookAhead === 1) return;
        skipCount += 1;
      }
    }
  } while (nextItem);
}
const Editor = React__namespace.forwardRef(
  ({
    disabled,
    editorRef,
    error,
    isPreviewMode,
    isExpandMode,
    name: name2,
    onChange,
    placeholder,
    textareaRef,
    value
  }, forwardedRef) => {
    const onChangeRef = React__namespace.useRef(onChange);
    React__namespace.useEffect(() => {
      if (editorRef.current) {
        editorRef.current.toTextArea();
      }
      editorRef.current = CodeMirror__default.default.fromTextArea(textareaRef.current, {
        lineWrapping: true,
        extraKeys: {
          Enter: "newlineAndIndentContinueMarkdownList",
          Tab: false,
          "Shift-Tab": false
        },
        readOnly: false,
        smartIndent: false,
        placeholder,
        spellcheck: true,
        inputStyle: "contenteditable"
      });
      CodeMirror__default.default.commands.newlineAndIndentContinueMarkdownList = newlineAndIndentContinueMarkdownList;
      editorRef.current.on("change", (doc) => {
        onChangeRef.current(name2, doc.getValue());
      });
    }, [editorRef, textareaRef, name2, placeholder]);
    React__namespace.useEffect(() => {
      if (value && !editorRef.current.hasFocus()) {
        editorRef.current.setValue(value);
      }
    }, [editorRef, value]);
    React__namespace.useEffect(() => {
      if (isPreviewMode || disabled) {
        editorRef.current.setOption("readOnly", "nocursor");
      } else {
        editorRef.current.setOption("readOnly", false);
      }
    }, [disabled, isPreviewMode, editorRef]);
    React__namespace.useEffect(() => {
      if (error) {
        editorRef.current.setOption("screenReaderLabel", error);
      } else {
        editorRef.current.setOption("screenReaderLabel", "Editor");
      }
    }, [editorRef, error]);
    React__namespace.useImperativeHandle(
      forwardedRef,
      () => ({
        focus() {
          editorRef.current.getInputField().focus();
        },
        scrollIntoView(args) {
          editorRef.current.getInputField().scrollIntoView(args);
        }
      }),
      [editorRef]
    );
    return /* @__PURE__ */ jsxRuntime.jsxs(EditorAndPreviewWrapper, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(EditorStylesContainer, { $isExpandMode: isExpandMode, $disabled: disabled || isPreviewMode, children: /* @__PURE__ */ jsxRuntime.jsx("textarea", { ref: textareaRef }) }),
      isPreviewMode && /* @__PURE__ */ jsxRuntime.jsx(PreviewWysiwyg, { data: value })
    ] });
  }
);
const EditorAndPreviewWrapper = styledComponents.styled.div`
  position: relative;
  height: calc(100% - 48px);
`;
const EditorStylesContainer = styledComponents.styled.div`
  cursor: ${({ $disabled }) => $disabled ? "not-allowed !important" : "auto"};
  height: 100%;
  /* BASICS */
  .CodeMirror-placeholder {
    color: ${({ theme }) => theme.colors.neutral600} !important;
  }

  .CodeMirror {
    /* Set height, width, borders, and global font properties here */
    font-size: 1.4rem;
    height: ${({ $isExpandMode }) => $isExpandMode ? "100%" : "410px"}; //  512px(total height) - 48px (header) - 52px(footer) - 2px border
    color: ${({ theme }) => theme.colors.neutral800};
    direction: ltr;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  /* PADDING */

  .CodeMirror-lines {
    padding: ${({ theme }) => `${theme.spaces[3]} ${theme.spaces[4]}`};
    /* Vertical padding around content */
  }

  .CodeMirror-scrollbar-filler,
  .CodeMirror-gutter-filler {
    /* The little square between H and V scrollbars */
    background-color: ${({ theme }) => `${theme.colors.neutral0}`};
  }

  /* GUTTER */

  .CodeMirror-gutters {
    border-right: 1px solid #ddd;
    background-color: #f7f7f7;
    white-space: nowrap;
  }
  .CodeMirror-linenumbers {
  }
  .CodeMirror-linenumber {
    padding: 0 3px 0 5px;
    min-width: 20px;
    text-align: right;
    color: #999;
    white-space: nowrap;
  }

  .CodeMirror-guttermarker {
    color: black;
  }
  .CodeMirror-guttermarker-subtle {
    color: #999;
  }

  /* CURSOR */

  .CodeMirror-cursor {
    border-left: 1px solid black;
    border-right: none;
    width: 0;
  }
  /* Shown when moving in bi-directional text */
  .CodeMirror div.CodeMirror-secondarycursor {
    border-left: 1px solid silver;
  }
  .cm-fat-cursor .CodeMirror-cursor {
    width: auto;
    border: 0 !important;
    background: #7e7;
  }
  .cm-fat-cursor div.CodeMirror-cursors {
    /* z-index: 1; */
  }

  .cm-fat-cursor-mark {
    background-color: rgba(20, 255, 20, 0.5);
    -webkit-animation: blink 1.06s steps(1) infinite;
    -moz-animation: blink 1.06s steps(1) infinite;
    animation: blink 1.06s steps(1) infinite;
  }
  .cm-animate-fat-cursor {
    width: auto;
    border: 0;
    -webkit-animation: blink 1.06s steps(1) infinite;
    -moz-animation: blink 1.06s steps(1) infinite;
    animation: blink 1.06s steps(1) infinite;
    background-color: #7e7;
  }

  /* Can style cursor different in overwrite (non-insert) mode */
  .CodeMirror-overwrite .CodeMirror-cursor {
  }

  .cm-tab {
    display: inline-block;
    text-decoration: inherit;
  }

  .CodeMirror-rulers {
    position: absolute;
    left: 0;
    right: 0;
    top: -50px;
    bottom: 0;
    overflow: hidden;
  }
  .CodeMirror-ruler {
    border-left: 1px solid #ccc;
    top: 0;
    bottom: 0;
    position: absolute;
  }

  /* DEFAULT THEME */

  .cm-header,
  .cm-strong {
    font-weight: bold;
  }
  .cm-em {
    font-style: italic;
  }
  .cm-link {
    text-decoration: underline;
  }
  .cm-strikethrough {
    text-decoration: line-through;
  }

  .CodeMirror-composing {
    border-bottom: 2px solid;
  }

  /* Default styles for common addons */

  div.CodeMirror span.CodeMirror-matchingbracket {
    color: #0b0;
  }
  div.CodeMirror span.CodeMirror-nonmatchingbracket {
    color: #a22;
  }
  .CodeMirror-matchingtag {
    background: rgba(255, 150, 0, 0.3);
  }
  .CodeMirror-activeline-background {
    background: #e8f2ff;
  }

  /* STOP */

  /* The rest of this file contains styles related to the mechanics of
    the editor. You probably shouldn't touch them. */

  .CodeMirror {
    position: relative;
    overflow: hidden;
    background: ${({ theme }) => `${theme.colors.neutral0}`};
  }

  .CodeMirror-scroll {
    overflow: scroll !important; /* Things will break if this is overridden */
    /* 50px is the magic margin used to hide the element's real scrollbars */
    /* See overflow: hidden in .CodeMirror */
    margin-bottom: -50px;
    margin-right: -50px;
    padding-bottom: 50px;
    height: 100%;
    outline: none; /* Prevent dragging from highlighting the element */
    position: relative;
  }
  .CodeMirror-sizer {
    position: relative;
    border-right: 50px solid transparent;
  }

  /* The fake, visible scrollbars. Used to force redraw during scrolling
    before actual scrolling happens, thus preventing shaking and
    flickering artifacts. */
  .CodeMirror-vscrollbar,
  .CodeMirror-hscrollbar,
  .CodeMirror-scrollbar-filler,
  .CodeMirror-gutter-filler {
    position: absolute;
    z-index: 1;
    display: none;
    outline: none;
  }

  .CodeMirror-vscrollbar {
    right: 0;
    top: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .CodeMirror-hscrollbar {
    bottom: 0;
    left: 0;
    overflow-y: hidden;
    overflow-x: scroll;
  }
  .CodeMirror-scrollbar-filler {
    right: 0;
    bottom: 0;
  }

  .CodeMirror-lines {
    cursor: text;
    min-height: 1px; /* prevents collapsing before first draw */
  }
  /* Reset some styles that the rest of the page might have set */
  .CodeMirror pre.CodeMirror-line,
  .CodeMirror pre.CodeMirror-line-like {
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0;
    border-width: 0;
    background: transparent;
    font-family: inherit;
    font-size: inherit;
    margin: 0;
    white-space: pre;
    word-wrap: normal;
    line-height: 1.5;
    color: inherit;
    /* z-index: 2; */
    position: relative;
    overflow: visible;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-variant-ligatures: contextual;
    font-variant-ligatures: contextual;
  }

  .CodeMirror pre.CodeMirror-line-like {
    z-index: 2;
  }

  .CodeMirror-wrap pre.CodeMirror-line,
  .CodeMirror-wrap pre.CodeMirror-line-like {
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: normal;
  }

  .CodeMirror-linebackground {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
  }

  .CodeMirror-linewidget {
    position: relative;
    /* z-index: 2; */
    padding: 0.1px; /* Force widget margins to stay inside of the container */
  }

  .CodeMirror-widget {
  }

  .CodeMirror-rtl pre {
    direction: rtl;
  }

  .CodeMirror-code {
    outline: none;
  }

  /* Force content-box sizing for the elements where we expect it */
  .CodeMirror-scroll,
  .CodeMirror-sizer,
  .CodeMirror-gutter,
  .CodeMirror-gutters,
  .CodeMirror-linenumber {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }

  .CodeMirror-measure {
    position: absolute;
    width: 100%;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  .CodeMirror-cursor {
    position: absolute;
    pointer-events: none;
    border-color: ${({ theme }) => `${theme.colors.neutral800}`};
  }
  .CodeMirror-measure pre {
    position: static;
  }

  div.CodeMirror-cursors {
    visibility: hidden;
    position: relative;
    + div {
      z-index: 0 !important;
    }
  }

  div.CodeMirror-dragcursors {
    visibility: visible;
  }

  .CodeMirror-focused div.CodeMirror-cursors {
    visibility: visible;
  }

  .CodeMirror-selected {
    background: ${({ theme }) => theme.colors.neutral200};
    /* z-index: -10; */
  }
  .CodeMirror-crosshair {
    cursor: crosshair;
  }

  /* Used to force a border model for a node */
  .cm-force-border {
    padding-right: 0.1px;
  }

  /* See issue #2901 */
  .cm-tab-wrap-hack:after {
    content: '';
  }

  /* Help users use markselection to safely style text background */
  span.CodeMirror-selectedtext {
    background: none;
  }

  span {
    color: ${({ theme }) => theme.colors.neutral800} !important;
  }
`;
const EditorLayout = ({
  children,
  isExpandMode,
  error,
  previewContent = "",
  onCollapse
}) => {
  const { formatMessage } = reactIntl.useIntl();
  React__namespace.useEffect(() => {
    if (isExpandMode) {
      document.body.classList.add("lock-body-scroll");
    }
    return () => {
      document.body.classList.remove("lock-body-scroll");
    };
  }, [isExpandMode]);
  if (isExpandMode) {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Portal, { role: "dialog", "aria-modal": false, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.FocusTrap, { onEscape: onCollapse, children: /* @__PURE__ */ jsxRuntime.jsx(
      ExpandWrapper,
      {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 4,
        justifyContent: "center",
        onClick: onCollapse,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Box,
          {
            background: "neutral0",
            hasRadius: true,
            shadow: "popupShadow",
            overflow: "hidden",
            width: "90%",
            height: "90%",
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { height: "100%", alignItems: "flex-start", children: [
              /* @__PURE__ */ jsxRuntime.jsx(BoxWithBorder, { flex: "1", height: "100%", children }),
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "start", direction: "column", flex: 1, height: "100%", width: "100%", children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Flex,
                  {
                    height: "4.8rem",
                    background: "neutral100",
                    justifyContent: "flex-end",
                    shrink: 0,
                    width: "100%",
                    children: /* @__PURE__ */ jsxRuntime.jsxs(ExpandButton$1, { onClick: onCollapse, variant: "tertiary", size: "M", children: [
                      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage({
                        id: "components.Wysiwyg.collapse",
                        defaultMessage: "Collapse"
                      }) }),
                      /* @__PURE__ */ jsxRuntime.jsx(Icons.Collapse, {})
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { position: "relative", height: "100%", width: "100%", children: /* @__PURE__ */ jsxRuntime.jsx(PreviewWysiwyg, { data: previewContent }) })
              ] })
            ] })
          }
        )
      }
    ) }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Flex,
    {
      borderColor: error ? "danger600" : "neutral200",
      borderStyle: "solid",
      borderWidth: "1px",
      hasRadius: true,
      direction: "column",
      alignItems: "stretch",
      children
    }
  );
};
const ExpandWrapper = styledComponents.styled(designSystem.Flex)`
  background: ${({ theme }) => `${theme.colors.neutral800}${Math.floor(0.2 * 255).toString(16).padStart(2, "0")}`};
`;
const BoxWithBorder = styledComponents.styled(designSystem.Box)`
  border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
`;
const ExpandButton$1 = styledComponents.styled(designSystem.Button)`
  background-color: transparent;
  border: none;
  align-items: center;

  & > span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }

  svg {
    margin-left: ${({ theme }) => `${theme.spaces[2]}`};

    path {
      fill: ${({ theme }) => theme.colors.neutral700};
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;
const replaceText = (markdownName, textToChange) => {
  let editedText;
  switch (markdownName) {
    case "Strikethrough":
      editedText = `~~${textToChange}~~`;
      break;
    case "Bold":
      editedText = `**${textToChange}**`;
      break;
    case "Italic":
      editedText = `_${textToChange}_`;
      break;
    case "Underline":
      editedText = `<u>${textToChange}</u>`;
      break;
    case "Code":
      editedText = `\`\`\`
${textToChange}
\`\`\``;
      break;
    case "Link":
      editedText = `[${textToChange}](link)`;
      break;
    case "Quote":
      editedText = `>${textToChange}`;
      break;
    default:
      editedText = textToChange;
  }
  return editedText;
};
const insertText = (markdownName) => {
  let editedText;
  const selection = { start: markdownName.length, end: 0 };
  switch (markdownName) {
    case "Strikethrough":
      editedText = `~~${markdownName}~~`;
      selection.end = 2;
      break;
    case "Bold":
      editedText = `**${markdownName}**`;
      selection.end = 2;
      break;
    case "Italic":
      editedText = `_${markdownName}_`;
      selection.end = 1;
      break;
    case "alt":
      editedText = `[${markdownName}]()`;
      selection.end = 3;
      break;
    case "Underline":
      editedText = `<u>${markdownName}</u>`;
      selection.end = 4;
      break;
    case "Code":
      editedText = `\`\`\`
${markdownName}
\`\`\``;
      selection.end = 3;
      break;
    case "Link":
      editedText = `[${markdownName}](link)`;
      selection.end = 7;
      break;
    case "Quote":
      editedText = `>${markdownName}`;
      selection.end = 0;
      break;
    default:
      editedText = "";
  }
  return { editedText, selection };
};
const insertListOrTitle = (markdown) => {
  let textToInsert;
  switch (markdown) {
    case "BulletList":
      textToInsert = "- ";
      break;
    case "NumberList":
      textToInsert = "1. ";
      break;
    case "h1":
      textToInsert = "# ";
      break;
    case "h2":
      textToInsert = "## ";
      break;
    case "h3":
      textToInsert = "### ";
      break;
    case "h4":
      textToInsert = "#### ";
      break;
    case "h5":
      textToInsert = "##### ";
      break;
    case "h6":
      textToInsert = "###### ";
      break;
    default:
      return "";
  }
  return textToInsert;
};
const markdownHandler = (editor, markdownType) => {
  const textToEdit = editor.current.getSelection();
  let textToInsert;
  if (textToEdit) {
    const editedText = replaceText(markdownType, textToEdit);
    editor.current.replaceSelection(editedText);
    editor.current.focus();
  } else {
    textToInsert = insertText(markdownType);
    editor.current.replaceSelection(textToInsert.editedText);
    editor.current.focus();
    const { line, ch } = editor.current.getCursor();
    const endSelection = ch - textToInsert.selection.end;
    const startSelection = ch - textToInsert.selection.end - textToInsert.selection.start;
    editor.current.setSelection({ line, ch: startSelection }, { line, ch: endSelection });
  }
};
const listHandler = (editor, listType) => {
  const doc = editor.current.getDoc();
  const insertion = listType === "BulletList" ? "- " : "1. ";
  if (doc.somethingSelected()) {
    const selections = doc.listSelections();
    let remove = null;
    editor.current.operation(function() {
      selections.forEach(function(selection) {
        const pos = [selection.head.line, selection.anchor.line].sort();
        if (remove == null) {
          remove = doc.getLine(pos[0]).startsWith(insertion);
        }
        for (let i = pos[0]; i <= pos[1]; i++) {
          if (remove) {
            if (doc.getLine(i).startsWith(insertion)) {
              doc.replaceRange("", { line: i, ch: 0 }, { line: i, ch: insertion.length });
            }
          } else {
            const lineInsertion = listType === "BulletList" ? "- " : `${i + 1}. `;
            doc.replaceRange(lineInsertion, { line: i, ch: 0 });
          }
        }
      });
    });
  } else {
    const { line: currentLine } = doc.getCursor();
    const listToInsert = insertListOrTitle(listType);
    const lineContent = editor.current.getLine(currentLine);
    const textToInsert = listToInsert + lineContent;
    editor.current.setSelection(
      { line: currentLine, ch: 0 },
      { line: currentLine, ch: lineContent.length }
    );
    editor.current.replaceSelection(textToInsert);
  }
  editor.current.focus();
};
const titleHandler = (editor, titleType) => {
  const { line: currentLine } = editor.current.getCursor();
  const titleToInsert = insertListOrTitle(titleType);
  const lineContent = editor.current.getLine(currentLine);
  const lineWithNoTitle = lineContent.replace(/#{1,6}\s/g, "").trim();
  const textToInsert = titleToInsert + lineWithNoTitle;
  editor.current.setSelection(
    { line: currentLine, ch: 0 },
    { line: currentLine, ch: lineContent.length }
  );
  editor.current.replaceSelection(textToInsert);
  setTimeout(() => {
    const newLastLineLength = editor.current.getLine(currentLine).length;
    editor.current.focus();
    editor.current.setCursor({ line: currentLine, ch: newLastLineLength });
  }, 0);
};
const insertFile = (editor, files) => {
  let { line } = editor.current.getCursor();
  const { ch } = editor.current.getCursor();
  files.forEach((file, i) => {
    let contentLength = editor.current.getLine(line).length;
    editor.current.setCursor({ line, ch: contentLength });
    if (i > 0 || i === 0 && ch !== 0) {
      contentLength = editor.current.getLine(line).length;
      editor.current.setCursor({ line, ch: contentLength });
      line++;
      editor.current.replaceSelection("\n");
    }
    if (file.mime.includes("image")) {
      editor.current.replaceSelection(`![${file.alt}](${file.url})`);
    } else {
      editor.current.replaceSelection(`[${file.alt}](${file.url})`);
    }
  });
  setTimeout(() => editor.current.focus(), 0);
};
const insertWithTextToEdit = (editor, markdownType, line, contentLength, textToEdit) => {
  const textToInsert = replaceText(markdownType, textToEdit);
  const contentToMove = editor.current.getRange(
    { line: line + 1, ch: 0 },
    { line: Infinity, ch: Infinity }
  );
  editor.current.replaceRange("", { line: line + 1, ch: 0 }, { line: Infinity, ch: Infinity });
  editor.current.replaceSelection("");
  editor.current.setCursor({ line, ch: contentLength });
  editor.current.replaceSelection("\n");
  editor.current.replaceSelection(textToInsert);
  if (markdownType === "Code") {
    const { line: newLine } = editor.current.getCursor();
    editor.current.setCursor({ line: newLine - 1, ch: textToEdit.length });
  }
  editor.current.replaceRange(
    contentToMove,
    { line: line + 4, ch: 0 },
    { line: Infinity, ch: Infinity }
  );
  editor.current.focus();
};
const insertWithoutTextToEdit = (editor, markdownType, line, contentLength) => {
  const textToInsert = insertText(markdownType);
  const contentToMove = editor.current.getRange(
    { line: line + 1, ch: 0 },
    { line: Infinity, ch: Infinity }
  );
  editor.current.replaceRange("", { line: line + 1, ch: 0 }, { line: Infinity, ch: Infinity });
  editor.current.setCursor({ line, ch: contentLength });
  editor.current.replaceSelection("\n");
  editor.current.replaceSelection(textToInsert.editedText);
  if (markdownType === "Code") {
    line += 2;
    editor.current.setSelection({ line, ch: 0 }, { line, ch: 4 });
  } else {
    line += 1;
    const { ch } = editor.current.getCursor();
    const endSelection = ch - textToInsert.selection.end;
    const startSelection = ch - textToInsert.selection.end - textToInsert.selection.start;
    editor.current.setSelection({ line, ch: startSelection }, { line, ch: endSelection });
  }
  editor.current.replaceRange(
    contentToMove,
    { line: line + 2, ch: 0 },
    { line: Infinity, ch: Infinity }
  );
  editor.current.focus();
};
const quoteAndCodeHandler = (editor, markdownType) => {
  const textToEdit = editor.current.getSelection();
  const { line } = editor.current.getCursor();
  const contentLength = editor.current.getLine(line).length;
  if (textToEdit) {
    insertWithTextToEdit(editor, markdownType, line, contentLength, textToEdit);
  } else {
    insertWithoutTextToEdit(editor, markdownType, line, contentLength);
  }
};
const MainButtons = styledComponents.styled(designSystem.IconButtonGroup)`
  margin-left: ${({ theme }) => theme.spaces[4]};
`;
const MoreButton = styledComponents.styled(designSystem.IconButton)`
  margin: ${({ theme }) => `0 ${theme.spaces[2]}`};
`;
const IconButtonGroupMargin = styledComponents.styled(designSystem.IconButtonGroup)`
  margin-right: ${({ theme }) => `${theme.spaces[2]}`};
`;
const ExpandButton = styledComponents.styled(designSystem.Button)`
  background-color: transparent;
  border: none;
  align-items: center;

  & > span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }

  svg {
    margin-left: ${({ theme }) => `${theme.spaces[2]}`};
    path {
      fill: ${({ theme }) => theme.colors.neutral700};
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;
const WysiwygFooter = ({ onToggleExpand }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: 2, background: "neutral100", borderRadius: `0 0 0.4rem 0.4rem`, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", alignItems: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsxs(ExpandButton, { id: "expand", onClick: onToggleExpand, variant: "tertiary", size: "M", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: formatMessage({
      id: "components.WysiwygBottomControls.fullscreen",
      defaultMessage: "Expand"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(Icons.Expand, {})
  ] }) }) });
};
const WysiwygNav = ({
  disabled,
  editorRef,
  isExpandMode,
  isPreviewMode,
  onActionClick,
  onToggleMediaLib,
  onTogglePreviewMode
}) => {
  const [visiblePopover, setVisiblePopover] = React__namespace.useState(false);
  const { formatMessage } = reactIntl.useIntl();
  const selectPlaceholder = formatMessage({
    id: "components.Wysiwyg.selectOptions.title",
    defaultMessage: "Add a title"
  });
  React__namespace.useRef(null);
  const handleTogglePopover = () => {
    setVisiblePopover((prev) => !prev);
  };
  if (disabled || isPreviewMode) {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Flex,
      {
        padding: 2,
        background: "neutral100",
        justifyContent: "space-between",
        borderRadius: `0.4rem 0.4rem 0 0`,
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Root, { children: /* @__PURE__ */ jsxRuntime.jsxs(
              designSystem.SingleSelect,
              {
                disabled: true,
                placeholder: selectPlaceholder,
                "aria-label": selectPlaceholder,
                size: "S",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h1", children: "h1" }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h2", children: "h2" }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h3", children: "h3" }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h4", children: "h4" }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h5", children: "h5" }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h6", children: "h6" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsxs(MainButtons, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { disabled: true, label: "Bold", name: "Bold", children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Bold, {}) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { disabled: true, label: "Italic", name: "Italic", children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Italic, {}) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { disabled: true, label: "Underline", name: "Underline", children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Underline, {}) })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(MoreButton, { disabled: true, label: "More", children: /* @__PURE__ */ jsxRuntime.jsx(Icons.More, {}) })
          ] }),
          !isExpandMode && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onTogglePreviewMode, variant: "tertiary", children: formatMessage({
            id: "components.Wysiwyg.ToggleMode.markdown-mode",
            defaultMessage: "Markdown mode"
          }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
    {
      padding: 2,
      background: "neutral100",
      justifyContent: "space-between",
      borderRadius: `0.4rem 0.4rem 0 0`,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Root, { children: /* @__PURE__ */ jsxRuntime.jsxs(
            designSystem.SingleSelect,
            {
              placeholder: selectPlaceholder,
              "aria-label": selectPlaceholder,
              onChange: (value) => onActionClick(value, editorRef),
              size: "S",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h1", children: "h1" }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h2", children: "h2" }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h3", children: "h3" }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h4", children: "h4" }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h5", children: "h5" }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h6", children: "h6" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsxs(MainButtons, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { onClick: () => onActionClick("Bold", editorRef), label: "Bold", name: "Bold", children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Bold, {}) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                onClick: () => onActionClick("Italic", editorRef),
                label: "Italic",
                name: "Italic",
                children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Italic, {})
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                onClick: () => onActionClick("Underline", editorRef),
                label: "Underline",
                name: "Underline",
                children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Underline, {})
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Popover.Root, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(MoreButton, { label: "More", children: /* @__PURE__ */ jsxRuntime.jsx(Icons.More, {}) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Content, { sideOffset: 12, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { padding: 2, children: [
              /* @__PURE__ */ jsxRuntime.jsxs(IconButtonGroupMargin, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.IconButton,
                  {
                    onClick: () => onActionClick("Strikethrough", editorRef, handleTogglePopover),
                    label: "Strikethrough",
                    name: "Strikethrough",
                    children: /* @__PURE__ */ jsxRuntime.jsx(Icons.StrikeThrough, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.IconButton,
                  {
                    onClick: () => onActionClick("BulletList", editorRef, handleTogglePopover),
                    label: "BulletList",
                    name: "BulletList",
                    children: /* @__PURE__ */ jsxRuntime.jsx(Icons.BulletList, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.IconButton,
                  {
                    onClick: () => onActionClick("NumberList", editorRef, handleTogglePopover),
                    label: "NumberList",
                    name: "NumberList",
                    children: /* @__PURE__ */ jsxRuntime.jsx(Icons.NumberList, {})
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.IconButtonGroup, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.IconButton,
                  {
                    onClick: () => onActionClick("Code", editorRef, handleTogglePopover),
                    label: "Code",
                    name: "Code",
                    children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Code, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.IconButton,
                  {
                    onClick: () => {
                      handleTogglePopover();
                      onToggleMediaLib();
                    },
                    label: "Image",
                    name: "Image",
                    children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Image, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.IconButton,
                  {
                    onClick: () => onActionClick("Link", editorRef, handleTogglePopover),
                    label: "Link",
                    name: "Link",
                    children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Link, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.IconButton,
                  {
                    onClick: () => onActionClick("Quote", editorRef, handleTogglePopover),
                    label: "Quote",
                    name: "Quote",
                    children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Quotes, {})
                  }
                )
              ] })
            ] }) })
          ] })
        ] }),
        onTogglePreviewMode && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onTogglePreviewMode, variant: "tertiary", children: formatMessage({
          id: "components.Wysiwyg.ToggleMode.preview-mode",
          defaultMessage: "Preview mode"
        }) })
      ]
    }
  );
};
const Wysiwyg = React__namespace.forwardRef(
  ({ hint, disabled, label, name: name2, placeholder, required, labelAction }, forwardedRef) => {
    const field = strapiAdmin.useField(name2);
    const textareaRef = React__namespace.useRef(null);
    const editorRef = React__namespace.useRef(
      null
    );
    const [isPreviewMode, setIsPreviewMode] = React__namespace.useState(false);
    const [mediaLibVisible, setMediaLibVisible] = React__namespace.useState(false);
    const [isExpandMode, setIsExpandMode] = React__namespace.useState(false);
    const components = strapiAdmin.useStrapiApp("ImageDialog", (state) => state.components);
    const MediaLibraryDialog = components["media-library"];
    const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev);
    const handleTogglePreviewMode = () => setIsPreviewMode((prev) => !prev);
    const handleToggleExpand = () => {
      setIsPreviewMode(false);
      setIsExpandMode((prev) => !prev);
    };
    const handleActionClick = (value, currentEditorRef, togglePopover) => {
      switch (value) {
        case "Link":
        case "Strikethrough": {
          markdownHandler(currentEditorRef, value);
          togglePopover?.();
          break;
        }
        case "Code":
        case "Quote": {
          quoteAndCodeHandler(currentEditorRef, value);
          togglePopover?.();
          break;
        }
        case "Bold":
        case "Italic":
        case "Underline": {
          markdownHandler(currentEditorRef, value);
          break;
        }
        case "BulletList":
        case "NumberList": {
          listHandler(currentEditorRef, value);
          togglePopover?.();
          break;
        }
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6": {
          titleHandler(currentEditorRef, value);
          break;
        }
      }
    };
    const handleSelectAssets = (files) => {
      const formattedFiles = files.map((f) => ({
        alt: f.alternativeText || f.name,
        url: useDebounce.prefixFileUrlWithBackendUrl(f.url),
        mime: f.mime
      }));
      insertFile(editorRef, formattedFiles);
      setMediaLibVisible(false);
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: name2, hint, error: field.error, required, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { action: labelAction, children: label }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          EditorLayout,
          {
            isExpandMode,
            error: field.error,
            previewContent: field.value,
            onCollapse: handleToggleExpand,
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                WysiwygNav,
                {
                  isExpandMode,
                  editorRef,
                  isPreviewMode,
                  onActionClick: handleActionClick,
                  onToggleMediaLib: handleToggleMediaLib,
                  onTogglePreviewMode: isExpandMode ? void 0 : handleTogglePreviewMode,
                  disabled
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                Editor,
                {
                  disabled,
                  isExpandMode,
                  editorRef,
                  error: field.error,
                  isPreviewMode,
                  name: name2,
                  onChange: field.onChange,
                  placeholder,
                  textareaRef,
                  value: field.value,
                  ref: forwardedRef
                }
              ),
              !isExpandMode && /* @__PURE__ */ jsxRuntime.jsx(WysiwygFooter, { onToggleExpand: handleToggleExpand })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {}),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
      ] }),
      mediaLibVisible && // @ts-expect-error – TODO: fix this way of injecting because it's not really typeable without a registry.
      /* @__PURE__ */ jsxRuntime.jsx(MediaLibraryDialog, { onClose: handleToggleMediaLib, onSelectAssets: handleSelectAssets })
    ] });
  }
);
const MemoizedWysiwyg = React__namespace.memo(Wysiwyg);
const InputRenderer = ({ visible, hint: providedHint, ...props }) => {
  const { id, document: document2, collectionType } = index.useDoc();
  const isFormDisabled = strapiAdmin.useForm("InputRenderer", (state) => state.disabled);
  const isInDynamicZone = useDynamicZone("isInDynamicZone", (state) => state.isInDynamicZone);
  const canCreateFields = index.useDocumentRBAC("InputRenderer", (rbac) => rbac.canCreateFields);
  const canReadFields = index.useDocumentRBAC("InputRenderer", (rbac) => rbac.canReadFields);
  const canUpdateFields = index.useDocumentRBAC("InputRenderer", (rbac) => rbac.canUpdateFields);
  const canUserAction = index.useDocumentRBAC("InputRenderer", (rbac) => rbac.canUserAction);
  let idToCheck = id;
  if (collectionType === index.SINGLE_TYPES) {
    idToCheck = document2?.documentId;
  }
  const editableFields = idToCheck ? canUpdateFields : canCreateFields;
  const readableFields = idToCheck ? canReadFields : canCreateFields;
  const canUserReadField = canUserAction(props.name, readableFields, props.type);
  const canUserEditField = canUserAction(props.name, editableFields, props.type);
  const fields = strapiAdmin.useStrapiApp("InputRenderer", (app) => app.fields);
  const { lazyComponentStore } = useLazyComponents(
    attributeHasCustomFieldProperty(props.attribute) ? [props.attribute.customField] : void 0
  );
  const hint = useFieldHint(providedHint, props.attribute);
  const {
    edit: { components }
  } = index.useDocLayout();
  const field = strapiAdmin.useField(props.name);
  if (!visible) {
    return null;
  }
  if (!canUserReadField && !isInDynamicZone) {
    return /* @__PURE__ */ jsxRuntime.jsx(NotAllowedInput, { hint, ...props });
  }
  const fieldIsDisabled = !canUserEditField && !isInDynamicZone || props.disabled || isFormDisabled;
  if (attributeHasCustomFieldProperty(props.attribute)) {
    const CustomInput = lazyComponentStore[props.attribute.customField];
    if (CustomInput) {
      return /* @__PURE__ */ jsxRuntime.jsx(CustomInput, { ...props, ...field, hint, disabled: fieldIsDisabled });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      strapiAdmin.InputRenderer,
      {
        ...props,
        hint,
        type: props.attribute.customField,
        disabled: fieldIsDisabled
      }
    );
  }
  const addedInputTypes = Object.keys(fields);
  if (!attributeHasCustomFieldProperty(props.attribute) && addedInputTypes.includes(props.type)) {
    const CustomInput = fields[props.type];
    return /* @__PURE__ */ jsxRuntime.jsx(CustomInput, { ...props, hint, disabled: fieldIsDisabled });
  }
  switch (props.type) {
    case "blocks":
      return /* @__PURE__ */ jsxRuntime.jsx(MemoizedBlocksInput, { ...props, hint, type: props.type, disabled: fieldIsDisabled });
    case "component":
      return /* @__PURE__ */ jsxRuntime.jsx(
        MemoizedComponentInput,
        {
          ...props,
          hint,
          layout: components[props.attribute.component].layout,
          disabled: fieldIsDisabled,
          children: (inputProps) => /* @__PURE__ */ jsxRuntime.jsx(InputRenderer, { ...inputProps })
        }
      );
    case "dynamiczone":
      return /* @__PURE__ */ jsxRuntime.jsx(DynamicZone, { ...props, hint, disabled: fieldIsDisabled });
    case "relation":
      return /* @__PURE__ */ jsxRuntime.jsx(Relations.MemoizedRelationsField, { ...props, hint, disabled: fieldIsDisabled });
    case "richtext":
      return /* @__PURE__ */ jsxRuntime.jsx(MemoizedWysiwyg, { ...props, hint, type: props.type, disabled: fieldIsDisabled });
    case "uid":
      return /* @__PURE__ */ jsxRuntime.jsx(MemoizedUIDInput, { ...props, hint, type: props.type, disabled: fieldIsDisabled });
    case "enumeration":
      return /* @__PURE__ */ jsxRuntime.jsx(
        strapiAdmin.InputRenderer,
        {
          ...props,
          hint,
          options: props.attribute.enum.map((value) => ({ value })),
          type: props.customField ? "custom-field" : props.type,
          disabled: fieldIsDisabled
        }
      );
    default:
      const { unique: _unique, mainField: _mainField, ...restProps } = props;
      return /* @__PURE__ */ jsxRuntime.jsx(
        strapiAdmin.InputRenderer,
        {
          ...restProps,
          hint,
          type: props.customField ? "custom-field" : props.type,
          disabled: fieldIsDisabled
        }
      );
  }
};
const attributeHasCustomFieldProperty = (attribute) => "customField" in attribute && typeof attribute.customField === "string";
const useFieldHint = (hint = void 0, attribute) => {
  const { formatMessage } = reactIntl.useIntl();
  const { maximum, minimum } = getMinMax(attribute);
  if (!maximum && !minimum) {
    return hint;
  }
  const units = !["biginteger", "integer", "number", "dynamiczone", "component"].includes(
    attribute.type
  ) ? formatMessage(
    {
      id: "content-manager.form.Input.hint.character.unit",
      defaultMessage: "{maxValue, plural, one { character} other { characters}}"
    },
    {
      maxValue: Math.max(minimum || 0, maximum || 0)
    }
  ) : null;
  const hasMinAndMax = typeof minimum === "number" && typeof maximum === "number";
  return formatMessage(
    {
      id: "content-manager.form.Input.hint.text",
      defaultMessage: "{min, select, undefined {} other {min. {min}}}{divider}{max, select, undefined {} other {max. {max}}}{unit}{br}{description}"
    },
    {
      min: minimum,
      max: maximum,
      description: hint,
      unit: units,
      divider: hasMinAndMax ? formatMessage({
        id: "content-manager.form.Input.hint.minMaxDivider",
        defaultMessage: " / "
      }) : null,
      br: /* @__PURE__ */ jsxRuntime.jsx("br", {})
    }
  );
};
const getMinMax = (attribute) => {
  if ("min" in attribute || "max" in attribute) {
    return {
      maximum: !Number.isNaN(Number(attribute.max)) ? Number(attribute.max) : void 0,
      minimum: !Number.isNaN(Number(attribute.min)) ? Number(attribute.min) : void 0
    };
  } else if ("maxLength" in attribute || "minLength" in attribute) {
    return { maximum: attribute.maxLength, minimum: attribute.minLength };
  } else {
    return { maximum: void 0, minimum: void 0 };
  }
};
const MemoizedInputRenderer = React.memo(InputRenderer);
const DynamicComponent = ({
  componentUid,
  disabled,
  index: index$1,
  name: name2,
  onRemoveComponentClick,
  onMoveComponent,
  onGrabItem,
  onDropItem,
  onCancel,
  dynamicComponentsByCategory = {},
  onAddComponent
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const formValues = strapiAdmin.useForm("DynamicComponent", (state) => state.values);
  const {
    edit: { components }
  } = index.useDocLayout();
  const title = React__namespace.useMemo(() => {
    const { mainField } = components[componentUid]?.settings ?? { mainField: "id" };
    const mainFieldValue = objects.getIn(formValues, `${name2}.${index$1}.${mainField}`);
    const displayedValue = mainField === "id" || !mainFieldValue ? "" : String(mainFieldValue).trim();
    const mainValue = displayedValue.length > 0 ? `- ${displayedValue}` : displayedValue;
    return mainValue;
  }, [componentUid, components, formValues, name2, index$1]);
  const { icon, displayName } = React__namespace.useMemo(() => {
    const [category] = componentUid.split(".");
    const { icon: icon2, displayName: displayName2 } = (dynamicComponentsByCategory[category] ?? []).find(
      (component) => component.uid === componentUid
    ) ?? { icon: null, displayName: null };
    return { icon: icon2, displayName: displayName2 };
  }, [componentUid, dynamicComponentsByCategory]);
  const [{ handlerId, isDragging, handleKeyDown }, boxRef, dropRef, dragRef, dragPreviewRef] = useDragAndDrop.useDragAndDrop(!disabled, {
    type: `${useDragAndDrop.ItemTypes.DYNAMIC_ZONE}_${name2}`,
    index: index$1,
    item: {
      index: index$1,
      displayedValue: `${displayName} ${title}`,
      icon
    },
    onMoveItem: onMoveComponent,
    onDropItem,
    onGrabItem,
    onCancel
  });
  React__namespace.useEffect(() => {
    dragPreviewRef(reactDndHtml5Backend.getEmptyImage(), { captureDraggingState: false });
  }, [dragPreviewRef, index$1]);
  const accordionValue = React__namespace.useId();
  const { value = [], rawError } = strapiAdmin.useField(`${name2}.${index$1}`);
  const [collapseToOpen, setCollapseToOpen] = React__namespace.useState("");
  React__namespace.useEffect(() => {
    if (rawError && value) {
      setCollapseToOpen(accordionValue);
    }
  }, [rawError, value, accordionValue]);
  const composedBoxRefs = designSystem.useComposedRefs(boxRef, dropRef);
  const accordionActions = disabled ? null : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.IconButton,
      {
        variant: "ghost",
        label: formatMessage(
          {
            id: index.getTranslation("components.DynamicZone.delete-label"),
            defaultMessage: "Delete {name}"
          },
          { name: title }
        ),
        onClick: onRemoveComponentClick,
        children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Trash, {})
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.IconButton,
      {
        variant: "ghost",
        onClick: (e) => e.stopPropagation(),
        "data-handler-id": handlerId,
        ref: dragRef,
        label: formatMessage({
          id: index.getTranslation("components.DragHandle-label"),
          defaultMessage: "Drag"
        }),
        onKeyDown: handleKeyDown,
        children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Drag, {})
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Root, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Trigger, { size: "S", endIcon: null, paddingLeft: 2, paddingRight: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(Icons.More, { "aria-hidden": true, focusable: false }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { tag: "span", children: formatMessage({
          id: index.getTranslation("components.DynamicZone.more-actions"),
          defaultMessage: "More actions"
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Content, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.SubRoot, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.SubTrigger, { children: formatMessage({
            id: index.getTranslation("components.DynamicZone.add-item-above"),
            defaultMessage: "Add component above"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.SubContent, { children: Object.entries(dynamicComponentsByCategory).map(([category, components2]) => /* @__PURE__ */ jsxRuntime.jsxs(React__namespace.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Label, { children: category }),
            components2.map(({ displayName: displayName2, uid }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.MenuItem, { onSelect: () => onAddComponent(uid, index$1), children: displayName2 }, componentUid))
          ] }, category)) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.SubRoot, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.SubTrigger, { children: formatMessage({
            id: index.getTranslation("components.DynamicZone.add-item-below"),
            defaultMessage: "Add component below"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.SubContent, { children: Object.entries(dynamicComponentsByCategory).map(([category, components2]) => /* @__PURE__ */ jsxRuntime.jsxs(React__namespace.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Label, { children: category }),
            components2.map(({ displayName: displayName2, uid }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.MenuItem, { onSelect: () => onAddComponent(uid, index$1 + 1), children: displayName2 }, componentUid))
          ] }, category)) })
        ] })
      ] })
    ] })
  ] });
  const accordionTitle = title ? `${displayName} ${title}` : displayName;
  return /* @__PURE__ */ jsxRuntime.jsxs(ComponentContainer, { tag: "li", width: "100%", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(Rectangle, { background: "neutral200" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(StyledBox, { ref: composedBoxRefs, hasRadius: true, children: isDragging ? /* @__PURE__ */ jsxRuntime.jsx(Preview, {}) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Root, { value: collapseToOpen, onValueChange: setCollapseToOpen, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Accordion.Item, { value: accordionValue, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Accordion.Header, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Accordion.Trigger,
          {
            icon: icon && ComponentIcon.COMPONENT_ICONS[icon] ? ComponentIcon.COMPONENT_ICONS[icon] : ComponentIcon.COMPONENT_ICONS.dashboard,
            children: accordionTitle
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Actions, { children: accordionActions })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(AccordionContentRadius, { background: "neutral0", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 6, paddingRight: 6, paddingTop: 6, paddingBottom: 6, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: components[componentUid]?.layout?.map((row, rowInd) => /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Grid.Item,
        {
          col: 12,
          s: 12,
          xs: 12,
          direction: "column",
          alignItems: "stretch",
          children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: row.map(({ size, ...field }) => {
            const fieldName = `${name2}.${index$1}.${field.name}`;
            const fieldWithTranslatedLabel = {
              ...field,
              label: formatMessage({
                id: `content-manager.components.${componentUid}.${field.name}`,
                defaultMessage: field.label
              })
            };
            return /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Grid.Item,
              {
                col: size,
                s: 12,
                xs: 12,
                direction: "column",
                alignItems: "stretch",
                children: /* @__PURE__ */ jsxRuntime.jsx(MemoizedInputRenderer, { ...fieldWithTranslatedLabel, name: fieldName })
              },
              fieldName
            );
          }) })
        },
        rowInd
      )) }) }) }) })
    ] }) }) })
  ] });
};
const StyledBox = styledComponents.styled(designSystem.Box)`
  > div:first-child {
    box-shadow: ${({ theme }) => theme.shadows.tableShadow};
  }
`;
const AccordionContentRadius = styledComponents.styled(designSystem.Box)`
  border-radius: 0 0 ${({ theme }) => theme.spaces[1]} ${({ theme }) => theme.spaces[1]};
`;
const Rectangle = styledComponents.styled(designSystem.Box)`
  width: ${({ theme }) => theme.spaces[2]};
  height: ${({ theme }) => theme.spaces[4]};
`;
const Preview = styledComponents.styled.span`
  display: block;
  background-color: ${({ theme }) => theme.colors.primary100};
  outline: 1px dashed ${({ theme }) => theme.colors.primary500};
  outline-offset: -1px;
  padding: ${({ theme }) => theme.spaces[6]};
`;
const ComponentContainer = styledComponents.styled(designSystem.Box)`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const DynamicZoneLabel = ({
  hint,
  label,
  labelAction,
  name: name2,
  numberOfComponents = 0,
  required
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Box,
    {
      paddingTop: 3,
      paddingBottom: 3,
      paddingRight: 4,
      paddingLeft: 4,
      borderRadius: "26px",
      background: "neutral0",
      shadow: "filterShadow",
      color: "neutral500",
      children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", justifyContent: "center", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { maxWidth: "35.6rem", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", ellipsis: true, children: [
            label || name2,
            " "
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: [
            "(",
            numberOfComponents,
            ")"
          ] }),
          required && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "danger600", children: "*" }),
          labelAction && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 1, children: labelAction })
        ] }),
        hint && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 1, maxWidth: "35.6rem", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", ellipsis: true, children: hint }) })
      ] })
    }
  ) });
};
const [DynamicZoneProvider, useDynamicZone] = strapiAdmin.createContext(
  "DynamicZone",
  {
    isInDynamicZone: false
  }
);
const DynamicZone = ({
  attribute,
  disabled: disabledProp,
  hint,
  label,
  labelAction,
  name: name2,
  required = false
}) => {
  const { max = Infinity, min = -Infinity } = attribute ?? {};
  const [addComponentIsOpen, setAddComponentIsOpen] = React__namespace.useState(false);
  const [liveText, setLiveText] = React__namespace.useState("");
  const { components, isLoading } = index.useDoc();
  const disabled = disabledProp || isLoading;
  const { addFieldRow, removeFieldRow, moveFieldRow } = strapiAdmin.useForm(
    "DynamicZone",
    ({ addFieldRow: addFieldRow2, removeFieldRow: removeFieldRow2, moveFieldRow: moveFieldRow2 }) => ({
      addFieldRow: addFieldRow2,
      removeFieldRow: removeFieldRow2,
      moveFieldRow: moveFieldRow2
    })
  );
  const { value = [], error } = strapiAdmin.useField(name2);
  const dynamicComponentsByCategory = React__namespace.useMemo(() => {
    return attribute.components.reduce((acc, componentUid) => {
      const { category, info } = components[componentUid] ?? { info: {} };
      const component = { uid: componentUid, displayName: info.displayName, icon: info.icon };
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category] = [...acc[category], component];
      return acc;
    }, {});
  }, [attribute.components, components]);
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const dynamicDisplayedComponentsLength = value.length;
  const handleAddComponent = (uid, position) => {
    setAddComponentIsOpen(false);
    const schema = components[uid];
    const form = createDefaultForm(schema, components);
    const transformations = pipe__default.default(transformDocument(schema, components), (data2) => ({
      ...data2,
      __component: uid
    }));
    const data = transformations(form);
    addFieldRow(name2, data, position);
  };
  const handleClickOpenPicker = () => {
    if (dynamicDisplayedComponentsLength < max) {
      setAddComponentIsOpen((prev) => !prev);
    } else {
      toggleNotification({
        type: "info",
        message: formatMessage({
          id: index.getTranslation("components.notification.info.maximum-requirement")
        })
      });
    }
  };
  const handleMoveComponent = (newIndex, currentIndex) => {
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.reorder"),
          defaultMessage: "{item}, moved. New position in list: {position}."
        },
        {
          item: `${name2}.${currentIndex}`,
          position: getItemPos(newIndex)
        }
      )
    );
    moveFieldRow(name2, currentIndex, newIndex);
  };
  const getItemPos = (index2) => `${index2 + 1} of ${value.length}`;
  const handleCancel = (index$1) => {
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.cancel-item"),
          defaultMessage: "{item}, dropped. Re-order cancelled."
        },
        {
          item: `${name2}.${index$1}`
        }
      )
    );
  };
  const handleGrabItem = (index$1) => {
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.grab-item"),
          defaultMessage: `{item}, grabbed. Current position in list: {position}. Press up and down arrow to change position, Spacebar to drop, Escape to cancel.`
        },
        {
          item: `${name2}.${index$1}`,
          position: getItemPos(index$1)
        }
      )
    );
  };
  const handleDropItem = (index$1) => {
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.drop-item"),
          defaultMessage: `{item}, dropped. Final position in list: {position}.`
        },
        {
          item: `${name2}.${index$1}`,
          position: getItemPos(index$1)
        }
      )
    );
  };
  const handleRemoveComponent = (name22, currentIndex) => () => {
    removeFieldRow(name22, currentIndex);
  };
  const hasError = error !== void 0;
  const renderButtonLabel = () => {
    if (addComponentIsOpen) {
      return formatMessage({ id: "app.utils.close-label", defaultMessage: "Close" });
    }
    if (hasError && dynamicDisplayedComponentsLength > max) {
      return formatMessage(
        {
          id: index.getTranslation(`components.DynamicZone.extra-components`),
          defaultMessage: "There {number, plural, =0 {are # extra components} one {is # extra component} other {are # extra components}}"
        },
        {
          number: dynamicDisplayedComponentsLength - max
        }
      );
    }
    if (hasError && dynamicDisplayedComponentsLength < min) {
      return formatMessage(
        {
          id: index.getTranslation(`components.DynamicZone.missing-components`),
          defaultMessage: "There {number, plural, =0 {are # missing components} one {is # missing component} other {are # missing components}}"
        },
        { number: min - dynamicDisplayedComponentsLength }
      );
    }
    return formatMessage(
      {
        id: index.getTranslation("components.DynamicZone.add-component"),
        defaultMessage: "Add a component to {componentName}"
      },
      { componentName: label || name2 }
    );
  };
  const level = Relations.useComponent("DynamicZone", (state) => state.level);
  const ariaDescriptionId = React__namespace.useId();
  return /* @__PURE__ */ jsxRuntime.jsx(DynamicZoneProvider, { isInDynamicZone: true, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
    dynamicDisplayedComponentsLength > 0 && /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        DynamicZoneLabel,
        {
          hint,
          label,
          labelAction,
          name: name2,
          numberOfComponents: dynamicDisplayedComponentsLength,
          required
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { id: ariaDescriptionId, children: formatMessage({
        id: index.getTranslation("dnd.instructions"),
        defaultMessage: `Press spacebar to grab and re-order`
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { "aria-live": "assertive", children: liveText }),
      /* @__PURE__ */ jsxRuntime.jsx("ol", { "aria-describedby": ariaDescriptionId, children: value.map((field, index2) => /* @__PURE__ */ jsxRuntime.jsx(
        Relations.ComponentProvider,
        {
          level: level + 1,
          uid: field.__component,
          id: field.id,
          type: "dynamiczone",
          children: /* @__PURE__ */ jsxRuntime.jsx(
            DynamicComponent,
            {
              disabled,
              name: name2,
              index: index2,
              componentUid: field.__component,
              onMoveComponent: handleMoveComponent,
              onRemoveComponentClick: handleRemoveComponent(name2, index2),
              onCancel: handleCancel,
              onDropItem: handleDropItem,
              onGrabItem: handleGrabItem,
              onAddComponent: handleAddComponent,
              dynamicComponentsByCategory
            }
          )
        },
        field.__temp_key__
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(
      AddComponentButton,
      {
        hasError,
        isDisabled: disabled,
        isOpen: addComponentIsOpen,
        onClick: handleClickOpenPicker,
        children: renderButtonLabel()
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      ComponentPicker,
      {
        dynamicComponentsByCategory,
        isOpen: addComponentIsOpen,
        onClickAddComponent: handleAddComponent
      }
    )
  ] }) });
};
exports.DynamicZone = DynamicZone;
exports.MemoizedBlocksInput = MemoizedBlocksInput;
exports.MemoizedComponentInput = MemoizedComponentInput;
exports.MemoizedInputRenderer = MemoizedInputRenderer;
exports.MemoizedUIDInput = MemoizedUIDInput;
exports.MemoizedWysiwyg = MemoizedWysiwyg;
exports.NotAllowedInput = NotAllowedInput;
exports.createDefaultForm = createDefaultForm;
exports.prepareTempKeys = prepareTempKeys;
exports.removeFieldsThatDontExistOnSchema = removeFieldsThatDontExistOnSchema;
exports.transformDocument = transformDocument;
exports.useDynamicZone = useDynamicZone;
exports.useFieldHint = useFieldHint;
exports.useLazyComponents = useLazyComponents;
//# sourceMappingURL=Field-Dj1nOvt8.js.map

import { defineMcp } from "@lovable.dev/mcp-js";
import listPackages from "./tools/list-packages";
import getPackage from "./tools/get-package";

export default defineMcp({
  name: "nodekpt-mcp",
  title: "Nodekpt Marketplace MCP",
  version: "0.1.0",
  instructions:
    "Tools for browsing the Nodekpt hosting marketplace. Use `list_packages` to discover VPS, bare-metal, and GPU offerings, and `get_package` to fetch full specs and pricing for a specific package id.",
  tools: [listPackages, getPackage],
});

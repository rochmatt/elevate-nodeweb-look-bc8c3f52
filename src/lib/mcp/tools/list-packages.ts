import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const PACKAGES = [
  { id: "bm-ams-01", name: "Bare Metal AMS-01", category: "bare-metal", location: "Amsterdam", vcpu: 16, ramGb: 64, storageGb: 1000, priceMonthlyUsd: 189 },
  { id: "vps-sgp-02", name: "VPS Singapore Pro", category: "vps", location: "Singapore", vcpu: 8, ramGb: 16, storageGb: 320, priceMonthlyUsd: 49 },
  { id: "vps-nyc-04", name: "VPS NYC Standard", category: "vps", location: "New York", vcpu: 4, ramGb: 8, storageGb: 160, priceMonthlyUsd: 24 },
  { id: "bm-fra-07", name: "Bare Metal FRA-07", category: "bare-metal", location: "Frankfurt", vcpu: 32, ramGb: 128, storageGb: 2000, priceMonthlyUsd: 349 },
  { id: "gpu-tok-01", name: "GPU Node Tokyo", category: "gpu", location: "Tokyo", vcpu: 24, ramGb: 96, storageGb: 1500, priceMonthlyUsd: 599 },
];

export default defineTool({
  name: "list_packages",
  title: "List marketplace packages",
  description: "List server packages available in the marketplace. Optionally filter by category or location.",
  inputSchema: {
    category: z.enum(["bare-metal", "vps", "gpu"]).optional().describe("Filter by product category."),
    location: z.string().optional().describe("Filter by data center location (case-insensitive substring)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, location }) => {
    const loc = location?.toLowerCase();
    const items = PACKAGES.filter(
      (p) =>
        (!category || p.category === category) &&
        (!loc || p.location.toLowerCase().includes(loc)),
    );
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { items },
    };
  },
});

import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const DETAILS: Record<string, { id: string; name: string; description: string; specs: Record<string, string>; priceMonthlyUsd: number }> = {
  "bm-ams-01": { id: "bm-ams-01", name: "Bare Metal AMS-01", description: "Dedicated bare-metal server in Amsterdam with NVMe storage.", specs: { cpu: "Intel Xeon E-2388G", ram: "64 GB DDR4", storage: "2x 480GB NVMe" }, priceMonthlyUsd: 189 },
  "vps-sgp-02": { id: "vps-sgp-02", name: "VPS Singapore Pro", description: "High-performance VPS in Singapore with dedicated vCPU.", specs: { cpu: "8 dedicated vCPU", ram: "16 GB", storage: "320 GB NVMe" }, priceMonthlyUsd: 49 },
  "vps-nyc-04": { id: "vps-nyc-04", name: "VPS NYC Standard", description: "Standard VPS instance in New York.", specs: { cpu: "4 vCPU", ram: "8 GB", storage: "160 GB SSD" }, priceMonthlyUsd: 24 },
  "bm-fra-07": { id: "bm-fra-07", name: "Bare Metal FRA-07", description: "High-density bare-metal in Frankfurt.", specs: { cpu: "AMD EPYC 7443P", ram: "128 GB DDR4", storage: "2x 1TB NVMe" }, priceMonthlyUsd: 349 },
  "gpu-tok-01": { id: "gpu-tok-01", name: "GPU Node Tokyo", description: "GPU-accelerated node in Tokyo for ML workloads.", specs: { cpu: "24 vCPU", ram: "96 GB", gpu: "1x NVIDIA L40S", storage: "1.5 TB NVMe" }, priceMonthlyUsd: 599 },
};

export default defineTool({
  name: "get_package",
  title: "Get package details",
  description: "Get detailed specifications and pricing for a specific marketplace package by id.",
  inputSchema: { id: z.string().min(1).describe("Package id, e.g. 'bm-ams-01'.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const pkg = DETAILS[id];
    if (!pkg) {
      return { content: [{ type: "text", text: `Package not found: ${id}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(pkg, null, 2) }],
      structuredContent: pkg,
    };
  },
});

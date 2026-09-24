import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "node:child_process";

function lastCommitISO() {
    try { return execSync("git log -1 --format=%cI").toString().trim(); }
    catch { return new Date().toISOString(); }
}

export default defineConfig({
    plugins: [react()],
    base: "/react-crud-local/",
    define: {
        __APP_BUILD_ISO__: JSON.stringify(new Date().toISOString()),
        __APP_COMMIT_ISO__: JSON.stringify(lastCommitISO()),
    },
    build: { sourcemap: false },
    css: { devSourcemap: false },
});

import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [react()],
	// preview: {
	// 	host: true,
	// 	port: 4009,
	// 	allowedHosts: ["matcha.ilandols.com"],
	// },
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
})

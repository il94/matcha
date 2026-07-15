const HTML_ESCAPES: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
}

export default function escapeHtml(str: string) {
	if (!str) return ""
	return str.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char])
}

import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';

const renderer = new marked.Renderer();

renderer.code = function ({ text, lang }) {
  let highlightedCode = text;

  if (lang && hljs.getLanguage(lang)) {
    highlightedCode = hljs.highlight(text, {
      language: lang
    }).value;
  } 
  else {
    highlightedCode = hljs.highlightAuto(text).value;
  }

  return `
    <pre>
      <code class="hljs language-${lang}">
        ${highlightedCode}
      </code>
    </pre>
  `;
};

marked.setOptions({
  // GitHub Markdown support
  gfm: true,

  // Keep paragraphs clean
  breaks: false,

  // Synchronous parsing
  async: false,

  // Improve code blocks, tables, lists
  pedantic: false,

  // Customize tokens if needed
  walkTokens(token) {
      // optional processing
  },
  renderer
});

export function formatAIResponse(text: string): string {
  const html = marked.parse(text);
  return DOMPurify.sanitize(html as string);
}
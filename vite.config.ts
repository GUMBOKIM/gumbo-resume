import { defineConfig } from 'vite';
import { renderSeoDocument, renderJsonLd } from './src/ui/seo';

export default defineConfig({
  plugins: [
    {
      // 이력서 콘텐츠를 시맨틱 HTML + JSON-LD로 index.html에 주입 (SEO/접근성)
      name: 'inject-seo',
      transformIndexHtml(html) {
        return html
          .replace('<!--seo-jsonld-->', `<script type="application/ld+json">${renderJsonLd()}</script>`)
          .replace('<!--seo-content-->', renderSeoDocument());
      },
    },
  ],
});

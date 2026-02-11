import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './AppShell';
import {
  SeoContext,
  renderSeoHeadTags,
  resolveSeoProps,
  type ResolvedSeoProps,
} from '@/components/seo/Seo';

interface RenderResult {
  appHtml: string;
  headTags: string;
}

export function render(url: string): RenderResult {
  let capturedSeo: ResolvedSeoProps | null = null;

  const appHtml = renderToString(
    <SeoContext.Provider value={(seo) => {
      capturedSeo = seo;
    }}>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </SeoContext.Provider>
  );

  const fallbackSeo = resolveSeoProps({ path: url });

  return {
    appHtml,
    headTags: renderSeoHeadTags(capturedSeo ?? fallbackSeo),
  };
}

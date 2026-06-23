import Link from 'next/link';
import { ErrorPage, getCachedPageParams } from '@sitecore-content-sdk/nextjs';
import client from 'lib/sitecore-client';
import scConfig from 'sitecore.config';
import Layout from 'src/Layout';
import Providers from 'src/Providers';
import { NextIntlClientProvider } from 'next-intl';

export default async function NotFound() {
  const { site, locale } = getCachedPageParams();

  let page = null;
  try {
    page = await client.getErrorPage(ErrorPage.NotFound, {
      site: site || scConfig.defaultSite,
      locale: locale || scConfig.defaultLanguage,
    });
  } catch {
    // Sitecore error page is not configured or the API is unavailable.
    // Fall through to the static fallback below.
  }

  if (page) {
    return (
      <NextIntlClientProvider>
        <Providers page={page}>
          <Layout page={page} />
        </Providers>
      </NextIntlClientProvider>
    );
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      <Link href="/">Go to the Home page</Link>
    </div>
  );
}

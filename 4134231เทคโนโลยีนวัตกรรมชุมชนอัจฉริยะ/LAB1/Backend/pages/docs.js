import { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function DocsPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.SwaggerUIBundle) {
      window.SwaggerUIBundle({
        url: '/swagger.yaml',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [window.SwaggerUIBundle.presets.apis, window.SwaggerUIBundle.SwaggerUIStandalonePreset],
        layout: 'BaseLayout',
      });
    }
  }, [ready]);

  return (
    <>
      <Head>
        <title>Swagger UI</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css" />
      </Head>
      <Script
        src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      <Script
        src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-standalone-preset.js"
        strategy="afterInteractive"
      />
      <div id="swagger-ui" style={{ height: '100vh', width: '100%' }} />
    </>
  );
}

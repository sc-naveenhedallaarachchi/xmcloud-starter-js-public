import { defineConfig } from '@sitecore-content-sdk/nextjs/config';
/**
 * @type {import('@sitecore-content-sdk/nextjs/config').SitecoreConfig}
 * See the documentation for `defineConfig`:
 * https://doc.sitecore.com/xmc/en/developers/content-sdk/the-sitecore-configuration-file.html
 */
const MEDIA_HOST_OVERRIDE =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || '';

const rewritePreviewMediaHost = (mediaUrl: string): string => {
  if (!MEDIA_HOST_OVERRIDE) {
    return mediaUrl;
  }

  try {
    const sourceUrl = new URL(mediaUrl);
    const targetOrigin = new URL(MEDIA_HOST_OVERRIDE);
    const isEditingHost = sourceUrl.hostname.includes('-eh.');
    const isSitecoreCloudHost = sourceUrl.hostname.endsWith('.sitecorecloud.io');

    if (!isEditingHost || !isSitecoreCloudHost) {
      return mediaUrl;
    }

    sourceUrl.protocol = targetOrigin.protocol;
    sourceUrl.host = targetOrigin.host;
    return sourceUrl.toString();
  } catch {
    return mediaUrl;
  }
};

export default defineConfig({
  rewriteMediaUrls: rewritePreviewMediaHost,
});

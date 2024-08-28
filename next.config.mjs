import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const locales = ['en', 'ru', 'ka'];
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: process.env.S3_URL,
      port: '',
      pathname: '/**',
    },],
  },
  async redirects() {
    const redirects = [];

    locales.forEach((locale) => {
      redirects.push(
        {
          source: `/${locale}/dashboard`,
          destination: `/${locale}/dashboard/about`,
          permanent: true,
        },
        {
          source: `/dashboard`,
          destination: `/${locale}/dashboard/about`,
          permanent: true,
        }
      );
    });

    redirects.push({
      source: '/dashboard',
      destination: '/dashboard/about',
      permanent: true,
    });

    return redirects;
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
};
 
export default withNextIntl(nextConfig);
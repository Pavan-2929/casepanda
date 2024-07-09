/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [
    {
      source: "/admin",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
};

export default nextConfig;

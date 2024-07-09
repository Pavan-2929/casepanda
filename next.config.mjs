/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [
    {
      source: "/api/admin/orders",
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compressão Gzip/Brotli automática para assets e HTML
  compress: true,

  // Otimização de imagens do Next.js com formatos modernos
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dias de cache
  },

  // Headers de cache estático para mídias públicas
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|mp4)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

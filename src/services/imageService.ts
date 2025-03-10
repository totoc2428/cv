import { ExpImage } from "../types/exp/image";

const MAX_IMAGES = 3;
const IMAGE_CACHE = new Map<string, ExpImage[]>();

export const ImageService = {
  async preloadImage(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  },

  preloadExpImages(expId: string): void {
    // Ne recharge pas si déjà dans le cache
    if (IMAGE_CACHE.has(expId)) {
      return;
    }

    // Charge en arrière-plan sans bloquer
    setTimeout(async () => {
      try {
        await this.getExpImages(expId);
      } catch (error) {
        console.error("Error preloading images:", error);
      }
    }, 0);
  },

  async getExpImages(expId: string): Promise<ExpImage[]> {
    if (IMAGE_CACHE.has(expId)) {
      return IMAGE_CACHE.get(expId) || [];
    }

    const promises = Array.from({ length: MAX_IMAGES }, (_, i) => {
      const url = `/images/experiences/${expId}/${i + 1}.png`;
      return this.preloadImage(url).then((exists) =>
        exists
          ? {
              id: `${expId}-${i}`,
              url,
              alt: `Image ${i + 1} for experience ${expId}`,
            }
          : null
      );
    });

    const results = await Promise.all(promises);
    const validImages = results.filter((img): img is ExpImage => img !== null);

    IMAGE_CACHE.set(expId, validImages);
    return validImages;
  },
};

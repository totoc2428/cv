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

  async getExpImages(expId: string): Promise<ExpImage[]> {
    // Return cached images if available
    if (IMAGE_CACHE.has(expId)) {
      return IMAGE_CACHE.get(expId) || [];
    }

    try {
      // Create array for 3 possible PNG images
      const possibleImages = Array.from({ length: MAX_IMAGES }, (_, i) => ({
        id: `${expId}-${i}`,
        url: `/images/experiences/${expId}/${i + 1}.png`,
        alt: `Image ${i + 1} for experience ${expId}`,
      }));

      // Check image existence in parallel with preloading
      const imageChecks = await Promise.all(
        possibleImages.map((img) => this.preloadImage(img.url))
      );

      const validImages = possibleImages.filter(
        (_, index) => imageChecks[index]
      );

      // Cache the valid images
      IMAGE_CACHE.set(expId, validImages);

      return validImages;
    } catch (error) {
      console.error("Error loading images:", error);
      return [];
    }
  },
};

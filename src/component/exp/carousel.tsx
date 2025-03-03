import React, { useState, useEffect, useCallback } from "react";

interface CarouselProps {
  images: string[];
  onClose: () => void;
}

export const Carousel: React.FC<CarouselProps> = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = useCallback(
    (e: React.MouseEvent | KeyboardEvent) => {
      // Si c'est un clic, vérifier que c'est sur l'overlay
      if ("target" in e && e.target === e.currentTarget) {
        onClose();
      }
      // Si c'est la touche Escape
      if ("key" in e && e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    // Gestionnaire de touche Escape
    document.addEventListener("keydown", handleClose);

    // Précharger l'image courante
    const img = new Image();
    img.onload = () => setIsLoading(false);
    img.src = images[currentIndex];

    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  }, [currentIndex, handleClose, images]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <div className="carousel-overlay" onClick={handleClose}>
      <div className="carousel-content" onClick={(e) => e.stopPropagation()}>
        <button className="carousel-close" onClick={onClose}>
          ❌
        </button>
        <button className="carousel-nav prev" onClick={prevImage}>
          ←
        </button>
        {isLoading && <div className="carousel-loader">Loading...</div>}
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className={`carousel-image ${isLoading ? "loading" : ""}`}
          onLoad={() => setIsLoading(false)}
        />
        <button className="carousel-nav next" onClick={nextImage}>
          →
        </button>
        <div className="carousel-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

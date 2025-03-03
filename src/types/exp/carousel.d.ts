export interface CarouselState {
  isOpen: boolean;
  images: string[]; // Changed from ExpImage[]
  expId: string | null;
}

"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ImageLightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}

export default function ImageLightbox({
  images,
  index,
  onClose,
  onChange,
}: ImageLightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMobile(window.innerWidth <= 768);
  }, []);

  const prev = useCallback(
    () => onChange((index - 1 + images.length) % images.length),
    [index, images.length, onChange],
  );
  const next = useCallback(
    () => onChange((index + 1) % images.length),
    [index, images.length, onChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  if (!mounted) return null;

  const content = (
    <div
      className={`lightbox${mobile ? " lightbox--mobile" : ""}`}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Image area */}
      <div className="lightbox__img-wrap" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[index]}
          alt={`Image ${index + 1} of ${images.length}`}
          className="lightbox__img"
          draggable={false}
        />
      </div>

      {/* Desktop: side arrows + counter */}
      {!mobile && images.length > 1 && (
        <>
          <button className="lightbox__prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="lightbox__next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="lightbox__counter">{index + 1} / {images.length}</div>
        </>
      )}

      {/* Mobile: bottom bar */}
      {mobile && (
        <div className="lightbox__mobile-bar" onClick={(e) => e.stopPropagation()}>
          {images.length > 1 ? (
            <>
              <button className="lightbox__mobile-btn" onClick={prev} aria-label="Previous image">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <span className="lightbox__mobile-counter">{index + 1} / {images.length}</span>
              <button className="lightbox__mobile-btn" onClick={next} aria-label="Next image">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          ) : (
            <span className="lightbox__mobile-counter">Tap outside to close</span>
          )}
        </div>
      )}
    </div>
  );

  return createPortal(content, document.body);
}

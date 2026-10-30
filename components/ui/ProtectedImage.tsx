'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

// Deters casual right-click-save / drag-out scraping of project imagery.
// Not a hard security boundary — anyone with devtools can still reach the
// underlying asset — but it raises the bar past the "right click > save as"
// crowd, which is the realistic threat model for portfolio images.
export default function ProtectedImage({ alt, className, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="group relative select-none overflow-hidden rounded-xl border border-white/10"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Image
        {...props}
        alt={alt}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onLoad={() => setLoaded(true)}
        className={`no-select pointer-events-none transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className ?? ''}`}
      />
      {/* Transparent overlay blocks drag/save gestures on the image itself. */}
      <div className="absolute inset-0" aria-hidden="true" />
    </div>
  );
}

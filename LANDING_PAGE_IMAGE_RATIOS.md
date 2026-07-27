# Landing Page Image Ratios

## Current Image Ratios

### Logo Image
- **Desktop**: 130px × 130px = **1:1 ratio** (square)
- **Mobile**: 72px × 72px = **1:1 ratio** (square)

### Background Images
- **Files**: 
  - `colombo.avif` (Local/Sri Lanka side)
  - `japan.jpg` (Foreign/International side)
- **Sizing Method**: `background-size: cover` with `background-position: center`
- **Aspect Ratio**: Maintains original aspect ratio of each image file
- **Responsiveness**: 
  - Desktop: Side-by-side panels (full viewport width/height split)
  - Mobile: Stacked vertically (full viewport width/height stack)

## CSS Reference

### Desktop
```css
.split-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.split-divider__logo {
  width: 130px;
  height: 130px;
  /* 1:1 aspect ratio */
}
```

### Mobile (max-width: 640px)
```css
.split-container {
  flex-direction: column;
}

.split-divider__logo {
  width: 72px;
  height: 72px;
  /* 1:1 aspect ratio */
}
```

## File Locations
- **Component**: `/apps/landing/app/page.tsx`
- **Styles**: `/apps/landing/app/globals.css`
- **Images**: `/apps/landing/public/`

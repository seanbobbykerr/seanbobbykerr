# The Maelum Trilogy Brand Asset Library

All files were derived only from the two supplied TIFF artworks. The source files were opened read-only and never overwritten.

## Source inspection

- `Frame and Frame sketch(1).tif`: 1800 × 2700, RGB, 300 dpi.
- `The Burned Name back cover(1).tif`: 1800 × 2700, RGB, 300 dpi.
- The frame empty centre is 100.000% pure `#FFFFFF`.
- Across the whole frame image, 83.306% of pixels are pure white.
- Middle side linework is approximately 99.97% greyscale. The top and bottom ornaments are tonal bronze, not solid black.
- Transparency uses continuous white-to-alpha extraction with colour recovery. No binary threshold was used.

## Tier rules

- `01_faithful/`: crop-only RGB PNGs, verified pixel-for-pixel against the source TIFF.
- `02_derived/`: transparency, SVG traces, tile tests, sampled palette, resized WebP files and favicons.

## Faithful crops

| File | Source | Normalised box (L,T,R,B) | Pixel box (L,T,R,B) | Dimensions | Purpose |
|---|---|---:|---:|---:|---|
| `01_faithful/mark-crown.png` | `Frame and Frame sketch(1).tif` | `0.2777778, 0.0000000, 0.7222222, 0.1481481` | `500, 0, 1300, 400` | 800 × 400 | Primary signature mark, logo candidate and favicon source. |
| `01_faithful/mark-foot.png` | `Frame and Frame sketch(1).tif` | `0.2000000, 0.8740741, 0.8000000, 1.0000000` | `360, 2360, 1440, 2700` | 1080 × 340 | Lower-page or footer ornament. |
| `01_faithful/corner-tl.png` | `Frame and Frame sketch(1).tif` | `0.0000000, 0.0000000, 0.3111111, 0.2074074` | `0, 0, 560, 560` | 560 × 560 | Top-left decorative frame corner. |
| `01_faithful/corner-tr.png` | `Frame and Frame sketch(1).tif` | `0.6888889, 0.0000000, 1.0000000, 0.2074074` | `1240, 0, 1800, 560` | 560 × 560 | Top-right decorative frame corner. |
| `01_faithful/corner-bl.png` | `Frame and Frame sketch(1).tif` | `0.0000000, 0.7925926, 0.3111111, 1.0000000` | `0, 2140, 560, 2700` | 560 × 560 | Bottom-left decorative frame corner. |
| `01_faithful/corner-br.png` | `Frame and Frame sketch(1).tif` | `0.6888889, 0.7925926, 1.0000000, 1.0000000` | `1240, 2140, 1800, 2700` | 560 × 560 | Bottom-right decorative frame corner. |
| `01_faithful/edge-left.png` | `Frame and Frame sketch(1).tif` | `0.0000000, 0.3851852, 0.0944444, 0.5370370` | `0, 1040, 170, 1450` | 170 × 410 | Repeatable vertical left-border segment. |
| `01_faithful/edge-right.png` | `Frame and Frame sketch(1).tif` | `0.9055556, 0.3851852, 1.0000000, 0.5370370` | `1630, 1040, 1800, 1450` | 170 × 410 | Repeatable vertical right-border segment. |
| `01_faithful/edge-top.png` | `Frame and Frame sketch(1).tif` | `0.1433333, 0.0000000, 0.3433333, 0.0777778` | `258, 0, 618, 210` | 360 × 210 | Decorative horizontal top-border segment. |
| `01_faithful/edge-bottom.png` | `Frame and Frame sketch(1).tif` | `0.3922222, 0.9333333, 0.6022222, 1.0000000` | `706, 2520, 1084, 2700` | 378 × 180 | Simple horizontal lower rail. |
| `01_faithful/frame-full.png` | `Frame and Frame sketch(1).tif` | `0.0000000, 0.0000000, 1.0000000, 1.0000000` | `0, 0, 1800, 2700` | 1800 × 2700 | Complete ornamental frame with empty centre preserved. |
| `01_faithful/divider-diamond-chain.png` | `The Burned Name back cover(1).tif` | `0.4277778, 0.5148148, 0.5722222, 0.5425926` | `770, 1390, 1030, 1465` | 260 × 75 | Section divider between website content blocks. |
| `01_faithful/emblem-compass-cross.png` | `The Burned Name back cover(1).tif` | `0.0038889, 0.0025926, 0.0433333, 0.0288889` | `7, 7, 78, 78` | 71 × 71 | Small square emblem or secondary mark. |
| `01_faithful/figure-plinth.png` | `The Burned Name back cover(1).tif` | `0.0388889, 0.2074074, 0.3555556, 0.7351852` | `70, 560, 640, 1985` | 570 × 1425 | Feature illustration from the warm/gold half. |
| `01_faithful/figure-crowned.png` | `The Burned Name back cover(1).tif` | `0.6111111, 0.4148148, 0.9666667, 0.7592593` | `1100, 1120, 1740, 2050` | 640 × 930 | Feature illustration from the cool/blue half. |
| `01_faithful/motif-ship.png` | `The Burned Name back cover(1).tif` | `0.6166667, 0.0888889, 0.9555556, 0.3370370` | `1110, 240, 1720, 910` | 610 × 670 | Upper-right sailing-ship motif. |
| `01_faithful/motif-winged.png` | `The Burned Name back cover(1).tif` | `0.2388889, 0.0000000, 0.7611111, 0.1592593` | `430, 0, 1370, 430` | 940 × 430 | Top-centre winged figure motif. |
| `01_faithful/group-onlookers.png` | `The Burned Name back cover(1).tif` | `0.0194444, 0.7259259, 0.9805556, 0.9351852` | `35, 1960, 1765, 2525` | 1730 × 565 | Wide lower-page ensemble image. |
| `01_faithful/texture-parchment.png` | `The Burned Name back cover(1).tif` | `0.3888889, 0.7000000, 0.6500000, 0.7370370` | `700, 1890, 1170, 1990` | 470 × 100 | Text-free central glow texture for sampling or subtle surfaces. |

## Transparent frame assets

- `02_derived/transparent/mark-crown.png` — RGBA extraction from the faithful crop.
- `02_derived/transparent/mark-foot.png` — RGBA extraction from the faithful crop.
- `02_derived/transparent/corner-tl.png` — RGBA extraction from the faithful crop.
- `02_derived/transparent/corner-tr.png` — RGBA extraction from the faithful crop.
- `02_derived/transparent/corner-bl.png` — RGBA extraction from the faithful crop.
- `02_derived/transparent/corner-br.png` — RGBA extraction from the faithful crop.
- `02_derived/transparent/edge-left.png` — RGBA extraction from the faithful crop.
- `02_derived/transparent/edge-right.png` — RGBA extraction from the faithful crop.
- `02_derived/transparent/edge-top.png` — RGBA extraction from the faithful crop.
- `02_derived/transparent/edge-bottom.png` — RGBA extraction from the faithful crop.
- `02_derived/transparent/frame-full.png` — RGBA extraction from the faithful crop.

## Edge tiling

| Asset | Direction | Boundary difference | Assessment | Test file |
|---|---|---:|---|---|
| `edge-left` | vertical | 15.3 | fair | `02_derived/tile_tests/edge-left-three-repeat.png` |
| `edge-right` | vertical | 15.3 | fair | `02_derived/tile_tests/edge-right-three-repeat.png` |
| `edge-top` | horizontal | 48.7 | poor | `02_derived/tile_tests/edge-top-three-repeat.png` |
| `edge-bottom` | horizontal | 0.0 | excellent | `02_derived/tile_tests/edge-bottom-three-repeat.png` |

The lower rail tiles best because it is nearly straight and periodic. The top edge contains a non-repeating feather-and-filigree run, so the restart remains visible over long repeats.

## SVG traces

- `02_derived/svg/mark-crown.svg`
- `02_derived/svg/corner-tl.svg`
- `02_derived/svg/divider-diamond-chain.svg`

The SVGs contain only vector paths. They use layered `currentColor` fills with opacity to retain tonal detail while remaining CSS-recolourable. No raster is embedded. Side-by-side review images are in `02_derived/svg_comparisons/`.

## Sampled palette

- **Gold highlight** `#F4B039` — warm accent / highlight.
- **Gold field** `#BF8C32` — primary warm background.
- **Bronze shadow** `#A17529` — border / dark warm surface.
- **Blue highlight** `#2D4FA0` — cool accent / link highlight.
- **Blue field** `#2F4989` — primary cool background.
- **Deep blue** `#1E2C4B` — footer / dark surface.
- **Parchment** `#E1D0B1` — content surface / panel.
- **Ink black** `#000000` — body text / linework.

- Swatch image: `02_derived/palette/palette-swatches.png`
- Machine-readable list: `02_derived/palette/palette.json`

## Web exports

Every core asset has `@1x.webp` and `@2x.webp` versions in `02_derived/web/`. Frame assets use the transparent tier; back-cover assets retain their painted backgrounds. Exact dimensions and byte sizes are in `02_derived/web/web-file-sizes.csv`.

### Favicons

- `02_derived/web/favicon/favicon-16.png` — 16 × 16, 0.4 KB.
- `02_derived/web/favicon/favicon-32.png` — 32 × 32, 1.1 KB.
- `02_derived/web/favicon/favicon-48.png` — 48 × 48, 2.1 KB.
- `02_derived/web/favicon/favicon-180.png` — 180 × 180, 23.5 KB.
- `02_derived/web/favicon/favicon-512.png` — 512 × 512, 155.4 KB.
- `02_derived/web/favicon/favicon.ico` — 16, 32 and 48 px multi-size ICO.

## Confidence and limitations

- **Lowest confidence: `figure-crowned` and `motif-ship`.** Both illustrations overlap the pale text column. A rectangular faithful crop cannot retain the whole artwork without including nearby text.
- **`figure-plinth`** retains a narrow trace of neighbouring layout material at the right edge; cropping further would remove part of the figure or plinth.
- **`edge-top`** is decorative rather than truly periodic. It is usable for short runs, but a long three-repeat test exposes the restart.
- **The 16 px and 32 px favicons** are too detailed for perfect legibility. The 48, 180 and 512 px versions are stronger.
- **`emblem-compass-cross`** is only 71 × 71 source pixels and should remain small.
- **The faithful divider** is 260 × 75 pixels. Use the SVG for large display.

## Images and Fonts, Where LCP Is Won

Largest Contentful Paint measures when the biggest thing above the fold
finishes rendering. On most pages that biggest thing is **an image or a heading
in a web font**. Which means most LCP work is not JavaScript work at all.

### Serve the right number of pixels

A 2400px hero delivered to a 390px phone wastes about 97% of the bytes. `srcset`
and `sizes` let the browser pick.

```html
<img
  src="/hero-800.jpg"
  srcset="/hero-400.jpg 400w,
          /hero-800.jpg 800w,
          /hero-1600.jpg 1600w,
          /hero-2400.jpg 2400w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
  width="1600" height="900"
  alt="A hand-thrown ceramic mug on a workbench">
```

Three things in that snippet do different jobs:

- **`srcset` with `w` descriptors** tells the browser which files exist and how
  wide each one is.
- **`sizes` tells the browser how wide the image will be laid out**, which it
  needs before CSS has been parsed. Get this wrong and the browser picks the
  wrong file. It is the part people leave at the default and then wonder why
  nothing improved.
- **`width` and `height`** reserve the space. Without them the page reflows when
  the image lands, which is a Cumulative Layout Shift.

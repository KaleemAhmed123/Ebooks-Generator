## Instance segmentation: Mask R-CNN

- **Semantic** segmentation labels pixels by class, so three overlapping people become one blob of "person". **Instance** segmentation separates them: person 1, person 2, person 3, each its own mask.
- It combines detection and segmentation: find each object's box, then predict a pixel mask *inside* that box.
- **Mask R-CNN** is the classic method. It detects boxes, then adds a small branch that outputs a mask for each detected object.

<svg viewBox="0 0 330 110" role="img" aria-label="Two overlapping people: semantic segmentation shows one merged region, instance segmentation shows two separate coloured masks" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="75" y="14" text-anchor="middle" fill="#6b6b6b">semantic</text>
  <ellipse cx="60" cy="55" rx="26" ry="38" fill="#3d6ea5"/><ellipse cx="90" cy="55" rx="26" ry="38" fill="#3d6ea5"/><text x="75" y="105" text-anchor="middle" fill="#6b6b6b">one "person" blob</text>
  <text x="245" y="14" text-anchor="middle" fill="#6b6b6b">instance</text>
  <ellipse cx="230" cy="55" rx="26" ry="38" fill="#24405e"/><ellipse cx="260" cy="55" rx="26" ry="38" fill="#1a3a2a"/><text x="245" y="105" text-anchor="middle" fill="#6b6b6b">person 1 + person 2</text>
</svg>

- A newer alternative: prompt-based models (like SAM, a few pages on) segment any object you point at, without a fixed class list. Mask R-CNN remains the workhorse when you have defined classes and labelled data.

:::note
Pick the task to the question. *What is present?* → classification. *Where roughly?* → detection. *Which pixels, per object?* → instance segmentation. Each step up costs more labelling effort and more compute, so choose the least that answers your need.
:::

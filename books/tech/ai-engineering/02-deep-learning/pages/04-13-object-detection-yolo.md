## Object detection: YOLO

- **Object detection** finds *what* is in an image and *where*: it outputs a **bounding box** (a rectangle) plus a class label for every object.
- **YOLO** ("You Only Look Once") does it in a single forward pass. It divides the image into a grid; each cell predicts boxes, a confidence, and a class. One pass, many objects — fast enough for live video.
- Each prediction is five numbers plus class scores: box centre `(x, y)`, width, height, and an objectness confidence.

<svg viewBox="0 0 320 130" role="img" aria-label="A photo with two bounding boxes, one around a person labelled 0.94 and one around a dog labelled 0.88" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="20" y="15" width="280" height="100" fill="#f4f7fb" stroke="#c9d6e5"/>
  <rect x="55" y="35" width="60" height="70" fill="none" stroke="#24405e" stroke-width="2"/><rect x="55" y="24" width="66" height="12" fill="#24405e"/><text x="60" y="33" fill="#fff" font-size="8">person 0.94</text>
  <rect x="170" y="65" width="90" height="42" fill="none" stroke="#1a3a2a" stroke-width="2"/><rect x="170" y="54" width="52" height="12" fill="#1a3a2a"/><text x="174" y="63" fill="#fff" font-size="8">dog 0.88</text>
</svg>

- After the grid predicts, many boxes overlap the same object. **Non-max suppression (NMS)** keeps the highest-confidence box and deletes the rest that overlap it heavily.

:::warn
Detection is scored by **mean Average Precision (mAP)**, which measures both correct labels and tight box placement, across confidence thresholds — not plain accuracy. A model that finds every object but with sloppy boxes still scores poorly. Box quality counts as much as the label.
:::

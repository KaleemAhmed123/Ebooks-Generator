## Image classification

- **Image classification** is the task that built the field: given a picture, output one label from a fixed list. "Cat", "dog", "car".
- The model outputs one score per class (a logit). **Softmax** turns the scores into probabilities that sum to 1; the largest is the prediction.
- The benchmark is **ImageNet**: 1.2 million images across 1,000 classes. Progress on it drove almost every architecture on the previous pages.

:::mint
```python
logits = model(image)                 # raw scores, one per class
probs  = logits.softmax(dim=1)        # -> probabilities summing to 1
pred   = probs.argmax(dim=1)          # index of the top class
```
:::

- Report accuracy two ways: **top-1** (the single best guess is right) and **top-5** (the truth is in the best five guesses). Top-5 is kinder where classes overlap, like breeds of dog.

:::warn
Classification assumes exactly **one** dominant object per image. Show it a photo with a cat *and* a dog and it must pick one, confidently. When an image has several objects, or you need *where* they are, classification is the wrong task — you want detection or segmentation, coming up next.
:::

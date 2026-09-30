## Data augmentation

- **Data augmentation** makes free training data by transforming the images you already have — flipping, cropping, rotating, shifting colours.
- A cat flipped left-to-right is still a cat, but to the model it is a new example. This teaches the model that the label survives the transform, which is exactly the robustness you want.
- It is the cheapest, most reliable defence against overfitting in vision.

:::mint
```python
from torchvision.transforms import v2
train_tf = v2.Compose([
    v2.RandomResizedCrop(224),      # random zoom + crop
    v2.RandomHorizontalFlip(),      # 50% chance to mirror
    v2.ColorJitter(0.2, 0.2, 0.2),  # nudge brightness, contrast, saturation
])
```
:::

- Stronger, mixing-based augmentations go further: **Mixup** blends two images and their labels; **CutMix** pastes a patch of one image onto another. Both push accuracy on large models.

:::warn
Augment the training set only — never the validation or test set, which must reflect real inputs. And keep every transform **label-preserving**: flipping a photo of the digit "6" makes it a "9", so a horizontal flip is wrong for digit recognition. The right augmentations depend on the task.
:::

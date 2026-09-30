# AI Engineering: From Scratch

## Decision Trees & Forests

Neural networks dominate unstructured data (text, images, audio). But for tabular data (rows and columns), tree-based models consistently win. 

### The Decision Tree

A decision tree partitions feature space using a sequence of binary splits. At each node, the algorithm greedily searches for the feature and threshold that maximizes **Information Gain** (or minimizes Gini Impurity).

It asks: *Which split produces children that are the most homogeneous?*

Because trees slice space orthogonally, they naturally handle non-linear relationships and interactions without any feature engineering. However, a single tree grown without limit will memorize the training data perfectly, resulting in severe overfitting.

### Random Forests: The Power of Ensembles

A single decision tree has high variance. A Random Forest fixes this by averaging the predictions of many trees. 

It introduces two sources of randomness:
1. **Bagging (Bootstrap Aggregating):** Each tree is trained on a random sample of the training data (with replacement).
2. **Feature Randomization:** At each split, the tree is only allowed to search across a random subset of features (typically $\sqrt{N}$).

By forcing the trees to be diverse and weakly correlated, the forest eliminates variance without increasing bias. The ensemble becomes incredibly robust to overfitting.

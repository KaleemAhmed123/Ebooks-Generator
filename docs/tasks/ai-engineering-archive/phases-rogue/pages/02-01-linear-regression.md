# AI Engineering: From Scratch

## Linear Regression

Linear regression is the "hello world" of machine learning. It introduces the universal ML paradigm: define a model architecture, define a loss function, and optimize parameters to minimize that loss.

### The Model Architecture

A linear model assumes the output ($y$) is a weighted sum of inputs ($x$) plus a bias ($b$):

$$ \hat{y} = w^T x + b $$

### The Loss Function: Mean Squared Error (MSE)

You measure how wrong the model is using MSE. It squares the errors, naturally penalizing large deviations exponentially more than small ones.

$$ MSE = \frac{1}{N} \sum (\hat{y} - y)^2 $$

Because the square function forms a perfect, smooth parabola (a convex bowl), gradient descent is guaranteed to find the absolute global minimum without getting stuck.

### The Optimization: Gradient Descent

Gradient descent calculates the partial derivatives (gradients) of the MSE with respect to the weights. 

$$ \frac{dMSE}{dw} = \frac{2}{N} \sum (\hat{y} - y) \cdot x $$

By subtracting a fraction (the **Learning Rate**) of the gradient from the weights iteratively, the model literally steps downhill until the error hits the bottom of the bowl.

### Polynomial Regression

Linear regression can fit curves. By feeding the model engineered features like $x^2$ or $x^3$, it fits a complex polynomial curve while keeping the underlying optimization math perfectly linear.

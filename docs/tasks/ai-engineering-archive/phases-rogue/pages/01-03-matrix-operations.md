# AI Engineering: From Scratch

## Matrix Operations

A neural network layer is defined by three fundamental operations: matrix multiplication, broadcast addition, and scalar activation. 

### Element-Wise vs Matrix Multiplication

Element-wise multiplication (Hadamard product, $\mathbf{A} \odot \mathbf{B}$) requires identically shaped tensors. It is used in gating mechanisms like LSTM cells to scale values strictly coordinate-by-coordinate.

Matrix multiplication ($\mathbf{A} \mathbf{B}$) computes the dot products between every row of $\mathbf{A}$ and every column of $\mathbf{B}$. Inner dimensions must exactly match ($[m \times n] \times [n \times p] = [m \times p]$). This is the engine of the forward pass, mapping input features into new dimensional spaces.

<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="20" width="80" height="80" fill="#e2e8f0" stroke="black"/>
  <line x1="20" y1="60" x2="100" y2="60" stroke="#ef4444" stroke-width="4"/>
  <text x="60" y="15" font-family="monospace" text-anchor="middle">m × n</text>
  
  <text x="120" y="65" font-family="sans-serif" text-anchor="middle" font-size="20">@</text>
  
  <rect x="140" y="20" width="80" height="80" fill="#e2e8f0" stroke="black"/>
  <line x1="180" y1="20" x2="180" y2="100" stroke="#3b82f6" stroke-width="4"/>
  <text x="180" y="15" font-family="monospace" text-anchor="middle">n × p</text>

  <text x="240" y="65" font-family="sans-serif" text-anchor="middle" font-size="20">=</text>

  <rect x="260" y="20" width="80" height="80" fill="#e2e8f0" stroke="black"/>
  <circle cx="300" cy="60" r="4" fill="#8b5cf6"/>
  <text x="300" y="15" font-family="monospace" text-anchor="middle">m × p</text>
  
  <text x="200" y="115" font-family="sans-serif" font-size="12" text-anchor="middle">Row · Column = Single Output Scalar</text>
</svg>

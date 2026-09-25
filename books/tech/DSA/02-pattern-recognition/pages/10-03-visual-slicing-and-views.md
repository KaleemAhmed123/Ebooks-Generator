# Visual Slicing & Views

## The Mental Model
Projecting a complex structure (like a Tree) onto a 2D plane or looking at it from a specific angle. Covers tags like `views`, `leftRightTop pattern`, and `Construction`.

## Algorithm Derivation
**Brute force:** To get the "Top View" of a tree, traverse it and somehow guess which nodes block others.
**↓**
**What is being repeated?** We lose spatial relationships in a standard DFS.
**↓**
**Can we remember it?** Assign coordinate geometry to the tree!
**↓**
**Optimized Idea:** Root is at `(x:0, y:0)`. Left child is `(x-1, y+1)`. Right child is `(x+1, y+1)`. 
For a Top View, simply take the first node you see at every `x` coordinate using a HashMap.

## Implementation Concept (Top View)
Use BFS with a queue storing `[Node, x_coord]`. 
If `x_coord` is not in the HashMap, add it. The HashMap naturally filters out blocked nodes!

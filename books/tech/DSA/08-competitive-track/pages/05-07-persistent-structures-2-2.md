### Advanced Application: K-th Smallest in a Range

You can use a Persistent Segment Tree as a frequency map to find the K-th smallest element in an arbitrary range [L, R] of a static array in O(log N) time.
You build a version of the tree for every prefix of the array. 
To query [L, R], you simultaneously traverse `Root[R]` and `Root[L-1]`, subtracting their node values to get the frequencies *specifically inside that range*, guiding your binary search down the tree!

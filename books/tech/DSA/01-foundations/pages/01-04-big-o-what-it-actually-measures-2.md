### The worst, average, and best cases

- **Worst case:** The maximum time an algorithm will take for any input of size n. This is what we usually mean by Big-O in interviews
- **Average case:** The expected time averaged over all possible inputs. QuickSort is O(n log n) average, but O(n²) worst case
- **Best case:** The minimum time. Often trivial (e.g. O(1) to sort an already sorted array if you check first) and rarely useful for hard guarantees

### The trap

- **Assuming O(1) space means no extra space at all.** It means the extra space used does not grow with n. Ten integer variables is O(1). An array of fixed size 256 (for ASCII characters) is O(1)
- **Assuming hardware negates complexity.** A supercomputer running an O(n²) algorithm will eventually be beaten by a smart watch running an O(n log n) algorithm as n grows. Big-O always wins in the long run

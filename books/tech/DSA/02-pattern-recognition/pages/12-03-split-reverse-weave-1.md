## Split, Reverse, Weave <span class="lv lv2"></span>

- **What it is:** A three-step recipe for problems that pair the front of a list with its back. Find the middle with slow/fast pointers, reverse the second half in place (page 12-02), then walk both halves together: compare them, weave them, or add them
- **Signal:** "reorder L0 → Ln → L1 → Ln−1 …", "is the linked list a palindrome", "maximum twin sum", "sort a linked list in O(n log n)", O(1) extra space
- **Why it works:** A singly linked list can only be walked forward, so "the i-th node from the end" is out of reach. Reversing the back half turns it into a forward walk that starts at the end. Slow/fast finds the middle in one pass because the fast pointer covers twice the distance

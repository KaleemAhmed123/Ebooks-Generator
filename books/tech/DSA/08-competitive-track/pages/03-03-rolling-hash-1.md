## Rolling Hash (Rabin-Karp) <span class="lv lv3"></span>

Sometimes you need to compare two strings of length 10⁵ for equality. Doing it character-by-character takes O(N). 
What if you need to compare 10⁵ pairs of substrings? That's O(N²).
Rolling Hash reduces string comparison to O(1) by converting the string into a single integer.

### The Polynomial Hash

We treat the string as a polynomial. For a string S and a prime base P and a modulo M:
text{Hash}(S) = (S₀ times P⁰ + S₁ times P¹ + S₂ times P² dots) pmod M

Usually, we choose P = 31 (for lowercase English letters) and M = 10⁹ + 9.

### The Rolling Property

If you know the hash of the substring S[0 dots 4], how do you get the hash of S[1 dots 5]? (A Sliding Window).
Instead of recalculating from scratch, you:
1. Subtract the first character.
2. Divide by P (or multiply by the Modular Inverse of P).
3. Add the new character multiplied by P⁴.

This updates the hash in O(1) time!

## Password hashing

- A password database will eventually be stolen. The only question is what the attacker gets when it is
- Storing the password itself gives them every account, on your service and on every other service where it was reused
- A **hash** is a one-way function. Same input gives the same output, and the output cannot be reversed
- That alone is not enough. An attacker precomputes hashes of common passwords and matches them, which is what a rainbow table is
- A **salt** is random bytes mixed in per password, so two people with the same password get different hashes and the precomputed table is useless
- The remaining problem is speed. SHA-256 is built to be fast, and a GPU tries billions of guesses a second against it
- So a password hash is deliberately **slow and memory hungry**, tuned so one login costs you milliseconds and a brute force costs them years
- That is the entire difference between a password hash and a general hash, and using the wrong one is the classic mistake
- `argon2` won the Password Hashing Competition in 2015 and is the current recommendation
- `bcrypt` is older, still sound, and still everywhere. Its weakness is that it is CPU hard but not memory hard

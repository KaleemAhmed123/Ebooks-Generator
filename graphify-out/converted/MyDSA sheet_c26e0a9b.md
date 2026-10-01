<!-- converted from MyDSA sheet.xlsx -->

## Sheet: Sheet1
|  | Topics:: Arrays, Matrix, Strings, Searching Sorting, Greedy, Linked List, Stacks Queues, Recursion Backtracking, Trees |
| --- | --- |
|  |          ,Priority queue, Graph Algorihms, Dynamic Programming, Bit Masking, Tries, Range Queries, Hard MixedUp problems |
|  | Beginner skip the question marked in RED |
| 1.0 |  |
| Arrays (75 total -> 45 must and rest optional) |                        Patterns to Observe |
|  | lookAhead | TwoPointers | slidingWindow | kadanes | maxMin Len | Arrangements | prefixSum and +1 -1 trick | merge | no of operations | hashing |
| Implement Dynamice Array (Vector) Class |  |
| Reverse the array | swap(last, first) till both does't crosses one another | follow up using one var  swap(i, n-1-i) run till half (n/2) only | if(start>end) return; |
| Find the maximum and minimum element in an array | if num>first , second=first AND else_if num>second then update second only  |
| Find the "Kth" max and min element of an array  | minHeap O(k) and | partition of quickSort when K-1==Partiton return num |
| Sort an Array of 0 1 2 | count 012 and copy in array | case:0  swap(low++, mid++),  case:1 mid++, else swap (low, high--) |
| Move all the negative elements to one side of the array  | take j=0 and if non -ve swap(a[i], a[j], j++)  |
| Find the Union and Intersection of the two sorted arrays. | merge sort logic and also push in set and return size |
| Write a program to cyclically rotate an array by one. | save last and shift loop arr[i]==arr[i+1] |
| find Largest sum contiguous Subarray [V. IMP] | 3loop, prefixSum, Kadane's |
| Minimise the maximum difference between heights [V.IMP] | adjacent for better candidate (3+3, 9-3)=0 naki (3+3, 16-1), add-in-each to get max And sub-each to get min adjDiff gives ans |
| Minimum no. of Jumps to reach end of an array | remainingZero then rem...equal to {maxReach-i ) if i>=n return jump | first try jumpgame QS |
| Find duplicate in an array of N+1 Integers | cycleSort, -1product, sumOfN, slowFast,  sort, MapStore |
| Merge 2 sorted arrays without using Extra space. | swap i and j and fixArrayBySwap=> if(a[i-1], a[1]) swap |
| Prefix Sum Technique Archieves (imp) |  |
| Kadane's Algo 2 [V.V.V.V.V IMP] | if -ve start again cur = 0 and calculate max in each itertion| also learn Prefix Sum with gfg 5QS |
| Max len Subarray with even sum | get sum if odd return len AAAnd if odd then do i++ till a[i] is odd return n-1 - i |
| Len of longest subarray with equal num of odd and even elements | Treat odd as 1 even as -1 and find max len if(sum==0) getmax and also use map to track idx |
| Maximize sum array by flipping sign of all elms of a single subarray  |  |
| Equilibrium point  | create prefSum and suffixSum aarray and check pref[i] == suff[i] return i+1 |
| Maximum Length bitonic subarray | from left ifa[i-1] <= a[i] then left[i]+=1 else left[i]=1 and from right if a[i+1]>=a[i] then dec[i]+=1 else dec[i]=1 now combine both |
| Valid mountain array |  |
| Range Subarray |  |
| Max Circular Subarray sum | totalSum - 2*(minSubarray)   ek baar -x se +x transition me 2x milta hai0 |
| longest alternating subarray (v imp) | for each i start j from i+1 and use increment boolean if arr[i]+1=arr[j] and inc = true then len++ and !inc and set inc to false also in elif arr[i]=arr[j] then len++ and set inc to !inc |
| Merge Intervals | if in same range then prev[i][1] = max(arr[i][1], prev[i][1]) |
| Non overlapping intervals | first insert and then merge || thaarr[i][0] and arr[i][1] max track till its in overlapping range  |
| Insert Interval  | push all non conflicting first now loop till newInterval[1] >= intervals[i][0] and maintain min for 0th and max for 1th idx rest push directly |
| Min opr to make array increasing | Track last |
| Next Permutation | get first decreasing el from back now get another elm just greater than this elm (from back) swap both and done => mimpQs |
| Count Inversion | mid-i in each divide add in inversion |
| Count of smaller elm on Right |  divide and conquer |
| Reverse Pairs Optimised | mid-l+1 still confused |
| Sum divisible by K |  |
| Subarray sum divisble by K |  |
| Arithmetic slices |  |
| Happy students |  |
| Max Points on a Line | for each a[x,y] calculate slope with other whichever slope is greater that is ans+1 |
| Maximum Index (can be applied to solve many problem) |  |
| Best time to buy and Sell stock | min max in same iteration in Anytime question draw updown graph |
| find all pairs on integer array whose sum is equal to given number | look for T-arr[i] in map if there add mp[T-arr[i]] , mp[arr[i]]++  note don't use else becz in both condition freq will increase |
| find common elements In 3 sorted arrays | i j k if all equal then add else inc lowest one |
| Rearrange array in alternating +ve and -ve items without space | first bring +ve to left and -ve to right or viceversa using two Pointer and now i, j ptr that points to 1st elm of both swap i+1 and k+2 (+2 for alternate) || Best loop and use posIdx and negIdx and inc by 2 |
| Find if there is any subarray with sum equal to 0 | k=0 case use map remember mp[0] = 1 | sliding window might  work |
| Find factorial of a large number |  |
| find maximum product subarray  | kadanes's same when 0 set curr 1 here and to handle -ve cases iterate from both direction and store in max |
| Find longest coinsecutive subsequence | select elm that doesn't have preceding elm becz that may be start of a seq Use map for O(1) query   | try longest fibonacci LC |
| Longest Fibonacci Sequence Leetcode | loop i and j(i+1) now prev2=ith elm and prev=jth make cnt=2, curr=prev2+prev and search in set if curr is present if present update p2-p1, p1-curr and curr=p2+p1 and maintain maxCnt |
| Minimize the maximum difference of pairs (VVIMP) | min-max binary search pattern |
| Find all elements that appear more than " n/k " times. | count freq and iterate in map get all elem |
| Maximum profit by buying and selling a share atmost twice | buy when down sell when rise (graph) for any num of time | for two we can use DP |
| Find whether an array is a subset of another array | if for second arr, mp[arr[i]==mp.end] false |
| Find the triplet that sum to a given value | Two sum extension with extra loop | also try three sum multiplicity |
| Remove Duplicates from Tricky Array LC | sometimes copy works instead of swapp |
| Trapping Rain water problem | for each elm get it's left max (0-i) and rigth max (j-n)  | left right max boundry array and min of both - arr[i] |
| Chocolate Distribution problem | sliding window of m size and (a[m-1-i]-a[i]) |
| Smallest Subarray with sum greater than a given value | may be kadane's or sliding window kind of |
| Distribute candies (IMP) | if(kval <= candies) ans[i%k] += kval; else {ans[i%k] += candies;break;} candies -= kval;  kval++; i++; |
| Check if array can be sorted | left,right=0 now if bit[left]=bit[right] do right++ else sort(l, r) and l=r (because we can make sorted to adj group by swapping anyhow) lastly check for sorted |
| Maximum tip calculator | sort by abs diff and if diff is same give priority to eg x and keep on picking the one which is maximum either first or second till x and y picking possible |
| Three way partitioning of an array around a given value | 0 1 2 approach treat 0 as less than a then (a-b) as 1 and less than b as 2 Remember seq 021 |
| NCR compute | Use pascal triangle in nth row return rth column |
| Minimum swaps required bring elements less equal K together | Keep track of bad counts in k size window  |
| Min pair merge operations required to make Array non-increasing |  |
| Maximize K to array Palindrome  each elm replaced by its remainder with K |  |
| min number of merge operations to make an array palindrome | if a[i] is lesser a[i+1] += a[i] elif a[j] is lesser then a[j-1] += a[j] else i++, j-- ; |
| Collecting Chocolates (great adhoc) | if(i!=0) rotate and add extra cost and keep track of min{i} rotate but store min  |
| Movement of Robots |  |
| Median of 2 sorted arrays of equal size | fucking hard |
| Wiggle sequence  |  |
| Median of 2 sorted arrays of different size |  |
| Minimum swaps to sort the array (imp) | create a temp and sort it now temp has its original position get the position from map then swap and after this update indexes of both for further work |
| Skyline Problem (optional now) |  |
| Minimum Time to Make Rope Colorful | get min b/w a[i], a[i+1] and swap if a[i] is greater after getting min so that it wont be used again | priorityQueue can be used becz we want to remove max only in consecutive |
| Insert, Delete, getRandom in O(1) {VVVV IMP} | a map and a vector required when deleting swap last elm with the elm that has to be removed then pop_back() and update idx odf last in mp as well |
| Sliding Window Summary Must Read |  |
| Sliding Window 10 Problems (V.imp) | go through article multiple times write down inShort in notebook |
| Count subarray with product less than K (VVVVV imp *(to count subarray)) | in a window of i to j subarrays ans += (j-i+1) in loop if product exceeds remove left elm by P /= a[left++] |
| Longest subarray of ones with 1 deletion | cnt of 0s and 1s agar 0s more than one ho jaye to window slide karo jab tak 0s equal to 1 ho jaye aur jab jab zero ek ya ek se kam hai ans calculate karte raho max will be our answer |
| Longest Substring without repeating character |  |
| Fruits into basket |  map se 2 size maintain karna hai |
| Complement |  |
| Minimum opreration to reduce X to zero | think with a different angle focus on middle(rest) sum we have to maximize len of midSum so boundry will be min | so get maxLen subarray of (total-x) using sliding window |
| K radius subarray average |  remember 2k par pahuchkar i-k se rest window 2k acces ho sakti hai ye jaruri hai tabhi 2k elem ka access milega |
| maximum-points-you-can-obtain-from-cards |  Take starting k cards (sum)  and then while(k--) { cp  -= cp[left];  cp += cp[right];  mp = max(mp, cp);  left--, right--; } |
| No of substring containing all three chars (vvvvvv Imp) |  Apply sliding window END = n-1, while(mp['a'] and mp['b'] and mp['c']) { cnt += (end - right + 1); // endPtr means aage ki sari substr jiska pref abc hai mp[s[left]]--;  left++; now just shrink |
| Subarrays with K Different Integers (Good One) |  |
| Binary subarray with sum |  Loop and do  pS+=nums[i];  if(mp[pS-goal])  count+=mp[pS-goal];  mp[pS]++;  } return count; dont forget mp[0] = 1; |
| Longest repeting char replacement |  Track max freq char, then int charReplacable = end - start + 1 - maxCount; // considered changing more than k chars, so shrink..  if (cR > k) { freq[s[start] - 'A']--;  start++; } and calc max |
| Maximize-the-confusion-of-an-exam | keep count of T and F and if min(T, F) > k remove from left and ans = T + F |
| Frequency of max frequent elm (vvvvv imp) | Binary search + prefix sum + sliding window |
| Substr with largest variance |
| Techfest and the queue |
| Matrix (20) | hypothetical 2D_to_1D | Rotation | printing_in_diff_order | binarySearchOnGrid | DFS-BFS |
| Multiplication of matrix  |  |
| Spiral traversal on a Matrix | variable col fixed row then variable row fixed cols and update row++ col-- or col++ acoordingly  and check in last two iteration it is not crossing limits  |
| Search an element in a matriix | top right | hypothetical binarySearch |
| Find median in a row wise sorted matrix |  |
| Find row with maximum no. of 1's | top right inc cnt till there is one keep track of max zeroes col-- if zero row++  |
| Determinant of a matrix |  |
| Print elements in sorted order using row-column wise sorted matrix | store in temp then sort it then place |
| Maximum size rectangle (imp) | max area histogram just add prev row elm and track max in each iteration |
| Max size Square |  |
| Reshape the Matrix | best to learn hypothetiv=cal 1-D |
| Find a specific pair in matrix | again that hypothetical idea if sorted |
| Rotate matrix by 90 degrees | transpose and reverse each col |
| Is sudoku valid (imp) |  |
| Sort the matrix diagonally  | treat diagonal (i-j) as key |
| Longest Increasing Path in matrix (imp) | for each elm call maxPath = max(maxPath, solve(matrix, i, j, -1)) here -1 is for prev track and next arr[i][j] should be greater than prev |
| Min cost path |  |
| The K weakest Row |  |
| Sum of matrix after queries |  |
| Game of Life (imp) |  |
| Kth smallest element in a row-cpumn wise sorted matrix | In hypothetical count keep track of k  |
| Sum of matrix after queries | Maintain count of row and colums |
| Minimum flips to make Matrix identical for all rotations |  |
| Sum of Matrix where each element is sum of row and column number |  |
| Find product of GCDs of all possible row-column pair of given Matrix | read only |
| Common elements in all rows of a given matrix | traverse first column mark all in a map now in every row keep marking and at last traverse loop if mp.second is = n print that elm |
|  | Skip the qns that requires recursion and dp if you haven't done these else solve all |
| Strings Solving (50) | implementation | hashing | Stacks | BFS | DP_on_string | DFS | recursion | bruteForce  |
| Reverse a String | swap first last  |
| Check whether a String is Palindrome or not | first last mis-match return false |
| Remove Duplicate characters in a string | create 26 size array and if freq > 1 return that char |
| Why strings are immutable in Java? | read the article |
| Write a Code to check whether one string is a rotation of another | queue push pop char again push match queue with second strs queue same true else false | append s1 to s1 now temp.find(s2) != s2::npos |
| Check if the given string is shuffled substring of another string | sort t str and get that t.size substr in s store that in temp now sort temp and check if equal |  Can be solved by hashmap keep moving window of t size |
| Count and Say problem | inside n loop create temp="", cnt=1; append a delimeter end to count that str as wll (1 time) while same inc count else retset cnt = 1 and str=tmp |
| Convert into equivalent mobile numeric keypad sequence. | create a 26 len array map chars to nums eg f=333 g=4 and so on |
| Converting Roman Numerals to Decimal | if mp[s[i]] < mp[s[i+1]] ans -= map[s[i]] else += mp[s[i]] ; |
| Integer  to roman |  |
| Longest Common Prefix | iniital pref s[0] call function for 2 in loop pref = prefUtil(pref, s[i]) in util create a empty temp if pref[i] and s[i] is same add in temp else break and return temp |
| Decoded String at Index |  |
| Compare version |  |
| Add Binary Strings | modulo 2 in sum keep adding last idx elms do - '0' to get int |
| Integer to words (imp) |  |
| Match specific pattern |  |
| Number of flips to make binary string alternate | odd even game if we have 001101 then we have two option 101010 or 010101 get min of both cnt by condition  |
| String Construction |  |
| Decode String (vvv.imp) | remeber to add "" first take two stack and num and word and in open push in stack and in close get prev str and add with curr |
| Find the second most repeated word in string. | map of string and num then loop in map => it.second < maxFreq && it.second > secMaxFreq |
| Find the lagest word in dict by deleting chars | try every word check if it is sequence of S and keep maintaining ma len and lex order |
| Print all Subsequences of a string. | take not take |
| Print all the permutations of the given string | loop idx to size swap if(i>idx && s[i]==s[i-1) and backtrack so that further gets same string  |
| Recursively remove all adjacent duplicates | skip dups adjs and recursively match size if differ call with new str  |
| Recursively print all sentences that can be formed from list of word lists | for last col loop and if r==Row print |
| Split the Binary string into two substring with equal 0’s and 1’s | count zero one if equal cnt++ |
| Find next greater number with same set of digits. [Very Very IMP] | find downFall from back idx_one break now find elm just greater idx_two break swap both idxs now reverse from idx+1 to end |
| Covert A to B (VVVVVVVVVV.IMP) |  |
| Break-a-palindrome (v.Imp) | replace a with char if palindrome mismatch else if all same just replace last with b if all same or a |
| Balanced Parenthesis problem.[Imp] | if opening push and if closing match top with equivalent open if mismatch false |
| Generate Paranthesis using recursion | if open%%close == n print()  if open<n then curr += '(' ;  if close<open then curr += ')' |
| Minimum number of bracket reversals needed to make an expression balanced. | if '{' open++ else{ if(open==0) close++ else open-- } return ceil of open/2 close/2 |
| Minimum number of swaps for bracket balancing. | track unbalanced |
| longest-semi-repetitive-substring (vImp) | when count becomes 2 shrink first adjacent from window |
| Find the longest string having all pref | divide by 10pow7,5,3,2 and take mods to get digits for crore, lakh, thousand and write func accordingly handle and case carefully |
| Design a tiny URL | just a 62 base conversion |
| Decode string at index |  |
| Rabin Karp Algo |  |
| KMP Algo |  |
| Boyer Moore Algorithm for Pattern Searching (v imp must) |  |
| Count of number of given string in 2D character array | if visited  '#' or  out of boundry or str[idx] != mat[i][j] return 0 and if idx==str.size()-1; return 1;  and store mat[i][j] in temp and reset temp for further counting |
| Search a Word in a 2D Grid of characters. (vimp) | if out of bound or not matching char return false else any or |
| Write a program to find the longest Palindrome in a string (vimp) | inside loop expand even odd sequenses low=i, high=i+1 AND low=i-1, high=i+1 |
| Check if two given strings are isomorphic to each other |  |
| Word Pattern LC |  |
| generate all possible valid IP addresses from given  string. | try all possible value that satisfy isValid and at last when (i==n) we must have count==4 ie 4 valid count and isValid [len>1 and s[0]==0 || >255 or len>4 or ...] |
| Minimum characters to be added at front to make string palindrome | edit distance similar |
| Sliding Window Article Guide | Read it before interview |
| Given a sequence of words, print all anagrams together (vImp) | anagram sorted as key  |
| Smallest window in a string containing all characters of another string (vimp) | map for t string count==t.size() now iterate in s, if char in mp by t dec freq and cnt-- when count is zero minimize window by removing the unnecesary chars mp[s[j]]++ and minimze loop runs while(count==0) |
| Smallest window that contains all characters of string itself. imp | map freq the size as count now loop in s and dec count if count == 0 minimize window |
| Function to find Number of customers who could not get a computer | first occurence mark seen if occ < n oc++  if seen and second occ then mark unseen occ--   else res++ |
| Rearrange characters in a string such that no two adjacent are same  (v.imp) | max frequent chars on even idx when not able to fill start filling at odd indexes  || Priority queue of <char, int> every time fill char with most frequency |
| Word break Problem[ Very Imp] | get 1-n length substring search in word if match flag 1 and look for sunstr(i, len-i) recursively if true return true else look in another codestorymik |
| Cutting Two binary string |  |
| Find the longest common subsequence between two strings. | dp on string |
| Find Longest Recurring Subsequence in String | lcs variation lcs of s itself here skip i==j becz we want another str |
| Transform One String to Another using Minimum Number of Operation | match both freq if mismatch -1 now if not match from last if mismatch cnt++ because multi point rotation allowed |
| EDIT Distance [Very Imp] | dp becz of overlapping pb => insert i-1, delete j-1, replace i-1, j-1 now return min({i,d,r}) |
| Uncrossed lines | LCS variation |
| String matching where one string contains wildcard characters |  |
| Word Wrap Problem [VERY IMP]. | if arr[i] > rem then cost = (c+1)^2 else have two option either in current line or in next line  |
| Count All Palindromic Subsequence in a given String. | if i and j chars equal 1 + solve(i+1, j) + solve(i, j-1) else { solve(i+1, j) + solve(i, j-1) - solve(i+1, j-1) // common  now return and memoize |
| Prefix and Suffix Search | brute force and add "#" between pref and suff to distniguish |
| Orderly Queue String  | handle n==1 is game |
| Text Justification (vv imp and great qns) | take help of temp vect to push that will make adding spaces easier || practice before interview |
| Validate IP address | do what is asking if len >1 and s[0] is 0 wrong else o < 255 <= keep checking  |
| Different ways to add paranthesis |
| Searching and Sorting (45) | SearchSpace | cycleSort | mergeSort | twoPointer | Counting Sort | sortUsing Comparator | pivot | rotatedSorted | BS_on_grid |
| Study Sorting Algorithm Then Read This Article |  |
| Find first and last positions of an element in a sorted array | lower_bound and upper_bound - 1  |
| Find a Fixed Point (Value equal to index) in a given array | arr[i] == i-1 |
| Find Pivot lower (love) |  |
| Search in a rotated sorted array | compare mid with low elm if low is smaller means left part is sorted end = mid-1 and search in that if key is in low-mid range else low = mid+1 |
| Search in a rotated sorted array ii (Leetcode) |  |
| square root of an integer upto 4 places precision | Search-space high-low > 1e4 ; |
| Max-Min  of an array using minimum number of comparisons | do nesting to avoid unnecessary comparison |
| Wave Array (vvvvv.imp) | for(int i=1; i<n; i += 2) { swap(arr[i], arr[i-1]) } |
| Find the repeating and the missing | cycle sort | bits |
| First missing positive |  |
| find majority element | perhaps Boyer-moore |
| Searching in an array where adjacent differ by at most k |  |
| find a pair with a given difference | if (mp.find(target + arr[i]) != mp.end()) |
| find four elements that sum to a given value | avoid dups carefully |
| maximum sum such that no 2 elements are adjacent | Dp if pick move i-2 else i-1 |
| Count triplet with sum smaller than a given value | two sum with extra loop |
| merge 2 sorted arrays | smaller greater move i j and dont forget leftout array to copy |
| print all subarrays with 0 sum | if the sum repeats that indicates that middle values have 0 sum so we add its frequencies AND if sum=0 we need to do count++ explicitly in logic or in start do mp[0] = 1 |
| Product array Puzzle | prefix product array and suffix product arr now get pref[i]*suff[i]  and copy in nums [i] done   | product of array except self  |
| Sort array according to count of set bits | write bitCOUNT function sort with comparator if bits same index lesser will be returned |
| minimum no. of swaps required to sort the array | take a copy array sort it it will be having rigth indexes of elm so if both not same swap them |
| Sorted Arrangements Amazon (vv.imp) | solution not found yet |
| Bishu and Soldiers | have prefSum array and if pow lesser get upper bound idx and pref[idx] return both |
| Rasta and Kheshtak |  |
| Kth smallest number again | sort start based merge and apply math |
| Find pivot element in a sorted array | quick sort select helper |
| K-th Element of Two Sorted Arrays | in merge have a count and if count==k return elm | not optimised |
| Search in infinite array |  |
| Nth root of an integer again | write multiply func and do stuffs like sqrt |
| K closest in sorted array |  |
| Book Allocation Problem | search space |
| Aggressive cows | last - arr[i] satisfy mid cnt++ and last = arr[i] |
| EKOSPOJ: | cut from the highest loop and arr[i] - mid add sum and check if satisfy |
| Koko Eating Bananas |  |
| Job Scheduling Algo | sort + greedy + dp |
| Minimum Cost to Make Array Equal  |  |
| ROTI-Prata SPOJ | 1e9 space for each a[i] check j<mid nested and if that satisfy  |
| Painters Partition Problem: | use the formula of nth number and dreive expression now satisfy contn |
| Packaging Ships Leetcode |  |
| Min abs diff between elms with constraint (vvIMP) | make sorted online and apply bs |
| Smallest number with atleastn trailing zeroes infactorial | low = 0 , high = 5*n and apply loop mid/5 + mid/25;and so on until fails |
| Missing Number in AP |  |
| DoubleHelix SPOJ | two pointer if both i, j equal get max sum add and do rest case handle |
| Least Number of Unique Integers After K Removals | sort based on frequency and remove least frequent |
| Optimum location of point to minimize total distance |  |
| Subset Sums |  |
| Findthe inversion count | mid - i |
| Implement Merge-sort in-place |  |
| Partitioning and Sorting Arrays with Many Repeated Entries |  |
| OOPS questions |  |
| Complex Number Class |  |
| Fraction Class |  |
| Polynomial Class |  |
| Greedy Algorithms (Art 50 => attempt 35) |  FirstX lastY | Intervals | Mark X Busy | Coloring [0,1,2] | Huffman | Set | Make sorted by DS | Observation | parity | EndToStart | Window | PrefSuff |
|  | in count related problem sort by END works and in pb related to overlap or range start works |
| Max product of three number |  sort and then either last three or first two (-ve) last one | if it was x number then window i = -1 and j = n-1-x moving product |
| Fault wirings and bulbs |  Take flip bool variable false initially when its 0 and false  |
| Bulb Switcher LC |  every second flip resets next bulbs so utilize that |
| Disjoint intervals |  Sort by end time and last = arr[0].second now loop from 1 if (meet[i].first > lastEnd) { meetings++;  lastEnd = meet[i].second } |
| Largest Permutation |  store in map the idxs of nums and then swap from n to n-k with 0 to k idx and update map also |
| Activity Selection Problem |  Same N meetings | sort by end time and track last even if not selected or selected |
| Job SequencingProblem (great) |  for(int j=arr[i].dead-1; j>=0; j--){  if free  becz if deadline is 5 it can be done b/w 1 to 4 if(res[j] == -1){ res[j] = arr[i].id;  job++; profit += arr[i].profit; break;   // go out else 0 all |
| Max meeting in a room |  sort end track last also make tuple for idx tarcking for ansStore  |
| Huffman Coding (Good One) |  first nodes with pq values and push that TreeNode in pq now while pqSize is > 1 pop top 2 build new node and at last apply traversal |
| Assign mice to holes |  sort both and take abs maxi |
| Assign cookies |   while(i < n and j < m) { if(g[i] <= s[j]) { i++, j++;  num++; } else { j++; } } |
| Fractional Knapsack |  sort and keep picking till W < wt[i] else take W*(val[i]/wt[i]) |
| Choose and swap |  |
| Greedy Algorithm to find Minimum number of Coins |  keep picking max size coins |
| Minimum no of Seats |  track maxReach and remainingStep if remaining becomes zero jump++ and remaining = maxreach - i |
| Candy Problem |  vec<i> acndyL, candyR iterate from 1 and if i-1 < i  [2,3]add +1 same iterate from n-1 if i+1 < i [3,2] inc +1 and finally loop n=and max of L and R |
| Gas Station |  fuel =0, now loop and calc fuel[i] - cost[i] if its -ve update start to i+1 and first of all check sumOfFuel > sumOfCost so that circular isnt required |
| Min number of refuling stops |  loop in st and till fuel < st[i][0] keep pushing fuel st[i][0] in priorityQ when no fuel pop fuel(highestOne) and if fuel > target return count || PUSH st.push_back({target, 0}); indicator |
| Maximum trains for which stoppage can be provided |  sort by departure time and make vector n+1 size(plateform)  if (arrival >= plateform[plateNo]) { count++; plateform[plateNo] = departure; } |
| Minimum Platforms Problem |  sort both and track arrival and departute using 2 pointer if arrival[i] <= departure[i] do plateform++ else plateform-- |
| Buy Maximum Stocks if i stocks can be bought on i-th day |  sort pair<val, i+1> according to smaller values and track idx as well and take min of ( remainMoney/val[i], idx ) |
| Find the minimum and maximum amount to buy all N candies |  but candies with smaller and take free with max buy do i++ and free one j(n-1) j-k and viceversa for opposite |
| Minimize Cash Flow  |   |
| Minimum Cost to cut a board into squares |  Make cuts with value highest first so that it doesnt get counted muliple times and if made vertical cut then hr++ if horizontal then vr++ cost = arr[i]*vr or arr[j]j*hr |
| Check if it is possible to survive on Island |  handle sundays carefully |
| Maximum product subset of an array (v imp) |  count negNum, zeroes if negCount is odd divide with max neg(-4,-3,-1 here max is -1) also if (zero==n or zero==n-1 & neg==1) then zero  also if sz=1, [-x] then return arr[0] |
| Maximize array sum after K negations |  sort by abs value now  loop from back and if arr[i] < 0 do -1*arr[i]  and if still k remains then if k%2 ie odd arr[0]*-1 else even times -1 will become +ve |
| Maximize the sum of arr[i]*i |  sort in increasing and loop do sum += a[i]*i; |
| Maximum sum of absolute difference of an array |  arrange min_maxeg(12345=> 15243 here adj diff is 4321(10) n*(n-1)/2). but if we bring mid elm to start we get better ans(non-circular)  that is  but in 3154(11) so do n*(n-1)/2 -1 + n/2 |
| Maximize sum of consecutive differences in a circular array |  while(i < j) { sum += abs(a[i]-a[j]); if(ithTurn) {  i++;  ithTurn = false; } else {  j--;  ithTurn = true; } } // circular ,sum += abs(arr[i]-arr[0]); |
| Minimum sum of absolute difference of pairs of two arrays |  sort both and loop sum+= abs(arr[i]-brr[i]); |
| maximum-elegance-of-a-k-length-subsequence |  sort in dec and take first K elm if all unique return ans else remove elm from pq and take k-n elm give every elm chance remove from pq ,contro add new, contro and update mp.size() |
| Shortest Job First Algo |  sort now waitingTimer=0, toatlTime=0, loop in bt toatlTime += timer;  update waitingTimer += bt[i]; return total/size() |
| Least Recently Used Algo |  |
| Smallest subset with sum greater than all other elements |  leftSum=sum(arr), rightSum=0 now sort in dec and loop do cnt++; leftsum -= Arr[j]; rightsum += Arr[j];  if(rightsum > leftsum)  return cnt; |
| Queue Reconstuction by height |  |
| Two city scheduling |  sort by gap (a[0]-a[1]) < (b[0]-b[1]);  // take half here a is small becz (a-b) -ve and for rest half n/2 to <n take second half huge +ve so (a-b) here a is bigger and b is smaller |
| Encode and decode strings (skip now) |  |
| Task Schedulers |  |
| Card Fleet 2 |  |
| Chocolate Distribution Problem | try all m size window  initially i=0 and j= m-1 and track min of ith and jth |
| DEFKIN -Defense of a Kingdom |  |
| DIEHARD -DIE HARD |  |
| GERGOVIA -Wine trading in Gergovia |  |
| Picking Up Chicks |  |
| CHOCOLA –Chocolate |  |
| ARRANGE -Arranging Amplifiers |  |
| Water Connection Problem |  |
| K Centers Problem |  |
| Minimum Cost of ropes |  utilize priority queue  |
| Smallest number with given number of digits and sum of digits |  |
| Rearrange characters in a string such that no two adjacent are same |  store freq in map now build pq of freq and respective char now pop top two add there char if freq > 1 decr freq by 1 and push it again  |
| Find maximum sum possible equal sum of three stacks |  |
| Minimum Replacements to Sort the Array |  |
| Minimum Number of Taps to Open to Water a Garden |  Similar to jump game just make jump vector<n+1> and store range |
| Linked List (45) | Reversal | Mid | SlowFast (cycle) | PrevTrack | RecursionOnLL | Merge | *Partition | Rotation | SortAlgo        .... |
| Design Linked List Leetcode |  |
| Go Through This Leetcode Article  |  |
| Reverse the Linked List. (Both Iterative and recursive) | prev, curr, next  |  Node *newHead = reverse(head->next); Node *headNext = head->next;  headNext->next = head;  head->next = NULL; |
| Reverse in group of Given Size.  (Both Iterative and recursive)  | reverse first k then head->next = reverse(next, k) |
| Delete a Node without Head | copy next into current and do curr.next = curr.next.next and free curr.next but save it before |
| Find the middle Element of a linked list. |   |
| Check whether the Singly Linked list is a palindrome or not. | get mid , reverse(slow.next) now slow.next = null now compare if different return false else true (no matter extra 1) |
| Longest Palindrome in Linked List O(n) |  |
| Linked List random Node | rand() and do iteration till rand |
| Remove Duplicates in a sorted Linked List. |   |
| Remove Duplicates in a Un-sorted Linked List. | have prevPtr, and use hashset if found already do prev.next = curr.next and prev = next |
| Move the last element to Front in a Linked List. |  |
| Rotate Linked List By k Position | make cycle first now get k's prev node point k.next to null and update head accordingly  |
| Program for n’th node from the end of a Linked List |  |
| Intersection of two Sorted Linked List. |  |
| Intersection Point of two Linked Lists (Y shaped) | run larger list by diff of both now run simultaneously both will meet at same || run both if one becomes null set h1 as h2  |
| Sum of Last N Nodes in one Traversal | TotalSum - sum till start N nodes so if done with n node stop nSum and return sum - nSum |
| Write a program to Detect loop in a linked list. | use hashset if s.find != end return true | slowfast equal true | mark node's data to -1 if any -ve true and lastly modify again |
| Write a program to Delete loop in a linked list. | when slow fast met then reset slow, start moving both by one and if slow. next == fast. next set fast. next = null |
| Length of the loop | where slow fast equal in cycle detection do fast.next now do count++ untill both slowFast becomes equal return count |
| Find the starting point of the loop.  | using slow fast detect cycle now reset anyone and move both by one when both meets at same that is our starting point |
| Add “1” to a number represented as a Linked List. |  |
| Add two numbers represented by linked lists. |  |
| Multiply 2 no. represented by LL |  |
| Merge Two Sorted Linked List (vvvv.imp) | nHead, dummy now if h1.data <= h2.data nHead.next = h1 else nHead.next = h2 if anyone becomes null attach other on end |
| Merge K sorted Linked list (v-Imp) | Divide and conquer when single list left on both side merge (left, right) perhaps head is given as first  |
| Delete Middle node From Linked List | mid and prevMid now prevMid.next = prevMid.next.next |
| Merge Sort For Linked lists.[Very Important] | find mid break from mid (save mid next) call mergeTwoSortedList function  |
| Flatten a Linked List (v-Imp) | if (root=null | root.next=null) return root.  return mergeList( root, flatten(root. next))  here flatten will recursively do all job now our job is to merge root with flattened list ie root.next |
| Quicksort for Linked Lists.[Very Important] | one detected reset and move both simultaneously if both address equal return either of them |
| Why Quicksort is preferred for Arrays and Merge Sort for LinkedLists ? | if curr.data = curr.next.data then curr.next = curr.next.next else move by next |
| Sort Based On Actual value O(n) | use hashset and prevPointer if found again prev.next = curr.next and in both cases curr = curr.next , prev = curr |
| Insertion Sort Linked List | get last and seondLast now secondLast.next = null;  last.next = head , update head |
| Segregate even and odd nodes in a Linked List   (vvv-Imp) |  |
| Partion List Based On Value on X |  |
| Delete nodes which have a greater value on right side  (v-imp - pattern) |  |
| Sort a LL of 0's, 1's and 2's |  |
| Check if a linked list is a circular linked list. |  |
| Make Linked list Circular |  |
| Split a Circular linked list into two halves. |  |
| Deletion from a Circular Linked List (handle edge cases) |  |
| Reverse a Doubly Linked list. |  |
| Can we reverse a linked list in less than O(n) ? |  |
| Rotate DoublyLinked list by N nodes. |  |
| Rotate a Doubly Linked list in group of Given Size.[Very IMP] |  |
| Find pairs with a given sum in a DLL. |  |
| Count triplets in a sorted DLL whose sum is equal to given value “X”. |  |
| Sort a “k”sorted Doubly Linked list.[Very IMP] |  |
| Find the first non-repeating character from a stream of characters |  |
| Split Linked List in k Parts |  |
| Clone a linked list with next and random pointer |  |
| Add Two polynomial using Linked List |  |
| modify-linked-list- |  |
| Flatten a Linked List (v-Imp) |  |
| Flatten BST to sorted Linked List |  |
| Max twin Sum |  |
| LRU Cache (vvvvv. imp ) |  |
| LFU cache (vvvvv. imp ) |  |
| Design SkipList  | Learn Recursion on Linked list try applying in each QS |
| Next greater node in Linked List |
| Stacks and Queues (45) | Implementation | Adapters | RecursionOnSQ | Parentheses |  Monotonic Stack | Sliding Window | Arrangements | Circlegames |
|  Implement Stack from Scratch | notebook |
|  Implement Queue from Scratch | notebook |
| Implement 2 stack in an array | top1 at -1 and top2 at arr.size() for pushing one inc, one dec if(top1 == top2+1) overflow and apply condition individually |
| Min Stack with and without space |  |
| find the middle element of a stack in O(1) | use DLL and have a cnt in PUSH(head in DLL) if cnt even move midPtr previous and in odd nop | in pop (delFromHead) if cnt odd move next if even nop |
| Balanced parenthesis  | push opening and if closing comes match if pair pop and if st is empty false or diff bracket the false last check st.empty() |
| Longest Valid Paranthesis LC | push(-1 ) if ( push (i) else pop if st.empty push(i)  ==> (()) 0123 2pops1, 3pops0 so 3-(-1)=4 only case to remember ")()())" sabse pahle -1 pop aur yaha se ans honge |
| Expression contains redundant bracket or not | have a flag if between ) to (  there is a operator (must operator) flag true (c) is redndant so flag must be set when operator comes in not chars | if chars do cnt <= 1 |
| Length of the Longest Valid Substring | Do it O(1) space from start open++ close++ if open==close store ans also close>open set both zero similarly traverse from back do oppposite here if open>close set both zero |
| Reverse a String using Stack | push and pop store in empty str |
| Arithmetic Expression evaluation |  |
| Evaluation of Postfix expression | when an opartor pop top two elms do operation based on character '+' push(b+a) |
| Remove K consecutive dups nested |  |
| Infix to Postfix Expression PEP | use pair of stack if top=s[i] push(s[i], top.second+1) else (s[i], i) if(st.top.second==k) pop k elms |
| Find the next Greater element (vImp) | traverse from rigth if asked nge on rigth pop from st till arr[i] >= st.top now if st.empty add -1 (not have nge) else top elm would be our nextGreater becz we have popped all smaller elms |
| Next Greater Element 4 LC (optional but great) |  |
| Largest rectangular Area in Histogram | width is nextSmaller idx - prevSmaller idx -1 heigth is arr[i] keep a max and return max |
| Online Stock span problem LC | Prev Greater elm idx if St is empty then idx+1 else (idx - st.top()) |
| Maximum of minimum for every window size |  |
| Remove K digits (IMP) |  |
| Maximal Rectangle LC | if(a[i-1][j] != 0) then a[i][j] += a[i-1][j] else a[i][j]   treat it as building in maxRectangle question |
| Help ClassMates |  |
| Sum of Subarray Minimums (VV IMP) | that vid |
| Design Browser History |  |
| 132 Pattern | have min var now look for elm's next smaller and min should be less than curr and nextSmaller should be greater than min |
| The celebrity Problem | give every col a chance and eliminate by checking if  aAknowsB that means a eliminated push b and do till one elm left now cross check it |
| delete middle of the stack using recursion | if(st.size()==n/2) return st.top(); and int num = st.top, st.pop; insert() now on backtracking push(num) that we saved  |
| Insert at bottom without using any other DS | save top of stack in a variable pop it save if now if stack becomes empty push x return and while returning push saved number in stack back  |
| Reverse a stack using recursion (vvImp) | reverse stack recursively and if size==1 insert at bottom (qs is solved prev) |
| Sort a Stack using recursion | save top elm pop them now hypothesis sorts all elms while returning push elm in sorted position | pop, save for later if St. top is less than current push it |
| Merge Overlapping Intervals |  |
| Implement Stack using Queue | push , top as queue front for popping move N-1 elm into a temporary Queue return that one elm swap (q1, q2) |
| Implement Stack using Deque |  |
| Beautiful tower 2 (vvvIMP pattern) | prefSum and suffSum Dist Great qns |
| Simply Path LC |  |
| Asteroid Collision Leetcode (IMP) |  |
| Basic Calculator Problem Leetcode (IMP) |  |
| Stack Permutations  |  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |  |
| Implement Queue Class  |  |
| implement Deuqe Class  |  |
| Implement a Circular queue | apply modulo logic |
| Implement Queue using Stack   | push works the same way when popped move n-1 s1 elm to s2 now return that one elm and push back again from s2 tyo s1  becz it gets reversed cant swap like queue |
| Reverse a Queue using recursion | save in recursion callStack variable and do your work in backtracking |
| Reverse a Queue using stack | push in stack and then copy in queue |
| Reverse the first “K” elements of a queue | fetch first k elm from q and push in stack (reversal) now keep pushing st elm in queue now fetch (n-k) elm and push in queue |
| First non-repeating char in stream (imp). | have cnt array and a queue(for maintaing order) pop all elm with >1 cnt and return elm with 1 cnt at front if queue is empty add a '#' |
| First CircularTour that visits all Petrol Pumps (vv.imp) | if petrol < 0 then add it in a var deficiency and now from newStart keep adding in petrol if petrol+deficiency > 0 return start |
| Winner of Circular Game LC | Similar to Josephus game |
| Interleave the first half of the queue with second half | push first half of main in temp q now pop from temp add in main, pop from main push in itself again |
| First negative integer in every window of size “k” | push only -ve elm in deque if i - dq.front >= k pop_front and ans[i] = front of deque |
| Sliding Window Maximum (vvv.imp) | clear window -> maintain decreasing order -> push index -> store ans (if i>k-1) to avoid computation of first window explicitly |
| Sum of min-max elms of all subarrays of size “k” (vimp pattern). | maintain both maxDeque and minDeque similar to finding first -ve here mainatain max and min |
| Minimum time required for rotting all oranges |  |
| Distance of nearest cell having 1 in a binary matrix | Multi source BFS |
| Game with String 'K' | push frqency priority queue pop top freqs and reduce it by one and again push it |
| Nearest exit from entrance  | bfs push initial position with 0 moves pair now push 4 direction if any reaches 0 or n-1 return that p. second |
| All levels of two trees are anagrams or not.  (VVVV.imp) |  |
| LRU Cache Implementation (vvv. imp) |  |
| Implement "N" stacks in an Array |  |
| Implement "N" queue in an Array |  |
| igotanoffer top-50 try on leetcode must |  |
| Go through pepcoding notes atleast ones all questons ........ |
| Recursion and Backtracking (45) |
|  |   indexGame | zigZag preInPost | countWays | gridBases | pickNonPick | permutationCase | |
|  |   divideAndConquer | BackTracking  | partition | uniqueRecurrence |
| Explain Recursion to a 5 year old guy |
| Read This Leetcode Guide |
| Pep Lecture 1-10 to CoverUp Basics |
| Print Increasing Decreasing | n to 1 on going deep in recursion and 1 to n while coming back from recursion |
| No of Ways to reach Destination (stair path) |  |
| ZigZag Traversals PreInPost pep (VVVVVVVVV IMP) | Master That Pre-In-Post Concept |
| Implement Pow (x, n)  | smallAns = pow(x, n)*pow(x, n) and in bactrack if(n&1) do ans = x*smallAns |
| Binary Exponentiation Pow(x, n) in log(N) |  |
| Ladders with atmost K steps (stair path extension) | loop 1 to k and call n-i |
| Display| Reverse| Max-Min| First-Last occurences |
| All idx of Array (Return in Static Array)  | declare int *arr and return initialized array in base case like new int [cnt] and based on condition arr[cnt-1] = i;  |
| Bubbel Sort, Insertion Sort ,Binary Search (knalLect) |  |
| Sort an Array without Sorting algo | like stack if single elm then insertAtright idx  |
| Recursive Sequence (imp) |
| Tower of Hanoi |
| Reverse String (substr method + first last) both |
| Move 'x' to the end of the String |
| Replace PI with 3.14 |
| Remove Duplicates from string |
| Maze Path with Obstacles |
| Maze Path with Jumps |
| Rat in a Maze GFG | better handle everything at base case (i<0 and j<0 i>=m and j >=n and mat[i][j]==0) return 0; |
| Count Maze Path |
| Subset I Leetcode |
| Subsequence of a String codestudio |
| Subset II Leetcode (without using set) | loop template becz when dups ar adj then we can skip and [2], [2] will gen same [2,x,x], [2,x,x] |
| Partition of a set intoK subsets with equal sum | if(currSum==tar) return solve(0, 0, k-1, t) and take vis to keep track which elm are chosen |
| Combination sum I Leetcode | Take idx elm and stay at idx till arr[i] <= target |
| Combination sum II Leetcode | loop template becz when dups ar adj then we can skip and [2], [2] will gen same [2,x,x], [2,x,x] |
| Generate Parenthesis  | if open<'n' s+='(' if close < open s+=')' if both equal n print str |
| Different ways to add paranthesis (VV.IMP) |  |
| Split into fibonacci sequence (VV.IMP) |  |
| Make Sequence | () |
| Count Sorted Vowel string |
| Ones and Zeroes Leetcode | if(cntZero < m and cntOne < n) call take += 1 + solve(m-cntZero, n-cntOne); |
| Max Length combined string (VIMP) | if picking is possible still apply pick nonPick on that part because picking current can also affect future outcomes |
| Minimum Subset Sum Difference | meet in the middle algo |
| Remove Invalid Parentheses | left = s.substr(0, i) and right = s.substr(i+1) call(left+right, invalid-1) and if(invalid ==0 and string valid puch in st) |
| Permutation I Leetcode | swap at every idx ti n  || take used set and visited array |
| Permutation II Leetcode | take used Set |
| Get Keypad Combination | get respective mapping str  str = mp[idx] now loop in str  do temp+=str[i[  and call for next level (idx+1) |
| Kth Symbol in Grammar (good one) | left = 0 and right = pow(2, n) and call if(left==right) return char else get mid if(mid <= k) call low to mid with same char else call mid+1m high with 1-char |
| Merge Sort |
| Quick Sort |
| Inversion Count |
| Reverse Pairs count |
| Distribution of Cookies | take k size vector try every k possibilities and have max min at base case |
| Word Pattern Matching pep | if already in map then match same and call(i+1), else save in map {char, str} now call for next (i+1) if true return true else backtrack and delete from map for further exploration |
| Find Maximum number possible by doing at-most K swaps |  |
| Word Break Problem 2 | get substr from idx to i (idx, i-idx+1) if subs in dict then save newWord + ' ' + subs and  call (i+1, newword)  |
| Total Decoding a message (VVVVVVV.IMP) |
| Print all palindromic partitions of a string |
| Partition array for maximum sum (MUST do qns) |
| Word Square LC |
| m Coloring Problem |
| Max no of achievable transfer request (imp MiksVid) |
| Maximize score after N opeartion |
| Find if there is a path of more than k length from a source |
| Count All possible Routes |  0 reset template cause going back allowed |
| Match stick to square |
|  K-th Permutation Sequence of first N natural numbers |
| Longest Possible Route in a Matrix with Hurdles |
| Find shortest safe route in a path with landmines |
| Printing all solutions in N-Queen Problem |
| The Knight’s tour problem |
| Steps by Knight |
| Sudoku Solver |
|  Count All Valid Pickup and Delivery Options | for every 0 cell try all > 1 option and take dist between cordinates and take min of it |
| Binary Trees (55) |
|  |  hypothesis |  Stack | PostOrder | Travel And Change | views | pathRelated | Construction | leftRightTop pattern | Morris Pattern | handleRoot CallChild |
| Study Enough About N-ary Tree asked 2022 onwards heavily |  |
| Views and Traversals Article |  |
| level order traversal | int size = q.size()  then loop that many times if left exist push same with right when while ends insert row in ans vector |
| Reverse Level Order traversal | root = q.front then index = leftToRight ? i: n-1-i ; |
| Height of a tree | return max(lHeight, rHeight) + 1; |
| Check if a tree is balanced or not | keep returning max(left, right)+1; but if any of the moment abs(left-rigth) > 1 return -1 also if any one has gotten -1 return -1 from that dont do further call so check before if(left==-1) return -1 same with rigth |
| Diameter of a tree | diam = max(diam, left + right)  and return max(lHeight, rHeight) + 1  returning heigth and keep computing diamter (travel and change strategy) |
| Inorder Traversal using recursion and Iteration | push root in stack now while(!empty) get the top first push rigthChild then left ( if exist ) keep popping from top store in ans  |
| Preorder Traversal recursion and Iteration | while(true) push node in stack keep pushing if left exist Now if left is null go to else here if stack empty break; else pop the top store in ans move node to right |
| Postorder Traversal recursion and Iteration | keep pushing root, left in stack if null store top's right in temp if that is also null pop the top and store in ans (if temp==st.top->right pop and store inans) else temp=curr now curr will do the same left-left-left then right the again if rigth null store ans.. |
| Left View of a tree | in level order traversal for(1 to <=size) if i==1 store in ans vector  |
| Right View of Tree | in level order traversal for(1 to <=size) if i==size store in ans vector  |
| Top View of a tree | if (mp[line] == mp.end) then only save elm |
| Bottom View of a tree | mp[line] = root.elm    keep updating at the end we'll have the last |
| Zig-Zag traversal of a binary tree | have rightLeft bool inverter if true idx = i: n-1-i |
| Boundary traversal of a Binary tree | left then leaf then right in reverse order |
| Vertical order Traversal  | map of line with multiset for inner vals to be sorted |
| Diagnol Traversal of a Binary tree |  |
| Same Tree or not | if ( left==NULL or rigth==NULL ) return right==left;  otherwise root1.data = root2.data && left %% right   (hypothesis left right ok hai to dono ka root equal hona chahiye) |
| Check if 2 trees are mirror or not |  |
| Mirror of a tree |  |
| Symmetric Tree |  |
| Tilt of a Tree pep (vimp) | return sum and change tilt |
| Max Path Sum  |  |
| Check if Binary tree is Sum tree or not | return root.data + left + right; handle leaf separately just return its value and whenever condition gets false don't do further calls same as height by strvr |
| Convert Binary tree into Sum tree | left = call, right = call , int save = root.Val , rootVal = left+right return save+left+right; |
| Maximum products of splitted tree |  |
| Check if 2 trees are mirror or not |  |
| Find LCA in a Binary tree | if root == a return a if root==b return b now if a null return false same with b |
| Find distance bw 2 nodes in a Binary tree (VV IMP) |  |
| Left Cloned Tree. pep |  |
| Distance between given two nodes |  |
| Recover from Left Cloned Tree pep |  |
| Invert a Binary Tree |  |
| Check if all leaf nodes are at same level or not |  |
| Check complete Binary tree |  |
| Find all Duplicate subtrees in a Binary tree [ IMP ] |  |
| Children sum property in BT |  |
| Distribute candies in binary tree |  |
| ConstructTree with Bracket Representation |  |
| Morris Traversal (VVVVV. IMP) | if currLeft not null prev = currLeft with this go to its right most attach prevRight to curr keep.. if if currLeft is null store in ans move left if prevRight==curr break connection prevRight=null and if leftNot store it ..  |
| Convert Binary Tree into DLL (VVIMP) |  |
| Construct tree from Inorder and preorder  |  |
| Find minimum swaps required to convert a Binary tree into BST | same as min Swaps required to sort an array |
| Serialize and Deserialize a Binary Tree  |  |
| Check if tree contains duplicate subtrees of size 2 or more |  |
| Sum of nodes on the Longest path from root to leaf |  |
| Check if given graph is tree or not.  [ IMP ] | Detectig cycle and connected component |
| Find Largest subtree sum in a tree |  |
| Maximum Sum of non adjacent node |  |
| Print all "K" Sum paths in a Binary tree | push rootVal in preorder and in postorder add rootVal in sum if sum gets k from that index print till last |
| Kth Ancestor of node in a Binary tree | while returning do k-- if k gets zero return that node |
| Tree Isomorphism Problem | Check vals similar or not (one left and two left) or (one right and two left) |
| Root to Node Path |  |
| Path Sum 3 |  |
| Attempt All path Related Problems (vImp) |  |
| All Nodes at a distance K | mark parent pointer if level == k; break and Store whatever inside queue is and return ans |
| Burn Tree pattern (VVVVVV IMP) | make parent map (if node.left exist mp[node.left] = node same with right ) have a visited array so that no node gets visited again do normal bfs if any gets burned mark flag and if true inc time |
| Search more Binary Tree Parent pointer problem const space |  |
| House Robber III Leetcode |  |
| Binary Tree Cameras |  |
| Minimum Time to Collect All Apples in a Tree |  |
| Nodes in the Sub-Tree With the Same Label |  |
| Longest Path with Different Adjacent Character |  |
| Read That 100+ QS Book Completely ............................... |  |
| Binary Search Tree (20) |  |
| Find a value in a BST | move left right according to value reject other half each time |
| Ceil, Floor in BST |  |
| Insert into BST | keep moving left right according to value when got NULL return new Node(val, NULL, NULL)    and connect to call where it was made |
| Deletion of a node in a BST |  |
| Find min and max value in a BST | left left..... and rigth right..... |
| Find inorder successor and inorder predecessor in a BST |  |
| Check if a tree is a BST or not  | Define Range each time visiting a node |
| Populate Inorder successor of all nodes |  |
| Find LCA  of 2 nodes in a BST | when both range are not in one side of BST that it LCA |
| Construct BST from preorder traversal |  |
| Construct BST from Inorder traversal |  |
| Check preorder is valid or not |  |
| Convert Binary tree into BST |  |
| Convert a normal BST into a Balanced BST | get inorder and create a new BST by mid pointer technique |
| Merge two BST [ V.V.V>IMP ] |  |
| Find Kth largest element in a BST | in postorder when backtracking k-- if equals to 0 return that node |
| Find Kth smallest element in a BST |  |
| BST iterator Leetcode  |  |
| Count pairs from 2 BST whose sum is equal to given value "X" |  |
| Find the median of BST in O(n) time and O(1) space |  |
| Count BST ndoes that lie in a given range |  |
| Replace every elm with least greater elm right (V.V.V.V IMP) |  |
| Find the conflicting appointments |  |
| Check whether BST contains Dead end |  |
| Largest BST in a Binary Tree [ V.V.V.V.V IMP ] |  |
| Flatten BST to sorted list (VVV IMP) |  |
|      Priority Queue (20)  after luv's Playlist |  |
| Implement a Maxheap/MinHeap using arrays and recursion. |  |
| Sort an Array using heap. (HeapSort) |  |
| Maximum of all subarrays of size k. |  |
| “k” largest element in an array |  |
| Kth smallest and largest element in an unsorted array |  |
| Merge “K” sorted arrays. [ IMP ] |  |
| Merge 2 Binary Max Heaps |  |
| Kth largest sum continuous subarrays |  |
| Leetcode- reorganize strings |  |
| Merge “K” Sorted Linked Lists [V.IMP] |  |
| Smallest range in “K” Lists |  |
| Median in a stream of Integers |  |
| Check if a Binary Tree is Heap |  |
| Find Median in Data Stream LC (vimp) |  |
| Connect “n” ropes with minimum cost |  |
| Convert BST to Min Heap |  |
| Convert min heap to max heap |  |
| Rearrange characters in a string such that no two adjacent are same. |  |
| Minimum sum of two numbers formed from digits of an array |  |
| Frog Jump |  |
| Cost to hire K workers |  |
| Find K pairs with smallest sum |  |
| count-all-possible-routes (random imp) |  |
| Find K pairs with smallest sum |  |
| Graph + Dp + Trie + Bit  left only (20-25 Days)   only DP - 15DYS 100+ problems |  |
|        Graph Algorithm (45) | After TUF playlist |  |
|  |  Identification | DFS | BFS | minDist to 1's Multisource BFS | Shortestpath | CycleDetection | TopologicalSort | Bipartite | DisjointSetUnion | Bridges |
|  |  Tips to recognise => Numbered from 0 to N | X comes after Y | X dependent on Y | X have Relation on Y | minSteps | something Common  | Ranges |
| Create a Graph, print it |    |
| Implement BFS algorithm  |  |
| Implement DFS Algo  |  |
| Detect Cycle in Directed Graph using BFS/DFS Algo  |  |
| Detect Cycle in UnDirected Graph using BFS/DFS Algo  |  |
| Search in a Maze |  |
| Find the no. of Islands |  |
| flood fill algo |  |
| Rotting Oranges |  |
| Sorround Regions |  |
| 0/1 Matrix |  |
| Minimum Step by Knight |  |
| Knight in Geekland |  |
| Journey to the Moon (imp) |  |
| Circuit Path |  |
| Minimum operation multiplication |  |
| Min fuel cost to report to capital city | cars = ceil(pathLen / (seats * 1.0)); get pathLen of every node and maintain carNeeded |
| Word Ladder  |  |
| Clone a graph |  |
| Water Jug problem using BFS |  |
| Water Jug problem using BFS |  |
| shortest-path-in-binary-matrix |  |
| Snake and Ladders Problem |  |
| Making wired Connections |  |
| Course Schedule 2 |  |
| Alien Dictionary |  |
| Possible to finish all tasks or not from given dependencies ? |  |
| Dijkstra algo |  |
| Find Eventual Safe States |  |
| Cheapest Flights Within K Stops (imp) |  |
| Oliver and the Game |  |
| Check whether a graph is Bipartite or Not |  |
| Implement Topological Sort  |  |
| Detonate the maximum bombs (vImp) |  |
| Graph ColouringProblem |  |
| M-ColouringProblem |  |
| evaluate-division |  |
| Min multiplication operation |  for one multiple tries |
| Make Large Island |  |
| Last day where you can still crosss |  |
| Shortest Path to get all keys |  |
| Path with max probability |  |
| Minimum time taken by each job to be completed given by a DAG |  |
| DSU Lecture strv |  |
| Flight withing K stops |  |
| Implement Kruksal’sAlgorithm |  |
| Implement Prim’s Algorithm |  |
| Total no. of Spanning tree in a graph |  |
| Implement Bellman Ford Algorithm |  |
| Implement Floyd warshallAlgorithm |  |
| Travelling Salesman Problem |  |
| Find bridge in a graph |  |
| Count Strongly connected Components(Kosaraju Algo) |  |
| Detect Negative cycle in a graph |  |
| Longest path in a Directed Acyclic Graph |  |
| Find if there is a path of more thank length from a source |  |
| Minimum edges to reverse o make path from source to destination |  |
| Paths to travel each nodes using each edge(Seven Bridges) |  |
| Vertex Cover Problem |  |
| Chinese Postman or Route Inspection |  |
| Number of Triangles in a Directed and Undirected Graph |  |
| Minimise the cashflow  |  |
| Two Clique Problem |  |
| Tries (6) vvimp Don't skip |  |
| Construct a trie from scratch |  |
| Find shortest unique prefix for every word in a given list |  |
| Word Break Problem | (Trie solution) |  |
| Given a sequence of words, print all anagrams together |  |
| Implement a Phone Directory |  |
| Print unique rows in a given boolean matrix |  |
| Dynamic Programming (70) | maxSum nonAdj | Grid DP | knapsack 01/0N | BinarySearch and pickSkip| Stocks DP | String DP | LIS | Partition DP | DigitDP | GameStrategy |
| Coin ChangeProblem | keep picking till coin[idx] <= total and stay at same idx else move to idx+1 |
| Knapsack Problem | if(wt[idx] <= W) then pick and add value{idx} else just idx+1 |
| Max number of events that can be attended | sort according to start time, then pick dontPick and update lastEnd accordingly key = to_string(idx) + "|" + to_string(lastEnd) + "|" + to_string(k); |
| Max sum divisible by 3 | dp of rem and idx || if (idx>=n) if (curr_sum_rem == 0)  return 0;   // dont add anything else  return INT_MIN; so this is not considered |
| Binomial CoefficientProblem | catalan and formula nCr = n-1Cr-1 + n-1Cr ;   |
| Permutation CoefficientProblem | just mult while n-- |
| Program for nth Catalan Number | Catalan(n) = Summation of (Catalan(i) * Catalan(n-i-1)) for i = 0 to n-1. |
| Edit Distance | call  max{(i-1, j), (i, j-1), (i-1, j-1) |
| Subset Sum Problem | pick and skip game get half sum but not extedable to to k subsets that is different |
| Perfect Square (VV IMP) |  |
| Maximum Alternate Subsequence (Great) |  |
| Friends Pairing Problem | single => call(n-1) double then (n-1) * call(n-1) add both  |
| No of Playlist | call to unique and repeated if pickUnique then (N-count_unique) * solve(uniq++) if repeated but (countUnique>k) (count_unique - k) * solve(uniq) |
| Count all valid pickup and delivery options |  |
| Gold Mine Problem | wahi normal boundry check and next col, row, diagonal calls |
| Assembly Line SchedulingProblem | track firstLine or second line get and add diagonal cost accordingly ____/-----___/--- |
| Painting the Fenceproblem | for n=2 prevTwoSame = k, prevTwoDiff = k*(k-1) now run from 3 total = prevTwoSame + prevTwoDiff and then prevTwoSame = prevTwoDiff, prevTwoDiff = total; |
| Maximize The Cut Segments | call (n-x, n-y, n-z) and in base if(n<0) return INT_MIN; n==0 return 0; |
| delete-and-earn | make freq array and apply maxSum non adjacent |
| Longest Common Subsequence | if s[idx] = t[idx] call (i+1, j+1) else try both (i+1, j) and (i, j+1) and return max of both |
| Longest Repeated Subsequence | LCS with itself but (i != j) |
| Count of seqeunce occuring |  |
| Longest Increasing Subsequence | run nested loops if(arr[j] < arr[i]) then dp[i] = max(dp[i], 1+dp[j]) || BinarySearch get lowerBound if elm is max(it==end()) then push else replace nums[it] = arr[i] |
| Space Optimized Solution of LCS | where n-1 and n just replace with prev and curr 1d Array |
| LCS (Longest Common Subsequence) of three strings | if(s[i]==t[j] and t[j]==u[k]) then call (i+1, j+1, k+1)  else call solve(i+1,j,k), (i,j+1,k), (i,j,k+1) and return max of it |
| Maximum Sum Increasing Subsequence | Initialize dp with nums and apply same concept but add nums[i] instead 1 in dp[j] ie f(arr[j] < arr[i]) then dp[i] = max(dp[i], nums[j]+dp[j]) |
| Count all subsequences having product less than K | pick notPick and pick if product < K else idx+1 and base case  if(idx == N) return 1;  if(currProd > k) return 0;  |
| Longest subsequence such that difference between adjacent is one | in LIS condition (abs(a[i] - a[j])==1) || map approach get mp[num-1] and len = mp[num] = mp[num-1]+1 and same for num+1 and have max of both and then store mp[num] = len; |
| Maximum subsequence sum such that no three are consecutive | have count and if count < 2 canPick and do count+1 else skip and call solve(count=0, idx+1) |
| Egg Dropping Problem | loop i to k we have two option either egg is broke or not so loop f=1 to k and in loop 1 + max(solve(egg-1), k-1), solve(egg, k-f)) and keep updating min in loop |
| Maximum Length Chain of Pairs | sort according to first then lis (p[j].second < p[i].first && p[j].second < p[i].second) |
| Maximum size square sub-matrix with all 1s (vvv Imp) | intialize lastRow and col with the value that mareix has now get min of down, right, diag and add 1 to it store in dp[i][j] |
| Maximum sum of pairs with specific difference | sort and apply pick (idx+2)  nonPick (idx+1) || sort and if adj have diff then add sum of both and do j++ |
| Max Path Sum Problem |
| Cherry Pickup | 0 to N and then N to 0 is equal to going twice from 0,0 to N, N also r1+c1 == r2+c2 so one state can be removed just calc it every time r1=r2+c2-c1 and rest is same we do in all grid pb |
| Painting The Walls Hard | Remaining wall ka count rakhna hai warna different thoughts aenge || pick ith and now do (i+1, wallCount-1-time[i]) else skip i+1 and min also if(w <= 0) return 0; if(i >= n) return 1e9+7; ll solve |
| Minimum number of jumps to reach end |
| Minimum cost to fill given weight in a bag |  if (wt == 0) return 0;  if (idx == n) return 1e5 + 5; if (idx + 1 <= wt && cost[idx] != -1) call solve(idx+1, wt-(idx+1)) |
| Minimum removals from array to make max –min <= K | sort and  if (i >= j) return 0; if ((a[j] - a[i]) <= k) return 0;  else if ((a[j] - a[i]) > k) then dp[i][j] = 1 + min(solve(a, i + 1, j, k), solve(a, i, j - 1, k)); |
| Longest Common Substring | prsq, pprs only i+1, j+1 in equal case is not enough if unequal try both i+1, j+1 and return max of both |
| Count number of ways to reacha given score in a game | we want combination [3, 5, 10] and apply pick till score < arr[idx] and skip return pick+skip |
| Count Balanced Binary Trees of Height h |
| LargestSum Contiguous Subarray [VV IMP ] | Kadanes algo add track max if sum -ve just rest to zero |
| Smallest sum contiguous subarray |
| Maximum difference of zeros and ones in binary string | max len zero substr |
| Number of Dice Rolls With Target Sum | take  1, 2, 3, 4,5 or 6 just like target sum but in a loop we have 6 options |
| Unbounded Knapsack (Repetition of items allowed) | if(arr[idx] < wt) pick and stay at same index else move idx+1 skip call and retunr maxMin count etc accordingly |
| Word Break Problem | for (let len = 1; len <= n; len++) {  const partition = A.substr(idx, len);    if (dict.has(partition)) {  if (solve(idx + len)) return memo[idx] = 1; } } |
| Extra character in string | // not picking ith char  temp = "";  ans = 1 + solve(idx + 1);  // multiple picks for(int i = idx; i < n; i++) {  temp += s[i]; if(st.find(temp) != st.end()) { ans = min(ans, solve(i+ 1)); } } |
| Largest Independent Set Problem |  // Calculate size excluding the current node  // Calculate size including the current node // Return the maximum of two sizes |
| Partition problem |
| Longest Palindromic Subsequence | lcs with reverse of s and s |
| Count All Palindromic Subsequence in a given String | if i and j (n-1) equal call return 1+ f(i+1, j-1) else return f(i+1, j) + f(i, j-1) - f(i+1, j-1) (last call is important that -1) |
| Longest Palindromic Substring | Expand around indexes with even odd consideration track both max and start |
| Longest alternating subsequence | if (nums[i] > nums[i - 1]) { inc[i] = dec[i-1]+1; dec[i]=dec[i-1]; } else if (nums[i] < nums[i - 1]) { dec[i] = inc[i-1]+1; inc[i] = inc[i-1]; } else { same then copy prevMax inc[i] = inc[i-1]; dec[i] = dec[i-1] ; |
| Weighted Job Scheduling (vvimp) | sort by start time ans apply Binary search pick skip if picked idx then next is elm greater equal end time upperBound of idx's end time in startTime |
| Job Sequencing Greedy |
| Coin game winner with three choices | if (i-1) || (i-a) || (i-b) false hai to dp[i] true hoga else false base dp[0]=false dp[1]=true 2 false , at last return dp[n] |
| Derangements  (VVV.imp) | Either we ith  swap jth with jtn then f(n-2) subproblem becz we fixed OR (+) we dont then we left with f(n-1) subproblem AND there are n-1 ways to assign idx so mult with n-1 like for [01234]  0 has 4 opt |
| Max profit by buying and selling a share at most twice [ IMP ] | states idx, buy, k if buy==True then either buy -val[idx] or dontBuy and return max and if buy==false then either sell or dont sell +val[idx] |
| Minimum Difficulty of a Job |  |
| Optimal Strategy for a Game | Do the best when you do things and assume the wrost when things happen to you || so if you take ith you left with min of (i+2, j-1) and if jth then left with i+1, j-2 now you take max of these |
| Predict The winner |  |
| Optimal Binary Search Tree |  |
| Word Wrap Problem |  if(arr[idx] > s) then newLine call (s+1)*(s+1) + solve(ind+1, k-nums[ind]-1, k); else try both CURRLINE and NEXT we do fn(ind+1, nums, remSpaces-nums[ind]-1, k) in curr same and min(curr, next) |
| Mobile Numeric Keypad Problem [ IMP ] |
| Matrix Chain Multiplication  | add cost of ij and add solve(i, k) + solve(k+1, n) |
| Boolean Parenthesization Problem |
| Min cost to cut the stick | add 0 in the beginning and n at end and sort array else subproblems will not be created AAND and add currCost (a[j+1] - a[i-1]) and add left (0, k) and right (k+1, n) cost |
| count-of-integers (Digit DP) |
| Paindrome Partitioning 2 | try cutting at every pal idx and exlpore from that and track which gives minCost  mC = n; for(int i = idx; i < n; i++) { if(isPal(idx, i, s)) { mC = min(minCuts, 1 + solve(i+1, s, n, dp)); } } |
| Largest rectangular sub-matrix whose sum is 0 |
| Largest area rectangular sub-matrix with equal number of 1’s and 0’s [ IMP ] |
| Maximum sum rectangle in a 2D matrix | try every row 0 to n, 1 to n ... and apply kadanes vertically |
| Maximum profit by buying and selling a share at most k times | State machine DP || can use odd even in k value (just do 2*k) even indicates buy and odd indicates sell to reduce dp state |
| Find if a string is interleaved of two other strings | s1=ab12, s2=abb34 and c=abbab1234 greedy fails || greedy works if chars in both str are different |
| Maximum Length of Pair Chain | LIS according to lastFirst || sort by endTime and keep track of last if pairs[i][1] greater cnt++ and update last |
| Count All Possible Routes (vvv imp pattern) | 0 idx template and rest do what asking for |
| Regular Expression Matching |
| longest arithmetic sequence (v.imp pattern hard) |
| longest arithmetic sequence with given diference |
|       Bit Manipulation (15)   That Notes are enough |
| Count set bits in an integer |
| Find the two non-repeating elements in an array of repeating elements |
| Count number of bits to be flipped to convert A to B |
| minimum-flips-to-make-a-or-b-equal-to-c |
| Count total set bits in all numbers from 1 to n |
| Program to find whether a no is power of two |
| Find the difference |
| Find position of the only set bit |
| Copy set bits in a range |
| Divide two integers without using multiplication, division and mod operator |
| Calculate square of a number without using *, / and pow() |
| Power Set |
| Concatenation of Consecutive Binary Numbers (vimp) |
| Min Operation to form subsequence |
| Single Number 2 |
| special-permutations |
| https://leetcode.com/problems/smallest-sufficient-team/ |
|            Segment Trees, HashingPep, Maths, Constructive  |
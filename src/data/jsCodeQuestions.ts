export interface CodeQuestion {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  problem: string;
  solution: string;
  consoleOutput: string;
  explanation: string;
}

export interface CodeQuestionSection {
  title: string;
  category: string;
  data: CodeQuestion[];
}

export const jsCodeSections: CodeQuestionSection[] = [
  {
    title: 'Strings',
    category: 'Strings',
    data: [
      {
        id: 'jsc_reverse_string',
        title: 'Reverse a String',
        difficulty: 'Easy',
        category: 'Strings',
        problem:
          'Write a function that reverses a given string without using the built-in reverse() method.',
        solution: `function reverseString(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// Using split, reverse, join
function reverseString2(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString('hello'));
console.log(reverseString('JavaScript'));
console.log(reverseString2('world'));`,
        consoleOutput: `// Output:
// "olleh"
// "tpircSavaJ"
// "dlrow"`,
        explanation:
          'We iterate through the string from the last character to the first, appending each character to build the reversed string. The second approach splits the string into an array, reverses it, and joins it back.',
      },
      {
        id: 'jsc_palindrome_string',
        title: 'Check Palindrome String',
        difficulty: 'Easy',
        category: 'Strings',
        problem:
          'Write a function to check if a given string is a palindrome (reads the same forwards and backwards).',
        solution: `function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

console.log(isPalindrome('racecar'));
console.log(isPalindrome('hello'));
console.log(isPalindrome('A man a plan a canal Panama'));
console.log(isPalindrome('madam'));`,
        consoleOutput: `// Output:
// true
// false
// true
// true`,
        explanation:
          'We clean the string by removing non-alphanumeric characters and converting to lowercase. Then we use two pointers from both ends, comparing characters as they move toward the center.',
      },
      {
        id: 'jsc_count_vowels',
        title: 'Count Vowels in a String',
        difficulty: 'Easy',
        category: 'Strings',
        problem: 'Write a function that counts the number of vowels in a given string.',
        solution: `function countVowels(str) {
  const vowels = 'aeiouAEIOU';
  let count = 0;
  for (const char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

// Using regex
function countVowels2(str) {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}

console.log(countVowels('Hello World'));
console.log(countVowels('JavaScript'));
console.log(countVowels2('Programming'));`,
        consoleOutput: `// Output:
// 3
// 2
// 3`,
        explanation:
          'We iterate through each character and check if it exists in our vowels string. The regex approach uses a global case-insensitive match to find all vowel characters at once.',
      },
      {
        id: 'jsc_anagram',
        title: 'Check if Two Strings are Anagrams',
        difficulty: 'Easy',
        category: 'Strings',
        problem:
          'Write a function to check if two strings are anagrams of each other (contain the same characters in different order).',
        solution: `function isAnagram(str1, str2) {
  const normalize = (s) =>
    s.toLowerCase().replace(/\\s/g, '').split('').sort().join('');
  return normalize(str1) === normalize(str2);
}

// Using character frequency map
function isAnagram2(str1, str2) {
  const s1 = str1.toLowerCase().replace(/\\s/g, '');
  const s2 = str2.toLowerCase().replace(/\\s/g, '');
  if (s1.length !== s2.length) return false;

  const freq = {};
  for (const char of s1) freq[char] = (freq[char] || 0) + 1;
  for (const char of s2) {
    if (!freq[char]) return false;
    freq[char]--;
  }
  return true;
}

console.log(isAnagram('listen', 'silent'));
console.log(isAnagram('hello', 'world'));
console.log(isAnagram2('Astronomer', 'Moon starer'));`,
        consoleOutput: `// Output:
// true
// false
// true`,
        explanation:
          'The first approach sorts both strings and compares them. The frequency map approach counts characters in the first string and decrements for the second — if all counts reach zero, they are anagrams.',
      },
      {
        id: 'jsc_capitalize_words',
        title: 'Capitalize First Letter of Each Word',
        difficulty: 'Easy',
        category: 'Strings',
        problem:
          'Write a function that capitalizes the first letter of each word in a sentence.',
        solution: `function capitalizeWords(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

console.log(capitalizeWords('hello world'));
console.log(capitalizeWords('javascript is awesome'));
console.log(capitalizeWords('the quick brown fox'));`,
        consoleOutput: `// Output:
// "Hello World"
// "Javascript Is Awesome"
// "The Quick Brown Fox"`,
        explanation:
          'We split the string by spaces, then for each word capitalize the first character and concatenate the rest in lowercase. Finally, we join them back with spaces.',
      },
      {
        id: 'jsc_longest_word',
        title: 'Find the Longest Word',
        difficulty: 'Easy',
        category: 'Strings',
        problem: 'Write a function to find the longest word in a sentence.',
        solution: `function longestWord(str) {
  const words = str.replace(/[^a-zA-Z\\s]/g, '').split(' ');
  let longest = '';

  for (const word of words) {
    if (word.length > longest.length) {
      longest = word;
    }
  }
  return longest;
}

// Using reduce
function longestWord2(str) {
  return str.split(' ').reduce((longest, current) =>
    current.length > longest.length ? current : longest, ''
  );
}

console.log(longestWord('The quick brown fox jumped'));
console.log(longestWord2('JavaScript is a programming language'));`,
        consoleOutput: `// Output:
// "jumped"
// "programming"`,
        explanation:
          'We split the sentence into words, then iterate to find the word with the maximum length. The reduce approach does the same in a more functional style.',
      },
    ],
  },
  {
    title: 'Numbers',
    category: 'Numbers',
    data: [
      {
        id: 'jsc_reverse_number',
        title: 'Reverse a Number',
        difficulty: 'Easy',
        category: 'Numbers',
        problem:
          'Write a function that reverses a given integer. Handle negative numbers as well.',
        solution: `function reverseNumber(num) {
  const sign = Math.sign(num);
  const reversed = parseInt(
    Math.abs(num).toString().split('').reverse().join('')
  );
  return sign * reversed;
}

// Without string conversion
function reverseNumber2(num) {
  let reversed = 0;
  let n = Math.abs(num);
  while (n > 0) {
    reversed = reversed * 10 + (n % 10);
    n = Math.floor(n / 10);
  }
  return Math.sign(num) * reversed;
}

console.log(reverseNumber(12345));
console.log(reverseNumber(-678));
console.log(reverseNumber2(9087));
console.log(reverseNumber2(1000));`,
        consoleOutput: `// Output:
// 54321
// -876
// 7809
// 1`,
        explanation:
          'The first approach converts the number to a string, reverses it, and parses back. The second uses modulo and division to extract digits from the end and build the reversed number mathematically.',
      },
      {
        id: 'jsc_palindrome_number',
        title: 'Palindrome Number',
        difficulty: 'Easy',
        category: 'Numbers',
        problem: 'Check if a number is a palindrome without converting it to a string.',
        solution: `function isPalindromeNumber(num) {
  if (num < 0) return false;
  let original = num;
  let reversed = 0;

  while (num > 0) {
    reversed = reversed * 10 + (num % 10);
    num = Math.floor(num / 10);
  }
  return original === reversed;
}

console.log(isPalindromeNumber(121));
console.log(isPalindromeNumber(123));
console.log(isPalindromeNumber(12321));
console.log(isPalindromeNumber(-121));`,
        consoleOutput: `// Output:
// true
// false
// true
// false`,
        explanation:
          'We reverse the number using modulo to extract the last digit and division to remove it. Then compare the reversed number with the original. Negative numbers are never palindromes.',
      },
      {
        id: 'jsc_fibonacci',
        title: 'Fibonacci Sequence',
        difficulty: 'Easy',
        category: 'Numbers',
        problem: 'Write a function that returns the first n numbers of the Fibonacci sequence.',
        solution: `function fibonacci(n) {
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib.slice(0, n);
}

// Nth Fibonacci using recursion with memoization
function nthFib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = nthFib(n - 1, memo) + nthFib(n - 2, memo);
  return memo[n];
}

console.log(fibonacci(8));
console.log(nthFib(10));
console.log(nthFib(20));`,
        consoleOutput: `// Output:
// [0, 1, 1, 2, 3, 5, 8, 13]
// 55
// 6765`,
        explanation:
          'The iterative approach builds the sequence by summing the two previous numbers. The recursive approach with memoization caches results to avoid redundant calculations, making it O(n) instead of O(2^n).',
      },
      {
        id: 'jsc_factorial',
        title: 'Factorial of a Number',
        difficulty: 'Easy',
        category: 'Numbers',
        problem: 'Write a function to find the factorial of a given number using both iterative and recursive approaches.',
        solution: `// Iterative
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Recursive
function factorialRecursive(n) {
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}

console.log(factorial(5));
console.log(factorial(10));
console.log(factorialRecursive(7));
console.log(factorialRecursive(0));`,
        consoleOutput: `// Output:
// 120
// 3628800
// 5040
// 1`,
        explanation:
          'Factorial of n (n!) is the product of all positive integers up to n. The iterative method uses a loop while the recursive method calls itself with n-1 until reaching the base case of 0 or 1.',
      },
      {
        id: 'jsc_prime_number',
        title: 'Check Prime Number',
        difficulty: 'Easy',
        category: 'Numbers',
        problem: 'Write a function that checks whether a given number is prime.',
        solution: `function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

// Find all primes up to n (Sieve)
function primesUpTo(n) {
  const primes = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) primes.push(i);
  }
  return primes;
}

console.log(isPrime(7));
console.log(isPrime(12));
console.log(isPrime(29));
console.log(primesUpTo(20));`,
        consoleOutput: `// Output:
// true
// false
// true
// [2, 3, 5, 7, 11, 13, 17, 19]`,
        explanation:
          'A prime number is only divisible by 1 and itself. We only need to check divisors up to the square root of the number. We skip even numbers after checking for 2 to optimize.',
      },
      {
        id: 'jsc_armstrong',
        title: 'Armstrong Number',
        difficulty: 'Medium',
        category: 'Numbers',
        problem:
          'Check if a number is an Armstrong number (sum of each digit raised to the power of the number of digits equals the number itself).',
        solution: `function isArmstrong(num) {
  const digits = num.toString().split('');
  const power = digits.length;
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(parseInt(digit), power),
    0
  );
  return sum === num;
}

console.log(isArmstrong(153));   // 1^3 + 5^3 + 3^3
console.log(isArmstrong(370));   // 3^3 + 7^3 + 0^3
console.log(isArmstrong(9474));  // 9^4 + 4^4 + 7^4 + 4^4
console.log(isArmstrong(123));`,
        consoleOutput: `// Output:
// true   (1 + 125 + 27 = 153)
// true   (27 + 343 + 0 = 370)
// true   (6561 + 256 + 2401 + 256 = 9474)
// false`,
        explanation:
          'An Armstrong number (narcissistic number) equals the sum of its digits each raised to the power of the total number of digits. For example, 153 = 1^3 + 5^3 + 3^3.',
      },
      {
        id: 'jsc_gcd_lcm',
        title: 'GCD and LCM',
        difficulty: 'Medium',
        category: 'Numbers',
        problem:
          'Write functions to find the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two numbers.',
        solution: `// GCD using Euclidean algorithm
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

// LCM using GCD
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

console.log(gcd(12, 8));
console.log(gcd(54, 24));
console.log(lcm(4, 6));
console.log(lcm(12, 18));`,
        consoleOutput: `// Output:
// 4
// 6
// 12
// 36`,
        explanation:
          'GCD uses the Euclidean algorithm: repeatedly replace the larger number with the remainder of dividing the two. LCM is calculated as (a * b) / GCD(a, b).',
      },
    ],
  },
  {
    title: 'Arrays',
    category: 'Arrays',
    data: [
      {
        id: 'jsc_remove_duplicates',
        title: 'Remove Duplicates from Array',
        difficulty: 'Easy',
        category: 'Arrays',
        problem: 'Write a function to remove duplicate values from an array.',
        solution: `// Using Set
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

// Without Set
function removeDuplicates2(arr) {
  const result = [];
  for (const item of arr) {
    if (!result.includes(item)) {
      result.push(item);
    }
  }
  return result;
}

// Using filter
function removeDuplicates3(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));
console.log(removeDuplicates2(['a', 'b', 'a', 'c', 'b']));
console.log(removeDuplicates3([10, 20, 10, 30, 20]));`,
        consoleOutput: `// Output:
// [1, 2, 3, 4, 5]
// ["a", "b", "c"]
// [10, 20, 30]`,
        explanation:
          'Set automatically removes duplicates. The manual approach checks if each item already exists in the result. The filter approach keeps only the first occurrence of each element.',
      },
      {
        id: 'jsc_flatten_array',
        title: 'Flatten a Nested Array',
        difficulty: 'Medium',
        category: 'Arrays',
        problem: 'Write a function to flatten a deeply nested array into a single-level array.',
        solution: `// Recursive approach
function flattenArray(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

// Using reduce
function flattenReduce(arr) {
  return arr.reduce(
    (flat, item) =>
      flat.concat(Array.isArray(item) ? flattenReduce(item) : item),
    []
  );
}

console.log(flattenArray([1, [2, [3, [4]], 5]]));
console.log(flattenArray([[1, 2], [3, [4, 5]], 6]));
console.log(flattenReduce([1, [2, 3], [4, [5, [6]]]]));`,
        consoleOutput: `// Output:
// [1, 2, 3, 4, 5]
// [1, 2, 3, 4, 5, 6]
// [1, 2, 3, 4, 5, 6]`,
        explanation:
          'Both approaches check if an element is an array. If it is, we recursively flatten it. If not, we add it to the result. The built-in arr.flat(Infinity) also works but interviewers often ask for a manual implementation.',
      },
      {
        id: 'jsc_array_rotation',
        title: 'Rotate an Array',
        difficulty: 'Medium',
        category: 'Arrays',
        problem: 'Write a function to rotate an array by k positions to the right.',
        solution: `function rotateArray(arr, k) {
  const n = arr.length;
  k = k % n; // Handle k > array length
  return [...arr.slice(n - k), ...arr.slice(0, n - k)];
}

// In-place rotation using reverse
function rotateInPlace(arr, k) {
  k = k % arr.length;
  reverse(arr, 0, arr.length - 1);
  reverse(arr, 0, k - 1);
  reverse(arr, k, arr.length - 1);
  return arr;
}

function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

console.log(rotateArray([1, 2, 3, 4, 5], 2));
console.log(rotateArray([10, 20, 30, 40], 1));
console.log(rotateInPlace([1, 2, 3, 4, 5, 6, 7], 3));`,
        consoleOutput: `// Output:
// [4, 5, 1, 2, 3]
// [40, 10, 20, 30]
// [5, 6, 7, 1, 2, 3, 4]`,
        explanation:
          'The slice approach takes the last k elements and puts them at the front. The in-place approach reverses the entire array, then reverses the first k and last n-k elements separately.',
      },
      {
        id: 'jsc_second_largest',
        title: 'Find Second Largest Element',
        difficulty: 'Easy',
        category: 'Arrays',
        problem: 'Find the second largest element in an array without sorting.',
        solution: `function secondLargest(arr) {
  let first = -Infinity;
  let second = -Infinity;

  for (const num of arr) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num !== first) {
      second = num;
    }
  }
  return second === -Infinity ? null : second;
}

console.log(secondLargest([12, 35, 1, 10, 34, 1]));
console.log(secondLargest([10, 5, 10]));
console.log(secondLargest([45, 51, 28, 75, 49]));`,
        consoleOutput: `// Output:
// 34
// 5
// 51`,
        explanation:
          'We track the first and second largest values in a single pass. When we find a new maximum, the old maximum becomes the second largest. This runs in O(n) time vs O(n log n) for sorting.',
      },
      {
        id: 'jsc_chunk_array',
        title: 'Chunk an Array',
        difficulty: 'Easy',
        category: 'Arrays',
        problem: 'Write a function that splits an array into chunks of a specified size.',
        solution: `function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// Using reduce
function chunkReduce(arr, size) {
  return arr.reduce((chunks, item, index) => {
    const chunkIndex = Math.floor(index / size);
    if (!chunks[chunkIndex]) chunks[chunkIndex] = [];
    chunks[chunkIndex].push(item);
    return chunks;
  }, []);
}

console.log(chunkArray([1, 2, 3, 4, 5, 6, 7], 3));
console.log(chunkArray([1, 2, 3, 4, 5], 2));
console.log(chunkReduce(['a', 'b', 'c', 'd', 'e'], 2));`,
        consoleOutput: `// Output:
// [[1, 2, 3], [4, 5, 6], [7]]
// [[1, 2], [3, 4], [5]]
// [["a", "b"], ["c", "d"], ["e"]]`,
        explanation:
          'We iterate through the array stepping by the chunk size, using slice to extract each chunk. The reduce approach calculates which chunk each element belongs to based on its index.',
      },
      {
        id: 'jsc_intersection',
        title: 'Array Intersection',
        difficulty: 'Easy',
        category: 'Arrays',
        problem: 'Find the common elements between two arrays.',
        solution: `function intersection(arr1, arr2) {
  const set = new Set(arr1);
  return arr2.filter(item => set.has(item));
}

// Without Set
function intersection2(arr1, arr2) {
  return arr1.filter(item => arr2.includes(item));
}

console.log(intersection([1, 2, 3, 4], [3, 4, 5, 6]));
console.log(intersection(['a', 'b', 'c'], ['b', 'c', 'd']));
console.log(intersection2([10, 20, 30], [15, 20, 25, 30]));`,
        consoleOutput: `// Output:
// [3, 4]
// ["b", "c"]
// [20, 30]`,
        explanation:
          'Using a Set for the first array gives O(1) lookup time. Then we filter the second array, keeping only elements that exist in the Set. This gives O(n + m) time complexity.',
      },
    ],
  },
  {
    title: 'Objects & Maps',
    category: 'Objects',
    data: [
      {
        id: 'jsc_deep_clone',
        title: 'Deep Clone an Object',
        difficulty: 'Medium',
        category: 'Objects',
        problem:
          'Write a function to create a deep copy of an object (not just a shallow copy).',
        solution: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(item => deepClone(item));

  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

const original = {
  name: 'John',
  address: { city: 'NYC', zip: '10001' },
  hobbies: ['reading', 'coding'],
};

const cloned = deepClone(original);
cloned.address.city = 'LA';
cloned.hobbies.push('gaming');

console.log(original.address.city);
console.log(cloned.address.city);
console.log(original.hobbies);
console.log(cloned.hobbies);`,
        consoleOutput: `// Output:
// "NYC"         (original unchanged)
// "LA"          (only clone changed)
// ["reading", "coding"]
// ["reading", "coding", "gaming"]`,
        explanation:
          'Deep cloning recursively copies all nested objects and arrays, creating completely independent copies. A shallow copy (Object.assign or spread) would still share references to nested objects.',
      },
      {
        id: 'jsc_frequency_counter',
        title: 'Character / Word Frequency Counter',
        difficulty: 'Easy',
        category: 'Objects',
        problem: 'Write a function to count the frequency of each character in a string.',
        solution: `function charFrequency(str) {
  const freq = {};
  for (const char of str.toLowerCase()) {
    if (char !== ' ') {
      freq[char] = (freq[char] || 0) + 1;
    }
  }
  return freq;
}

// Find the most frequent character
function mostFrequent(str) {
  const freq = charFrequency(str);
  let maxChar = '';
  let maxCount = 0;
  for (const [char, count] of Object.entries(freq)) {
    if (count > maxCount) {
      maxCount = count;
      maxChar = char;
    }
  }
  return { char: maxChar, count: maxCount };
}

console.log(charFrequency('hello'));
console.log(mostFrequent('javascript'));
console.log(mostFrequent('aabbbcccc'));`,
        consoleOutput: `// Output:
// { h: 1, e: 1, l: 2, o: 1 }
// { char: "a", count: 2 }
// { char: "c", count: 4 }`,
        explanation:
          'We use an object as a hash map to count occurrences of each character. To find the most frequent, we iterate through the frequency map and track the maximum.',
      },
      {
        id: 'jsc_group_by',
        title: 'Group Array of Objects by Property',
        difficulty: 'Medium',
        category: 'Objects',
        problem: 'Write a function that groups an array of objects by a specified property.',
        solution: `function groupBy(arr, key) {
  return arr.reduce((groups, item) => {
    const value = item[key];
    if (!groups[value]) groups[value] = [];
    groups[value].push(item);
    return groups;
  }, {});
}

const people = [
  { name: 'Alice', age: 25, city: 'NYC' },
  { name: 'Bob', age: 30, city: 'LA' },
  { name: 'Charlie', age: 25, city: 'NYC' },
  { name: 'Diana', age: 30, city: 'Chicago' },
];

console.log(groupBy(people, 'age'));
console.log(groupBy(people, 'city'));`,
        consoleOutput: `// Output:
// {
//   25: [{ name: "Alice", ... }, { name: "Charlie", ... }],
//   30: [{ name: "Bob", ... }, { name: "Diana", ... }]
// }
// {
//   NYC: [{ name: "Alice", ... }, { name: "Charlie", ... }],
//   LA: [{ name: "Bob", ... }],
//   Chicago: [{ name: "Diana", ... }]
// }`,
        explanation:
          'We use reduce to build a grouped object. For each item, we use the specified property value as the key and push the item into the corresponding array.',
      },
    ],
  },
  {
    title: 'Sorting & Searching',
    category: 'Sorting',
    data: [
      {
        id: 'jsc_bubble_sort',
        title: 'Bubble Sort',
        difficulty: 'Easy',
        category: 'Sorting',
        problem: 'Implement the bubble sort algorithm to sort an array in ascending order.',
        solution: `function bubbleSort(arr) {
  const n = arr.length;
  const sorted = [...arr];

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (sorted[j] > sorted[j + 1]) {
        [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // Array is already sorted
  }
  return sorted;
}

console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));
console.log(bubbleSort([5, 1, 4, 2, 8]));
console.log(bubbleSort([1, 2, 3, 4, 5]));`,
        consoleOutput: `// Output:
// [11, 12, 22, 25, 34, 64, 90]
// [1, 2, 4, 5, 8]
// [1, 2, 3, 4, 5]`,
        explanation:
          'Bubble sort repeatedly steps through the list, comparing adjacent elements and swapping them if they are in the wrong order. The optimization with the swapped flag exits early if no swaps occur (already sorted). Time complexity: O(n^2).',
      },
      {
        id: 'jsc_binary_search',
        title: 'Binary Search',
        difficulty: 'Medium',
        category: 'Sorting',
        problem: 'Implement binary search to find an element in a sorted array.',
        solution: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1; // Not found
}

// Recursive version
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target)
    return binarySearchRecursive(arr, target, mid + 1, right);
  return binarySearchRecursive(arr, target, left, mid - 1);
}

const sorted = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.log(binarySearch(sorted, 23));
console.log(binarySearch(sorted, 100));
console.log(binarySearchRecursive(sorted, 56));`,
        consoleOutput: `// Output:
// 5    (index of 23)
// -1   (not found)
// 7    (index of 56)`,
        explanation:
          'Binary search works on sorted arrays by repeatedly dividing the search interval in half. If the target is less than the middle element, search the left half; otherwise search the right half. Time complexity: O(log n).',
      },
      {
        id: 'jsc_two_sum',
        title: 'Two Sum Problem',
        difficulty: 'Medium',
        category: 'Sorting',
        problem:
          'Given an array of numbers and a target sum, find two numbers that add up to the target. Return their indices.',
        solution: `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return null;
}

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 2, 4], 6));
console.log(twoSum([1, 5, 3, 7, 2], 9));`,
        consoleOutput: `// Output:
// [0, 1]   (nums[0]=2 + nums[1]=7 = 9)
// [1, 2]   (nums[1]=2 + nums[2]=4 = 6)
// [1, 3]   (nums[1]=5 + nums[3]=7 = 12)`,
        explanation:
          'We use a hash map to store each number and its index. For each number, we check if the complement (target - current number) exists in the map. This gives O(n) time complexity instead of O(n^2) with brute force.',
      },
    ],
  },
  {
    title: 'Logic & Patterns',
    category: 'Logic',
    data: [
      {
        id: 'jsc_fizzbuzz',
        title: 'FizzBuzz',
        difficulty: 'Easy',
        category: 'Logic',
        problem:
          'Print numbers from 1 to n. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", for multiples of both print "FizzBuzz".',
        solution: `function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push('FizzBuzz');
    else if (i % 3 === 0) result.push('Fizz');
    else if (i % 5 === 0) result.push('Buzz');
    else result.push(i.toString());
  }
  return result;
}

console.log(fizzBuzz(15));`,
        consoleOutput: `// Output:
// ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8",
//  "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]`,
        explanation:
          'Classic interview question. Check divisibility by 15 first (both 3 and 5), then 3, then 5. Order matters because checking 3 or 5 before 15 would catch multiples of 15 prematurely.',
      },
      {
        id: 'jsc_debounce',
        title: 'Implement Debounce',
        difficulty: 'Medium',
        category: 'Logic',
        problem:
          'Implement a debounce function that delays invoking a function until after a specified wait time has passed since the last call.',
        solution: `function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage example
const search = debounce((query) => {
  console.log('Searching for:', query);
}, 500);

// Simulating rapid typing
search('h');
search('he');
search('hel');
search('hell');
search('hello');
// Only the last call executes after 500ms`,
        consoleOutput: `// Output (after 500ms):
// "Searching for: hello"
// (previous calls are cancelled)`,
        explanation:
          'Debounce creates a wrapper that resets a timer on every call. Only after the specified delay with no new calls does the function actually execute. This is essential for search inputs, window resize handlers, etc.',
      },
      {
        id: 'jsc_throttle',
        title: 'Implement Throttle',
        difficulty: 'Medium',
        category: 'Logic',
        problem:
          'Implement a throttle function that ensures a function is called at most once in a specified time period.',
        solution: `function throttle(func, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Usage example
const log = throttle((msg) => {
  console.log('Logged:', msg);
}, 1000);

log('first');    // Executes immediately
log('second');   // Ignored (within 1000ms)
log('third');    // Ignored (within 1000ms)
// After 1000ms, next call will execute`,
        consoleOutput: `// Output:
// "Logged: first"
// (second and third are ignored within the 1s window)`,
        explanation:
          'Throttle limits how often a function can fire. Unlike debounce which waits for inactivity, throttle guarantees the function runs at a regular interval. Useful for scroll handlers and rate limiting.',
      },
      {
        id: 'jsc_curry',
        title: 'Function Currying',
        difficulty: 'Hard',
        category: 'Logic',
        problem:
          'Implement a curry function that transforms a function with multiple arguments into a sequence of functions each taking a single argument.',
        solution: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...nextArgs) {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}

// Example usage
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3));
console.log(curriedAdd(1, 2)(3));
console.log(curriedAdd(1)(2, 3));
console.log(curriedAdd(1, 2, 3));`,
        consoleOutput: `// Output:
// 6
// 6
// 6
// 6`,
        explanation:
          'Currying transforms f(a, b, c) into f(a)(b)(c). The curry wrapper checks if enough arguments have been provided. If yes, it calls the original function. If not, it returns a new function that collects more arguments.',
      },
      {
        id: 'jsc_promise_all',
        title: 'Implement Promise.all',
        difficulty: 'Hard',
        category: 'Logic',
        problem: 'Implement your own version of Promise.all that resolves when all promises resolve or rejects if any promise rejects.',
        solution: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!promises.length) return resolve([]);

    const results = new Array(promises.length);
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

// Test it
const p1 = Promise.resolve(1);
const p2 = new Promise(res => setTimeout(() => res(2), 100));
const p3 = Promise.resolve(3);

promiseAll([p1, p2, p3]).then(console.log);

// With a rejection
const p4 = Promise.reject('Error!');
promiseAll([p1, p4, p3]).catch(console.log);`,
        consoleOutput: `// Output:
// [1, 2, 3]
// "Error!"`,
        explanation:
          'We create a new Promise that tracks how many input promises have resolved. Results are stored in their original order using the index. If any promise rejects, the entire Promise.all rejects immediately.',
      },
      {
        id: 'jsc_memoize',
        title: 'Memoization Function',
        difficulty: 'Medium',
        category: 'Logic',
        problem:
          'Write a memoize function that caches the results of expensive function calls and returns the cached result when the same inputs occur again.',
        solution: `function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log('From cache');
      return cache.get(key);
    }
    console.log('Computing...');
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Expensive function
const factorial = memoize(function (n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
});

console.log(factorial(5));
console.log(factorial(5));
console.log(factorial(3));`,
        consoleOutput: `// Output:
// Computing...
// 120
// From cache
// 120
// From cache
// 6`,
        explanation:
          'Memoization stores computed results in a cache (Map). When the function is called with the same arguments, it returns the cached result instead of recomputing. This is especially useful for recursive or computationally expensive functions.',
      },
    ],
  },
  {
    title: 'Advanced Challenges',
    category: 'Advanced',
    data: [
      {
        id: 'jsc_event_emitter',
        title: 'Implement Event Emitter',
        difficulty: 'Hard',
        category: 'Advanced',
        problem:
          'Create a simple EventEmitter class with on, emit, and off methods.',
        solution: `class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return this;
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(cb => cb(...args));
    }
    return this;
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event]
        .filter(cb => cb !== callback);
    }
    return this;
  }
}

const emitter = new EventEmitter();

const greet = (name) => console.log('Hello, ' + name);
const wave = (name) => console.log(name + ' waves back!');

emitter.on('greet', greet);
emitter.on('greet', wave);

emitter.emit('greet', 'Alice');
emitter.off('greet', wave);
emitter.emit('greet', 'Bob');`,
        consoleOutput: `// Output:
// "Hello, Alice"
// "Alice waves back!"
// "Hello, Bob"`,
        explanation:
          'EventEmitter stores callbacks in a map of event names to arrays. "on" registers a listener, "emit" calls all listeners for an event, and "off" removes a specific listener. This is the pub/sub pattern used extensively in Node.js.',
      },
      {
        id: 'jsc_flat_map_polyfill',
        title: 'Implement Array.map() and Array.filter()',
        difficulty: 'Medium',
        category: 'Advanced',
        problem: 'Implement custom versions of Array.map() and Array.filter() without using the built-in methods.',
        solution: `// Custom map
function myMap(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}

// Custom filter
function myFilter(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

// Custom reduce
function myReduce(arr, callback, initialValue) {
  let acc = initialValue !== undefined ? initialValue : arr[0];
  const startIdx = initialValue !== undefined ? 0 : 1;
  for (let i = startIdx; i < arr.length; i++) {
    acc = callback(acc, arr[i], i, arr);
  }
  return acc;
}

console.log(myMap([1, 2, 3], x => x * 2));
console.log(myFilter([1, 2, 3, 4, 5], x => x % 2 === 0));
console.log(myReduce([1, 2, 3, 4], (sum, x) => sum + x, 0));`,
        consoleOutput: `// Output:
// [2, 4, 6]
// [2, 4]
// 10`,
        explanation:
          'These polyfills show how map, filter, and reduce work internally. Map transforms each element, filter keeps elements that pass a test, and reduce accumulates a single value from all elements.',
      },
      {
        id: 'jsc_call_apply_bind',
        title: 'Implement call, apply, and bind',
        difficulty: 'Hard',
        category: 'Advanced',
        problem: 'Implement custom versions of Function.prototype.call, apply, and bind.',
        solution: `// Custom call
Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

// Custom apply
Function.prototype.myApply = function (context, args = []) {
  context = context || globalThis;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

// Custom bind
Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    return fn.myCall(context, ...args, ...newArgs);
  };
};

function greet(greeting, punctuation) {
  return greeting + ', ' + this.name + punctuation;
}

const person = { name: 'Alice' };

console.log(greet.myCall(person, 'Hello', '!'));
console.log(greet.myApply(person, ['Hi', '?']));
const boundGreet = greet.myBind(person, 'Hey');
console.log(boundGreet('!!!'));`,
        consoleOutput: `// Output:
// "Hello, Alice!"
// "Hi, Alice?"
// "Hey, Alice!!!"`,
        explanation:
          'call invokes a function with a given "this" and arguments. apply is the same but takes args as an array. bind returns a new function with "this" permanently set. We use Symbol to avoid property name collisions on the context object.',
      },
    ],
  },
  {
    title: 'Stacks & Queues',
    category: 'Data Structures',
    data: [
      {
        id: 'jsc_stack',
        title: 'Implement a Stack',
        difficulty: 'Easy',
        category: 'Data Structures',
        problem:
          'Implement a Stack data structure with push, pop, peek, and isEmpty methods.',
        solution: `class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) return 'Stack is empty';
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) return 'Stack is empty';
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.peek());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.size());`,
        consoleOutput: `// Output:
// 30
// 30
// 20
// 1`,
        explanation:
          'A Stack follows LIFO (Last In, First Out). We use an array internally — push adds to the end and pop removes from the end. Peek returns the top element without removing it.',
      },
      {
        id: 'jsc_queue',
        title: 'Implement a Queue',
        difficulty: 'Easy',
        category: 'Data Structures',
        problem:
          'Implement a Queue data structure with enqueue, dequeue, front, and isEmpty methods.',
        solution: `class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) return 'Queue is empty';
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) return 'Queue is empty';
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

const queue = new Queue();
queue.enqueue('Alice');
queue.enqueue('Bob');
queue.enqueue('Charlie');
console.log(queue.front());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.size());`,
        consoleOutput: `// Output:
// "Alice"
// "Alice"
// "Bob"
// 1`,
        explanation:
          'A Queue follows FIFO (First In, First Out). enqueue adds to the back and dequeue removes from the front using shift(). In production, use a linked list for O(1) dequeue.',
      },
      {
        id: 'jsc_valid_parentheses',
        title: 'Valid Parentheses',
        difficulty: 'Medium',
        category: 'Data Structures',
        problem:
          'Given a string containing just the characters ( ) { } [ ], determine if the input string has valid (properly matched and nested) brackets.',
        solution: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if ('({['.includes(char)) {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }

  return stack.length === 0;
}

console.log(isValid('()'));
console.log(isValid('()[]{}'));
console.log(isValid('(]'));
console.log(isValid('([{}])'));
console.log(isValid('((())'));`,
        consoleOutput: `// Output:
// true
// true
// false
// true
// false`,
        explanation:
          'We use a stack: push opening brackets, and for closing brackets, pop and check if it matches. If the stack is empty at the end, all brackets are properly matched.',
      },
      {
        id: 'jsc_min_stack',
        title: 'Min Stack (Get Minimum in O(1))',
        difficulty: 'Medium',
        category: 'Data Structures',
        problem:
          'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
        solution: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    const min = this.minStack.length === 0
      ? val
      : Math.min(val, this.getMin());
    this.minStack.push(min);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

const ms = new MinStack();
ms.push(5);
ms.push(3);
ms.push(7);
ms.push(1);
console.log(ms.getMin());
ms.pop();
console.log(ms.getMin());
ms.pop();
console.log(ms.getMin());`,
        consoleOutput: `// Output:
// 1
// 3
// 3`,
        explanation:
          'We maintain a parallel minStack that tracks the minimum value at each level. When we push, we store the current minimum. When we pop, both stacks shrink together, keeping getMin() at O(1).',
      },
    ],
  },
  {
    title: 'More String Problems',
    category: 'Strings',
    data: [
      {
        id: 'jsc_string_compression',
        title: 'String Compression',
        difficulty: 'Medium',
        category: 'Strings',
        problem:
          'Compress a string by counting consecutive repeated characters. e.g., "aabcccccaaa" becomes "a2b1c5a3". If the compressed string is not shorter, return the original.',
        solution: `function compress(str) {
  let compressed = '';
  let count = 1;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      compressed += str[i] + count;
      count = 1;
    }
  }

  return compressed.length < str.length ? compressed : str;
}

console.log(compress('aabcccccaaa'));
console.log(compress('aabbcc'));
console.log(compress('aaaaaaa'));
console.log(compress('abcdef'));`,
        consoleOutput: `// Output:
// "a2b1c5a3"
// "aabbcc"      (compressed "a2b2c2" is not shorter)
// "a7"
// "abcdef"      (compressed "a1b1c1d1e1f1" is longer)`,
        explanation:
          'We iterate through the string counting consecutive characters. When the next character differs, we append the character and its count. We return the original if compression does not save space.',
      },
      {
        id: 'jsc_unique_chars',
        title: 'Check All Unique Characters',
        difficulty: 'Easy',
        category: 'Strings',
        problem:
          'Determine if a string has all unique characters (no duplicates).',
        solution: `// Using Set
function isUnique(str) {
  return new Set(str).size === str.length;
}

// Without extra data structures
function isUnique2(str) {
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length; j++) {
      if (str[i] === str[j]) return false;
    }
  }
  return true;
}

// Using sort
function isUnique3(str) {
  const sorted = str.split('').sort();
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i] === sorted[i + 1]) return false;
  }
  return true;
}

console.log(isUnique('abcdef'));
console.log(isUnique('hello'));
console.log(isUnique2('world'));
console.log(isUnique3('abcda'));`,
        consoleOutput: `// Output:
// true
// false   (l is repeated)
// true
// false   (a is repeated)`,
        explanation:
          'The Set approach is O(n) — if the Set size equals the string length, all characters are unique. The nested loop is O(n^2) but uses no extra space. The sort approach is O(n log n).',
      },
      {
        id: 'jsc_first_non_repeating',
        title: 'First Non-Repeating Character',
        difficulty: 'Easy',
        category: 'Strings',
        problem:
          'Find the first character in a string that does not repeat.',
        solution: `function firstNonRepeating(str) {
  const freq = {};

  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }

  for (const char of str) {
    if (freq[char] === 1) return char;
  }

  return null;
}

// Using Map (maintains insertion order)
function firstNonRepeating2(str) {
  const map = new Map();
  for (const char of str) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  for (const [char, count] of map) {
    if (count === 1) return char;
  }
  return null;
}

console.log(firstNonRepeating('aabcbcd'));
console.log(firstNonRepeating('aabbcc'));
console.log(firstNonRepeating2('leetcode'));
console.log(firstNonRepeating2('aabb'));`,
        consoleOutput: `// Output:
// "d"
// null
// "l"
// null`,
        explanation:
          'First pass: count frequency of each character. Second pass: return the first character with count 1. Two passes over the string, O(n) time complexity.',
      },
      {
        id: 'jsc_roman_to_integer',
        title: 'Roman to Integer',
        difficulty: 'Medium',
        category: 'Strings',
        problem:
          'Convert a Roman numeral string to an integer. Handle subtraction cases like IV (4), IX (9), XL (40), etc.',
        solution: `function romanToInt(s) {
  const map = {
    I: 1, V: 5, X: 10, L: 50,
    C: 100, D: 500, M: 1000,
  };

  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const current = map[s[i]];
    const next = map[s[i + 1]];

    if (next && current < next) {
      result -= current; // subtraction case (IV, IX, etc.)
    } else {
      result += current;
    }
  }

  return result;
}

console.log(romanToInt('III'));
console.log(romanToInt('IV'));
console.log(romanToInt('IX'));
console.log(romanToInt('XLII'));
console.log(romanToInt('MCMXCIV'));`,
        consoleOutput: `// Output:
// 3
// 4
// 9
// 42
// 1994`,
        explanation:
          'We iterate through the string. If the current value is less than the next value, we subtract it (e.g., I before V means 4). Otherwise, we add it. This handles all subtraction cases naturally.',
      },
    ],
  },
  {
    title: 'More Array Problems',
    category: 'Arrays',
    data: [
      {
        id: 'jsc_move_zeros',
        title: 'Move Zeros to End',
        difficulty: 'Easy',
        category: 'Arrays',
        problem:
          'Move all zeros in an array to the end while maintaining the relative order of non-zero elements. Do it in-place.',
        solution: `function moveZeros(arr) {
  let insertPos = 0;

  // Move all non-zero elements to the front
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[insertPos] = arr[i];
      insertPos++;
    }
  }

  // Fill remaining positions with zeros
  while (insertPos < arr.length) {
    arr[insertPos] = 0;
    insertPos++;
  }

  return arr;
}

// Using swap approach
function moveZeros2(arr) {
  let left = 0;
  for (let right = 0; right < arr.length; right++) {
    if (arr[right] !== 0) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
    }
  }
  return arr;
}

console.log(moveZeros([0, 1, 0, 3, 12]));
console.log(moveZeros2([0, 0, 1, 2, 0, 3]));
console.log(moveZeros([1, 2, 3]));`,
        consoleOutput: `// Output:
// [1, 3, 12, 0, 0]
// [1, 2, 3, 0, 0, 0]
// [1, 2, 3]`,
        explanation:
          'The first approach copies non-zero elements forward, then fills the rest with zeros. The swap approach uses two pointers to swap non-zero elements with the first zero position. Both are O(n).',
      },
      {
        id: 'jsc_missing_number',
        title: 'Find the Missing Number',
        difficulty: 'Easy',
        category: 'Arrays',
        problem:
          'Given an array containing n distinct numbers from 0 to n, find the one number that is missing.',
        solution: `// Using math formula: sum of 0 to n = n*(n+1)/2
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}

// Using XOR
function missingNumber2(nums) {
  let xor = nums.length;
  for (let i = 0; i < nums.length; i++) {
    xor ^= i ^ nums[i];
  }
  return xor;
}

console.log(missingNumber([3, 0, 1]));
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));
console.log(missingNumber2([0, 1, 3]));
console.log(missingNumber2([0, 1, 2, 3, 5]));`,
        consoleOutput: `// Output:
// 2
// 8
// 2
// 4`,
        explanation:
          'The math approach calculates the expected sum of 0..n and subtracts the actual sum. The XOR approach exploits the property that a ^ a = 0, so all paired numbers cancel out leaving the missing one.',
      },
      {
        id: 'jsc_max_subarray',
        title: 'Maximum Subarray Sum (Kadane\'s)',
        difficulty: 'Medium',
        category: 'Arrays',
        problem:
          'Find the contiguous subarray with the largest sum (Kadane\'s algorithm).',
        solution: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend the current subarray or start fresh
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

// With subarray tracking
function maxSubArrayWithIndices(nums) {
  let maxSum = nums[0], currentSum = nums[0];
  let start = 0, end = 0, tempStart = 0;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > currentSum + nums[i]) {
      currentSum = nums[i];
      tempStart = i;
    } else {
      currentSum += nums[i];
    }
    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
    }
  }

  return { maxSum, subarray: nums.slice(start, end + 1) };
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(maxSubArray([1]));
console.log(maxSubArray([-1, -2, -3]));
console.log(maxSubArrayWithIndices([-2, 1, -3, 4, -1, 2, 1, -5, 4]));`,
        consoleOutput: `// Output:
// 6          (subarray [4, -1, 2, 1])
// 1
// -1
// { maxSum: 6, subarray: [4, -1, 2, 1] }`,
        explanation:
          'Kadane\'s algorithm tracks the maximum sum ending at each position. At each step, decide whether to extend the current subarray or start a new one. Time complexity: O(n), Space: O(1).',
      },
      {
        id: 'jsc_find_duplicates',
        title: 'Find All Duplicates in Array',
        difficulty: 'Easy',
        category: 'Arrays',
        problem:
          'Find all elements that appear more than once in an array.',
        solution: `function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();

  for (const num of arr) {
    if (seen.has(num)) {
      duplicates.add(num);
    }
    seen.add(num);
  }

  return [...duplicates];
}

// Using frequency map
function findDuplicates2(arr) {
  const freq = {};
  const result = [];

  for (const num of arr) {
    freq[num] = (freq[num] || 0) + 1;
    if (freq[num] === 2) result.push(num);
  }

  return result;
}

console.log(findDuplicates([1, 2, 3, 2, 4, 5, 3]));
console.log(findDuplicates([1, 1, 1, 1]));
console.log(findDuplicates2([4, 3, 2, 7, 8, 2, 3, 1]));
console.log(findDuplicates2([1, 2, 3, 4, 5]));`,
        consoleOutput: `// Output:
// [2, 3]
// [1]
// [2, 3]
// []`,
        explanation:
          'The Set approach adds elements to "seen" and records them in "duplicates" if already seen. The frequency approach counts occurrences and adds to result exactly when count reaches 2.',
      },
      {
        id: 'jsc_merge_sorted_arrays',
        title: 'Merge Two Sorted Arrays',
        difficulty: 'Easy',
        category: 'Arrays',
        problem:
          'Merge two sorted arrays into one sorted array without using sort().',
        solution: `function mergeSorted(arr1, arr2) {
  const merged = [];
  let i = 0, j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }

  // Add remaining elements
  while (i < arr1.length) merged.push(arr1[i++]);
  while (j < arr2.length) merged.push(arr2[j++]);

  return merged;
}

console.log(mergeSorted([1, 3, 5, 7], [2, 4, 6, 8]));
console.log(mergeSorted([1, 2, 3], [4, 5, 6]));
console.log(mergeSorted([], [1, 2, 3]));
console.log(mergeSorted([1, 5, 9], [2, 3]));`,
        consoleOutput: `// Output:
// [1, 2, 3, 4, 5, 6, 7, 8]
// [1, 2, 3, 4, 5, 6]
// [1, 2, 3]
// [1, 2, 3, 5, 9]`,
        explanation:
          'We use two pointers, one for each array. At each step, we compare the current elements and push the smaller one. After one array is exhausted, we append the remaining elements from the other.',
      },
      {
        id: 'jsc_max_profit',
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'Medium',
        category: 'Arrays',
        problem:
          'Given an array of stock prices where prices[i] is the price on day i, find the maximum profit from buying on one day and selling on a later day.',
        solution: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else {
      maxProfit = Math.max(maxProfit, price - minPrice);
    }
  }

  return maxProfit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([7, 6, 4, 3, 1]));
console.log(maxProfit([2, 4, 1, 7]));
console.log(maxProfit([1, 2]));`,
        consoleOutput: `// Output:
// 5    (buy at 1, sell at 6)
// 0    (prices only decrease, no profit)
// 6    (buy at 1, sell at 7)
// 1    (buy at 1, sell at 2)`,
        explanation:
          'We track the minimum price seen so far and the maximum profit at each step. For each price, we either update the minimum or calculate the profit. Single pass, O(n) time, O(1) space.',
      },
    ],
  },
  {
    title: 'More Number Problems',
    category: 'Numbers',
    data: [
      {
        id: 'jsc_sum_of_digits',
        title: 'Sum of Digits',
        difficulty: 'Easy',
        category: 'Numbers',
        problem:
          'Calculate the sum of all digits in a number. Handle negative numbers as well.',
        solution: `function sumOfDigits(num) {
  num = Math.abs(num);
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}

// Recursive approach
function sumOfDigitsRecursive(num) {
  num = Math.abs(num);
  if (num < 10) return num;
  return (num % 10) + sumOfDigitsRecursive(Math.floor(num / 10));
}

// Digital root (keep summing until single digit)
function digitalRoot(num) {
  num = Math.abs(num);
  while (num >= 10) {
    num = sumOfDigits(num);
  }
  return num;
}

console.log(sumOfDigits(12345));
console.log(sumOfDigits(-987));
console.log(sumOfDigitsRecursive(4567));
console.log(digitalRoot(9999));`,
        consoleOutput: `// Output:
// 15   (1+2+3+4+5)
// 24   (9+8+7)
// 22   (4+5+6+7)
// 9    (9+9+9+9=36 -> 3+6=9)`,
        explanation:
          'We extract digits using modulo 10 (gives last digit) and integer division by 10 (removes last digit). Digital root keeps summing until a single digit remains.',
      },
      {
        id: 'jsc_power_of_two',
        title: 'Power of Two',
        difficulty: 'Easy',
        category: 'Numbers',
        problem:
          'Check if a given number is a power of 2.',
        solution: `// Using bit manipulation
function isPowerOfTwo(n) {
  if (n <= 0) return false;
  return (n & (n - 1)) === 0;
}

// Using loop
function isPowerOfTwo2(n) {
  if (n <= 0) return false;
  while (n > 1) {
    if (n % 2 !== 0) return false;
    n /= 2;
  }
  return true;
}

// Using Math.log
function isPowerOfTwo3(n) {
  if (n <= 0) return false;
  return Number.isInteger(Math.log2(n));
}

console.log(isPowerOfTwo(1));
console.log(isPowerOfTwo(16));
console.log(isPowerOfTwo(18));
console.log(isPowerOfTwo2(64));
console.log(isPowerOfTwo3(128));`,
        consoleOutput: `// Output:
// true   (2^0)
// true   (2^4)
// false
// true   (2^6)
// true   (2^7)`,
        explanation:
          'The bit manipulation trick: powers of 2 have exactly one bit set (e.g., 8 = 1000). n & (n-1) removes the lowest set bit. If the result is 0, only one bit was set, so it is a power of 2.',
      },
      {
        id: 'jsc_staircase',
        title: 'Climbing Stairs (Dynamic Programming)',
        difficulty: 'Medium',
        category: 'Numbers',
        problem:
          'You can climb 1 or 2 steps at a time. How many distinct ways can you climb n steps?',
        solution: `// Dynamic programming (bottom-up)
function climbStairs(n) {
  if (n <= 2) return n;

  let prev2 = 1; // ways to reach step 1
  let prev1 = 2; // ways to reach step 2

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

// Recursive with memoization
function climbStairsMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return n;
  memo[n] = climbStairsMemo(n - 1, memo) + climbStairsMemo(n - 2, memo);
  return memo[n];
}

console.log(climbStairs(2));
console.log(climbStairs(3));
console.log(climbStairs(5));
console.log(climbStairsMemo(10));
console.log(climbStairsMemo(20));`,
        consoleOutput: `// Output:
// 2      (1+1 or 2)
// 3      (1+1+1, 1+2, 2+1)
// 8
// 89
// 10946`,
        explanation:
          'This is the Fibonacci pattern! To reach step n, you can come from step n-1 (1 step) or step n-2 (2 steps). So ways(n) = ways(n-1) + ways(n-2). The bottom-up approach uses O(1) space.',
      },
      {
        id: 'jsc_count_primes',
        title: 'Count Primes (Sieve of Eratosthenes)',
        difficulty: 'Medium',
        category: 'Numbers',
        problem:
          'Count the number of prime numbers less than a given number n using the Sieve of Eratosthenes.',
        solution: `function countPrimes(n) {
  if (n < 2) return 0;

  const isPrime = new Array(n).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i < n; i++) {
    if (isPrime[i]) {
      // Mark all multiples of i as non-prime
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  return isPrime.filter(Boolean).length;
}

console.log(countPrimes(10));
console.log(countPrimes(20));
console.log(countPrimes(50));
console.log(countPrimes(100));`,
        consoleOutput: `// Output:
// 4     (2, 3, 5, 7)
// 8     (2, 3, 5, 7, 11, 13, 17, 19)
// 15
// 25`,
        explanation:
          'The Sieve of Eratosthenes marks multiples of each prime as non-prime starting from i*i (smaller multiples are already marked). Time complexity: O(n log log n), much faster than checking each number individually.',
      },
    ],
  },
  {
    title: 'Linked List Problems',
    category: 'Data Structures',
    data: [
      {
        id: 'jsc_linked_list',
        title: 'Implement a Linked List',
        difficulty: 'Medium',
        category: 'Data Structures',
        problem:
          'Implement a singly linked list with append, prepend, delete, and display methods.',
        solution: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = node;
    }
    this.size++;
  }

  prepend(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  delete(value) {
    if (!this.head) return;
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        this.size--;
        return;
      }
      current = current.next;
    }
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

const list = new LinkedList();
list.append(10);
list.append(20);
list.append(30);
list.prepend(5);
console.log(list.toArray());
list.delete(20);
console.log(list.toArray());
console.log('Size:', list.size);`,
        consoleOutput: `// Output:
// [5, 10, 20, 30]
// [5, 10, 30]
// "Size: 3"`,
        explanation:
          'A linked list stores elements as nodes where each node points to the next. Append traverses to the end, prepend adds before head, and delete reconnects the previous node to the next node.',
      },
      {
        id: 'jsc_detect_cycle',
        title: 'Detect Cycle in Linked List',
        difficulty: 'Medium',
        category: 'Data Structures',
        problem:
          'Determine if a linked list has a cycle (a node points back to a previous node). Use Floyd\'s cycle detection algorithm.',
        solution: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;       // Move 1 step
    fast = fast.next.next;  // Move 2 steps

    if (slow === fast) return true; // They met = cycle!
  }

  return false; // fast reached end = no cycle
}

// Test: no cycle
const a = new Node(1);
a.next = new Node(2);
a.next.next = new Node(3);
console.log(hasCycle(a));

// Test: has cycle
const b = new Node(1);
b.next = new Node(2);
b.next.next = new Node(3);
b.next.next.next = b.next; // 3 -> 2 (cycle!)
console.log(hasCycle(b));`,
        consoleOutput: `// Output:
// false
// true`,
        explanation:
          'Floyd\'s algorithm uses two pointers: slow (1 step) and fast (2 steps). If there is a cycle, they will eventually meet. If fast reaches null, there is no cycle. O(n) time, O(1) space.',
      },
      {
        id: 'jsc_reverse_linked_list',
        title: 'Reverse a Linked List',
        difficulty: 'Medium',
        category: 'Data Structures',
        problem:
          'Reverse a singly linked list iteratively.',
        solution: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function createList(arr) {
  const head = new Node(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new Node(arr[i]);
    current = current.next;
  }
  return head;
}

function toArray(head) {
  const result = [];
  while (head) {
    result.push(head.value);
    head = head.next;
  }
  return result;
}

function reverseList(head) {
  let prev = null;
  let current = head;

  while (current) {
    const next = current.next; // save next
    current.next = prev;       // reverse pointer
    prev = current;            // advance prev
    current = next;            // advance current
  }

  return prev; // new head
}

const list = createList([1, 2, 3, 4, 5]);
console.log('Before:', toArray(list));
const reversed = reverseList(list);
console.log('After:', toArray(reversed));`,
        consoleOutput: `// Output:
// "Before: [1, 2, 3, 4, 5]"
// "After: [5, 4, 3, 2, 1]"`,
        explanation:
          'We use three pointers: prev, current, and next. At each step, we reverse the current node\'s pointer to point to prev instead of next, then advance all pointers. O(n) time, O(1) space.',
      },
    ],
  },
  {
    title: 'Output Prediction (Tricky)',
    category: 'Output',
    data: [
      {
        id: 'jsc_output_var_loop',
        title: 'var in for Loop (Classic)',
        difficulty: 'Medium',
        category: 'Output',
        problem:
          'What is the output of this code? This is one of the most commonly asked JavaScript interview questions.',
        solution: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var:', i), 100);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let:', j), 200);
}`,
        consoleOutput: `// Output:
// "var: 3"
// "var: 3"
// "var: 3"
// "let: 0"
// "let: 1"
// "let: 2"`,
        explanation:
          'var is function-scoped, so all three callbacks share the same i, which is 3 after the loop. let is block-scoped, creating a new j for each iteration, so each callback captures its own value.',
      },
      {
        id: 'jsc_output_hoisting',
        title: 'Hoisting Quiz',
        difficulty: 'Medium',
        category: 'Output',
        problem:
          'Predict the output of this code involving hoisting.',
        solution: `console.log(a);
console.log(b);
console.log(c);

var a = 1;
let b = 2;
const c = 3;`,
        consoleOutput: `// Output:
// undefined
// ReferenceError: Cannot access 'b' before initialization
// (c never reaches because b threw an error)`,
        explanation:
          'var a is hoisted and initialized to undefined. let and const are hoisted but stay in the Temporal Dead Zone (TDZ) until their declaration line, causing a ReferenceError when accessed before initialization.',
      },
      {
        id: 'jsc_output_closures',
        title: 'Closures Output',
        difficulty: 'Medium',
        category: 'Output',
        problem:
          'What does this closure-based code output?',
        solution: `function createFunctions() {
  const result = [];
  for (var i = 0; i < 3; i++) {
    result.push(function() { return i; });
  }
  return result;
}

const fns = createFunctions();
console.log(fns[0]());
console.log(fns[1]());
console.log(fns[2]());

// Fix with IIFE
function createFixed() {
  const result = [];
  for (var i = 0; i < 3; i++) {
    result.push((function(j) {
      return function() { return j; };
    })(i));
  }
  return result;
}

const fixed = createFixed();
console.log(fixed[0]());
console.log(fixed[1]());
console.log(fixed[2]());`,
        consoleOutput: `// Output:
// 3
// 3
// 3
// 0
// 1
// 2`,
        explanation:
          'All three functions close over the same var i, which is 3 after the loop. The IIFE fix creates a new scope for each iteration, capturing the current value of i in the parameter j.',
      },
      {
        id: 'jsc_output_this',
        title: '"this" Context Quiz',
        difficulty: 'Hard',
        category: 'Output',
        problem:
          'Predict the output of this code involving "this" in different contexts.',
        solution: `const obj = {
  name: 'Alice',
  greet: function() {
    console.log('1:', this.name);

    const inner = function() {
      console.log('2:', this?.name);
    };
    inner();

    const arrow = () => {
      console.log('3:', this.name);
    };
    arrow();
  },
};

obj.greet();

const greet = obj.greet;
// greet(); // Would throw or log undefined`,
        consoleOutput: `// Output:
// "1: Alice"      (method call, this = obj)
// "2: undefined"  (regular function, this = undefined in strict mode)
// "3: Alice"      (arrow inherits this from greet)`,
        explanation:
          '"this" in a method call refers to the object. A regular inner function loses the context (undefined in strict mode). Arrow functions inherit "this" from their enclosing scope, so they keep the obj reference.',
      },
      {
        id: 'jsc_output_promise_order',
        title: 'Promise & setTimeout Order',
        difficulty: 'Hard',
        category: 'Output',
        problem:
          'What is the execution order? This tests understanding of the event loop, microtasks, and macrotasks.',
        solution: `console.log('1: Start');

setTimeout(() => {
  console.log('2: setTimeout');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3: Promise 1');
  })
  .then(() => {
    console.log('4: Promise 2');
  });

Promise.resolve().then(() => {
  console.log('5: Promise 3');
});

console.log('6: End');`,
        consoleOutput: `// Output:
// "1: Start"
// "6: End"
// "3: Promise 1"
// "5: Promise 3"
// "4: Promise 2"
// "2: setTimeout"`,
        explanation:
          'Synchronous code runs first (1, 6). Then microtasks (Promises) run: Promise 1 and Promise 3 are both resolved, so they run in order (3, 5). Then Promise 2 (chained on Promise 1) runs (4). Finally, the macrotask setTimeout runs (2).',
      },
      {
        id: 'jsc_output_type_coercion',
        title: 'Type Coercion Tricks',
        difficulty: 'Medium',
        category: 'Output',
        problem:
          'Predict the output of these type coercion expressions. These are very commonly asked in interviews.',
        solution: `console.log([] + []);
console.log([] + {});
console.log({} + []);
console.log(true + true);
console.log(true + false);
console.log('5' + 3);
console.log('5' - 3);
console.log('5' * '2');
console.log(null + 1);
console.log(undefined + 1);
console.log('' == false);
console.log([] == false);
console.log(null == undefined);
console.log(null === undefined);
console.log(NaN === NaN);`,
        consoleOutput: `// Output:
// ""           (both arrays become empty strings)
// "[object Object]"
// "[object Object]" (or 0 in some contexts)
// 2            (true = 1, so 1 + 1)
// 1            (1 + 0)
// "53"         (string concatenation)
// 2            (numeric subtraction)
// 10           (numeric multiplication)
// 1            (null becomes 0)
// NaN          (undefined becomes NaN)
// true         (both coerce to 0)
// true         ([] -> "" -> 0 == false -> 0)
// true         (null and undefined are loosely equal)
// false        (different types)
// false        (NaN is not equal to anything, including itself)`,
        explanation:
          'JavaScript performs type coercion with loose equality and operators. The + operator concatenates with strings but adds with numbers. null coerces to 0 in arithmetic, undefined coerces to NaN. NaN is never equal to itself.',
      },
      {
        id: 'jsc_output_async_await',
        title: 'Async/Await Execution Order',
        difficulty: 'Hard',
        category: 'Output',
        problem:
          'What is the execution order of this async code?',
        solution: `async function foo() {
  console.log('1: foo start');
  const result = await bar();
  console.log('4: foo after await:', result);
}

async function bar() {
  console.log('2: bar start');
  return 'bar result';
}

console.log('0: script start');
foo();
console.log('3: script end');`,
        consoleOutput: `// Output:
// "0: script start"
// "1: foo start"
// "2: bar start"
// "3: script end"
// "4: foo after await: bar result"`,
        explanation:
          'Script starts synchronously (0). foo() is called: runs sync until await (1, 2). await pauses foo and returns control to the caller. "script end" prints (3). Then the microtask resolves and foo continues (4).',
      },
      {
        id: 'jsc_output_spread_mutation',
        title: 'Spread & Mutation Quiz',
        difficulty: 'Medium',
        category: 'Output',
        problem:
          'Does the spread operator create a deep copy? Predict the output.',
        solution: `const original = {
  name: 'Alice',
  scores: [90, 85, 92],
  address: { city: 'NYC' },
};

const copy = { ...original };

copy.name = 'Bob';
copy.scores.push(100);
copy.address.city = 'LA';

console.log('original.name:', original.name);
console.log('original.scores:', original.scores);
console.log('original.address.city:', original.address.city);

console.log('copy.name:', copy.name);
console.log('copy.scores:', copy.scores);
console.log('copy.address.city:', copy.address.city);`,
        consoleOutput: `// Output:
// "original.name: Alice"          (primitive — independent)
// "original.scores: [90,85,92,100]" (array — shared reference!)
// "original.address.city: LA"     (object — shared reference!)
// "copy.name: Bob"
// "copy.scores: [90,85,92,100]"
// "copy.address.city: LA"`,
        explanation:
          'Spread creates a SHALLOW copy. Primitive values (name) are independent. But nested objects and arrays share the same reference, so mutating them in the copy affects the original too. This is why React requires careful immutable updates.',
      },
    ],
  },
  {
    title: 'Polyfills & Utilities',
    category: 'Polyfills',
    data: [
      {
        id: 'jsc_pipe_compose',
        title: 'Implement Pipe & Compose',
        difficulty: 'Medium',
        category: 'Polyfills',
        problem:
          'Implement pipe (left-to-right) and compose (right-to-left) function composition utilities.',
        solution: `// Pipe: left to right
function pipe(...fns) {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}

// Compose: right to left
function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

const addOne = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

// pipe: addOne(5) -> double(6) -> square(12)
const piped = pipe(addOne, double, square);
console.log(piped(5));

// compose: addOne(double(square(5)))
const composed = compose(addOne, double, square);
console.log(composed(5));

// Practical: data transformation pipeline
const processUser = pipe(
  (user) => ({ ...user, name: user.name.trim() }),
  (user) => ({ ...user, name: user.name.toLowerCase() }),
  (user) => ({ ...user, email: user.name + '@example.com' }),
);

console.log(processUser({ name: '  ALICE  ' }));`,
        consoleOutput: `// Output:
// 144       (5+1=6, 6*2=12, 12*12=144)
// 51        (5*5=25, 25*2=50, 50+1=51)
// { name: "alice", email: "alice@example.com" }`,
        explanation:
          'Pipe applies functions left-to-right using reduce. Compose applies right-to-left using reduceRight. Both are essential functional programming patterns for building data transformation pipelines.',
      },
      {
        id: 'jsc_deep_equal',
        title: 'Deep Equality Check',
        difficulty: 'Medium',
        category: 'Polyfills',
        problem:
          'Implement a function that checks if two values are deeply equal (not just reference equality).',
        solution: `function deepEqual(a, b) {
  // Same reference or same primitive
  if (a === b) return true;

  // Null check
  if (a === null || b === null) return false;
  if (typeof a !== typeof b) return false;

  // Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, i) => deepEqual(item, b[i]));
  }

  // Objects
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => deepEqual(a[key], b[key]));
  }

  return false;
}

console.log(deepEqual(1, 1));
console.log(deepEqual({ a: 1 }, { a: 1 }));
console.log(deepEqual({ a: { b: 2 } }, { a: { b: 2 } }));
console.log(deepEqual([1, [2, 3]], [1, [2, 3]]));
console.log(deepEqual({ a: 1 }, { a: 2 }));
console.log(deepEqual([1, 2], [1, 2, 3]));`,
        consoleOutput: `// Output:
// true
// true
// true
// true
// false
// false`,
        explanation:
          'We recursively compare values. Primitives use ===. Arrays compare length then each element. Objects compare key count then each key-value pair recursively. This handles nested structures of any depth.',
      },
      {
        id: 'jsc_flatten_object',
        title: 'Flatten a Nested Object',
        difficulty: 'Medium',
        category: 'Polyfills',
        problem:
          'Convert a nested object into a flat object with dot-notation keys.',
        solution: `function flattenObject(obj, prefix = '') {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? prefix + '.' + key : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey));
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

const nested = {
  name: 'Alice',
  address: {
    street: '123 Main St',
    city: 'NYC',
    coordinates: { lat: 40.7, lng: -74.0 },
  },
  hobbies: ['reading', 'coding'],
};

console.log(flattenObject(nested));`,
        consoleOutput: `// Output:
// {
//   "name": "Alice",
//   "address.street": "123 Main St",
//   "address.city": "NYC",
//   "address.coordinates.lat": 40.7,
//   "address.coordinates.lng": -74.0,
//   "hobbies": ["reading", "coding"]
// }`,
        explanation:
          'We recursively traverse the object. For nested objects, we prepend the parent key with a dot. Arrays and primitives are stored as-is with their full dot-notation path as the key.',
      },
      {
        id: 'jsc_set_timeout_polyfill',
        title: 'Implement setTimeout with setInterval',
        difficulty: 'Easy',
        category: 'Polyfills',
        problem:
          'Implement a custom setTimeout using setInterval.',
        solution: `function customSetTimeout(callback, delay) {
  const intervalId = setInterval(() => {
    clearInterval(intervalId);
    callback();
  }, delay);

  return intervalId;
}

// Test
customSetTimeout(() => {
  console.log('Executed after 1 second');
}, 1000);

// Bonus: Implement setInterval using setTimeout
function customSetInterval(callback, delay) {
  let id;

  function loop() {
    callback();
    id = setTimeout(loop, delay);
  }

  id = setTimeout(loop, delay);

  return {
    clear: () => clearTimeout(id),
  };
}

let count = 0;
const interval = customSetInterval(() => {
  count++;
  console.log('Tick:', count);
  if (count === 3) interval.clear();
}, 500);`,
        consoleOutput: `// Output:
// "Executed after 1 second"
// "Tick: 1"
// "Tick: 2"
// "Tick: 3"`,
        explanation:
          'setTimeout via setInterval: start an interval that clears itself after the first tick. setInterval via setTimeout: recursively schedule the next execution after each callback completes.',
      },
      {
        id: 'jsc_promise_any',
        title: 'Implement Promise.race & Promise.any',
        difficulty: 'Hard',
        category: 'Polyfills',
        problem:
          'Implement your own versions of Promise.race (resolves/rejects with the first settled promise) and Promise.any (resolves with the first fulfilled promise).',
        solution: `// Promise.race: first to settle wins
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      Promise.resolve(promise).then(resolve, reject);
    }
  });
}

// Promise.any: first to fulfill wins
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    const errors = [];
    let count = 0;

    promises.forEach((promise, i) => {
      Promise.resolve(promise).then(resolve).catch(err => {
        errors[i] = err;
        count++;
        if (count === promises.length) {
          reject(new AggregateError(errors, 'All promises rejected'));
        }
      });
    });
  });
}

// Test Promise.race
const fast = new Promise(res => setTimeout(() => res('fast'), 100));
const slow = new Promise(res => setTimeout(() => res('slow'), 500));
promiseRace([slow, fast]).then(console.log);

// Test Promise.any
const fail1 = Promise.reject('err1');
const fail2 = Promise.reject('err2');
const success = Promise.resolve('success!');
promiseAny([fail1, fail2, success]).then(console.log);`,
        consoleOutput: `// Output:
// "fast"      (first to resolve)
// "success!"  (first fulfilled, ignores rejections)`,
        explanation:
          'Promise.race resolves or rejects with whichever promise settles first. Promise.any resolves with the first fulfilled promise, only rejecting if ALL promises reject (with AggregateError).',
      },
      {
        id: 'jsc_array_at_polyfill',
        title: 'Implement Array.prototype.at()',
        difficulty: 'Easy',
        category: 'Polyfills',
        problem:
          'Implement the Array.at() method that supports negative indexing.',
        solution: `// Polyfill for Array.at()
function arrayAt(arr, index) {
  if (index < 0) {
    index = arr.length + index;
  }
  if (index < 0 || index >= arr.length) {
    return undefined;
  }
  return arr[index];
}

// Or as a prototype method
Array.prototype.myAt = function(index) {
  const i = index < 0 ? this.length + index : index;
  return this[i];
};

const arr = [10, 20, 30, 40, 50];

console.log(arrayAt(arr, 0));
console.log(arrayAt(arr, -1));
console.log(arrayAt(arr, -2));
console.log(arrayAt(arr, 10));

console.log(arr.myAt(1));
console.log(arr.myAt(-3));`,
        consoleOutput: `// Output:
// 10
// 50     (last element)
// 40     (second to last)
// undefined (out of bounds)
// 20
// 30`,
        explanation:
          'Array.at() allows negative indexing: -1 is the last element, -2 is second to last, etc. We convert negative indices by adding the array length. This is cleaner than arr[arr.length - 1].',
      },
    ],
  },
];

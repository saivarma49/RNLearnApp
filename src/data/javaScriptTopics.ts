import { TopicSection } from '../types';

export const javaScriptSections: TopicSection[] = [
  {
    title: 'Basics',
    category: 'Basics',
    data: [
      {
        id: 'js_variables',
        title: 'var, let, const',
        summary: 'Variable declarations and their scoping rules',
        difficulty: 'Beginner',
        definition:
          'JavaScript has three ways to declare variables: var (function-scoped, hoisted), let (block-scoped, not hoisted), and const (block-scoped, cannot be reassigned). In modern JavaScript, prefer const by default and let when reassignment is needed.',
        realWorldAnalogy:
          'var is like writing your name on a whiteboard that everyone in the room can see. let is like writing on a sticky note that only people at your table can see. const is like engraving your name in stone — once set, it stays.',
        syntax: `const immutable = 'fixed';
let mutable = 'can change';
var legacy = 'avoid this';`,
        example: `// const - cannot reassign
const API_URL = 'https://api.example.com';
// API_URL = 'other'; // TypeError!

// const with objects - properties CAN change
const user = { name: 'Alice' };
user.name = 'Bob'; // This works!

// let - block scoped
let count = 0;
if (true) {
  let count = 10; // Different variable!
  console.log(count); // 10
}
console.log(count); // 0

// var - function scoped (avoid)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Outputs: 3, 3, 3 (not 0, 1, 2!)

// Fix with let:
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}
// Outputs: 0, 1, 2`,
        outputExplanation:
          'Demonstrates the scoping differences. var leaks out of blocks and causes the classic loop closure bug. let creates a new binding per iteration.',
        interviewQuestions: [
          'What is the temporal dead zone?',
          'Why does the var loop print 3 three times?',
          'Can you modify properties of a const object?',
        ],
        commonMistakes: [
          'Thinking const makes objects immutable — it only prevents reassignment',
          'Using var in modern code causing unexpected hoisting bugs',
          'Not understanding block vs function scoping',
        ],
        performanceTips: [
          'Use const by default for better code readability and fewer bugs',
          'V8 engine can optimize const better in some cases',
          'Avoid var entirely in new code',
        ],
      },
      {
        id: 'js_arrow_functions',
        title: 'Arrow Functions',
        summary: 'Concise function syntax with lexical this',
        difficulty: 'Beginner',
        definition:
          'Arrow functions provide a shorter syntax for writing functions. They don\'t have their own this, arguments, or super. They inherit this from the enclosing scope (lexical this), making them ideal for callbacks and methods that need to preserve context.',
        realWorldAnalogy:
          'Regular functions are like freelance workers — they take on whatever "this" (identity) their employer gives them. Arrow functions are like loyal employees — they always keep the "this" from where they were created.',
        syntax: `const fn = (a, b) => a + b;
const single = x => x * 2;
const block = (x) => { return x * 2; };`,
        example: `// Basic syntax variations
const add = (a: number, b: number) => a + b;
const square = (x: number) => x * x;
const greet = () => 'Hello!';

// Lexical this binding
class Timer {
  seconds = 0;

  start() {
    // Arrow function preserves 'this' from start()
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
  }
}

// vs regular function (broken)
class BrokenTimer {
  seconds = 0;

  start() {
    setInterval(function() {
      this.seconds++; // 'this' is undefined or window!
    }, 1000);
  }
}

// Array methods with arrows
const users = ['Alice', 'Bob', 'Charlie'];
const lengths = users.map(name => name.length); // [5, 3, 7]
const filtered = users.filter(name => name.startsWith('A')); // ['Alice']`,
        outputExplanation:
          'Shows arrow function syntax, lexical this binding, and common usage with array methods. The Timer class works correctly because the arrow function inherits this.',
        interviewQuestions: [
          'What is lexical this and why does it matter?',
          'Can you use arrow functions as constructors?',
          'When should you NOT use arrow functions?',
        ],
        commonMistakes: [
          'Using arrow functions as object methods where this should refer to the object',
          'Expecting arrow functions to have their own arguments object',
          'Forgetting parentheses when returning an object literal: () => ({ key: value })',
        ],
        performanceTips: [
          'Arrow functions are slightly faster to parse than function declarations',
          'Use them for callbacks to avoid binding overhead',
          'Avoid creating arrow functions inside render methods of React components',
        ],
      },
      {
        id: 'js_destructuring',
        title: 'Destructuring',
        summary: 'Extract values from arrays and objects',
        difficulty: 'Beginner',
        definition:
          'Destructuring assignment lets you unpack values from arrays or properties from objects into distinct variables. It provides a clean syntax for extracting multiple values in a single statement.',
        syntax: `const { name, age } = person;
const [first, second] = array;
const { data: result } = response; // rename`,
        example: `// Object destructuring
const user = { name: 'Alice', age: 30, role: 'Developer' };
const { name, age, role = 'User' } = user;

// Nested destructuring
const response = {
  data: { users: [{ id: 1, name: 'Bob' }] },
  status: 200,
};
const { data: { users: [firstUser] }, status } = response;
console.log(firstUser.name); // 'Bob'

// Array destructuring
const [r, g, b] = [255, 128, 0];

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a]; // a=2, b=1

// Function parameters
const greet = ({ name, greeting = 'Hello' }: { name: string; greeting?: string }) => {
  return \`\${greeting}, \${name}!\`;
};

// Rest pattern
const { name: userName, ...rest } = user;
console.log(rest); // { age: 30, role: 'Developer' }`,
        outputExplanation:
          'Shows various destructuring patterns: basic, nested, with defaults, renaming, array destructuring, swapping, function params, and rest.',
        interviewQuestions: [
          'How do you provide default values during destructuring?',
          'What happens if you destructure a property that doesn\'t exist?',
          'How do you destructure and rename at the same time?',
        ],
        commonMistakes: [
          'Deeply nested destructuring that reduces readability',
          'Forgetting default values for optional properties',
          'Destructuring null or undefined causing TypeError',
        ],
        performanceTips: [
          'Destructure in function parameters for cleaner APIs',
          'Use rest syntax to separate known from unknown properties',
          'Keep destructuring shallow for readability',
        ],
      },
      {
        id: 'js_hoisting',
        title: 'Hoisting',
        summary: 'Variable and function declarations are moved to the top',
        difficulty: 'Beginner',
        definition:
          'Hoisting is JavaScript\'s default behavior of moving declarations to the top of their scope before code execution. Function declarations are fully hoisted (you can call them before they appear in code). var is hoisted but initialized as undefined. let and const are hoisted but remain in the "temporal dead zone" until their declaration is reached.',
        realWorldAnalogy:
          'Hoisting is like a teacher taking attendance before class starts. The teacher has the complete list of students (declarations) at the very start, even before any student (code line) actually walks into the classroom.',
        syntax: `console.log(x); // undefined (var is hoisted)
var x = 5;

sayHi(); // Works! (function declaration is hoisted)
function sayHi() { console.log('Hi'); }

console.log(y); // ReferenceError (let is in TDZ)
let y = 10;`,
        example: `// Function hoisting — works
greet(); // "Hello!"
function greet() {
  console.log('Hello!');
}

// var hoisting — undefined, not error
console.log(name); // undefined
var name = 'Alice';
console.log(name); // 'Alice'

// let/const — Temporal Dead Zone
try {
  console.log(age); // ReferenceError!
} catch (e) {
  console.log('TDZ Error:', e.message);
}
let age = 25;

// Function expressions are NOT hoisted
try {
  sayBye(); // TypeError: sayBye is not a function
} catch (e) {
  console.log('Not hoisted:', e.message);
}
var sayBye = function() { console.log('Bye'); };`,
        outputExplanation:
          'Function declarations are fully hoisted. var declarations are hoisted as undefined. let/const throw ReferenceError in the temporal dead zone. Function expressions assigned to var are not callable before assignment.',
        interviewQuestions: [
          'What is the Temporal Dead Zone (TDZ)?',
          'Why does var log undefined instead of throwing an error?',
          'Are class declarations hoisted?',
        ],
        commonMistakes: [
          'Thinking let and const are not hoisted — they are, but they stay in TDZ',
          'Relying on var hoisting making code confusing and error-prone',
          'Confusing function declarations with function expressions regarding hoisting',
        ],
        performanceTips: [
          'Always declare variables at the top of their scope for clarity',
          'Use let and const to avoid hoisting confusion entirely',
          'Function declarations can be used before definition for better code organization',
        ],
      },
      {
        id: 'js_this_keyword',
        title: 'this Keyword',
        summary: 'Context-dependent reference to the current object',
        difficulty: 'Intermediate',
        definition:
          'The "this" keyword refers to the object that is executing the current function. Its value depends on how the function is called: in a method, "this" refers to the owner object; in a regular function, it refers to the global object (or undefined in strict mode); in arrow functions, it inherits from the enclosing scope.',
        realWorldAnalogy:
          '"this" is like the word "I" in a conversation. When Alice says "I am a developer," "I" refers to Alice. When Bob says the same sentence, "I" refers to Bob. The meaning of "I" (this) depends on who is speaking (calling the function).',
        syntax: `const obj = {
  name: 'Alice',
  greet() { console.log(this.name); }, // 'Alice'
};

const fn = obj.greet;
fn(); // undefined (lost context)`,
        example: `// 1. Method context
const user = {
  name: 'Alice',
  greet() {
    console.log('Hi, I am ' + this.name);
  },
};
user.greet(); // "Hi, I am Alice"

// 2. Lost context
const greetFn = user.greet;
greetFn(); // "Hi, I am undefined" (or error in strict mode)

// 3. Arrow function inherits this
const team = {
  name: 'Engineering',
  members: ['Alice', 'Bob'],
  showMembers() {
    this.members.forEach(member => {
      console.log(member + ' is in ' + this.name);
    });
  },
};
team.showMembers();
// "Alice is in Engineering"
// "Bob is in Engineering"

// 4. Explicit binding
function introduce(greeting: string) {
  console.log(greeting + ', ' + this.name);
}
const person = { name: 'Charlie' };
introduce.call(person, 'Hello');   // "Hello, Charlie"
introduce.apply(person, ['Hi']);   // "Hi, Charlie"
const bound = introduce.bind(person);
bound('Hey'); // "Hey, Charlie"`,
        outputExplanation:
          'Shows four patterns: method context, lost context when detaching a method, arrow function inheriting this, and explicit binding with call/apply/bind.',
        interviewQuestions: [
          'What is "this" in JavaScript and how is it determined?',
          'What are the four rules of this binding?',
          'How does "this" differ between arrow functions and regular functions?',
        ],
        commonMistakes: [
          'Losing "this" when passing methods as callbacks',
          'Using arrow functions as object methods where this should be the object',
          'Not understanding that "this" in an event handler refers to the element, not the class',
        ],
        performanceTips: [
          'Use arrow functions in React class components to auto-bind this',
          'Prefer bind in constructor over bind in render for performance',
          'In modern React (hooks), this is rarely needed',
        ],
      },
      {
        id: 'js_equality',
        title: '== vs === (Type Coercion)',
        summary: 'Loose vs strict equality and implicit type conversion',
        difficulty: 'Beginner',
        definition:
          'JavaScript has two equality operators: == (loose equality) performs type coercion before comparing, while === (strict equality) compares both value and type without coercion. Always prefer === to avoid unexpected type conversion bugs.',
        syntax: `5 == '5';   // true  (loose — coerces string to number)
5 === '5';  // false (strict — different types)
null == undefined; // true
null === undefined; // false`,
        example: `// Loose equality surprises
console.log(0 == '');        // true
console.log(0 == '0');       // true
console.log('' == '0');      // false
console.log(false == '0');   // true
console.log(false == '');    // true
console.log(null == undefined); // true

// Strict equality — predictable
console.log(0 === '');       // false
console.log(0 === '0');      // false
console.log(false === '0');  // false
console.log(null === undefined); // false

// Type coercion in other contexts
console.log('5' + 3);       // "53" (string concat)
console.log('5' - 3);       // 2   (numeric subtraction)
console.log(true + true);   // 2
console.log('5' * '2');     // 10
console.log(!!'');           // false (empty string is falsy)
console.log(!!0);            // false
console.log(!!'hello');      // true`,
        outputExplanation:
          'Loose equality can produce surprising results due to type coercion. Strict equality is predictable. The + operator concatenates when one operand is a string, while -, *, / always convert to numbers.',
        interviewQuestions: [
          'What is type coercion in JavaScript?',
          'List all falsy values in JavaScript.',
          'When would you ever use == instead of ===?',
        ],
        commonMistakes: [
          'Using == by default causing hard-to-find bugs',
          'Not knowing all falsy values: false, 0, -0, "", null, undefined, NaN',
          'Comparing objects with === expecting deep equality (it checks reference)',
        ],
        performanceTips: [
          'Always use === and !== to avoid type coercion overhead and bugs',
          'Use Object.is() for edge cases like NaN comparison',
          'ESLint rule eqeqeq enforces strict equality usage',
        ],
      },
      {
        id: 'js_scope',
        title: 'Scope & Scope Chain',
        summary: 'How JavaScript resolves variable access',
        difficulty: 'Intermediate',
        definition:
          'Scope determines the accessibility of variables. JavaScript has three types: global scope (accessible everywhere), function scope (var), and block scope (let/const). When a variable is referenced, JavaScript searches up the scope chain from the current scope to the global scope until it finds the variable.',
        realWorldAnalogy:
          'Scope is like a building with floors. If you need something (a variable) on your floor (current scope), you look there first. If not found, you go down one floor (outer scope), then the next, until you reach the ground floor (global scope).',
        syntax: `let global = 'everywhere';
function outer() {
  let outerVar = 'outer only';
  function inner() {
    let innerVar = 'inner only';
    console.log(global);    // OK - found in global scope
    console.log(outerVar);  // OK - found in outer scope
  }
  // innerVar is NOT accessible here
}`,
        example: `// Scope chain demonstration
const globalVar = 'Global';

function outerFn() {
  const outerVar = 'Outer';

  function middleFn() {
    const middleVar = 'Middle';

    function innerFn() {
      const innerVar = 'Inner';
      // Can access ALL variables up the chain
      console.log(innerVar);  // "Inner"
      console.log(middleVar); // "Middle"
      console.log(outerVar);  // "Outer"
      console.log(globalVar); // "Global"
    }

    innerFn();
    // console.log(innerVar); // ReferenceError!
  }

  middleFn();
}

outerFn();

// Block scope with let/const
if (true) {
  let blockScoped = 'only here';
  var functionScoped = 'leaks out!';
}
// console.log(blockScoped); // ReferenceError
console.log(functionScoped); // "leaks out!"`,
        outputExplanation:
          'innerFn can access all variables up the scope chain. Variables declared with let/const are block-scoped, while var leaks out of blocks.',
        interviewQuestions: [
          'What are the different types of scope in JavaScript?',
          'How does the scope chain work?',
          'What is lexical (static) scoping?',
        ],
        commonMistakes: [
          'Accidentally creating global variables by forgetting let/const/var',
          'var leaking out of if/for blocks unexpectedly',
          'Shadowing outer variables with same-name inner variables without realizing it',
        ],
        performanceTips: [
          'Minimize global variables to reduce scope chain lookup time',
          'Cache outer scope variables in local variables if accessed frequently in loops',
          'Use block scope (let/const) to limit variable lifetime and enable garbage collection',
        ],
      },
      {
        id: 'js_callbacks',
        title: 'Callbacks',
        summary: 'Functions passed as arguments for async handling',
        difficulty: 'Beginner',
        definition:
          'A callback is a function passed into another function as an argument, which is then invoked inside the outer function. Callbacks are the oldest pattern for handling asynchronous operations in JavaScript, though Promises and async/await are now preferred.',
        realWorldAnalogy:
          'A callback is like leaving your phone number at a restaurant. You go do other things, and when your table is ready, they "call you back." You passed your "function" (phone number) to the restaurant (async operation).',
        syntax: `function doSomething(callback) {
  // ... do work ...
  callback(result);
}

doSomething((result) => {
  console.log(result);
});`,
        example: `// Basic callback
function fetchData(url: string, callback: (data: any) => void) {
  setTimeout(() => {
    callback({ id: 1, name: 'Alice' });
  }, 1000);
}

fetchData('/api/user', (data) => {
  console.log('User:', data.name);
});

// Callback Hell (why we moved to Promises)
function step1(cb: Function) { setTimeout(() => cb('Step 1 done'), 100); }
function step2(cb: Function) { setTimeout(() => cb('Step 2 done'), 100); }
function step3(cb: Function) { setTimeout(() => cb('Step 3 done'), 100); }

step1((result1: string) => {
  console.log(result1);
  step2((result2: string) => {
    console.log(result2);
    step3((result3: string) => {
      console.log(result3);
      // This nesting is called "callback hell"
    });
  });
});

// Higher-order functions use callbacks
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2); // callback: n => n * 2
const evens = numbers.filter((n) => n % 2 === 0);
console.log(doubled); // [2, 4, 6, 8, 10]
console.log(evens);   // [2, 4]`,
        outputExplanation:
          'Shows basic callbacks, the callback hell problem with nested async operations, and how array methods like map/filter use callbacks.',
        interviewQuestions: [
          'What is a callback function?',
          'What is callback hell and how do you avoid it?',
          'How do Promises solve the callback hell problem?',
        ],
        commonMistakes: [
          'Deep nesting of callbacks making code unreadable (callback hell)',
          'Not handling errors in callbacks — use error-first callback pattern',
          'Forgetting that callbacks can be called synchronously or asynchronously',
        ],
        performanceTips: [
          'Prefer Promises or async/await over callbacks for async operations',
          'Use named functions instead of anonymous callbacks for better stack traces',
          'Avoid creating closures in performance-critical loops',
        ],
      },
      {
        id: 'js_error_handling',
        title: 'Error Handling (try/catch)',
        summary: 'Gracefully handle runtime errors',
        difficulty: 'Intermediate',
        definition:
          'try/catch/finally is JavaScript\'s mechanism for handling runtime errors. The try block contains code that might throw an error, catch handles the error, and finally runs regardless of the outcome. You can also create custom error classes.',
        syntax: `try {
  // risky code
} catch (error) {
  // handle error
} finally {
  // always runs
}`,
        example: `// Basic try/catch
try {
  const data = JSON.parse('invalid json');
} catch (error) {
  console.log('Parse error:', (error as Error).message);
}

// Custom Error class
class ValidationError extends Error {
  field: string;
  constructor(message: string, field: string) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function validateAge(age: number) {
  if (age < 0) throw new ValidationError('Age cannot be negative', 'age');
  if (age > 150) throw new ValidationError('Age is unrealistic', 'age');
  return true;
}

try {
  validateAge(-5);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(error.name + ':', error.message, '(field: ' + error.field + ')');
  }
}

// Async error handling
async function fetchSafe(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch (error) {
    console.error('Fetch failed:', (error as Error).message);
    return null;
  } finally {
    console.log('Fetch attempt completed');
  }
}`,
        outputExplanation:
          'Shows basic error catching, custom error classes with extra properties, instanceof checking, and async error handling with finally.',
        interviewQuestions: [
          'What is the difference between throw and reject?',
          'How do you handle errors in async/await?',
          'When should you create custom error classes?',
        ],
        commonMistakes: [
          'Catching errors silently without logging or re-throwing',
          'Using try/catch for expected control flow instead of if/else',
          'Not handling async errors — unhandled promise rejections crash Node.js',
        ],
        performanceTips: [
          'try/catch has negligible performance cost when no error is thrown',
          'Avoid putting large amounts of code in try blocks — be specific',
          'Use Error Boundaries in React for component-level error handling',
        ],
      },
    ],
  },
  {
    title: 'Advanced Concepts',
    category: 'Advanced Concepts',
    data: [
      {
        id: 'js_closures',
        title: 'Closures',
        summary: 'Functions that remember their scope',
        difficulty: 'Advanced',
        definition:
          'A closure is the combination of a function and the lexical environment within which it was declared. Inner functions have access to variables from their outer function even after the outer function has returned. Closures are fundamental to patterns like data privacy, currying, and memoization.',
        realWorldAnalogy:
          'A closure is like a backpack. When you leave school (outer function returns), you still carry your backpack with all your books (variables) wherever you go. The backpack "closes over" the school environment.',
        syntax: `function outer() {
  let count = 0;
  return function inner() {
    return ++count;
  };
}`,
        example: `// Classic closure: private counter
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
// count is NOT accessible directly — it's private!

// Practical: Memoization
function memoize<T>(fn: (...args: any[]) => T) {
  const cache = new Map<string, T>();
  return (...args: any[]): T => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n: number) => {
  console.log('Computing...');
  return n * n;
});

expensiveCalc(5); // logs "Computing..." -> 25
expensiveCalc(5); // returns 25 instantly (cached)

// React pattern: Event handler factory
const handlePress = (id: string) => () => {
  console.log(\`Pressed item: \${id}\`);
};`,
        outputExplanation:
          'Shows three closure patterns: private state via counter, memoization via cache, and event handler factories for React.',
        interviewQuestions: [
          'Explain closures with a real-world example.',
          'What is the difference between closure and scope?',
          'How do closures cause memory leaks and how to prevent them?',
        ],
        commonMistakes: [
          'The classic loop closure problem with var',
          'Accidentally capturing variables that change later (stale closures in React)',
          'Creating closures in loops that reference loop variables',
        ],
        performanceTips: [
          'Be mindful of memory — closures keep referenced variables alive',
          'Clear references when no longer needed to allow garbage collection',
          'Use WeakMap in memoization to avoid memory leaks',
        ],
      },
      {
        id: 'js_prototypes',
        title: 'Prototypes & Classes',
        summary: 'Inheritance and object-oriented patterns',
        difficulty: 'Advanced',
        definition:
          'Every JavaScript object has a prototype — another object it inherits properties from. ES6 classes are syntactic sugar over prototypal inheritance. Understanding prototypes is key to understanding how JavaScript objects work under the hood.',
        syntax: `class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a sound\`; }
}
class Dog extends Animal {
  speak() { return \`\${this.name} barks\`; }
}`,
        example: `// ES6 Class syntax
class Component {
  state: Record<string, any> = {};

  setState(newState: Record<string, any>) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  render() {
    console.log('State:', this.state);
  }
}

class Counter extends Component {
  constructor() {
    super();
    this.state = { count: 0 };
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }
}

const c = new Counter();
c.increment(); // State: { count: 1 }

// Prototype chain
console.log(c instanceof Counter);  // true
console.log(c instanceof Component); // true`,
        outputExplanation:
          'Demonstrates class inheritance mimicking React\'s class component pattern. Counter extends Component, inheriting setState and render.',
        interviewQuestions: [
          'How does prototypal inheritance differ from classical inheritance?',
          'What is the prototype chain?',
          'How do ES6 classes relate to prototypes?',
        ],
        commonMistakes: [
          'Confusing __proto__ with .prototype',
          'Forgetting to call super() in constructors',
          'Overusing classes when simple objects and functions suffice',
        ],
        performanceTips: [
          'Methods on the prototype are shared — more memory efficient than instance methods',
          'Avoid deep inheritance hierarchies — prefer composition',
          'Use Object.create(null) for pure dictionary objects with no prototype overhead',
        ],
      },
    ],
  },
  {
    title: 'Async',
    category: 'Async',
    data: [
      {
        id: 'js_promises',
        title: 'Promises',
        summary: 'Handle asynchronous operations elegantly',
        difficulty: 'Intermediate',
        definition:
          'A Promise represents a value that may be available now, in the future, or never. It has three states: pending, fulfilled, or rejected. Promises provide .then(), .catch(), and .finally() methods for handling async results and errors in a chainable way.',
        realWorldAnalogy:
          'A Promise is like ordering food at a restaurant. The waiter gives you an order number (promise). Your food is being prepared (pending). Eventually it arrives (fulfilled) or the kitchen is out of ingredients (rejected). You decide what to do in either case.',
        syntax: `const promise = new Promise((resolve, reject) => {
  // async operation
  resolve(result);  // success
  reject(error);    // failure
});

promise.then(onFulfilled).catch(onRejected);`,
        example: `// Creating a promise
const fetchUser = (id: number): Promise<{ name: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ name: 'Alice' });
      else reject(new Error('Invalid ID'));
    }, 1000);
  });
};

// Chaining
fetchUser(1)
  .then(user => \`Hello, \${user.name}\`)
  .then(greeting => console.log(greeting))
  .catch(err => console.error(err.message));

// Promise.all - parallel execution
const fetchMultiple = async () => {
  const [user, posts, comments] = await Promise.all([
    fetch('/api/user').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json()),
  ]);
  return { user, posts, comments };
};

// Promise.allSettled - get all results even if some fail
const results = await Promise.allSettled([
  fetchUser(1),
  fetchUser(-1), // This will reject
]);
results.forEach(result => {
  if (result.status === 'fulfilled') console.log(result.value);
  else console.log('Failed:', result.reason);
});`,
        outputExplanation:
          'Shows promise creation, chaining, parallel execution with Promise.all, and fault-tolerant batch operations with Promise.allSettled.',
        interviewQuestions: [
          'What are the three states of a Promise?',
          'Explain the difference between Promise.all, Promise.allSettled, and Promise.race.',
          'How do you convert a callback-based API to use Promises?',
        ],
        commonMistakes: [
          'Not returning promises inside .then() chains, breaking the chain',
          'Forgetting .catch() leading to unhandled promise rejections',
          'Using Promise.all when one failure shouldn\'t cancel everything',
        ],
        performanceTips: [
          'Use Promise.all for independent async operations to run in parallel',
          'Use Promise.allSettled when you need all results regardless of failures',
          'Avoid creating promises inside loops — batch them instead',
        ],
      },
      {
        id: 'js_async_await',
        title: 'Async/Await',
        summary: 'Write async code that looks synchronous',
        difficulty: 'Intermediate',
        definition:
          'async/await is syntactic sugar over Promises. An async function always returns a Promise. The await keyword pauses execution until the Promise resolves. It makes asynchronous code look and behave like synchronous code, improving readability.',
        realWorldAnalogy:
          'Regular promises are like managing a to-do list with Post-its and callbacks. Async/await is like having a personal assistant who handles each task in order — "await for the coffee to brew, then await for the toast to be ready, then serve breakfast."',
        syntax: `async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}`,
        example: `// Basic async/await
async function getUser(id: number) {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) throw new Error('User not found');
  return response.json();
}

// Error handling with try/catch
async function loadData() {
  try {
    const user = await getUser(1);
    const posts = await fetch(\`/api/posts?userId=\${user.id}\`);
    return { user, posts: await posts.json() };
  } catch (error) {
    console.error('Failed to load:', error);
    return null;
  }
}

// Parallel async operations
async function loadDashboard() {
  const [user, notifications, feed] = await Promise.all([
    getUser(1),
    fetch('/api/notifications').then(r => r.json()),
    fetch('/api/feed').then(r => r.json()),
  ]);
  return { user, notifications, feed };
}

// Async iteration
async function processItems(items: string[]) {
  for (const item of items) {
    await processItem(item); // Sequential
  }
}`,
        outputExplanation:
          'Demonstrates basic usage, error handling, parallel execution pattern, and sequential processing. Note how await with Promise.all achieves parallelism.',
        interviewQuestions: [
          'What does an async function return?',
          'How do you handle errors in async/await?',
          'How do you run multiple async operations in parallel with async/await?',
        ],
        commonMistakes: [
          'Using await in a loop when operations could run in parallel',
          'Forgetting try/catch leading to unhandled errors',
          'Using await at the top level without an async function',
        ],
        performanceTips: [
          'Use Promise.all instead of sequential awaits for independent operations',
          'Avoid async/await in hot paths where raw promises might be faster',
          'Use AbortController to cancel long-running async operations',
        ],
      },
    ],
  },
  {
    title: 'Functional Programming',
    category: 'Functional Programming',
    data: [
      {
        id: 'js_array_methods',
        title: 'map, filter, reduce',
        summary: 'Core functional array transformations',
        difficulty: 'Beginner',
        definition:
          'map transforms each element, filter selects elements matching a condition, and reduce accumulates elements into a single value. These are the cornerstone of functional programming in JavaScript and are used extensively in React Native for rendering lists and computing derived state.',
        syntax: `array.map(item => transform(item));
array.filter(item => condition(item));
array.reduce((acc, item) => combine(acc, item), initial);`,
        example: `interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
  { id: 2, name: 'Book', price: 15, category: 'Education' },
  { id: 3, name: 'Phone', price: 699, category: 'Electronics' },
  { id: 4, name: 'Course', price: 49, category: 'Education' },
];

// map - transform data for display
const productNames = products.map(p => p.name);
// ['Laptop', 'Book', 'Phone', 'Course']

// filter - select electronics
const electronics = products.filter(p => p.category === 'Electronics');
// [{ name: 'Laptop', ... }, { name: 'Phone', ... }]

// reduce - calculate total
const total = products.reduce((sum, p) => sum + p.price, 0);
// 1762

// Chaining: expensive electronics formatted
const result = products
  .filter(p => p.category === 'Electronics')
  .map(p => ({ ...p, label: \`\${p.name} - $\${p.price}\` }))
  .sort((a, b) => b.price - a.price);

// Group by category with reduce
const grouped = products.reduce((acc, p) => {
  acc[p.category] = [...(acc[p.category] || []), p];
  return acc;
}, {} as Record<string, Product[]>);`,
        outputExplanation:
          'Shows practical chaining of map/filter/reduce for e-commerce data: transforming, filtering, totaling, and grouping products.',
        interviewQuestions: [
          'What is the difference between map and forEach?',
          'How would you implement Array.reduce from scratch?',
          'When should you use reduce vs a for loop?',
        ],
        commonMistakes: [
          'Using map for side effects — use forEach instead',
          'Forgetting the initial value in reduce',
          'Mutating the accumulator in reduce instead of returning a new value',
        ],
        performanceTips: [
          'Avoid chaining many operations on huge arrays — combine into a single reduce',
          'Use for...of for simple iterations where functional methods add overhead',
          'Consider using lazy evaluation libraries for very large datasets',
        ],
      },
      {
        id: 'js_spread_rest',
        title: 'Spread & Rest',
        summary: 'Expand and collect elements',
        difficulty: 'Beginner',
        definition:
          'The spread operator (...) expands iterables into individual elements. The rest parameter (...) collects multiple elements into an array. They look identical but work in opposite directions. Spread is used for copying, merging, and passing arguments. Rest is used for function parameters and destructuring.',
        syntax: `// Spread
const newArr = [...arr1, ...arr2];
const newObj = { ...obj1, ...obj2 };

// Rest
const [first, ...rest] = array;
function fn(...args) {}`,
        example: `// Spread: Immutable state updates (React pattern)
const state = { user: 'Alice', theme: 'dark', count: 5 };
const newState = { ...state, count: state.count + 1 };
// { user: 'Alice', theme: 'dark', count: 6 }

// Spread: Merging arrays
const skills = ['React', 'TypeScript'];
const allSkills = [...skills, 'Node.js', 'GraphQL'];

// Spread: Function arguments
const numbers = [5, 2, 8, 1, 9];
const max = Math.max(...numbers); // 9

// Rest: Flexible function parameters
function createLogger(prefix: string, ...messages: string[]) {
  messages.forEach(msg => console.log(\`[\${prefix}] \${msg}\`));
}
createLogger('APP', 'Started', 'Connected', 'Ready');

// Rest: Object destructuring (pick/omit pattern)
const { password, ...safeUser } = { name: 'Alice', email: 'a@b.com', password: '123' };
// safeUser = { name: 'Alice', email: 'a@b.com' }`,
        outputExplanation:
          'Demonstrates immutable updates (crucial for React), array merging, function argument spreading, flexible params with rest, and the pick/omit pattern.',
        interviewQuestions: [
          'What is the difference between spread and rest operators?',
          'Is spread a deep or shallow copy?',
          'How would you deep clone an object without spread?',
        ],
        commonMistakes: [
          'Assuming spread creates a deep copy — it\'s shallow only',
          'Spread order matters: later properties override earlier ones in objects',
          'Using spread in performance-critical loops creating unnecessary copies',
        ],
        performanceTips: [
          'Avoid spreading large arrays unnecessarily in loops',
          'For deep cloning, use structuredClone() instead of nested spread',
          'Be mindful of object spread in render methods creating new references',
        ],
      },
    ],
  },
  {
    title: 'Advanced Logic',
    category: 'Advanced Concepts',
    data: [
      {
        id: 'js_event_loop',
        title: 'Event Loop',
        summary: 'How JavaScript handles concurrency',
        difficulty: 'Advanced',
        definition:
          'JavaScript is single-threaded but handles async operations via the Event Loop. It consists of the Call Stack, Web APIs, Task Queue (Macrotasks), and Microtask Queue. Microtasks (Promises) always run before Macrotasks (setTimeout).',
        realWorldAnalogy:
          'Think of the Event Loop as a waiter in a restaurant. They take an order (Call Stack), give it to the kitchen (Web APIs), and move to the next table. When the food is ready (Task Queue), the waiter picks it up and serves it, but only when they are free (Stack is empty).',
        syntax: `// Microtask (high priority)
console.log('Start');
Promise.resolve().then(() => console.log('Promise'));
setTimeout(() => console.log('Timeout'), 0);
console.log('End');`,
        example: `console.log('1: Script start');

setTimeout(() => {
  console.log('2: setTimeout (macrotask)');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3: promise1 (microtask)');
  })
  .then(() => {
    console.log('4: promise2 (microtask)');
  });

console.log('5: Script end');

// Output order:
// 1: Script start
// 5: Script end
// 3: promise1 (microtask)
// 4: promise2 (microtask)
// 2: setTimeout (macrotask)`,
        outputExplanation:
          'The script runs synchronously first (1, 5). Then the microtask queue is emptied (3, 4). Finally, the next macrotask in the queue is executed (2).',
        interviewQuestions: [
          'What is the difference between a Macrotask and a Microtask?',
          'What happens if a microtask schedules another microtask?',
          'How does the browser rendering relate to the event loop?',
        ],
        commonMistakes: [
          'Thinking setTimeout(..., 0) runs immediately',
          'Blocking the event loop with heavy synchronous work',
          'Not understanding that promises are microtasks',
        ],
        performanceTips: [
          'Keep the Call Stack clear — don\'t perform heavy computation on the main thread',
          'Break large tasks into smaller chunks using requestIdleCallback or setTimeout',
          'Use Web Workers for CPU-intensive tasks to avoid blocking the UI',
        ],
      },
      {
        id: 'js_currying',
        title: 'Currying',
        summary: 'Transform functions into sequences of unary functions',
        difficulty: 'Advanced',
        definition:
          'Currying is a functional programming technique where a function with multiple arguments is transformed into a series of functions that each take a single argument. It allows for partial application and creation of highly reusable utility functions.',
        realWorldAnalogy:
          'Currying is like a progressive dinner party. Instead of getting the whole meal at once, you go to one house for appetizers (1st arg), another for the main course (2nd arg), and another for dessert (3rd arg).',
        syntax: 'const curry = (a) => (b) => (c) => a + b + c;',
        example: `// Basic Currying
const multiply = (a: number) => (b: number) => a * b;
const double = multiply(2);
const triple = multiply(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Practical: Logger Factory
const log = (level: string) => (category: string) => (message: string) => {
  console.log(\`[\${level}] [\${category}] \${message}\`);
};

const errorLog = log('ERROR');
const apiError = errorLog('API');
const authError = errorLog('AUTH');

apiError('Network timeout'); // [ERROR] [API] Network timeout
authError('Invalid credentials'); // [ERROR] [AUTH] Invalid credentials`,
        outputExplanation:
          'Demonstrates how currying allows you to "preset" arguments, creating specialized functions from more generic ones.',
        interviewQuestions: [
          'What are the benefits of currying?',
          'How is currying different from partial application?',
          'Can you write a generic curry function that handles any number of arguments?',
        ],
        commonMistakes: [
          'Over-currying simple functions making them harder to read',
          'Confusing currying with simple nested functions',
          'Not handling argument length correctly in generic curry implementations',
        ],
        performanceTips: [
          'Use currying for configuration factories and reusable UI logic',
          'Be aware that currying creates more function objects and closures',
          'Native bind() is often slower than a simple curried arrow function',
        ],
      },
    ],
  },
  {
    title: 'Modern Features',
    category: 'Advanced Concepts',
    data: [
      {
        id: 'js_modules',
        title: 'ES Modules',
        summary: 'Modularize your code with import/export',
        difficulty: 'Beginner',
        definition:
          'ES Modules (ESM) are the official standard for modularizing JavaScript code. They allow you to break your code into separate files and share functionality using the export and import keywords. ESM supports both default and named exports.',
        realWorldAnalogy:
          'Modules are like Lego sets. Each set is self-contained (a module), but they have connector pieces (exports) that let you combine them with other sets (imports) to build something bigger.',
        syntax: `export const value = 42;
export default function init() {}
import init, { value } from './module';`,
        example: `// mathUtils.ts
export const PI = 3.14159;
export const add = (a: number, b: number) => a + b;
export default class Calculator {
  // implementation
}

// main.ts
import MyCalc, { PI, add as sum } from './mathUtils';

console.log(PI); // 3.14159
console.log(sum(10, 5)); // 15
const calc = new MyCalc();`,
        outputExplanation:
          'Demonstrates named exports, default exports, and renaming imports (aliasing).',
        interviewQuestions: [
          'What is the difference between Default and Named exports?',
          'What is a "barrel file" (index.js) and why use it?',
          'How do ES Modules differ from CommonJS (require/module.exports)?',
        ],
        commonMistakes: [
          'Mixing default and named exports in a confusing way',
          'Circular dependencies between modules',
          'Not using file extensions in imports (depending on environment)',
        ],
        performanceTips: [
          'Use named exports for better tree-shaking support',
          'Avoid huge barrel files that import/export everything',
          'Prefer static imports over dynamic import() when possible',
        ],
      },
      {
        id: 'js_collections',
        title: 'Map & Set',
        summary: 'Modern data structures for better performance',
        difficulty: 'Intermediate',
        definition:
          'Map is a collection of keyed data items, similar to an Object, but it allows keys of any type. Set is a collection of unique values. Both provide better performance than Objects/Arrays for frequent additions, removals, and lookups.',
        realWorldAnalogy:
          'Object is like a traditional dictionary. A Map is like a high-tech database where the "key" could be anything — a fingerprint, a voice print, or a physical key. A Set is like a guest list where no matter how many times you try to sign in, your name only appearing once.',
        syntax: `const map = new Map();
map.set('key', 'value');
const set = new Set([1, 2, 2, 3]); // {1, 2, 3}`,
        example: `// Map for complex keys
const userRoles = new Map<object, string>();
const user1 = { name: 'Alice' };
const user2 = { name: 'Bob' };

userRoles.set(user1, 'admin');
userRoles.set(user2, 'editor');

console.log(userRoles.get(user1)); // 'admin'

// Set for unique values
const tags = new Set(['react', 'js', 'react']);
tags.add('native');
console.log(tags.size); // 3 (duplicates ignored)

// Useful: Remove duplicates from array
const numbers = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(numbers)];
// [1, 2, 3, 4, 5]`,
        outputExplanation:
          'Shows how Map can use objects as keys and how Set automatically handles unique values and deduplicates arrays.',
        interviewQuestions: [
          'When should you use a Map instead of a plain Object?',
          'What is the difference between a Set and an Array?',
          'What are WeakMap and WeakSet and when are they used?',
        ],
        commonMistakes: [
          'Using Object instead of Map when keys are frequently added/removed',
          'Not realizing that Map keys are compared by reference for objects',
          'Trying to use Array methods directly on Map/Set without converting',
        ],
        performanceTips: [
          'Use Map for large collections with frequent lookups',
          'Use Set for fast membership checks (set.has(x) is O(1) vs array.includes(x) is O(n))',
          'Use WeakMap to associate private data with objects without causing memory leaks',
        ],
      },
      {
        id: 'js_optional_chaining',
        title: 'Optional Chaining & Nullish Coalescing',
        summary: 'Safe property access and default values',
        difficulty: 'Beginner',
        definition:
          'Optional chaining (?.) allows you to safely access deeply nested properties without checking each level for null/undefined. Nullish coalescing (??) provides a default value only when the left side is null or undefined (not for other falsy values like 0 or "").',
        syntax: `const city = user?.address?.city;     // undefined if any level is null
const name = user?.name ?? 'Anonymous'; // default only for null/undefined
const first = arr?.[0];                // safe array access
const result = obj?.method?.();        // safe method call`,
        example: `const user = {
  name: 'Alice',
  address: { city: 'NYC', zip: '10001' },
  scores: [95, 87, 92],
  getRole: () => 'admin',
};

// Optional chaining
console.log(user?.address?.city);     // "NYC"
console.log(user?.phone?.number);     // undefined (no crash)
console.log(user?.scores?.[0]);       // 95
console.log(user?.getRole?.());       // "admin"
console.log(user?.missing?.());       // undefined

// Nullish coalescing vs OR
const count = 0;
console.log(count || 10);  // 10 (0 is falsy!)
console.log(count ?? 10);  // 0  (0 is not null/undefined)

const text = '';
console.log(text || 'default');  // "default" (empty string is falsy)
console.log(text ?? 'default');  // ""        (not null/undefined)

// Practical: API response handling
const response = { data: { users: null } };
const users = response?.data?.users ?? [];
console.log(users); // [] (safe default)`,
        outputExplanation:
          'Optional chaining prevents crashes on null/undefined access. Nullish coalescing only defaults for null/undefined, preserving valid falsy values like 0 and "".',
        interviewQuestions: [
          'What is the difference between ?? and ||?',
          'When does optional chaining return undefined?',
          'Can you use optional chaining with function calls?',
        ],
        commonMistakes: [
          'Using || instead of ?? when 0 or "" are valid values',
          'Over-using optional chaining where data is guaranteed to exist',
          'Not realizing ?. short-circuits the entire chain after null/undefined',
        ],
        performanceTips: [
          'Optional chaining is slightly slower than direct access — use only when needed',
          'Prefer validating data at boundaries rather than using ?. everywhere',
          'TypeScript narrows types after null checks, reducing the need for ?..',
        ],
      },
      {
        id: 'js_typeof_instanceof',
        title: 'typeof & instanceof',
        summary: 'Type checking operators',
        difficulty: 'Beginner',
        definition:
          'typeof returns a string indicating the type of the operand (e.g., "string", "number", "object"). instanceof checks if an object is an instance of a particular class or constructor function by checking the prototype chain.',
        syntax: `typeof 'hello'        // "string"
typeof 42             // "number"
typeof null           // "object" (known bug)
[] instanceof Array   // true`,
        example: `// typeof examples
console.log(typeof 'hello');     // "string"
console.log(typeof 42);         // "number"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object" (historical bug!)
console.log(typeof {});         // "object"
console.log(typeof []);         // "object" (arrays are objects)
console.log(typeof function(){}); // "function"
console.log(typeof Symbol());   // "symbol"

// instanceof examples
console.log([] instanceof Array);    // true
console.log([] instanceof Object);   // true
console.log({} instanceof Array);    // false

class Animal {}
class Dog extends Animal {}
const dog = new Dog();
console.log(dog instanceof Dog);     // true
console.log(dog instanceof Animal);  // true

// Better type checking
console.log(Array.isArray([]));      // true (most reliable)
console.log(Array.isArray({}));      // false`,
        outputExplanation:
          'typeof returns the primitive type as a string. instanceof checks the prototype chain. Note the famous typeof null === "object" bug and use Array.isArray for arrays.',
        interviewQuestions: [
          'Why does typeof null return "object"?',
          'How does instanceof work under the hood?',
          'What is the best way to check if something is an array?',
        ],
        commonMistakes: [
          'Using typeof to check for arrays — it returns "object"',
          'Relying on typeof null being "object" without checking for it',
          'instanceof does not work across different frames/windows (different global scopes)',
        ],
        performanceTips: [
          'typeof is very fast — it is a compile-time check',
          'Use Array.isArray() instead of instanceof Array for reliability',
          'Use discriminated unions in TypeScript instead of runtime type checks',
        ],
      },
      {
        id: 'js_generators',
        title: 'Generators & Iterators',
        summary: 'Pausable functions and custom iteration',
        difficulty: 'Advanced',
        definition:
          'Generators are functions that can be paused and resumed using the yield keyword. They return an iterator with a next() method. Generators are useful for lazy evaluation, creating custom iterables, and managing complex async flows.',
        realWorldAnalogy:
          'A generator is like a bookmark in a book. Each time you call next(), you read to the next bookmark (yield) and pause. You can come back later and continue reading from exactly where you left off.',
        syntax: `function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
}
const gen = myGenerator();
gen.next(); // { value: 1, done: false }`,
        example: `// Basic generator
function* countUp(start: number) {
  let i = start;
  while (true) {
    yield i++;
  }
}

const counter = countUp(1);
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
console.log(counter.next().value); // 3

// Finite generator
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
const first10 = Array.from({ length: 10 }, () => fib.next().value);
console.log(first10);
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// Custom iterable with Symbol.iterator
const range = {
  *[Symbol.iterator]() {
    for (let i = 1; i <= 5; i++) yield i;
  },
};

for (const n of range) {
  console.log(n); // 1, 2, 3, 4, 5
}
console.log([...range]); // [1, 2, 3, 4, 5]`,
        outputExplanation:
          'Generators produce values lazily on demand. The fibonacci generator creates an infinite sequence, and we take only the first 10 values. Custom iterables work with for...of and spread.',
        interviewQuestions: [
          'What is the difference between a generator and a regular function?',
          'How does yield differ from return?',
          'What are practical use cases for generators?',
        ],
        commonMistakes: [
          'Forgetting the * in function declaration (function* not function)',
          'Infinite generators without proper exit conditions in consumers',
          'Not understanding that generators are lazy — they compute values on demand',
        ],
        performanceTips: [
          'Use generators for processing large datasets lazily without loading all into memory',
          'Generators are great for pagination and streaming data',
          'Prefer async iterators (for await...of) for async data streams',
        ],
      },
      {
        id: 'js_object_methods',
        title: 'Object Methods',
        summary: 'Essential Object utility methods',
        difficulty: 'Intermediate',
        definition:
          'JavaScript provides several static methods on Object for working with objects: Object.keys(), Object.values(), Object.entries() for iteration; Object.assign() for merging; Object.freeze() for immutability; Object.fromEntries() for constructing objects.',
        syntax: `Object.keys(obj);       // ['key1', 'key2']
Object.values(obj);     // ['value1', 'value2']
Object.entries(obj);    // [['key1', 'value1'], ['key2', 'value2']]
Object.freeze(obj);     // makes object immutable
Object.assign({}, a, b); // merge objects`,
        example: `const user = { name: 'Alice', age: 30, role: 'dev' };

// keys, values, entries
console.log(Object.keys(user));    // ["name", "age", "role"]
console.log(Object.values(user));  // ["Alice", 30, "dev"]
console.log(Object.entries(user)); // [["name","Alice"],["age",30],["role","dev"]]

// Transform with entries + fromEntries
const uppercased = Object.fromEntries(
  Object.entries(user).map(([key, val]) => [key, String(val).toUpperCase()])
);
console.log(uppercased); // { name: "ALICE", age: "30", role: "DEV" }

// Freeze — true immutability
const config = Object.freeze({ api: 'https://api.dev', timeout: 5000 });
config.api = 'changed'; // silently fails (or throws in strict mode)
console.log(config.api); // "https://api.dev"

// Assign — shallow merge
const defaults = { theme: 'light', lang: 'en' };
const prefs = { theme: 'dark' };
const merged = Object.assign({}, defaults, prefs);
console.log(merged); // { theme: "dark", lang: "en" }

// hasOwnProperty check
for (const [key, value] of Object.entries(user)) {
  console.log(key + ': ' + value);
}`,
        outputExplanation:
          'Shows how to iterate over objects, transform key-value pairs, freeze objects for immutability, and merge objects with defaults.',
        interviewQuestions: [
          'What is the difference between Object.freeze() and Object.seal()?',
          'How do you deep freeze an object?',
          'What is the difference between Object.assign and spread?',
        ],
        commonMistakes: [
          'Thinking Object.freeze is a deep freeze — nested objects are still mutable',
          'Using for...in without hasOwnProperty check (iterates prototype chain)',
          'Object.assign mutates the first argument — always pass {} as first arg',
        ],
        performanceTips: [
          'Object.keys/values/entries create new arrays — cache if used repeatedly',
          'Use Map instead of Object for frequent additions/removals',
          'Object.freeze has no performance cost and helps engines optimize',
        ],
      },
      {
        id: 'js_shallow_deep_copy',
        title: 'Shallow vs Deep Copy',
        summary: 'Understanding reference vs value copying',
        difficulty: 'Intermediate',
        definition:
          'A shallow copy creates a new object but copies only the top-level properties. Nested objects still share the same reference. A deep copy creates a completely independent clone with no shared references at any level. This distinction is critical for state management in React.',
        realWorldAnalogy:
          'A shallow copy is like photocopying a folder — you get a new folder but the documents inside are the same physical papers. A deep copy is like retyping every document — everything is completely independent.',
        syntax: `// Shallow copy
const shallow = { ...original };
const shallow2 = Object.assign({}, original);

// Deep copy
const deep = JSON.parse(JSON.stringify(original));
const deep2 = structuredClone(original);`,
        example: `// Shallow copy problem
const user = { name: 'Alice', address: { city: 'NYC' } };
const shallow = { ...user };
shallow.name = 'Bob';         // Does NOT affect original
shallow.address.city = 'LA';  // DOES affect original!

console.log(user.name);           // "Alice" (independent)
console.log(user.address.city);   // "LA"   (shared reference!)

// Deep copy solutions
const original = { name: 'Alice', address: { city: 'NYC' }, hobbies: ['reading'] };

// Method 1: structuredClone (modern)
const deep1 = structuredClone(original);
deep1.address.city = 'LA';
console.log(original.address.city); // "NYC" (independent)

// Method 2: JSON (loses functions, Date, undefined)
const deep2 = JSON.parse(JSON.stringify(original));

// React state update pattern (immutable updates)
const [state, setState] = useState({ user: { name: 'Alice', scores: [90, 85] } });
// Correct: create new nested objects
setState(prev => ({
  ...prev,
  user: { ...prev.user, scores: [...prev.user.scores, 95] },
}));`,
        outputExplanation:
          'Shallow copy with spread only copies the first level. Nested objects still share references. structuredClone creates a true deep copy. React requires immutable updates for proper re-rendering.',
        interviewQuestions: [
          'What is the difference between shallow copy and deep copy?',
          'Why does the spread operator not create a deep copy?',
          'How do you perform immutable state updates in React?',
        ],
        commonMistakes: [
          'Assuming spread or Object.assign creates a deep copy',
          'JSON.parse/stringify loses functions, undefined, Date objects, and circular refs',
          'Mutating nested state in React causing stale renders',
        ],
        performanceTips: [
          'Use structuredClone for deep copies in modern environments',
          'In React, use immer library for easier immutable updates',
          'Only deep copy when necessary — shallow copy is much faster',
        ],
      },
      {
        id: 'js_pass_by_value_ref',
        title: 'Pass by Value vs Reference',
        summary: 'How JavaScript passes data to functions',
        difficulty: 'Intermediate',
        definition:
          'Primitives (string, number, boolean, null, undefined, symbol, bigint) are passed by value — a copy is made. Objects, arrays, and functions are passed by reference — the function receives a reference to the same memory location. Modifying an object parameter inside a function affects the original.',
        syntax: `// Pass by value (primitives)
let a = 5;
function change(x) { x = 10; }
change(a);
console.log(a); // 5 (unchanged)

// Pass by reference (objects)
let obj = { name: 'Alice' };
function modify(o) { o.name = 'Bob'; }
modify(obj);
console.log(obj.name); // 'Bob' (changed!)`,
        example: `// Primitives: pass by value
let num = 10;
let str = 'hello';

function modifyPrimitive(n: number, s: string) {
  n = 100;
  s = 'world';
  console.log('Inside:', n, s); // 100, "world"
}

modifyPrimitive(num, str);
console.log('Outside:', num, str); // 10, "hello"

// Objects: pass by reference
const user = { name: 'Alice', age: 25 };
const arr = [1, 2, 3];

function modifyObject(obj: any, a: number[]) {
  obj.name = 'Bob';    // Modifies original
  a.push(4);           // Modifies original
  console.log('Inside:', obj.name, a);
}

modifyObject(user, arr);
console.log('Outside:', user.name, arr);
// "Bob", [1, 2, 3, 4] — both changed!

// Reassigning the reference does NOT affect original
function reassign(obj: any) {
  obj = { name: 'Charlie' }; // New object, loses reference
  console.log('Inside reassign:', obj.name); // "Charlie"
}

reassign(user);
console.log('After reassign:', user.name); // "Bob" (unchanged)

// Comparing references
const a = { x: 1 };
const b = { x: 1 };
const c = a;
console.log(a === b); // false (different references)
console.log(a === c); // true  (same reference)`,
        outputExplanation:
          'Primitives are copied — changes inside a function do not affect the original. Objects pass a reference — property modifications affect the original. But reassigning the entire parameter creates a new reference.',
        interviewQuestions: [
          'Is JavaScript pass by value or pass by reference?',
          'What happens when you reassign an object parameter inside a function?',
          'How do you prevent a function from modifying an object argument?',
        ],
        commonMistakes: [
          'Thinking JavaScript has true pass by reference — it passes references by value',
          'Accidentally mutating objects/arrays passed as arguments',
          'Not understanding why a === b is false for objects with the same content',
        ],
        performanceTips: [
          'Pass objects to functions when they are large to avoid expensive copying',
          'Use Object.freeze to prevent accidental mutations',
          'In React, always create new objects/arrays for state updates',
        ],
      },
      {
        id: 'js_higher_order_functions',
        title: 'Higher Order Functions',
        summary: 'Functions that operate on other functions',
        difficulty: 'Intermediate',
        definition:
          'A higher-order function is a function that takes one or more functions as arguments or returns a function. Common examples include map, filter, reduce, forEach, sort, and custom utilities like debounce and throttle.',
        realWorldAnalogy:
          'A higher-order function is like a manager. The manager does not do the work directly — they delegate tasks to workers (callback functions). They might take a worker as input (parameter) or assign a new worker to a task (return a function).',
        syntax: `// Takes a function as argument
array.map(item => transform(item));

// Returns a function
function multiplier(factor) {
  return (number) => number * factor;
}`,
        example: `// 1. Functions as arguments
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(evens);   // [2, 4]
console.log(sum);     // 15

// 2. Functions that return functions
function createGreeter(greeting: string) {
  return (name: string) => \`\${greeting}, \${name}!\`;
}

const sayHello = createGreeter('Hello');
const sayHi = createGreeter('Hi');
console.log(sayHello('Alice')); // "Hello, Alice!"
console.log(sayHi('Bob'));      // "Hi, Bob!"

// 3. Custom higher-order function
function repeat(fn: (i: number) => void, times: number) {
  for (let i = 0; i < times; i++) {
    fn(i);
  }
}
repeat((i) => console.log('Run ' + i), 3);

// 4. Composition
const compose = (...fns: Function[]) => (x: any) =>
  fns.reduceRight((acc, fn) => fn(acc), x);

const addOne = (x: number) => x + 1;
const double = (x: number) => x * 2;
const addOneThenDouble = compose(double, addOne);
console.log(addOneThenDouble(5)); // 12 ((5+1)*2)`,
        outputExplanation:
          'Shows four patterns: passing functions as callbacks (map/filter/reduce), factory functions that return functions, a custom repeat utility, and function composition.',
        interviewQuestions: [
          'What is a higher-order function? Give examples.',
          'How are map, filter, and reduce higher-order functions?',
          'What is function composition?',
        ],
        commonMistakes: [
          'Confusing higher-order functions with callbacks (callbacks are the argument, HOFs are the receiver)',
          'Creating nested closures that are hard to debug',
          'Not understanding that methods like setTimeout are also higher-order functions',
        ],
        performanceTips: [
          'Chain map/filter sparingly on large arrays — use a single reduce instead',
          'Higher-order functions can be optimized by the JS engine just like regular functions',
          'Avoid creating unnecessary closures in performance-critical code paths',
        ],
      },
      {
        id: 'js_pure_functions',
        title: 'Pure Functions & Immutability',
        summary: 'Predictable functions with no side effects',
        difficulty: 'Intermediate',
        definition:
          'A pure function always returns the same output for the same input and has no side effects (no modifying external state, no API calls, no console.log). Immutability means never modifying existing data — always creating new copies. Both are fundamental to React and Redux.',
        realWorldAnalogy:
          'A pure function is like a vending machine: same coin + same button = same product every single time. It does not affect anything outside itself and does not depend on anything that might change.',
        syntax: `// Pure function
const add = (a, b) => a + b;

// Impure function (side effect)
let total = 0;
const addToTotal = (n) => { total += n; return total; };`,
        example: `// PURE: Same input = same output, no side effects
const add = (a: number, b: number) => a + b;
const toUpper = (str: string) => str.toUpperCase();
const getFullName = (first: string, last: string) => first + ' ' + last;

console.log(add(2, 3));        // Always 5
console.log(toUpper('hello')); // Always "HELLO"

// IMPURE: Side effects or external dependencies
let counter = 0;
const impureIncrement = () => ++counter; // Modifies external state
const impureRandom = () => Math.random(); // Different output each time
const impureLog = (x: number) => { console.log(x); return x; }; // Side effect

// Immutable patterns (essential for React)
const original = [1, 2, 3];

// Bad: mutating
// original.push(4); // Don't do this in React!

// Good: creating new array
const withFour = [...original, 4];
const withoutFirst = original.slice(1);
const doubled = original.map(n => n * 2);

console.log(original);   // [1, 2, 3] (unchanged)
console.log(withFour);   // [1, 2, 3, 4]
console.log(withoutFirst); // [2, 3]

// Immutable object updates
const user = { name: 'Alice', age: 25 };
const updated = { ...user, age: 26 }; // New object
console.log(user.age);    // 25 (unchanged)
console.log(updated.age); // 26`,
        outputExplanation:
          'Pure functions are predictable and testable. Immutable patterns create new copies instead of modifying originals, which is required for React state to trigger re-renders correctly.',
        interviewQuestions: [
          'What is a pure function?',
          'Why does React require immutable state updates?',
          'What are the benefits of pure functions?',
        ],
        commonMistakes: [
          'Mutating arrays with push/pop/splice instead of creating new arrays in React state',
          'Thinking console.log is not a side effect — it is!',
          'Mutating function arguments (objects/arrays) without realizing it',
        ],
        performanceTips: [
          'Pure functions can be memoized safely since same input = same output',
          'Immutable data enables cheap change detection in React (reference comparison)',
          'Use immer library for convenient immutable updates on complex nested state',
        ],
      },
      {
        id: 'js_iife',
        title: 'IIFE (Immediately Invoked Function Expression)',
        summary: 'Functions that execute as soon as they are defined',
        difficulty: 'Intermediate',
        definition:
          'An IIFE is a function that runs immediately after it is defined. It creates a private scope, preventing variables from polluting the global namespace. While less common in modern ES modules, IIFEs are still used in specific patterns and are a popular interview topic.',
        syntax: `(function() {
  // code runs immediately
  // variables here are private
})();

// Arrow function IIFE
(() => {
  console.log('Runs immediately');
})();`,
        example: `// Basic IIFE
(function() {
  const secret = 'hidden';
  console.log('IIFE executed, secret:', secret);
})();
// console.log(secret); // ReferenceError — not accessible

// IIFE with return value
const result = (() => {
  const a = 10;
  const b = 20;
  return a + b;
})();
console.log(result); // 30

// Module pattern (before ES modules)
const Counter = (() => {
  let count = 0; // Private variable

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
})();

Counter.increment();
Counter.increment();
Counter.increment();
console.log(Counter.getCount()); // 3
// console.log(count); // ReferenceError — private!

// IIFE for async in non-async contexts
(async () => {
  const data = await fetch('https://api.example.com/data');
  console.log('Data fetched');
})();`,
        outputExplanation:
          'The IIFE runs immediately, creating private scope. The Counter module pattern uses an IIFE to create private state with a public API. Async IIFE is useful for top-level await.',
        interviewQuestions: [
          'What is an IIFE and when would you use it?',
          'How does an IIFE create private variables?',
          'Are IIFEs still relevant in modern JavaScript with ES modules?',
        ],
        commonMistakes: [
          'Forgetting the wrapping parentheses — causes a syntax error',
          'Using IIFE when an ES module would be more appropriate',
          'Not understanding that IIFE variables are garbage collected after execution',
        ],
        performanceTips: [
          'IIFEs are useful for one-time initialization logic',
          'In React Native with Metro bundler, ES modules handle scoping — IIFE is rarely needed',
          'Async IIFE is a clean pattern for top-level async operations',
        ],
      },
      {
        id: 'js_strict_mode',
        title: 'Strict Mode',
        summary: 'Opt in to a restricted variant of JavaScript',
        difficulty: 'Beginner',
        definition:
          'Strict mode enables a stricter version of JavaScript that catches common errors: prevents accidental globals, disallows duplicate parameter names, makes "this" undefined in regular functions (instead of window), and throws errors for silent failures. ES modules and classes are always in strict mode.',
        syntax: `'use strict';
// Entire file is strict

function myFunc() {
  'use strict';
  // Only this function is strict
}`,
        example: `'use strict';

// 1. No accidental globals
// x = 10; // ReferenceError: x is not defined

// 2. Assignment to read-only property throws
// const obj = Object.freeze({ name: 'Alice' });
// obj.name = 'Bob'; // TypeError in strict mode (silent in non-strict)

// 3. this is undefined in regular functions
function showThis() {
  console.log(this); // undefined (not window/global)
}
showThis();

// 4. No duplicate parameters
// function add(a, a) {} // SyntaxError in strict mode

// 5. No with statement
// with (Math) { } // SyntaxError

// 6. Variables cannot be deleted
let y = 10;
// delete y; // SyntaxError

// In React Native, modules are already strict by default
// because Metro bundler uses ES modules

console.log('Strict mode active');
console.log('typeof this:', typeof this); // "undefined"`,
        outputExplanation:
          'Strict mode throws errors for mistakes that would otherwise fail silently. React Native code runs in strict mode by default via ES modules.',
        interviewQuestions: [
          'What does strict mode do in JavaScript?',
          'How is "this" different in strict mode?',
          'Is React Native code in strict mode by default?',
        ],
        commonMistakes: [
          'Not realizing that all ES modules (including React Native files) are automatically strict',
          'Placing "use strict" after other statements — it must be first',
          'Testing code in non-strict browser console and getting different behavior in production',
        ],
        performanceTips: [
          'Strict mode can enable certain engine optimizations',
          'It prevents common bugs at compile time rather than runtime',
          'Always use strict mode in new projects (ES modules do this automatically)',
        ],
      },
      {
        id: 'js_debounce_throttle',
        title: 'Debounce vs Throttle',
        summary: 'Rate-limiting function execution patterns',
        difficulty: 'Intermediate',
        definition:
          'Debounce delays execution until a pause in activity (e.g., wait 300ms after the user stops typing). Throttle limits execution to at most once per interval (e.g., at most once every 200ms during scrolling). Both are essential for performance optimization.',
        realWorldAnalogy:
          'Debounce is like an elevator: it waits until people stop entering before closing the doors. Throttle is like a traffic light: it lets one car through every few seconds regardless of how many are waiting.',
        syntax: `// Debounce: wait until user stops (search input)
const debouncedSearch = debounce(search, 300);

// Throttle: execute at most once per interval (scroll)
const throttledScroll = throttle(onScroll, 200);`,
        example: `// Debounce implementation
function debounce(fn: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Throttle implementation
function throttle(fn: Function, limit: number) {
  let inThrottle = false;
  return (...args: any[]) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// React Native usage examples:
// 1. Search input (debounce)
const handleSearch = debounce((text: string) => {
  console.log('API call for:', text);
}, 500);
// User types: "R" "Re" "Rea" "Reac" "React"
// API call only fires once for "React" (after 500ms pause)

// 2. Scroll handler (throttle)
const handleScroll = throttle((offset: number) => {
  console.log('Scroll position:', offset);
}, 200);
// Fires at most every 200ms during scroll, not every frame

// 3. Button press (throttle to prevent double-tap)
const handleSubmit = throttle(() => {
  console.log('Form submitted');
}, 1000);`,
        outputExplanation:
          'Debounce waits for inactivity — ideal for search inputs. Throttle limits frequency — ideal for scroll/resize handlers. Both prevent excessive function calls.',
        interviewQuestions: [
          'What is the difference between debounce and throttle?',
          'When would you use debounce vs throttle?',
          'How would you implement debounce from scratch?',
        ],
        commonMistakes: [
          'Using debounce for scroll handlers (use throttle — you want regular updates)',
          'Using throttle for search inputs (use debounce — you want the final value)',
          'Creating new debounced/throttled functions inside render (use useRef or useMemo)',
        ],
        performanceTips: [
          'In React Native, debounce search inputs to reduce API calls',
          'Throttle onScroll handlers to prevent frame drops',
          'Use leading: true option in throttle for immediate first call',
        ],
      },
      {
        id: 'js_web_storage',
        title: 'Web Storage & Data Persistence',
        summary: 'localStorage, sessionStorage, and React Native storage',
        difficulty: 'Beginner',
        definition:
          'Web Storage provides localStorage (persists after browser closes) and sessionStorage (cleared when tab closes). In React Native, there is no localStorage — use AsyncStorage or MMKV instead. Understanding storage options is important for offline support, caching, and user preferences.',
        syntax: `// Web (browser)
localStorage.setItem('key', 'value');
const val = localStorage.getItem('key');

// React Native
await AsyncStorage.setItem('key', JSON.stringify(data));
const data = JSON.parse(await AsyncStorage.getItem('key'));`,
        example: `// React Native storage patterns
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save user preferences
async function savePreferences(prefs: { theme: string; lang: string }) {
  await AsyncStorage.setItem('user_prefs', JSON.stringify(prefs));
}

// Load user preferences
async function loadPreferences() {
  const json = await AsyncStorage.getItem('user_prefs');
  return json ? JSON.parse(json) : { theme: 'light', lang: 'en' };
}

// Cache API response
async function fetchWithCache(url: string, ttl = 5 * 60 * 1000) {
  const cacheKey = 'cache_' + url;
  const cached = await AsyncStorage.getItem(cacheKey);

  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < ttl) {
      console.log('Cache hit');
      return data;
    }
  }

  console.log('Cache miss — fetching');
  const res = await fetch(url);
  const data = await res.json();
  await AsyncStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
  return data;
}

// Storage comparison
console.log('localStorage: persists forever, sync, 5-10MB');
console.log('sessionStorage: per-tab, sync, 5-10MB');
console.log('AsyncStorage: persists, async, unlimited');
console.log('MMKV: persists, sync, fast, encrypted option');`,
        outputExplanation:
          'Shows AsyncStorage patterns for React Native: user preferences, API caching with TTL, and a comparison of storage options across platforms.',
        interviewQuestions: [
          'What is the difference between localStorage and sessionStorage?',
          'Why can you not use localStorage in React Native?',
          'What are the alternatives to AsyncStorage in React Native?',
        ],
        commonMistakes: [
          'Storing sensitive data (tokens, passwords) in unencrypted storage',
          'Storing large amounts of data in AsyncStorage — use SQLite or MMKV',
          'Forgetting that AsyncStorage is asynchronous (returns Promises)',
        ],
        performanceTips: [
          'Use MMKV for synchronous, high-performance key-value storage in React Native',
          'Batch multiple AsyncStorage operations with multiSet/multiGet',
          'Cache frequently accessed values in memory (Zustand/state) to avoid repeated disk reads',
        ],
      },
      {
        id: 'js_template_literals',
        title: 'Template Literals',
        summary: 'Powerful string interpolation',
        difficulty: 'Beginner',
        definition:
          'Template literals are string literals allowing embedded expressions. You can use multi-line strings and string interpolation features with them. They are enclosed by the backtick (`) character.',
        realWorldAnalogy:
          'Template literals are like a "Fill-in-the-blanks" card. Instead of cutting out individual words and taping them together (concatenation), you have a pre-printed card with slots for the dynamic info.',
        syntax: 'const greet = `Hello ${name}!`;',
        example: `const user = 'Alice';
const items = 5;

// Interpolation
const message = \`User \${user} has \${items} items in their cart.\`;

// Multi-line
const email = \`
  Hi \${user},
  Welcome to RNLearningHub!
  Happy coding!
\`;

// Tagged templates (advanced)
function highlight(strings: any, ...values: any[]) {
  return strings.reduce((acc: string, str: string, i: number) => {
    return \`\${acc}\${str}**\${values[i] || ''}**\`;
  }, '');
}
const tagResult = highlight\`Hello \${user}!\`; 
// "Hello **Alice**!"`,
        outputExplanation:
          'Shows basic interpolation, multi-line strings, and how tagged templates can be used to process strings.',
        interviewQuestions: [
          'What is string interpolation?',
          'How do you create multi-line strings before ES6?',
          'What are tagged template literals?',
        ],
        commonMistakes: [
          'Forgetting to use backticks instead of single/double quotes',
          'Not escaping backticks if needed within the string',
          'Overcomplicating simple strings with template literals',
        ],
        performanceTips: [
          'Template literals are generally as fast as concatenation',
          'Use them for complex strings to improve readability',
          'Tagged templates can have a slight overhead; use them when needed for DSLs (like styled-components)',
        ],
      },
    ],
  },
];

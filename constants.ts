import type { Course, LearningPath, Problem, LeaderboardUser } from './types';

export const COURSES: Course[] = [
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    description: 'Master the fundamentals of React 18, including hooks, components, and state management.',
    longDescription: 'This course provides a deep dive into the core concepts of React. You will learn how to build dynamic and responsive web applications from scratch. We cover everything from setting up your development environment to deploying a full-featured application. Topics include JSX, component lifecycle, state and props, handling events, conditional rendering, lists and keys, and an in-depth look at essential hooks like useState, useEffect, and useContext.',
    instructor: 'Jane Doe',
    tags: ['React', 'Frontend', 'JavaScript'],
    lessons: [
      { id: 'l1', title: 'Introduction to React', duration: 15 },
      { id: 'l2', title: 'Components and Props', duration: 30 },
      { id: 'l3', title: 'State and Lifecycle', duration: 45 },
      { id: 'l4', title: 'Handling Events', duration: 25 },
      { id: 'l5', title: 'Introduction to Hooks', duration: 60 },
    ],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    whatYouWillLearn: [
        'Build dynamic user interfaces with React components.',
        'Manage application state effectively using React Hooks.',
        'Understand the React component lifecycle.',
        'Create and style components using modern techniques.',
    ]
  },
  {
    id: 'advanced-typescript',
    title: 'Advanced TypeScript',
    description: 'Explore advanced TypeScript features like generics, decorators, and mapped types.',
    longDescription: 'Take your TypeScript skills to the next level. This course is for developers who are already comfortable with the basics of TypeScript and want to learn how to write more robust, scalable, and maintainable code. We will explore advanced topics such as generics, utility types, decorators, mapped types, conditional types, and how to integrate TypeScript with popular frameworks like Node.js and React.',
    instructor: 'John Smith',
    tags: ['TypeScript', 'Programming', 'Web Dev'],
    lessons: [
      { id: 'l1', title: 'Generics Deep Dive', duration: 50 },
      { id: 'l2', title: 'Utility Types', duration: 40 },
      { id: 'l3', title: 'Decorators and Metadata', duration: 60 },
      { id: 'l4', title: 'Advanced Type Inference', duration: 35 },
    ],
    image: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    whatYouWillLearn: [
        'Utilize generics to create reusable and type-safe components.',
        'Master advanced TypeScript features like conditional types and decorators.',
        'Improve code quality and maintainability in large projects.',
        'Integrate TypeScript effectively with backend and frontend frameworks.',
    ]
  },
  {
    id: 'ai-integration',
    title: 'AI Integration with Gemini',
    description: 'Learn how to integrate the powerful Gemini API into your web applications for amazing features.',
    longDescription: 'Unlock the power of artificial intelligence in your projects. This course teaches you how to leverage the Google Gemini API to build intelligent applications. You will learn how to perform various tasks such as text generation, summarization, function calling, and multimodal interactions. We will build several mini-projects to demonstrate practical use cases, including an AI-powered chatbot and a content generation tool.',
    instructor: 'Alex Ray',
    tags: ['AI', 'Gemini API', 'Node.js'],
    lessons: [
      { id: 'l1', title: 'Introduction to Gemini API', duration: 20 },
      { id: 'l2', title: 'Text Generation and Prompts', duration: 45 },
      { id: 'l3', title: 'Multimodal Capabilities', duration: 55 },
      { id: 'l4', title: 'Building an AI Chatbot', duration: 70 },
    ],
    image: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    whatYouWillLearn: [
        'Understand the fundamentals of the Gemini API.',
        'Implement text generation and content creation features.',
        'Work with multimodal inputs like images and text.',
        'Build a practical, AI-powered application from scratch.',
    ]
  },
    {
    id: 'data-structures',
    title: 'Data Structures & Algorithms',
    description: 'A comprehensive guide to common data structures and algorithms using JavaScript.',
    longDescription: 'Master the building blocks of efficient software. This course provides a thorough review of essential data structures and algorithms, implemented in JavaScript. You will learn about arrays, linked lists, stacks, queues, trees, graphs, and hash tables. For algorithms, we cover sorting, searching, and recursion. Each topic is explained with clear visualizations and practical coding examples to solidify your understanding.',
    instructor: 'Emily White',
    tags: ['Algorithms', 'Data Structures', 'CS Fundamentals'],
    lessons: [
      { id: 'l1', title: 'Arrays and Linked Lists', duration: 60 },
      { id: 'l2', title: 'Stacks and Queues', duration: 45 },
      { id: 'l3', title: 'Trees and Graphs', duration: 90 },
      { id: 'l4', title: 'Sorting Algorithms', duration: 75 },
    ],
    image: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    whatYouWillLearn: [
        'Implement common data structures from scratch.',
        'Analyze the time and space complexity of algorithms.',
        'Solve common coding interview problems.',
        'Write more efficient and performant code.',
    ]
  },
];

// Fix: Added missing properties `duration`, `courseCount`, and `stages` to LearningPath objects to match the `LearningPath` type.
export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer Path',
    description: 'The complete path to becoming a proficient frontend developer, starting with the fundamentals and moving to advanced frameworks.',
    duration: 'Approx. 3 Months',
    courseCount: 3,
    courses: ['react-fundamentals', 'advanced-typescript', 'ai-integration'],
    stages: [
      {
        title: 'Stage 1: Core Frontend',
        steps: [
          {
            id: 'fe-s1-1',
            title: 'React Fundamentals',
            description: 'Master the fundamentals of React 18, including hooks, components, and state management.',
            courseId: 'react-fundamentals',
          },
        ],
      },
      {
        title: 'Stage 2: Advanced Development',
        steps: [
          {
            id: 'fe-s2-1',
            title: 'Advanced TypeScript',
            description: 'Explore advanced TypeScript features like generics, decorators, and mapped types.',
            courseId: 'advanced-typescript',
          },
        ],
      },
      {
        title: 'Stage 3: AI Integration',
        steps: [
          {
            id: 'fe-s3-1',
            title: 'AI Integration with Gemini',
            description: 'Learn how to integrate the powerful Gemini API into your web applications for amazing features.',
            courseId: 'ai-integration',
          },
        ],
      },
    ],
  },
  {
    id: 'cs-fundamentals',
    title: 'Computer Science Fundamentals',
    description: 'Strengthen your core computer science knowledge with this path focused on data structures, algorithms, and theory.',
    duration: 'Approx. 2 Months',
    courseCount: 2,
    courses: ['data-structures', 'advanced-typescript'],
    stages: [
      {
        title: 'Stage 1: Core Concepts',
        steps: [
          {
            id: 'cs-s1-1',
            title: 'Data Structures & Algorithms',
            description: 'A comprehensive guide to common data structures and algorithms using JavaScript.',
            courseId: 'data-structures',
          },
        ],
      },
      {
        title: 'Stage 2: Advanced Application',
        steps: [
          {
            id: 'cs-s2-1',
            title: 'Advanced TypeScript',
            description: 'Explore advanced TypeScript features like generics, decorators, and mapped types.',
            courseId: 'advanced-typescript',
          },
        ],
      },
    ],
  },
];

// Helper function and data for problem generation
const titleSubjects = [
    { subject: 'Subarray Sum', tags: ['arrays', 'dynamic-programming'], difficulties: ['Easy', 'Medium'] },
    { subject: 'Unique Paths in Grid', tags: ['dynamic-programming', 'matrix'], difficulties: ['Medium', 'Hard'] },
    { subject: 'Binary Tree Traversal', tags: ['tree', 'dfs', 'bfs'], difficulties: ['Easy', 'Medium'] },
    { subject: 'Graph Connectivity', tags: ['graph', 'dfs', 'union-find'], difficulties: ['Medium', 'Hard'] },
    { subject: 'String Permutations', tags: ['strings', 'recursion', 'backtracking'], difficulties: ['Medium'] },
    { subject: 'Linked List Cycle Detection', tags: ['linked-list', 'two-pointers'], difficulties: ['Easy'] },
    { subject: 'Array Duplicate Detection', tags: ['arrays', 'hash-table'], difficulties: ['Easy'] },
    { subject: 'Matrix Rotation', tags: ['matrix', 'arrays'], difficulties: ['Medium'] },
    { subject: 'Min/Max Stack', tags: ['stack', 'data-structures'], difficulties: ['Medium'] },
    { subject: 'LRU Cache', tags: ['hash-table', 'linked-list', 'design'], difficulties: ['Hard'] },
    { subject: 'Merge K Sorted Lists', tags: ['heap', 'linked-list'], difficulties: ['Hard'] },
    { subject: 'Longest Common Subsequence', tags: ['dynamic-programming', 'strings'], difficulties: ['Medium'] },
    { subject: 'Validate Palindrome', tags: ['strings', 'two-pointers'], difficulties: ['Easy']},
    { subject: 'Implement Queue with Stacks', tags: ['stack', 'queue', 'design'], difficulties: ['Easy']},
    { subject: 'Find Median from Data Stream', tags: ['heap', 'design'], difficulties: ['Hard']},
    { subject: 'Serialize/Deserialize Binary Tree', tags: ['tree', 'design', 'dfs'], difficulties: ['Hard']}
];

const languages = ['C', 'Python', 'Java', 'JavaScript'];
const statuses: Array<'solved' | 'attempted' | 'todo'> = ['todo', 'todo', 'todo', 'todo', 'todo', 'attempted', 'attempted', 'solved'];

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generatedProblems: Problem[] = [];

for (let i = 15; i <= 700; i++) {
    const subjectInfo = getRandom(titleSubjects);
    const problem: Problem = {
        id: i,
        title: subjectInfo.subject,
        difficulty: getRandom(subjectInfo.difficulties) as 'Easy' | 'Medium' | 'Hard',
        language: getRandom(languages),
        tags: [...new Set([...subjectInfo.tags, getRandom(['algorithms', 'data-structures'])])],
        status: getRandom(statuses),
        problemStatement: `Given a collection of items, find the one that meets a certain criteria related to ${subjectInfo.subject}.`,
        examples: [{ input: 'Example Input', output: 'Example Output' }],
        constraints: ['Constraint 1', 'Constraint 2'],
        solution: { code: 'Example solution code here.', explanation: 'Example explanation here.' },
        templateCode: `// Start your ${getRandom(languages)} code here for ${subjectInfo.subject}`
    };
    generatedProblems.push(problem);
}


export const PROBLEMS: Problem[] = [
    { 
      id: 1, 
      title: "Simple I/O and Arithmetic", 
      difficulty: "Easy", 
      language: "C", 
      tags: ["fundamentals", "I/O"], 
      status: "solved",
      problemStatement: "Write a C program that prompts the user to enter two integers, calculates their sum and product, and prints the results.",
      examples: [
        { input: "15\n7", output: "Sum: 22\nProduct: 105" }
      ],
      constraints: ["Inputs will be standard integers.", "Use scanf() for input and printf() for output."],
      solution: {
        code: `#include <stdio.h>\n\nint main() {\n    int num1, num2;\n    printf("Enter first integer: ");\n    scanf("%d", &num1);\n    printf("Enter second integer: ");\n    scanf("%d", &num2);\n    printf("Sum: %d\\n", num1 + num2);\n    printf("Product: %d\\n", num1 * num2);\n    return 0;\n}`,
        explanation: "This problem uses the fundamental printf() for output and scanf() for input. The core logic involves simple addition and multiplication operators."
      },
      templateCode: `#include <stdio.h>\n\nint main() {\n    // Write your solution here\n    return 0;\n}`
    },
    { 
      id: 2, 
      title: "Even/Odd Check", 
      difficulty: "Easy", 
      language: "C", 
      tags: ["conditionals", "math"], 
      status: "attempted",
      problemStatement: "Write a C program that takes an integer input from the user and determines whether the number is even or odd.",
      examples: [
        { input: "42", output: "The number 42 is Even." },
        { input: "17", output: "The number 17 is Odd." }
      ],
      constraints: ["The input will be a standard C integer.", "The logic must use the modulus operator (%)."],
      solution: {
        code: `#include <stdio.h>\n\nint main() {\n    int num;\n    printf("Enter an integer: ");\n    scanf("%d", &num);\n    if (num % 2 == 0) {\n        printf("The number %d is Even.\\n", num);\n    } else {\n        printf("The number %d is Odd.\\n", num);\n    }\n    return 0;\n}`,
        explanation: "The most straightforward way to check for even or odd is by using the modulus operator (%). If a number divided by 2 has a remainder of 0, it's even; otherwise, it's odd. An if-else statement handles the decision."
      },
      templateCode: `#include <stdio.h>\n\nint main() {\n    // Write your solution here\n    return 0;\n}`
    },
    { 
        id: 3, 
        title: "Two Sum", 
        difficulty: "Easy", 
        language: "Python", 
        tags: ["arrays", "hash-table"], 
        status: "todo",
        problemStatement: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
        examples: [
            { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]" }
        ],
        constraints: ["Each input would have exactly one solution.", "You may not use the same element twice."],
        solution: {
            code: `def twoSum(nums, target):\n    num_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in num_map:\n            return [num_map[complement], i]\n        num_map[num] = i`,
            explanation: "A hash map is used to store numbers we've seen and their indices. For each number, we check if its complement (target - number) is already in the map. This achieves an O(n) time complexity."
        },
        templateCode: `def twoSum(nums, target):\n    # Write your solution here\n    pass`
    },
    ...generatedProblems.slice(0, 700 - 3) // ensure total is 700
];

const firstNames = ['Sarah', 'Alex', 'Priya', 'David', 'Maria', 'Kevin', 'Lisa', 'Tom', 'Emily', 'Chris', 'Jessica', 'Mike'];
const lastNames = ['Chen', 'Johnson', 'Patel', 'Wilson', 'Garcia', 'Brown', 'Wong', 'Black', 'Smith', 'Lee', 'Davis', 'Miller'];

const generateUsers = (count: number): LeaderboardUser[] => {
  const users: LeaderboardUser[] = [];
  for (let i = 0; i < count; i++) {
    const firstName = getRandom(firstNames);
    const lastName = getRandom(lastNames);
    const name = `${firstName} ${lastName}`;
    const username = `@${firstName.toLowerCase()}${lastName.charAt(0).toLowerCase()}`;
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
    const problemsSolved = 512 - i * 3 - Math.floor(Math.random() * 10);
    
    users.push({
      rank: i + 1,
      name,
      username,
      initials,
      problemsSolved,
      accuracy: Math.floor(85 + Math.random() * 15),
      streak: Math.floor(Math.random() * 100),
      points: problemsSolved * 4,
    });
  }
  return users;
};

export const LEADERBOARD_USERS: LeaderboardUser[] = generateUsers(50);
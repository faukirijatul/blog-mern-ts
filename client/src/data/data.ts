import { Blog } from "../types";

export const blogData: Blog[] = [
  {
    id: "1",
    title: "Understanding React and TypeScript",
    author: "John Doe",
    createdAt: "2025-01-20",
    category: "React",
    thumbnail:
      "https://cdn0-production-images-kly.akamaized.net/-TEclxm-ie--UAcQc9XlZFZFxF0=/1200x675/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4982180/original/042673500_1730095950-cara-menggambar-pemandangan.jpg",
    content: `
      <h2>React and TypeScript: A Perfect Match</h2>
      <p>
        React and <strong>TypeScript</strong> are a great combination for building modern web applications.
        TypeScript brings <em>type safety</em> to JavaScript, while React provides a powerful framework for building user interfaces.
      </p>
    `,
    likes: 120,
    comments: [
      {
        id: "c1",
        user: "Jane Smith",
        text: "This article is amazing! It cleared up a lot of my doubts.",
        createdAt: "2025-01-21T14:00:00Z",
        likes: 25,
        replies: [
          {
            id: "r1",
            user: "John Doe",
            text: "Thank you, Jane! I'm glad it was helpful.",
            createdAt: "2025-01-21T14:30:00Z",
            likes: 10,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Getting Started with Tailwind CSS",
    author: "Emily Clark",
    createdAt: "2025-01-18",
    category: "CSS",
    thumbnail: "https://media.istockphoto.com/id/1454140302/id/foto/pemandangan-indah-dari-pemandangan-indah-warna-matahari-terbenam-dan-gunung-batu.jpg?s=612x612&w=0&k=20&c=faxy8-19Js8Ve8i70wm52wVLTXRT8yJfw5BFKUpXoN0=",
    content: `
      <h2>Tailwind CSS: Utility-First Framework</h2>
      <p>
        Tailwind CSS is a <strong>utility-first</strong> CSS framework that allows you to build modern and responsive designs with ease.
      </p>
    `,
    likes: 85,
    comments: [
      {
        id: "c2",
        user: "Michael Brown",
        text: "This is the easiest explanation of Tailwind CSS I've read!",
        createdAt: "2025-01-19T10:00:00Z",
        likes: 18,
        replies: [
          {
            id: "r2",
            user: "Emily Clark",
            text: "Thank you, Michael! That means a lot!",
            createdAt: "2025-01-19T10:30:00Z",
            likes: 5,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Mastering JavaScript ES6+ Features",
    author: "Sarah Johnson",
    createdAt: "2025-01-15",
    category: "JavaScript",
    thumbnail: "https://media.istockphoto.com/id/1437687096/id/foto/pemandangan-indah-danau-yang-tenang-dengan-pegunungan-di-latar-belakang-pada-hari-yang-cerah.jpg?s=170667a&w=0&k=20&c=iE9IDpMHkDZmdOILaR1lsFjhrTdzj246lebaZfn1YUA=",
    content: `
      <h2>JavaScript ES6+ Features You Should Know</h2>
      <p>
        ES6 and beyond introduced powerful new features to JavaScript, including arrow functions, promises, and async/await.
      </p>
    `,
    likes: 95,
    comments: [
      {
        id: "c3",
        user: "David Green",
        text: "Great article! The examples were spot on.",
        createdAt: "2025-01-16T09:00:00Z",
        likes: 10,
        replies: [
          {
            id: "r3",
            user: "Sarah Johnson",
            text: "Thanks, David! I'm glad you enjoyed it.",
            createdAt: "2025-01-16T09:30:00Z",
            likes: 3,
          },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Building REST APIs with Node.js",
    author: "Michael Brown",
    createdAt: "2025-01-10",
    category: "Node.js",
    thumbnail: "https://media.istockphoto.com/id/1337141245/id/foto/matahari-terbenam-yang-kabur-di-atas-danau-mcdonald-taman-nasional-gletser.jpg?s=612x612&w=0&k=20&c=NKH0a6gWafcuHlJ1oqAJU-yUlX1tQOeEr7vdLSgqWQw=",
    content: `
      <h2>Node.js and Express: The Perfect Duo</h2>
      <p>
        Learn how to create scalable REST APIs using Node.js and Express, covering routing, middleware, and error handling.
      </p>
    `,
    likes: 110,
    comments: [
      {
        id: "c4",
        user: "Lisa Wang",
        text: "This helped me a lot with my project. Thank you!",
        createdAt: "2025-01-11T12:00:00Z",
        likes: 20,
        replies: [
          {
            id: "r4",
            user: "Michael Brown",
            text: "You're welcome, Lisa! Good luck with your project.",
            createdAt: "2025-01-11T12:30:00Z",
            likes: 8,
          },
        ],
      },
    ],
  },
  {
    id: "5",
    title: "Understanding MongoDB for Beginners",
    author: "Lisa Wang",
    createdAt: "2025-01-08",
    category: "MongoDB",
    thumbnail: "https://images.pexels.com/photos/414523/pexels-photo-414523.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    content: `
      <h2>Introduction to MongoDB</h2>
      <p>
        This article explains the basics of MongoDB, a NoSQL database, and how it differs from relational databases.
      </p>
    `,
    likes: 75,
    comments: [
      {
        id: "c5",
        user: "John Doe",
        text: "A very clear introduction to MongoDB. Thanks for sharing!",
        createdAt: "2025-01-09T11:00:00Z",
        likes: 12,
        replies: [
          {
            id: "r5",
            user: "Lisa Wang",
            text: "Thanks, John! I'm happy you found it useful.",
            createdAt: "2025-01-09T11:30:00Z",
            likes: 4,
          },
        ],
      },
    ],
  },
  {
    id: "6",
    title: "Introduction to Next.js Framework",
    author: "David Green",
    createdAt: "2025-01-05",
    category: "Next.js",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s",
    content: `
      <h2>Why Choose Next.js?</h2>
      <p>
        Next.js is a React-based framework that supports server-side rendering, static site generation, and other modern features.
      </p>
    `,
    likes: 130,
    comments: [
      {
        id: "c6",
        user: "Emily Clark",
        text: "This article gave me the confidence to start using Next.js!",
        createdAt: "2025-01-06T10:00:00Z",
        likes: 22,
        replies: [
          {
            id: "r6",
            user: "David Green",
            text: "That's great to hear, Emily! Best of luck with your projects.",
            createdAt: "2025-01-06T10:30:00Z",
            likes: 6,
          },
        ],
      },
    ],
  },
];

export const dummyUser = {
    id: "user1",
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "https://static.republika.co.id/uploads/images/detailnews/foto-profil-_170704110636-890.jpg",
  };
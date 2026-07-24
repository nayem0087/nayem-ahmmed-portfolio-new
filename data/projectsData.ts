export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  image: string;
  challenges: string;
  futurePlans: string;
}

export const allProjects: Project[] = [
  {
    id: 'the-digi-tools',
    title: 'The Digi Tools',
    description: 'This is a platform where you can buy different types of digital tools.',
    tags: ['TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS'],
    link: 'https://digi-tools-interfaces.netlify.app/',
    github: 'https://github.com/Nayem0087/assignment-06',
    image: '/digitools.jpg',
    challenges: 'Handling complex state management across multiple digital tool categories and ensuring fast load times.',
    futurePlans: 'Adding a user dashboard, secure payment gateway integration, and customer reviews system.',
  },
  {
    id: 'keenkeeper',
    title: 'KeenKeeper',
    description: 'An app built with Next.js 15 and Tailwind CSS, offering real-time chatting, collaboration, comments, and so on.',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'WebSockets'],
    link: 'https://my-keen-keeper-app-pi.vercel.app/',
    github: 'https://github.com/nayem0087/my-keen-keeper-app',
    image: '/keenkeeper.jpg',
    challenges: 'Implementing real-time synchronization for chatting and handling concurrent user sessions smoothly.',
    futurePlans: 'Integrating end-to-end encryption for chat messages and voice/video calling features.',
  },
  {
    id: 'the-book-vibe',
    title: 'The Book Vibe',
    description: 'A modern platform built with Next.js and Tailwind CSS. Offers a chance to buy interesting books of novels or storybooks, also you can read them online.',
    tags: ['Next.js', 'React', 'Tailwind CSS'],
    link: 'https://bok-vibe-project.vercel.app/',
    github: 'https://github.com/nayem0087/book-vibe-stores',
    image: '/bookVibe.png',
    challenges: 'Building an intuitive online e-reader layout that supports smooth pagination and custom typography settings.',
    futurePlans: 'Adding an audiobook streaming option and personalized book recommendation algorithms.',
  },
  {
    id: 'portfolio-v1',
    title: 'Developer Portfolio',
    description: 'A highly optimized, animated developer portfolio featuring dark/light modes and interactive UI components.',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    link: '#',
    github: 'https://github.com/nayem0087',
    image: '/digitools.jpg',
    challenges: 'Optimizing Framer Motion layout animations and maintaining smooth performance across mobile devices.',
    futurePlans: 'Adding a blog section and an interactive admin CMS dashboard.',
  },
];
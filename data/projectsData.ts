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
    id: 'the-venture-connect',
    title: 'The Venture Connect',
    description: 'A role-based platform where founders can create opportunities, collaborators can apply, and admins can manage the entire ecosystem.',
    tags: ['TypeScript', 'Next.js', 'Node.js', 'React.js', 'MongoDB', 'Express.js'],
    link: 'https://venture-connect-client.vercel.app',
    github: 'https://github.com/nayem0087/venture-connect-client',
    image: '/venture-connect.jpeg',
    challenges: 'Implementing a role-based authentication system with Founder, Collaborator, and Admin roles, along with separate dashboards, permissions, and management workflows for each user type.',
    futurePlans: 'Enhancing the platform with a more powerful management system, advanced analytics, real-time notifications, improved collaboration features, and overall performance optimizations.',
  },
  {
    id: 'the-nexus-gear',
    title: 'The Nexus Gear',
    description: 'An e-commerce platform for tech enthusiasts, featuring product browsing, secure authentication, shopping cart functionality, and a seamless online shopping experience.',
    tags: ['TypeScript', 'Next.js', 'Node.js', 'React.js', 'MongoDB', 'Express.js'],
    link: 'https://nexus-gear-pink.vercel.app',
    github: 'https://github.com/nayem0087/nexus-gear',
    image: '/nexus.jpeg',
    challenges: 'Implementing secure authentication, role-based access control, dynamic product management, cart and checkout workflows, and maintaining a responsive user experience across devices.',
    futurePlans: 'Adding advanced inventory management, order tracking, payment gateway integration, analytics dashboards, customer reviews, and enhanced admin controls.',
  },
  {
    id: 'the-pawnest-project',
    title: 'The Pawnest Project',
    description: 'A pet adoption platform that helps users discover, adopt, and manage pets while supporting shelters through a streamlined adoption process.',
    tags: ['TypeScript', 'Next.js', 'Node.js', 'React.js', 'MongoDB', 'Express.js'],
    link: 'https://pawnest-project.vercel.app',
    github: 'https://github.com/nayem0087/pawnest-project',
    image: '/pawnest-project.jpeg',
    challenges: 'Implementing role-based dashboards for Admin and Users, managing pet listings, adoption requests, donation campaigns, and secure access control across the platform.',
    futurePlans: 'Adding advanced pet search and matching, real-time notifications, enhanced admin controls, analytics dashboards, and a more powerful pet management system.',
  },
  {
    id: 'the-focus-agent',
    title: 'The Focus Agent',
    description: 'An AI-powered productivity platform that helps users automate tasks, interact with intelligent agents, and streamline workflows through a modern and user-friendly interface.',
    tags: ['TypeScript', 'Next.js', 'Node.js', 'React.js', 'MongoDB', 'Express.js'],
    link: 'https://focus-agent-client.vercel.app',
    github: 'https://github.com/nayem0087/focus-agent-client',
    image: '/focus.png',
    challenges: 'Building an agentic AI workflow, managing real-time AI interactions, integrating LLM APIs, handling conversation state, and ensuring secure and efficient data processing across the platform.',
    futurePlans: 'Adding multi-agent collaboration, advanced memory management, workflow automation templates, team workspaces, analytics dashboards, and support for additional AI models.',
  },
  {
    id: 'the-digi-tools',
    title: 'The Digi Tools',
    description: 'This is a platform where you can buy different types of digital tools.',
    tags: ['JavaScript', 'Next.js', 'Node.js', 'Tailwind CSS'],
    link: 'https://digi-tools-interfaces.netlify.app',
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
];
# 🚀 Nayem Ahmmed | Developer Portfolio

> A highly optimized, interactive, and fully responsive personal portfolio website showcasing my skills, educational background, and web development projects. Built with modern web technologies.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)

---

## 🔗 Live Demo
**[Insert Your Live Portfolio Link Here]**

---

## ✨ Key Features

* 🌓 **Dark & Light Mode Toggle:** Seamless theme switching with system preference detection and local storage persistence.
* ⚡ **Next.js App Router:** Utilizes the latest Next.js file-system-based routing for blazing-fast page loads and dynamic routes (e.g., `/projects/[id]`).
* 🎨 **Interactive UI & Animations:** Smooth scroll effects, hover states, and page transitions powered by **Framer Motion**.
* 📱 **Fully Responsive Design:** A mobile-first approach ensuring a pixel-perfect layout across all devices.
* 🎓 **Grid & Timeline Layouts:** A custom-built, modern two-column layout for Educational Qualifications and Online Courses.
* 🚧 **Custom 404 Page:** A professionally designed, animated error page guiding users back safely.
* 🛠️ **Modular Architecture:** Clean code structure with reusable UI components and separated data layers.

---

## 🌐 Portfolio Sections Overview

* **Navbar Section (`Navbar.tsx`):**  
  A sticky navigation bar that stays fixed at the top during scrolling. It provides seamless navigation across different sections of the portfolio along with a theme switcher.

* **Hero Section (`Hero.tsx`):**  
  The primary landing view of the portfolio featuring an attractive introduction. It highlights your role as a developer with engaging typography and quick call-to-action buttons.

* **About Section (`About.tsx`):**  
  Provides a brief professional background, personal journey, and passion for web development. It gives visitors a clear insight into who you are as a creator.

* **Skills & Tech Stack Sections (`Skills.tsx` & `TechStack.tsx`):**  
  Showcases your technical expertise and proficiency in modern frameworks and languages. It lists core tools like Next.js, TypeScript, and Tailwind CSS with clean visual badges.

* **Projects Section (`Projects.tsx` & `ProjectCard.tsx`):**  
  Features selected works with image previews, short descriptions, and tech tags. It includes direct links to live demos, GitHub repositories, and dedicated detail pages.

* **Qualification Section (`Qualification.tsx`):**  
  Highlights your educational milestones, certifications, and academic background. It uses an organized layout to showcase your continuous learning path.

* **Get In Touch Section (`Contact.tsx`):**  
  A dedicated contact section allowing visitors to easily reach out to you. It includes a clean message form and social links to encourage professional inquiries and collaborations.

* **Footer Section (`Footer.tsx`):**  
  The bottom section of the portfolio containing social media links, copyright information, and quick contact details. It leaves a lasting professional impression on visitors.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Framework** | Next.js (App Router), React 18 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Icons** | Lucide React, React Icons |
| **Deployment** | Vercel / Netlify |

---

## 📂 Project Structure

```text
NAYEM-AHMMED-PORTFOLIO/
├── app/
│   ├── globals.css           # Global styles and Tailwind directives
│   ├── layout.tsx            # Root layout containing Navbar & Footer
│   ├── page.tsx              # Main Landing Page
│   ├── not-found.tsx         # Custom 404 Error Page
│   └── projects/             
│       ├── page.tsx          # All Projects Grid Page
│       └── [id]/page.tsx     # Dynamic Project Details Page
├── components/               # Reusable UI components (Navbar, Hero, Contact, ProjectCard, etc.)
├── data/                     
│   └── projectsData.ts       # Centralized JSON/TS data for projects
└── public/                   # Static assets (images, icons)
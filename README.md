# 🛍️ Product Store

A modern, responsive e-commerce application built with Next.js that provides a seamless shopping experience with advanced features like theme switching, cart management, and smooth view transitions.

## ✨ Features

### 🎨 **Theme System**
- **Light/Dark/System themes** with automatic system preference detection
- **Persistent theme selection** across browser sessions
- **Theme toggle button** in the navigation bar

### 🛒 **Shopping Cart**
- **Add/Remove items** from product cards and detail pages
- **Quantity management** with real-time updates
- **Persistent cart** using localStorage
- **Cart preview modal** on hover or click of cart icon
- **Quick actions** - clear cart, go to full cart page

### 🖼️ **Product Experience**
- **Product grid** with responsive design
- **Detailed product pages** with images, descriptions, and reviews
- **Image optimization** with Next.js Image component
- **Server-side rendering** for fast loading

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/subhang-vini/my-app.git
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Technical Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Styling**: CSS Modules with CSS Custom Properties
- **State Management**: React Context API with useReducer
- **Data Fetching**: Server-side rendering with caching
- **Image Optimization**: Next.js Image component
- **Theme System**: CSS Variables with localStorage persistence
- **View Transitions**: Next.js experimental View Transitions API
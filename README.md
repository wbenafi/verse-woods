

# Verse Woods 🌲

A modern writing application built with Next.js for capturing and organizing your lyrics, ideas, and creative thoughts.

## This is a AI generate README.md, it's not a source of truth

## ✨ Features

- **🔐 Authentication** - Secure user authentication with Supabase
- **📝 Writing Dashboard** - Clean interface for managing your ideas and lyrics
- **🎨 Modern UI** - Beautiful components built with Radix UI and Tailwind CSS
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **🌙 Custom Typography** - Enhanced with Fraunces variable font
- **⚡ Real-time Updates** - Live synchronization of your content
- **🗂️ Organization** - Easy categorization and management of your creative works

## 🚀 Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Database**: [Supabase](https://supabase.com/)
- **Authentication**: Supabase Auth
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd verse-woods
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   
   Make sure you have the following table in your Supabase database:
   ```sql
   CREATE TABLE idea (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     created_by UUID REFERENCES auth.users(id),
     title TEXT,
     content TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
verse-woods/
├── app/                    # Next.js App Router
│   ├── (global)/          # Global route group
│   ├── auth/              # Authentication pages
│   ├── fonts/             # Custom font files
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── sidebar/          # Navigation components
│   └── ui/               # Reusable UI components
├── contexts/             # React contexts
├── hooks/                # Custom hooks
├── lib/                  # Utility functions
├── utils/                # Utility functions and configs
│   └── supabase/         # Supabase client configurations
└── database.types.ts     # TypeScript database types
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 UI Components

The project uses a comprehensive set of UI components built with Radix UI primitives:

- **Layout**: Card, Separator, Aspect Ratio
- **Navigation**: Menubar, Navigation Menu, Breadcrumb
- **Form**: Input, Textarea, Select, Checkbox, Radio Group
- **Feedback**: Alert, Toast, Progress, Loading Spinner
- **Overlay**: Dialog, Popover, Hover Card, Tooltip
- **Data Display**: Table, Tabs, Accordion, Collapsible

## 🔐 Authentication

The app uses Supabase Auth for user management:

- Email/password authentication
- Session management with React Context
- Protected routes and user-specific content
- Secure server-side authentication checks

## 📝 Writing Features

- Create and edit ideas/lyrics
- Real-time saving and synchronization
- Timestamp tracking for creation and updates
- User-specific content management
- Clean, distraction-free writing interface

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support and questions, please create an issue in the repository.

---

**Happy writing!** 🌲✍️ 
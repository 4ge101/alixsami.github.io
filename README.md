# Shahid - Portfolio Website

A modern, high-performance portfolio website featuring stunning animations and smooth interactions.

## 🚀 Features

- **Cinematic Intro Animation** - Portal-style zoom effect with GSAP
- **Smooth Scrolling** - Lenis smooth scroll integration
- **Kinetic Typography** - Interactive text with physics-based animations
- **Fluid Particle Background** - Canvas-based particle system
- **Custom Cursor** - Enhanced user experience
- **Fully Responsive** - Mobile-first design
- **Production Optimized** - Code splitting, lazy loading, and performance optimizations

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **GSAP** - Animations
- **Framer Motion** - React animations
- **Lenis** - Smooth scrolling
- **Radix UI** - Accessible components

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Netlify (Recommended)

1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository to Netlify
3. Deploy automatically (configuration in `netlify.toml`)

### Manual Build

```bash
npm run build
# Deploy the `dist` folder to your hosting provider
```

## 🎨 Customization

### Update Personal Information

1. **Name & Title**: Edit `src/components/Intro.tsx` and `src/components/Hero.tsx`
2. **Meta Tags**: Update `index.html` for SEO
3. **Content**: Modify components in `src/components/`
4. **Colors**: Adjust theme in `tailwind.config.ts`

### Environment Variables

Create `.env` file for environment-specific configuration:

```env
VITE_API_URL=your_api_url
VITE_CONTACT_EMAIL=your_email
```

## 📊 Performance Optimizations

✅ **Code Splitting** - Vendor, animations, and UI chunks separated  
✅ **React.memo** - Expensive components memoized  
✅ **Lazy Loading** - Components loaded on demand  
✅ **Minification** - Terser with console removal  
✅ **Image Optimization** - Responsive images  
✅ **CSS Optimization** - Code splitting enabled  
✅ **Cache Headers** - Static assets cached for 1 year  
✅ **Security Headers** - XSS, clickjacking protection  

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

## 📁 Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # Reusable UI components
│   │   ├── Intro.tsx   # Landing intro animation
│   │   ├── Hero.tsx    # Hero section
│   │   └── ...
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── netlify.toml        # Netlify configuration
├── vite.config.ts      # Vite configuration
└── tailwind.config.ts  # Tailwind configuration
```

## 🎯 Key Components

### Intro Component
- Portal-style entrance animation
- Scroll-triggered zoom effect
- Prevents background scrolling
- Shows once per session

### Hero Component
- Kinetic typography with mouse interaction
- Canvas particle system
- Responsive design
- Smooth animations

### SmoothScroll Component
- Lenis integration
- GSAP ScrollTrigger sync
- Smooth page transitions

## 🐛 Troubleshooting

**Animations not working?**
- Clear browser cache
- Check console for errors
- Verify GSAP and Lenis are installed

**Build fails?**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node version (18+ required)

**Slow performance?**
- Reduce particle count in Hero component
- Disable animations on low-end devices
- Check browser DevTools Performance tab

## 📝 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Shahid - Software Engineer

---

Built with ❤️ using React, TypeScript, and modern web technologies

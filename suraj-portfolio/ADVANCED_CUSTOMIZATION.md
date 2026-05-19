# Advanced Portfolio Customization

## 🎨 Color Theme Options

### Replace Dark Red with Blue

Search and replace throughout `src/App.jsx`:

```
red-600    → blue-600
red-500    → blue-500
red-400    → blue-400
red-900    → blue-900
```

### Gradient Variations

**Vibrant Orange-Red**:
```jsx
from-orange-600 to-red-500
```

**Purple Gradient**:
```jsx
from-purple-600 to-pink-500
```

**Cyan-Blue**:
```jsx
from-cyan-500 to-blue-600
```

## 🌟 Adding New Sections

### Add a Blog Section

```jsx
const BlogSection = () => {
  const blogs = [
    {
      title: "Building Modern Web Apps",
      date: "May 2026",
      category: "React",
      excerpt: "Learn best practices for modern React development...",
      link: "#",
    },
    // Add more blogs
  ];

  return (
    <section id="blog" className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12">
          Latest Articles
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((blog, index) => (
            <motion.a
              key={index}
              href={blog.link}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-red-900/20 border border-red-900/30 hover:border-red-600/50 transition"
            >
              <span className="text-sm text-red-400">{blog.category}</span>
              <h3 className="text-xl font-bold text-white mt-2">
                {blog.title}
              </h3>
              <p className="text-gray-400 text-sm mt-2">{blog.excerpt}</p>
              <p className="text-gray-500 text-xs mt-4">{blog.date}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
```

### Add a Testimonials Section

```jsx
const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "Suraj is an exceptional developer. Delivered our project on time with great quality.",
      author: "Client Name",
      company: "Company",
      avatar: "👤",
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          What Clients Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-red-900/20 border border-red-900/30"
            >
              <p className="text-gray-300 italic mb-4">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

## 🎬 Advanced Animation Techniques

### Parallax Scroll Effect

```jsx
import { useScroll, useTransform } from "framer-motion";

const ParallaxSection = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <motion.div style={{ opacity, scale }}>
      {/* Your content */}
    </motion.div>
  );
};
```

### Staggered List Animation

```jsx
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

<motion.ul variants={container} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.li key={item.id} variants={item}>
      {item.text}
    </motion.li>
  ))}
</motion.ul>
```

### Rotating Icon Animation

```jsx
const RotatingIcon = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <FaCode size={32} />
  </motion.div>
);
```

## 🔧 Form Enhancement

### Add Form Validation

```jsx
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // Send form data
      console.log("Form submitted:", formData);
      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-300 font-medium mb-2">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-4 py-3 bg-black/50 border rounded-lg ${
            errors.name ? "border-red-500" : "border-red-900/30"
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      {/* Similar for email and message */}
    </form>
  );
};
```

### Add EmailJS Integration

```jsx
import emailjs from "@emailjs/browser";

const handleSubmit = (e) => {
  e.preventDefault();

  emailjs
    .send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      "YOUR_PUBLIC_KEY"
    )
    .then(() => {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    })
    .catch((error) => console.error("Error:", error));
};
```

## 🎨 Styling Enhancements

### Add Bento Grid Layout for Projects

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
  {projects.map((project, index) => (
    <motion.div
      key={index}
      className={`${
        index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
      } p-6 rounded-2xl bg-red-900/20 border border-red-900/30`}
    >
      {/* Project content */}
    </motion.div>
  ))}
</div>
```

### Custom Button Variants

```jsx
// Primary Button
<button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-full font-bold text-white hover:shadow-lg hover:shadow-red-600/50 transition">
  Click Me
</button>

// Secondary Button
<button className="px-6 py-3 border-2 border-red-600 rounded-full font-bold text-red-400 hover:bg-red-900/20 transition">
  Click Me
</button>

// Tertiary Button
<button className="px-6 py-3 bg-red-900/20 border border-red-900/30 rounded-full font-bold text-red-300 hover:border-red-600/50 transition">
  Click Me
</button>
```

## 📊 Adding Charts/Graphs

### Chart.js Integration

```bash
npm install chart.js react-chartjs-2
```

```jsx
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const SkillsChart = () => {
  const data = {
    labels: ["React", "Node.js", "Python", "TypeScript"],
    datasets: [
      {
        label: "Proficiency",
        data: [90, 85, 80, 88],
        backgroundColor: "rgba(220, 38, 38, 0.3)",
        borderColor: "rgba(220, 38, 38, 1)",
      },
    ],
  };

  return <Bar data={data} />;
};
```

## 🔐 SEO Optimization

### Meta Tags Enhancement

```jsx
// In a new hook: useSEO.js
export const useSEO = ({ title, description, image, url }) => {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      description
    );
  }, [title, description]);
};
```

### Structured Data (Schema.org)

```jsx
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Suraj Kumar",
  url: "https://yourportfolio.com",
  image: "https://yourportfolio.com/profile.jpg",
  sameAs: [
    "https://github.com/suraj",
    "https://linkedin.com/in/suraj",
  ],
};
```

## 🚀 Performance Optimization

### Image Lazy Loading

```jsx
<img
  src="/image.jpg"
  alt="Description"
  loading="lazy"
  className="w-full h-full object-cover"
/>
```

### Code Splitting

```jsx
import { lazy, Suspense } from "react";

const BlogSection = lazy(() => import("./BlogSection"));

<Suspense fallback={<div>Loading...</div>}>
  <BlogSection />
</Suspense>
```

### Dynamic Imports for Heavy Libraries

```jsx
const handleOpenModal = async () => {
  const { Modal } = await import("./HeavyModal");
  // Use Modal
};
```

## 📱 PWA Setup

### Add Service Worker

```jsx
// In main.jsx
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
```

---

**Pro Tips:**
- Use DevTools Performance tab to identify bottlenecks
- Test animations on low-end devices
- Always optimize images before uploading
- Keep components small and focused
- Use React.memo for expensive components
- Profile with Lighthouse regularly

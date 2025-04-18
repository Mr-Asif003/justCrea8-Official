import React, { useEffect, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import heroImg from '../assets/images/heroImg.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/themeC';
const trendingBlogs = [
  { id: 1, tag: "Student", createdDate: "20/12/2003", blogTitle: "First Blog", blogSummary: "Summary of the first blog." },
  { id: 2, tag: "Professor", createdDate: "21/12/2003", blogTitle: "Second Blog", blogSummary: "Insights from the second blog." },
  { id: 3, tag: "Engineer", createdDate: "22/12/2003", blogTitle: "Tech Talks", blogSummary: "Let's talk technology and trends." },
  { id: 4, tag: "Doctor", createdDate: "23/12/2003", blogTitle: "Health Tips", blogSummary: "Staying healthy is a lifestyle." },
  { id: 5, tag: "Writer", createdDate: "24/12/2003", blogTitle: "Writing 101", blogSummary: "How to become a better writer." },
  { id: 6, tag: "Artist", createdDate: "25/12/2003", blogTitle: "Creative Mind", blogSummary: "Unleash your creativity." },
  { id: 7, tag: "Developer", createdDate: "26/12/2003", blogTitle: "Dev Journey", blogSummary: "Coding experiences shared." },
  { id: 8, tag: "Traveler", createdDate: "27/12/2003", blogTitle: "Around the World", blogSummary: "Exploring beautiful places." },
  { id: 9, tag: "Chef", createdDate: "28/12/2003", blogTitle: "Delicious Recipes", blogSummary: "Cook like a pro at home." },
  { id: 10, tag: "Entrepreneur", createdDate: "29/12/2003", blogTitle: "Startups 101", blogSummary: "How to build and grow your startup." },
];

const BlogCard = ({ blog }) => (
  <motion.div
    className="bg-white rounded-xl shadow-md p-4 w-full"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-sm bg-blue-100 text-blue-700 w-fit px-3 py-1 rounded-full mb-2">
      {blog.tag}
    </div>
    <div className="flex items-center text-gray-500 text-xs mb-3">
      <CalendarDays className="w-4 h-4 mr-1" />
      {blog.createdDate}
    </div>
    <h2 className="text-lg font-semibold text-gray-800 mb-1">{blog.blogTitle}</h2>
    <p className="text-sm text-gray-600">{blog.blogSummary}</p>
  </motion.div>
);

export default function LatestBlog() {
  const [index, setIndex] = useState(0);
  const {themeMode}=useTheme()

  // Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 2) % trendingBlogs.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const currentBlogs = [
    trendingBlogs[index],
    trendingBlogs[(index + 1) % trendingBlogs.length],
  ];

  return (
    <div className={`w-full flex flex-col md:flex-row items-center justify-around  p-6 min-h-[500px] ${themeMode==="dark"?"":"bg-white"}`}>
      
      {/* Image Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
        <img
          src={heroImg}
          alt="Hero"
          className="rounded-2xl shadow-xl object-cover w-full max-w-[700px] h-96"
        />
      </div>

      {/* Blog Slide Section */}
      <div className="w-full md:w-1/2 h-96 relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            className="absolute w-full space-y-6"
          >
            {currentBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

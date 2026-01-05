"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

// YOUR PHOTO DATABASE
const allPhotos = [
  {
    id: 1,
    category: "Portraits",
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04",
    title: "Editorial Portrait",
  },
  {
    id: 2,
    category: "Portraits",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    title: "Male Portrait",
  },
  {
    id: 3,
    category: "Weddings",
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
    title: "The Ceremony",
  },
  {
    id: 4,
    category: "Weddings",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552",
    title: "Beach Wedding",
  },
  {
    id: 5,
    category: "Nature",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    title: "Deep Forest",
  },
  {
    id: 6,
    category: "Nature",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    title: "Mountain Peak",
  },
];

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [selectedImg, setSelectedImg] = useState(null);
  // 1. Add this state inside your Home function at the top
  const [result, setResult] = useState("");

  // 2. Add this handler inside your Home function
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending..."); // Feedback for the user
    const formData = new FormData(event.target);

    // This uses the key you just got!
    formData.append("access_key", "64e25547-a3d9-434a-9940-f22248ad03bc");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setResult("Message Sent Successfully!");
      event.target.reset(); // Clears the form
    } else {
      setResult("Something went wrong. Please try again.");
    }
  };

  const filteredPhotos =
    filter === "All"
      ? allPhotos
      : allPhotos.filter((img) => img.category === filter);

  return (
    <main className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e')] bg-cover bg-center"
        />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-8xl font-serif tracking-tight mb-4"
          >
            Moments in Motion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="uppercase tracking-[0.5em] text-sm md:text-lg text-gray-300"
          >
            Premium Studio Photography
          </motion.p>
        </div>
      </section>

      {/* 2. PORTFOLIO SECTION */}
      <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-8">Portfolio</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["All", "Portraits", "Weddings", "Nature"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-2 rounded-full border border-white/20 transition-all text-xs tracking-widest uppercase ${
                  filter === cat ? "bg-white text-black" : "hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedImg(photo.src)}
                className="relative aspect-[3/4] cursor-pointer group overflow-hidden bg-zinc-900 shadow-2xl"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="border border-white px-6 py-2 uppercase text-xs tracking-widest">
                    View Photo
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="py-24 bg-zinc-950 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="md:w-1/2 aspect-square relative"
          >
            <img
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700 rounded-sm"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="md:w-1/2"
          >
            <h2 className="text-4xl font-serif mb-6">
              The Art of Storytelling
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg mb-6">
              Founded on the principle of capturing raw, unscripted emotion, our
              studio has been the choice for editorial icons and private
              ceremonies for over a decade.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We don't just take pictures; we frame memories that speak when
              words fail. High-end, timeless, and uniquely yours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. CONTACT SECTION (Lead Gen) */}
      <section id="contact" className="py-24 px-6 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-4">Let's Collaborate</h2>
          <p className="text-gray-500 mb-12">
            Send us a message and we'll get back to you within 24 hours.
          </p>

          <form onSubmit={onSubmit} className="space-y-8 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="bg-transparent border-b border-zinc-700 py-3 focus:border-white outline-none transition w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="bg-transparent border-b border-zinc-700 py-3 focus:border-white outline-none transition w-full"
              />
            </div>
            <textarea
              name="message"
              placeholder="Tell us about your project"
              rows="4"
              required
              className="w-full bg-transparent border-b border-zinc-700 py-3 focus:border-white outline-none transition"
            ></textarea>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-white text-black py-4 uppercase tracking-[0.3em] font-bold text-sm hover:bg-gray-200 transition"
            >
              Send Inquiry
            </motion.button>

            {/* SUCCESS/ERROR MESSAGE UI */}
            <AnimatePresence>
              {result && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 text-center text-sm tracking-widest ${
                    result.includes("Success")
                      ? "text-green-400"
                      : "text-gray-400"
                  }`}
                >
                  {result}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </section>

      {/* LIGHTBOX POPUP */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedImg}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-10 text-center text-zinc-600 text-xs tracking-widest border-t border-zinc-900">
        © 2026 YOUR STUDIO. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}

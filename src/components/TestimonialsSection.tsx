import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Chief Emmanuel Olafisoye",
    location: "Lekki Phase 1, Lagos",
    role: "Homeowner",
    image: "/images/emmanuel-olafisoye.webp", // Placeholder or initial fallback
    content:
      "I was skeptical about spending ₦8M on a solar setup, but Kelvin's Grid delivered. My 10KVA system handles all my ACs without flinching. The professionalism is unmatched in this industry.",
    verified: true,
  },
  {
    id: 2,
    name: "Dr. Ozioma",
    location: "GRA, Port Harcourt",
    role: "Medical Director",
    image: "/images/dr-ozioma.webp",
    content:
      "The Starlink installation was seamless. They integrated it perfectly with my existing CCTV network. Now I can monitor my clinic remotely with zero lag. fast and neat work.",
    verified: true,
  },
  {
    id: 3,
    name: "Engr. Victor Chidera",
    location: "Asaba, Delta logo",
    role: "Civil Engineer",
    image: "/images/victor-chidera.webp",
    content:
      "As an engineer myself, I look for cable management and safety systems. These guys don't cut corners. The earthing and protection systems are top-tier. Highly recommended.",
    verified: true,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4 text-action font-mono text-xs tracking-widest uppercase"
          >
            <span className="w-8 h-px bg-action"></span>
            Social Proof
            <span className="w-8 h-px bg-action"></span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white font-heading"
          >
            Trusted by Nigerian Elites
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-900 border border-brand-800 p-8 rounded-2xl relative group hover:border-action/30 transition-colors"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-brand-800 group-hover:text-action/20 transition-colors">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-action"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-slate-300 mb-8 leading-relaxed relative z-10">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-800 border-2 border-brand-700 overflow-hidden relative flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-wide">
                    {testimonial.name}
                    {testimonial.verified && (
                      <svg
                        className="w-4 h-4 text-blue-500 inline-block ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </h4>
                  <p className="text-action text-xs uppercase tracking-widest opacity-80">
                    {testimonial.role} | {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

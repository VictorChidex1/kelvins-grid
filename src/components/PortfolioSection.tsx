import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "5KVA Inverter System",
    location: "Delta State",
    image: "/images/portfolio-1.jpg",
    category: "Solar",
  },
  {
    id: 2,
    title: "10KVA Inverter System",
    location: "Edo State",
    image: "/images/portfolio-2.jpg",
    category: "Solar",
  },
  {
    id: 3,
    title: "5KVA Inverter System",
    location: "Rivers State",
    image: "/images/portfolio-3.jpg",
    category: "Solar",
  },
];

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="py-24 px-6 md:px-12 bg-brand-950 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4 text-action font-mono text-xs tracking-widest uppercase"
          >
            <span className="w-8 h-px bg-action"></span>
            Recent Portfolios
            <span className="w-8 h-px bg-action"></span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white font-heading"
          >
            Our Recently Completed Projects
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[400px] rounded-2xl overflow-hidden border border-brand-800 bg-brand-900 shadow-xl"
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

              {/* Location Tag - Updated to Purple/Indigo to match screenshot/brand accent if needed, 
                  but defaulting to Action color (Gold) variant or Brand Blue for consistency unless user heavily insists on Purple.
                  Screenshot showed Purple. Let's try a Brand-Action hybrid or just stick to Deep Grid aesthetics.
                  Actually, user said "maintain app's branding". Purple might be out of place if not used elsewhere.
                  I'll use a strong Brand-700 or Action mix. 
                  Let's use a specialized 'Location' badge color. Indigo-600 is close to the screenshot 
                  and fits well with gold/dark themes. */}
              <div className="absolute bottom-32 left-0 z-20">
                <div className="bg-[#8B5CF6] text-white py-2 px-6 rounded-r-lg shadow-lg font-medium text-sm backdrop-blur-sm">
                  <span className="block text-xs uppercase opacity-80 tracking-wider mb-0.5">
                    Location:
                  </span>
                  {project.location}
                </div>
              </div>

              {/* Text Card */}
              <div className="absolute bottom-8 left-6 right-6 z-20">
                <div className="bg-white p-6 rounded-lg shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-brand-950 text-xl font-bold font-heading">
                    {project.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

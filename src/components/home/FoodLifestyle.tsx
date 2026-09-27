import React from "react";

export function FoodLifestyle() {
  const mealExamples = [
    {
      name: "Salads",
      desc: "Instant crisp texture and peppery aroma in every bite.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Sandwiches & Sourdough",
      desc: "A vibrant, crunchy layer to elevate everyday artisanal breads.",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Warm Grain Bowls",
      desc: "Fresh, colorful contrast over wholesome roasted grains.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Soups & Broths",
      desc: "Delicate greens that release subtle aromatics over hot broth.",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Wraps & Rolls",
      desc: "Juicy hydration and satisfying crunch rolled inside fresh flatbreads.",
      image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Morning Smoothies",
      desc: "Concentrated living micronutrients blended right into your routine.",
      image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-natural-cream text-natural-text border-b border-natural-border/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-900 block">
            Everyday Table
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-natural-text leading-tight">
            A little green goes a long way.
          </h2>

          <p className="text-base sm:text-lg text-natural-muted leading-relaxed max-w-2xl font-normal">
            Fresh microgreens can bring color, texture and flavor to the meals you already love.
          </p>
        </div>

        {/* Editorial Food Collage Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {mealExamples.map((item, idx) => (
            <div
              key={item.name}
              className="group relative overflow-hidden rounded-2xl bg-white border border-natural-border/70 shadow-xs hover:shadow-card transition-all duration-300"
            >
              {/* Image Aspect */}
              <div className="relative aspect-[16/11] overflow-hidden bg-natural-surface">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-3 left-4 text-white">
                  <span className="font-serif text-xl sm:text-2xl font-bold block">
                    {item.name}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 bg-white">
                <p className="text-xs sm:text-sm text-natural-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

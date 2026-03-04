export default function StatBar() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {[
          { number: "500+", label: "Chantiers réalisés" },
          { number: "95%", label: "Satisfaction client" },
          { number: "24h", label: "Délai de réponse" },
          { number: "10+", label: "Années d'expérience" },
        ].map((stat, index) => (
          <div
            key={index}
            className="animate-in fade-in slide-in-from-bottom duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
              {stat.number}
            </div>
            <div className="text-sm sm:text-base opacity-90">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

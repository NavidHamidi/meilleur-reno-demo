import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold text-primary mb-4">
              MeilleurReno
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Le partenaire de confiance pour tous vos projets de rénovation
              d&apos;intérieur à Paris. Accompagnement personnalisé, artisans
              qualifiés, devis transparents.
            </p>
          </div>
          {[
            {
              title: "Services",
              links: [
                "Rénovation appartement",
                "Isolation thermique",
                "Décoration intérieur",
                "Architecture",
              ],
            },
            {
              title: "Zones",
              links: ["Paris 7e", "Paris 15e", "Paris 16e", "Île-de-France"],
            },
            {
              title: "Entreprise",
              links: ["À propos", "Nos artisans", "Blog", "Contact"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/10 text-center text-sm opacity-70">
          © 2026 MeilleurReno. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

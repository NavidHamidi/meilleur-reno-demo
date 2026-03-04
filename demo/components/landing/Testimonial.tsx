import type { Testimonial } from "@/lib/testimonials";
import Image from "next/image";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

type Props = {
  testimonial: Testimonial[];
};

export default function TestimonialSection({ testimonial }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Ils nous ont fait confiance
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Découvrez les témoignages de nos clients satisfaits
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {testimonial.map((t, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden group animate-in fade-in slide-in-from-bottom duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={t.image}
                alt={t.project}
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/80 to-foreground/40" />
            </div>

            {/* Content Overlay */}
            <Card className="relative bg-transparent border-0 text-background shadow-none">
              <CardHeader className="relative z-10">
                <div className="flex gap-1 text-primary mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <CardDescription className="text-base italic leading-relaxed text-white">
                  &ldquo;{t.quote}&rdquo;
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {t.author}
                    </div>
                    <div className="text-sm text-white/80">
                      {t.project}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

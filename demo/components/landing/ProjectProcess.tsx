import { ProjectProcessStep } from "@/lib/projectProcess";

type Props = {
  steps:ProjectProcessStep[]
}
  
export default function ProjectProcess({ steps }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Comment ça marche ?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          De la simulation des aides à la fin du chantier, nous gérons tout pour
          vous
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className="text-center animate-in fade-in slide-in-from-bottom duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
              {step.number}
            </div>
            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

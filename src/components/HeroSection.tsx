import heroBg from "@/assets/eita-junino-2025.jpg";
import logo from "@/assets/confebraq-logo.png";
import { repairMojibakeText } from "@/lib/utils";

const HeroSection = () => {
  const subtitle = repairMojibakeText(
    "Confederação Brasileira de Entidades de Quadrilhas Juninas",
  );
  const description = repairMojibakeText("Unindo o Brasil através do movimento junino desde 2005.");
  const aboutLabel = repairMojibakeText("Conheça a CONFEBRAQ");
  const championsLabel = repairMojibakeText("Hall dos campeões");

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Quadrilha junina"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <img
          src={logo}
          alt="CONFEBRAQ"
          className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8 drop-shadow-2xl"
        />
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-black text-primary-foreground mb-4 leading-tight">
          CONFEBRAQ
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-secondary font-display font-semibold mb-4">
          {subtitle}
        </p>
        <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 font-light">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#sobre"
            className="px-8 py-3.5 rounded-lg gradient-warm text-primary font-semibold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            {aboutLabel}
          </a>
          <a
            href="#campeoes"
            className="px-8 py-3.5 rounded-lg border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:bg-primary-foreground/10 transition-all"
          >
            {championsLabel}
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-2 bg-repeating-linear"
        style={{
          background: `repeating-linear-gradient(90deg, 
            hsl(0 72% 50%) 0px, hsl(0 72% 50%) 30px,
            hsl(45 95% 55%) 30px, hsl(45 95% 55%) 60px,
            hsl(140 55% 40%) 60px, hsl(140 55% 40%) 90px,
            hsl(235 65% 25%) 90px, hsl(235 65% 25%) 120px,
            hsl(25 90% 55%) 120px, hsl(25 90% 55%) 150px
          )`,
        }}
      />
    </section>
  );
};

export default HeroSection;

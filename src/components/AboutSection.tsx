import { Users, MapPin, Trophy, Heart } from "lucide-react";
import { useEntityRegistry } from "@/hooks/useEntityRegistry";

const formatNumber = (value: number) => new Intl.NumberFormat("pt-BR").format(value);

const AboutSection = () => {
  const { metrics } = useEntityRegistry();

  const stats = [
    { icon: Users, value: formatNumber(metrics.totalQuadrilhas), label: "quadrilhas filiadas" },
    { icon: MapPin, value: formatNumber(metrics.totalStatesRepresented), label: "Estados representados" },
    { icon: Trophy, value: "20+", label: "Anos de história" },
    { icon: Heart, value: `+ de ${formatNumber(metrics.totalQuadrilheiros)}`, label: "quadrilheiros" },
  ];

  return (
    <section id="sobre" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Sobre nós</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-3 mb-6">
            A Força da Tradição Junina
          </h2>
          <div className="w-24 h-1 gradient-warm mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              A <strong className="text-foreground">CONFEBRAQ</strong> — Confederação Brasileira de Entidades de
              Quadrilhas Juninas — é a entidade máxima que representa e organiza o movimento quadrilheiro
              em todo o território nacional.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              Fundada com o propósito de unificar, fortalecer e promover as quadrilhas juninas como uma das
              maiores expressões culturais do Brasil, a CONFEBRAQ congrega federações, ligas e associações
              de todos os estados brasileiros.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Anualmente, a Confederação realiza o <strong className="text-foreground">Concurso Nacional de
              Quadrilhas</strong>, reunindo as melhores quadrilhas do país em um espetáculo de dança,
              tradição, criatividade e emoção.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl p-6 text-center shadow-md border border-border hover:shadow-lg transition-shadow"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-secondary" />
                <div className="text-3xl font-display font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

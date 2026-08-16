const AboutSection = () => {
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

        <div className="max-w-3xl mx-auto">
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
      </div>
    </section>
  );
};

export default AboutSection;

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Newspaper } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { normalizePublicAssetUrl } from "@/lib/utils";

const splitIntoParagraphs = (text: string): string[] => {
  if (text.includes("\n\n")) {
    return text.split("\n\n").map((p) => p.trim()).filter(Boolean);
  }
  if (text.includes("\n")) {
    return text.split("\n").map((p) => p.trim()).filter(Boolean);
  }
  // Capturing group instead of lookbehind — supported in all mobile browsers
  const raw = text.split(/([.!?])\s+(?=[A-ZÁÀÃÂÉÊÍÓÕÔÚÇ])/);
  const sentences: string[] = [];
  for (let i = 0; i < raw.length; i += 2) {
    const sentence = (raw[i] + (raw[i + 1] ?? "")).trim();
    if (sentence) sentences.push(sentence);
  }
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) {
    const chunk = sentences.slice(i, i + 3).join(" ").trim();
    if (chunk) paragraphs.push(chunk);
  }
  return paragraphs.length > 0 ? paragraphs : [text];
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const NewsPage = () => {
  const { newsId } = useParams();
  const { newsItems } = useSiteContent();
  const newsItem = newsItems.find((item) => item.id === newsId);

  useEffect(() => {
    if (!newsItem) {
      return;
    }

    document.title = `${newsItem.title} | CONFEBRAQ`;
    const descriptionElement = document.querySelector('meta[name="description"]');
    if (descriptionElement) {
      descriptionElement.setAttribute("content", newsItem.summary);
    }
  }, [newsItem]);

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-card p-10 text-center">
            <Newspaper className="mx-auto mb-5 w-16 h-16 text-muted-foreground/70" />
            <h1 className="text-3xl font-display font-bold mb-4">Notícia não encontrada</h1>
            <p className="text-muted-foreground mb-8">
              A notícia que você tentou acessar não existe ou ainda não está disponível.
            </p>
            <Button asChild>
              <Link to="/">Voltar para as notícias</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = normalizePublicAssetUrl(newsItem.image);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="bg-background py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-secondary/80">Notícias</p>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mt-4">
                {newsItem.title}
              </h1>
            </div>
            <Button asChild variant="outline">
              <Link to="/">Voltar ao site</Link>
            </Button>
          </div>

          {imageUrl && (
            <div className="overflow-hidden rounded-3xl border border-border bg-muted mb-8">
              <img src={imageUrl} alt={newsItem.title} className="w-full h-auto object-cover" />
            </div>
          )}

          <div className="rounded-3xl border border-border bg-card p-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 uppercase tracking-widest">
                <Newspaper className="w-4 h-4" />
                {newsItem.category}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(newsItem.date)}
              </span>
            </div>

            <div className="space-y-4">
              {splitIntoParagraphs(newsItem.summary).map((paragraph, i) => (
                <p key={i} className="text-base leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-2 text-sm font-semibold text-primary">
              <ArrowLeft className="w-4 h-4" />
              <span>Publicação exclusiva em página de notícia</span>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default NewsPage;

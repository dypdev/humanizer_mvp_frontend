import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { FileText, Sparkles, CheckCircle, Check, ArrowRight, Zap, Shield, Globe, Send } from "lucide-react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          name: "Waitlist User",
          message: "New user joined via Bottom CTA section.",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        setEmail("");
        toast({
          title: "Jesteś na liście! 🎉",
          description: "Powiadomimy Cię, gdy będziemy gotowi.",
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error(result.error || "Błąd serwera");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ups! Coś poszło nie tak.",
        description: "Nie udało się zapisać. Spróbuj ponownie później.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <span className="text-xl font-bold tracking-tight font-[Space_Grotesk]">
            human<span className="text-primary">PL</span>
          </span>
          <div className="hidden items-center gap-8 md:flex">
            <button onClick={() => scrollTo("how")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Jak to działa
            </button>
            <button onClick={() => scrollTo("pricing")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cennik
            </button>
          </div>
          <Button size="sm" onClick={() => scrollTo("cta")} className="rounded-full px-5">
            Zacznij teraz
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="relative flex min-h-[85vh] items-center pt-24 pb-12">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-[13px] sm:text-sm text-muted-foreground animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Pierwsza taka platforma dla języka polskiego
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-[1.15] tracking-tight sm:text-6xl md:text-7xl">
              Twój tekst AI brzmi
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                jak napisany przez człowieka
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-xl text-base text-muted-foreground sm:text-lg md:text-xl">
              Przekształć tekst AI w naturalnie brzmiący polski.
              Omiń detektory AI, zachowaj sens i styl.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/*<Button size="lg" onClick={() => scrollTo("cta")} className="w-full sm:w-auto h-13 rounded-full px-8 text-base shadow-lg shadow-primary/20">*/}
              {/*  Zarezerwuj dostęp*/}
              {/*  <ArrowRight className="ml-2 h-4 w-4" />*/}
              {/*</Button>*/}
              <Button size="lg" variant="outline" onClick={() => scrollTo("how")} className="w-full sm:w-auto h-13 rounded-full px-8 text-base">
                Zobacz jak to działa
              </Button>
            </div>
          </div>
        </div>
        {/* Animated Background Blob */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10
          h-[300px] w-[300px] md:h-[600px] md:w-[800px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full bg-primary/10 blur-[80px] md:blur-[120px]"
        />
      </section>

      {/* How it Works */}
      <section id="how" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-16 max-w-lg text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Jak to działa?</h2>
            <p className="text-muted-foreground">Trzy proste kroki do naturalnego tekstu</p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              { icon: FileText, title: "Wklej tekst", desc: "Skopiuj tekst wygenerowany przez AI i wklej go do naszego edytora." },
              { icon: Sparkles, title: "AI humanizuje", desc: "Nasz algorytm przekształca tekst, nadając mu naturalny, ludzki styl." },
              { icon: CheckCircle, title: "Gotowe!", desc: "Otrzymujesz tekst, który brzmi naturalnie i omija detektory AI." },
            ].map((step, i) => (
              <div key={i} className="group relative rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-primary/30">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">Krok {i + 1}</div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-16 max-w-lg text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Prosty cennik</h2>
            <p className="text-muted-foreground">Wybierz plan dopasowany do Twoich potrzeb</p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {[
              { name: "Basic", price: "40 zł", desc: "Idealny na start", icon: Zap, features: ["10 000 słów / mc", "Podstawowa humanizacja", "1 styl pisania", "Wsparcie email"], popular: false },
              { name: "Pro", price: "99 zł", desc: "Najpopularniejszy", icon: Shield, features: ["50 000 słów / mc", "Zaawansowana humanizacja", "5 stylów pisania", "Priorytetowe wsparcie", "Dostęp do API"], popular: true },
              { name: "Premium", price: "199 zł", desc: "Dla profesjonalistów", icon: Globe, features: ["Bez limitu słów", "Najwyższa jakość", "Wszystkie style", "Dedykowany opiekun", "Dostęp do API"], popular: false },
            ].map((plan) => (
              <Card key={plan.name} className={`relative flex flex-col rounded-2xl transition-all duration-300 ${plan.popular ? "border-primary shadow-2xl shadow-primary/10 md:scale-105 z-10" : "border-border"}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground whitespace-nowrap">Najpopularniejszy</div>}
                <CardHeader className="pb-4 pt-8 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><plan.icon className="h-5 w-5" /></div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.desc}</p>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <div className="mb-6"><span className="text-4xl font-bold">{plan.price}</span></div>
                  <ul className="space-y-3 text-left text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pb-8">
                  <Button onClick={() => scrollTo("cta")} variant={plan.popular ? "default" : "outline"} className="w-full rounded-full h-11">Wybierz {plan.name}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20">
        <div className="container mx-auto px-6">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-primary px-6 py-12 text-center text-primary-foreground shadow-2xl sm:px-12 sm:py-20">
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Gotowy na teksty, których nie wykryje żadne AI?
              </h2>
              <p className="mb-10 text-lg text-primary-foreground/80">
                Dołącz do grona pierwszych użytkowników i odbierz gwarancję najniższej ceny na start.
              </p>

              <form onSubmit={handleWaitlist} className="mx-auto flex max-w-md flex-col gap-3">
                <Input
                  type="email"
                  placeholder="Wpisz swój email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 rounded-full border-none bg-white px-6 text-base text-black placeholder:text-muted-foreground focus-visible:ring-0"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || submitted}
                  className="h-14 rounded-full bg-black px-8 text-white hover:bg-black/90 transition-all disabled:opacity-70"
                >
                  {isSubmitting ? "Wysyłanie..." : submitted ? "Gotowe! ✓" : "Zapisz mnie"}
                  {!isSubmitting && !submitted && <Send className="ml-2 h-4 w-4" />}
                </Button>
              </form>
              <p className="mt-6 text-xs text-primary-foreground/60 italic">
                Nie spamujemy. Tylko ważne aktualizacje o produkcie.
              </p>
            </div>
            {/* Background decorative circles */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card/50">
        <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-6 md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold tracking-tight font-[Space_Grotesk]">
              human<span className="text-primary">PL</span>
            </span>
            <p className="text-sm text-muted-foreground italic text-center md:text-left">Powered by Advanced Polish NLP</p>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Regulamin</a>
            <a href="#" className="hover:text-primary transition-colors">Prywatność</a>
          </div>
          <p className="text-xs text-muted-foreground/60">© 2026 humanPL. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

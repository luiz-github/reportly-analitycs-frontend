import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/mode-toggle";

const features = [
  {
    icon: "⚡",
    title: "Automated reports",
    description:
      "Connect Meta Ads, Google Ads, and GA4 once. Reports generated automatically every month.",
  },
  {
    icon: "🤖",
    title: "AI-written insights",
    description:
      "Every report includes a plain-English analysis of what happened and what to do next.",
  },
  {
    icon: "🎨",
    title: "White-label portal",
    description:
      "Send clients a link with your logo. They see your brand, not ours.",
  },
  {
    icon: "📊",
    title: "Unified by client",
    description:
      "All platforms in one view per client. No more switching tabs to copy numbers.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "For agencies just getting started",
    clients: "Up to 5 clients",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$79",
    description: "For growing agencies",
    clients: "Up to 20 clients",
    highlighted: true,
  },
  {
    name: "Agency",
    price: "$149",
    description: "For established agencies",
    clients: "Unlimited clients",
    highlighted: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-4 sm:px-8 py-5 max-w-6xl mx-auto">
        <span className="text-lg font-bold tracking-tight">Reportly</span>
        <div className="flex items-center gap-2 sm:gap-4">
          <ModeToggle variant="button" />
          <Link
            href="/login"
            className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Log in
          </Link>
          <Link href="/signup">
            <Button size="sm" className="rounded-full px-4 sm:px-5">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-20 sm:pb-32 text-center">
        <Badge className="mb-6 rounded-full px-4 py-1">
          Now in beta — free for 14 days
        </Badge>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6 max-w-3xl mx-auto">
          Stop building reports.
          <br />
          <span className="text-primary">Start sending them.</span>
        </h1>
        <p className="text-base sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Reportly connects to Meta Ads, Google Ads, and GA4 and generates
          client reports automatically — with AI-written insights included.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 text-base">
              Start free trial
            </Button>
          </Link>
          <Link href="#" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto rounded-full px-8 h-12 text-base text-muted-foreground"
            >
              See a demo →
            </Button>
          </Link>
        </div>

        {/* Before / After */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs uppercase tracking-widest">
                Before Reportly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p className="flex gap-2">
                <span>😩</span> Open Meta Ads, copy numbers
              </p>
              <p className="flex gap-2">
                <span>😩</span> Open Google Analytics, copy more
              </p>
              <p className="flex gap-2">
                <span>😩</span> Open Canva, build the PDF
              </p>
              <p className="flex gap-2">
                <span>😩</span> Email to client, wait for feedback
              </p>
              <p className="flex gap-2">
                <span>😩</span> Repeat for every client, every month
              </p>
              <Separator className="my-2" />
              <p className="text-xs text-muted-foreground/60">
                ~3 hours per client per month
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/30">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs uppercase tracking-widest text-primary">
                With Reportly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="flex gap-2">
                <span>✅</span> Connect platforms once
              </p>
              <p className="flex gap-2">
                <span>✅</span> Reports generated automatically
              </p>
              <p className="flex gap-2">
                <span>✅</span> AI writes the analysis
              </p>
              <p className="flex gap-2">
                <span>✅</span> Client sees your branded portal
              </p>
              <p className="flex gap-2">
                <span>✅</span> Done
              </p>
              <Separator className="my-2" />
              <p className="text-xs text-primary/60">
                2 clicks per client per month
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 text-center">
          What you get
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16">
          Everything your agency needs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <Card key={f.title}>
              <CardHeader>
                <span className="text-3xl mb-2 block">{f.icon}</span>
                <CardTitle className="text-lg">{f.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {f.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 text-center">
          Pricing
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          Simple, predictable pricing
        </h2>
        <p className="text-muted-foreground text-center mb-12 sm:mb-16 text-sm sm:text-base">
          No setup fees. No surprises. Cancel anytime.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col ${plan.highlighted ? "border-primary" : ""}`}
            >
              <CardHeader>
                {plan.highlighted && (
                  <Badge className="self-start mb-2 rounded-full text-xs px-3">
                    Recommended
                  </Badge>
                )}
                <CardDescription>{plan.name}</CardDescription>
                <CardTitle className="text-4xl">
                  {plan.price}
                  <span className="text-lg font-normal text-muted-foreground">
                    /mo
                  </span>
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 space-y-4">
                <p className="text-sm">{plan.clients}</p>
                <Link href="/signup" className="mt-auto">
                  <Button
                    className="w-full rounded-full"
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    Start free trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8 px-4">
          Need more than 5 clients? Add extra clients for{" "}
          <span className="text-foreground">$10/client/month</span>, up to
          $149/mo.
        </p>
      </section>

      <Separator />

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to get your time back?
        </h2>
        <p className="text-muted-foreground mb-8 text-base sm:text-lg">
          Start your 14-day free trial. No credit card required.
        </p>
        <Link href="/signup">
          <Button size="lg" className="rounded-full px-10 h-12 text-base">
            Get started for free
          </Button>
        </Link>
      </section>

      <Separator />

      {/* Footer */}
      <footer className="px-4 sm:px-8 py-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <span className="text-sm font-bold text-muted-foreground">
          Reportly
        </span>
        <p className="text-xs text-muted-foreground/60 order-3 sm:order-none">
          © 2026 Reportly. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground/60">
          <Link href="#" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Terms
          </Link>
        </div>
      </footer>
    </div>
  );
}
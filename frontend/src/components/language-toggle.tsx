"use client";

import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { routing, type Locale, usePathname, useRouter } from "@/i18n/routing";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

export default function LanguageToggle() {
  const t = useTranslations("Homepage.Navbar.language");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

    startTransition(() => {
      // Based on next-intl navigation docs for switching the current route locale
      // while preserving dynamic route params.
      router.replace(
        // @ts-expect-error The current pathname and params originate from the active route.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isPending}>
        <Button
          variant="ghost"
          className="h-10 rounded-full border border-border/50 bg-background/40 px-3 text-white hover:bg-background/60"
          aria-label={t("toggleAriaLabel")}
        >
          <span className="mr-2 text-sm font-semibold tracking-wide">
            {LOCALE_LABELS[locale]}
          </span>
          <ChevronDown className="h-4 w-4 opacity-80" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {routing.locales.map((nextLocale) => {
          const isCurrent = nextLocale === locale;
          return (
            <DropdownMenuItem
              key={nextLocale}
              disabled={isCurrent || isPending}
              onClick={() => switchLocale(nextLocale)}
              className="flex items-center justify-between"
            >
              <span>{t(nextLocale)}</span>
              <span className="text-xs uppercase text-muted-foreground">
                {LOCALE_LABELS[nextLocale]}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

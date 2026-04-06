import { Link, routing, type Locale } from "@/i18n/routing";
import type { Post } from "@/types/posts";

function isAppLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

type Props = {
  currentLocale: Locale;
  localizations: Post["localizations"];
  labels: Record<Locale, string>;
  sectionLabel: string;
};

export function PostLocaleLinks({
  currentLocale,
  localizations,
  labels,
  sectionLabel,
}: Props) {
  const others = localizations.filter((l) => {
    if (l.locale === currentLocale) return false;
    return isAppLocale(l.locale);
  });

  if (others.length === 0) return null;

  return (
    <nav aria-label={sectionLabel} className="mb-6">
      <p className="text-sm font-medium text-muted-foreground mb-2">
        {sectionLabel}
      </p>
      <ul className="flex flex-wrap gap-3">
        {others.map((loc) => {
          const targetLocale = loc.locale as Locale;
          return (
            <li key={loc.documentId}>
              <Link
                href={`/blog/${loc.slug}`}
                locale={targetLocale}
                className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                {labels[targetLocale]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

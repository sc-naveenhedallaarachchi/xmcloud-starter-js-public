'use client';

import { Text, Link, Image } from '@sitecore-content-sdk/nextjs';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { PromoAnimatedProps } from './promo-animated.props';

const themeMap: Record<string, string> = {
  minimalist: 'bg-white text-slate-900 border border-slate-200 shadow-sm',
  modern: 'bg-white text-slate-900 border border-slate-200 shadow-xl shadow-slate-200/60',
  elegant: 'bg-stone-950 text-stone-100 border border-stone-700 shadow-2xl shadow-stone-950/30',
  bold: 'bg-slate-900 text-white border border-slate-800 shadow-2xl shadow-cyan-950/30',
  playful:
    'bg-gradient-to-br from-pink-50 via-white to-amber-50 text-slate-900 border border-pink-100 shadow-xl shadow-pink-100/60',
};

const primaryLinkClassMap: Record<string, string> = {
  minimalist:
    'inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700',
  modern:
    'inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700',
  elegant:
    'inline-flex items-center justify-center rounded-full bg-stone-100 px-5 py-3 text-sm font-semibold text-stone-950 transition-colors hover:bg-white',
  bold: 'inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300',
  playful:
    'inline-flex items-center justify-center rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-pink-600',
};

const secondaryLinkClassMap: Record<string, string> = {
  minimalist:
    'inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50',
  modern:
    'inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50',
  elegant:
    'inline-flex items-center justify-center rounded-full border border-stone-500 px-5 py-3 text-sm font-semibold text-stone-100 transition-colors hover:bg-stone-900',
  bold: 'inline-flex items-center justify-center rounded-full border border-cyan-400/50 px-5 py-3 text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-400/10',
  playful:
    'inline-flex items-center justify-center rounded-full border border-pink-300 px-5 py-3 text-sm font-semibold text-pink-700 transition-colors hover:bg-pink-50',
};

const eyebrowClassMap: Record<string, string> = {
  minimalist: 'text-slate-500',
  modern: 'text-blue-600',
  elegant: 'text-amber-300',
  bold: 'text-cyan-300',
  playful: 'text-pink-600',
};

export const PromoAnimatedNewTest: React.FC<PromoAnimatedProps> = (props) => {
  if (!props.fields) {
    return <NoDataFallback componentName="Promo Animated: New Test" />;
  }

  const { fields, params, rendering } = props;
  const renderingParams = rendering?.params || params;
  const aesthetic =
    renderingParams?.aesthetic?.toLowerCase() ||
    renderingParams?.variantName?.toLowerCase() ||
    'modern';

  const activeTheme = themeMap[aesthetic] || themeMap.modern;
  const activePrimaryLinkClass = primaryLinkClassMap[aesthetic] || primaryLinkClassMap.modern;
  const activeSecondaryLinkClass =
    secondaryLinkClassMap[aesthetic] || secondaryLinkClassMap.modern;
  const activeEyebrowClass = eyebrowClassMap[aesthetic] || eyebrowClassMap.modern;

  const primaryLink = fields.primaryLink?.value?.href ? fields.primaryLink : undefined;
  const secondaryLink = fields.secondaryLink?.value?.href ? fields.secondaryLink : undefined;
  const image = fields.image?.value?.src ? fields.image : undefined;

  return (
    <section
      className="w-full px-4 py-8 sm:px-6 lg:px-8"
      data-component="PromoAnimated"
      data-aesthetic={aesthetic}
      data-rendering-id={rendering?.uid || ''}
      data-rendering-source={rendering?.dataSource || ''}
    >
      <article
        className={`mx-auto grid max-w-7xl overflow-hidden rounded-3xl ${activeTheme} md:grid-cols-2`}
      >
        <header className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
          <div className="flex flex-col gap-5 sm:gap-6">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.2em] ${activeEyebrowClass}`}
            >
              {aesthetic}
            </p>
            {fields.title?.value ? (
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                <Text field={fields.title} />
              </h2>
            ) : null}
            {fields.description?.value ? (
              <p className="text-base leading-7 text-inherit opacity-80 sm:text-lg">
                <Text field={fields.description} />
              </p>
            ) : null}
            {primaryLink || secondaryLink ? (
              <nav
                aria-label="Promotional links"
                className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap"
              >
                {primaryLink ? (
                  <Link className={activePrimaryLinkClass} field={primaryLink} />
                ) : null}
                {secondaryLink ? (
                  <Link className={activeSecondaryLinkClass} field={secondaryLink} />
                ) : null}
              </nav>
            ) : null}
          </div>
        </header>
        <aside className="relative min-h-[260px] md:min-h-full">
          {image ? (
            <div className="h-full w-full">
              <Image field={image} className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="flex h-full min-h-[260px] items-center justify-center bg-slate-100 text-sm text-slate-500">
              <span>Image</span>
            </div>
          )}
        </aside>
      </article>
    </section>
  );
};

/**
 * Minimal useHead composable — sets <title>, meta description and OG tags.
 * Drop-in replacement until @vueuse/head or @unhead/vue is installed.
 */
import { watchEffect } from 'vue';

export interface HeadConfig {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

const BASE_TITLE = 'NTI — Nitriansky technologický inkubátor';

function setMeta(name: string, content: string, property = false): void {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string): void {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useHead(config: HeadConfig): void {
  watchEffect(() => {
    // Title
    if (config.title) {
      document.title = config.title.includes('NTI') ? config.title : `${config.title} — NTI`;
    } else {
      document.title = BASE_TITLE;
    }

    // Meta description
    if (config.description) {
      setMeta('description', config.description);
      setMeta('og:description', config.ogDescription ?? config.description, true);
    }

    // OG title
    setMeta('og:title', config.ogTitle ?? config.title ?? BASE_TITLE, true);
    setMeta('og:type', 'website', true);

    // OG image
    if (config.ogImage) {
      setMeta('og:image', config.ogImage, true);
    }

    // Canonical
    if (config.canonical) {
      setLink('canonical', config.canonical);
    }
  });
}

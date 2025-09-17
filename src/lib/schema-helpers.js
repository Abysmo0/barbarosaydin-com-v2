// Schema.org JSON-LD helper fonksiyonları
export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Barbaros Aydın",
    "url": "https://www.barbarosaydin.com",
    "sameAs": [
      "https://www.linkedin.com/in/barbarosaydin/"
    ],
    "jobTitle": "İş ve Gayrimenkul Geliştirme Stratejisti"
  };
}

export function getArticleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "author": { "@type": "Person", "name": "Barbaros Aydın" },
    "publisher": {
      "@type": "Organization",
      "name": "Barbaros Aydın",
      "logo": { "@type": "ImageObject", "url": "https://www.barbarosaydin.com/logo.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.barbarosaydin.com/blog/${post.slug}` }
  };
}

export function getBreadcrumbSchema(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": trail.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function getFAQSchema(faqItems) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(q => ({
      "@type": "Question",
      "name": q.q,
      "acceptedAnswer": { "@type": "Answer", "text": q.a }
    }))
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Barbaros Aydın",
    "url": "https://www.barbarosaydin.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.barbarosaydin.com/arama?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

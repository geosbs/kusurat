import { SITE } from "@/lib/site";

export function getJsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: SITE.publisherName,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.publisherCity,
      addressCountry: "AT",
    },
  };

  const organization = {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.publisherName,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    founder: { "@id": `${SITE.url}/#person` },
    additionalType: "https://schema.org/Blog",
    areaServed: {
      "@type": "Country",
      name: "Austria",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.publisherCity,
      addressCountry: "AT",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE.email,
      contactType: "editorial",
      availableLanguage: ["de"],
    },
    knowsAbout: [
      "Räumung",
      "Entrümpelung",
      "Haushaltsauflösung",
      "Nachhaltige Entsorgung",
      "Ordnung",
    ],
    publishingPrinciples: `${SITE.url}/datenschutz`,
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    alternateName: SITE.tagline,
    description: SITE.description,
    inLanguage: "de-AT",
    publisher: { "@id": `${SITE.url}/#organization` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, organization, website],
  };
}

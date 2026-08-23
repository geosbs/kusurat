import { SITE } from "@/lib/site";

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;
const PLACE_ID = `${SITE.url}/#place`;

const KNOWS_ABOUT = [
  "Räumung",
  "Entrümpelung",
  "Haushaltsauflösung",
  "Nachhaltige Entsorgung",
  "Ordnung",
  "Mistplatz Wien",
  "MA 48",
];

function postalAddress() {
  return {
    "@type": "PostalAddress",
    addressLocality: SITE.publisherCity,
    addressRegion: "Wien",
    addressCountry: "AT",
  };
}

export function getPlaceNode() {
  return {
    "@type": "Place",
    "@id": PLACE_ID,
    name: "Wien und Niederösterreich",
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.2082,
      longitude: 16.3738,
    },
  };
}

export function getOrganizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.publisherName,
    url: SITE.url,
    email: SITE.email,
    logo: `${SITE.url}/icon.svg`,
    image: `${SITE.url}/hero.webp`,
    description: SITE.description,
    additionalType: "https://schema.org/Blog",
    slogan: "Unabhängiger Ratgeber – keine gewerblichen Räumungsleistungen",
    foundingLocation: postalAddress(),
    address: postalAddress(),
    location: { "@id": PLACE_ID },
    areaServed: [
      { "@type": "City", name: "Wien" },
      { "@type": "AdministrativeArea", name: "Niederösterreich" },
      { "@type": "Country", name: "Austria" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE.email,
      contactType: "editorial",
      availableLanguage: ["de"],
      areaServed: "AT",
    },
    knowsAbout: KNOWS_ABOUT,
    publishingPrinciples: `${SITE.url}/datenschutz`,
    ethicsPolicy: `${SITE.url}/impressum`,
  };
}

export function getWebsiteNode() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE.url,
    name: SITE.name,
    alternateName: SITE.tagline,
    description: SITE.description,
    inLanguage: "de-AT",
    publisher: { "@id": ORG_ID },
    spatialCoverage: { "@id": PLACE_ID },
    about: KNOWS_ABOUT,
  };
}

export function getJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [getOrganizationNode(), getPlaceNode(), getWebsiteNode()],
  };
}

export { ORG_ID, SITE_ID, PLACE_ID };

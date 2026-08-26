import { SITE } from "@/lib/site";

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;
const PLACE_ID = `${SITE.url}/#place`;
const PERSON_ID = `${SITE.url}/#person`;

const KNOWS_ABOUT = [
  "Räumung",
  "Entrümpelung",
  "Haushaltsauflösung",
  "Nachhaltige Entsorgung",
  "Ordnung",
  "Mistplatz Wien",
  "MA 48",
];

function publisherPostalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: SITE.publisherStreet,
    postalCode: SITE.publisherPostalCode,
    addressLocality: SITE.publisherCity,
    addressRegion: SITE.publisherRegion,
    addressCountry: "AT",
  };
}

function coveragePostalAddress() {
  return {
    "@type": "PostalAddress",
    addressLocality: "Wien",
    addressRegion: "Wien",
    addressCountry: "AT",
  };
}

export function getPlaceNode() {
  return {
    "@type": "Place",
    "@id": PLACE_ID,
    name: "Wien und Niederösterreich",
    address: coveragePostalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.2082,
      longitude: 16.3738,
    },
  };
}

export function getPersonNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.publisherName,
    jobTitle: "Medieninhaber",
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.publisherPhoneE164,
    address: publisherPostalAddress(),
    worksFor: { "@id": ORG_ID },
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
    telephone: SITE.publisherPhoneE164,
    logo: `${SITE.url}/icon.svg`,
    image: `${SITE.url}/hero.webp`,
    description: SITE.description,
    additionalType: "https://schema.org/Blog",
    slogan: "Unabhängiger Ratgeber – keine gewerblichen Räumungsleistungen",
    founder: { "@id": PERSON_ID },
    foundingLocation: publisherPostalAddress(),
    address: publisherPostalAddress(),
    location: { "@id": PLACE_ID },
    areaServed: [
      { "@type": "City", name: "Wien" },
      { "@type": "AdministrativeArea", name: "Niederösterreich" },
      { "@type": "Country", name: "Austria" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "editorial",
      name: SITE.publisherName,
      email: SITE.email,
      telephone: SITE.publisherPhoneE164,
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
    "@graph": [getPersonNode(), getOrganizationNode(), getPlaceNode(), getWebsiteNode()],
  };
}

export { ORG_ID, SITE_ID, PLACE_ID, PERSON_ID };

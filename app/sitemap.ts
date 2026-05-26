import type { MetadataRoute } from "next";
import { events } from "./past-events/events-data";
import { SITE_URL as siteUrl } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`,                    lastModified, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${siteUrl}/about-us`,            lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/board-of-directors`,  lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/membership-info`,     lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/past-events`,         lastModified, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${siteUrl}/contact`,             lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];

  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${siteUrl}/past-events/${event.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...eventRoutes];
}

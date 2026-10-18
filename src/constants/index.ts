/**
 * Re-exports content from the central site config.
 * To edit any of these, update `src/site.config.ts`.
 */
import { siteConfig } from "@/site.config";

export const experiences = siteConfig.experiences;
export const projects = siteConfig.projects;
export const hackathons = siteConfig.hackathons;
export const research = siteConfig.research;
export const externalArticles = siteConfig.writing.external;

/**
 * Re-exports content from the central site config.
 * To edit any of these, update `src/site.config.ts`.
 */
import { siteConfig } from "@/site.config";

export const navLinks = siteConfig.nav;
export const intros = siteConfig.identity.intros;
export const experiences = siteConfig.experiences;
export const projects = siteConfig.projects;
export const hackathons = siteConfig.hackathons;
export const research = siteConfig.research;

export const notableAchievements: never[] = [];

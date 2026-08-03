export type ProjectKind = "concept" | "case-study";

export type ProjectVisibility = "public" | "anonymized" | "private";

export type ProjectSummary = {
  slug: string;
  number: string;
  title: string;
  industry: string;
  summary: string;
  challenge: string;
  services: string;
  scope: readonly string[];
  technologies: readonly string[];
  year: string;
  status: string;
  kind: ProjectKind;
  visibility: ProjectVisibility;
  visual: "studio" | "archive" | "common";
};

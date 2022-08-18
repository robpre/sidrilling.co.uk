import type { CmsCollection, CmsConfig, CmsField } from "netlify-cms-core";

import { NODE_ENV } from "@/config";
import { getBuildURL } from "@/lib/getBuildURL";

const pagesFields = (): CmsField[] => [
  { label: "Layout", name: "layout", widget: "hidden", default: "layout" },
  ...allFields(),
];

const allFields = (): CmsField[] => [
  { label: "Title", name: "title", widget: "string" },
  { label: "Sub Title", name: "subtitle", widget: "string", required: false },
  { label: "Draft", name: "draft", widget: "boolean" },
  { label: "Body", name: "body", widget: "markdown" },
];

const image = (name: string, label: string): CmsField[] => [
  {
    label,
    name,
    widget: "image",
  },
  {
    label: `Alt text for ${label}`,
    name: `${name}_altText`,
    widget: "string",
    hint: "Set this text to describe the contents of the image for people",
  },
];

const pageCollection: CmsCollection = {
  name: "pages",
  label: "Pages",
  files: [
    {
      name: "404",
      label: "404",
      file: "content/pages/404.md",
      fields: pagesFields(),
    },
    {
      name: "case-studies",
      label: "Case Studies",
      file: "content/pages/case-studies.md",
      fields: pagesFields(),
    },
    {
      name: "equipment",
      label: "Case Studies",
      file: "content/pages/equipment.md",
      fields: pagesFields(),
    },
    {
      name: "index-page",
      label: "Home page",
      file: "content/pages/index.md",
      fields: pagesFields(),
    },
    {
      name: "privacy-policy",
      label: "Privacy Policy",
      file: "content/pages/privacy-policy.md",
      fields: pagesFields(),
    },
    {
      name: "services-what-we-do",
      label: "What We Do",
      file: "content/pages/services-what-we-do.md",
      fields: pagesFields(),
    },
    {
      name: "team-who-we-are",
      label: "Who We Are",
      file: "content/pages/team-who-we-are.md",
      fields: pagesFields(),
    },
  ],
};

const equipmentCollection: CmsCollection = {
  label: "Equipment",
  name: "equipment",
  folder: "content/equipment",
  create: true,
  fields: [...allFields(), ...image("image", "Featured image")],
};

const jobsCollection: CmsCollection = {
  label: "Jobs",
  name: "jobs",
  folder: "content/jobs",
  create: true,
  // 2022-08-12T19:06:47.507Z
  // slug: "{{year}}-{{month}}-{{day}}T{{hour}}:{{minute}}:{{second}}_{{slug}}",
  fields: [
    ...allFields(),
    ...image("image", "Featured image"),
    {
      name: "date",
      label: "Date",
      hint: "When did this job take place?",
      widget: "datetime",
      date_format: "MMMM YYYY",
      time_format: "",
    },
    {
      name: "equipmentID",
      label: "Equipment",
      widget: "list",
      field: {
        widget: "relation",
        collection: "equipment",
        name: "equipment",
        value_field: "title",
        search_fields: ["title"],
      },
    },
  ],
};

const putBodyLast = (collections: CmsCollection[]): CmsCollection[] =>
  collections.map((c) => {
    if (!c.fields) {
      return c;
    }

    const bodyField = c.fields.find((f) => f.name === "body");
    const fields = c.fields.filter((f) => f.name !== "body");

    if (bodyField) {
      fields.push(bodyField);
    }

    return {
      ...c,
      fields,
    };
  });

export const config: CmsConfig = {
  backend: {
    name: "git-gateway",
    repo: "robpre/sidrilling.co.uk",
    branch: "nextjs-vercel-netlify",
    base_url: getBuildURL(),
    auth_endpoint: "api/auth",
  },
  site_url: getBuildURL(),
  public_folder: "/content",
  media_folder: "public/content",
  publish_mode: "editorial_workflow",
  local_backend: NODE_ENV === "development",
  collections: putBodyLast([
    pageCollection,
    equipmentCollection,
    jobsCollection,
  ]),
};

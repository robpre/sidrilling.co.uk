import CMS from "netlify-cms-app";
import { CmsConfig, CmsField } from "netlify-cms-core";
import { useEffect } from "react";

import {} from "@/config";

const pagesFields = (): CmsField[] => [
  { label: "Title", name: "title", widget: "string" },
  { label: "Layout", name: "layout", widget: "hidden", default: "blog" },
  { label: "Body", name: "body", widget: "markdown" },
];

const config: CmsConfig = {
  backend: {
    name: "github",
    repo: "robpre/sidrilling.co.uk",
    branch: "nextjs-vercel-netlify",
    base_url: "https://www.sidrilling.co.uk",
    auth_endpoint: "api/auth",
  },
  media_folder: "public/content/images",
  public_folder: "/content",
  local_backend: true,
  collections: [
    {
      name: "pages",
      label: "Pages",
      files: [
        {
          name: "404",
          label: "Page not found",
          file: "404.md",
          fields: pagesFields(),
        },
        {
          name: "case-studies",
          label: "case-studies",
          file: "case-studies.md",
          fields: pagesFields(),
        },
        {
          name: "equipment",
          label: "equipment",
          file: "equipment.md",
          fields: pagesFields(),
        },
        {
          name: "index",
          label: "index",
          file: "index.md",
          fields: pagesFields(),
        },
        {
          name: "privacy-policy",
          label: "privacy-policy",
          file: "privacy-policy.md",
          fields: pagesFields(),
        },
        {
          name: "services-what-we-do",
          label: "services-what-we-do",
          file: "services-what-we-do.md",
          fields: pagesFields(),
        },
        {
          name: "team-who-we-are",
          label: "team-who-we-are",
          file: "team-who-we-are.md",
          fields: pagesFields(),
        },
      ],
    },
    {
      label: "Equipment",
      name: "equipment",
      create: true,
      fields: [
        { name: "title", label: "Title", widget: "string" },
        {
          label: "Featured Image",
          name: "thumbnail",
          widget: "image",
          required: false,
        },
        { label: "Body", name: "body", widget: "markdown" },
      ],
    },
    {
      label: "Jobs",
      name: "jobs",
      create: true,
      // 2022-08-12T19:06:47.507Z
      slug: "{{year}}-{{month}}-{{day}}T{{hour}}:{{minute}}:{{second}}_{{slug}}",
      fields: [
        { name: "title", label: "Title", widget: "string" },
        {
          name: "date",
          label: "Date",
          widget: "datetime",
          date_format: "MMMM YYYY",
          time_format: "",
        },
        {
          name: "equipment",
          label: "Equipment",
          widget: "list",
          field: {
            widget: "relation",
            collection: "equipment",
            name: "equipment",
            value_field: "slug",
            search_fields: ["title"],
          },
        },
      ],
    },
  ],
};

export default () => {
  useEffect(() => {}, [CMS.init({ config })]);

  return null;
};

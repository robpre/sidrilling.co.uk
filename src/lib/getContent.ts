import { promises as fs } from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";
import pathlib from "path";

import { Collections, Pages } from "@/types/ContentTypes";
import { config } from "./netlifyConfig";

export const getPage = async <T extends keyof Pages>(
  name: T
): Promise<[string, Pages[T]]> => {
  let filePath: string | undefined;

  config.collections.some((c) => {
    if (c.files) {
      const file = c.files.find((f) => f.name === name);

      if (file) {
        filePath = file.file;
        return true;
      }
    }
  });

  if (!filePath) {
    throw new Error("Cannot find page named: " + name);
  }

  const source = await fs.readFile(pathlib.resolve(process.cwd(), filePath));

  const { content, data } = matter(source, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });

  return [content, data as Pages[T]];
};

export const getCollectionFiles = async <T extends keyof Collections>(
  name: T
): Promise<Array<[string, Collections[T]]>> => {
  let folder: string | undefined;

  config.collections.some((c) => {
    if (c.folder) {
      if (c.name === name) {
        folder = c.folder;
        return true;
      }
    }
  });

  if (!folder) {
    throw new Error("Cannot find collection named: " + name);
  }

  const dirname = pathlib.resolve(process.cwd(), folder);
  const files = await fs.readdir(dirname);

  const resolved = await Promise.all(
    files.map(async (f) => {
      const source = await fs.readFile(pathlib.resolve(dirname, f));

      const { content, data } = matter(source);

      return [content, data as Collections[T]];
    })
  );

  return resolved as Array<[string, Collections[T]]>;
};

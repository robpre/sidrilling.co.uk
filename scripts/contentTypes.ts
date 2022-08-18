import { config } from "@/lib/netlifyConfig";
import { promises as fs } from "fs";
import type { CmsField, CmsFieldList } from "netlify-cms-core";
import pathlib from "path";
import prettier from "prettier";

const CollectionTypeName = "Collections";
const FileTypeName = "Pages";
const str = (s: any) => JSON.stringify(s);

const widgetToTypeString = (field: CmsField): string => {
  switch (field.widget) {
    case "boolean":
      return "boolean";
    // case 'code':
    //   return '';
    // case 'color':
    //   return '';
    case "datetime":
      return "string";
    // case 'file':
    //   return '';
    // case 'object':
    //   return '';
    case "list":
      const listField = (field as CmsFieldList).field;
      if (!listField) {
        throw new Error(`Cannot create list field with missing field property`);
      }
      return `${widgetToTypeString(listField)}[]`;
    // case 'map':
    //   return '';
    case "markdown":
      return "string";
    // case 'number':
    //   return '';
    // case 'select':
    //   return '';
    case "relation":
      // const relColName = (field as CmsFieldRelation).collection;
      // return `${CollectionTypeName}[${str(relColName)}]`;
      return "string";
    case "hidden":
      return "string";
    case "string":
      return "string";
    case "image":
      return "string";
  }

  throw new Error("Unrecognised widget " + field.widget);
};

const printObjectType = (r: Record<string, string>) => {
  let c = "";

  Object.entries(r).forEach(([fieldName, fieldType]) => {
    c += `${str(fieldName)}: ${fieldType};`;
  });

  return "{" + c + "}";
};

function mapObject<
  V,
  T extends Record<string, V> | V[],
  I extends T extends V[] ? number : keyof T,
  R
>(
  obj: T,
  mapper: (entry: V) => R,
  keyMapper?: (i: I, entry: V) => string
): Record<string, R> {
  const out: Record<string, R> = {};
  Object.entries(obj).forEach(([k, v]) => {
    out[keyMapper ? keyMapper(k as I, v) : k] = mapper(v);
  });

  return out;
}

function makeInterfaceFromFields(
  filesFields: { [key: string]: CmsField[] },
  prefix: string
) {
  let interfaceStr = "";
  const defsSeen: Record<string, string> = {};

  Object.entries(filesFields).forEach(([k, fields]) => {
    const mappedFields = mapObject(
      fields,
      widgetToTypeString,
      (i, field) => field.name
    );

    const c = printObjectType(mappedFields);

    defsSeen[c] = "temp";
    const cName = prefix + Object.keys(defsSeen).length;
    defsSeen[c] = cName;

    interfaceStr += `\n${str(k)}: ${cName},`;
  });
  return { defsSeen, interfaceStr };
}

(async () => {
  const file = pathlib.resolve(
    __dirname,
    "..",
    "src",
    "types",
    "ContentTypes.ts"
  );

  await fs.mkdir(pathlib.dirname(file), { recursive: true });

  let contents = "";
  const files: string[] = [];
  const filesFields: { [key: string]: CmsField[] } = {};

  const collections: string[] = [];
  const collectionFields: { [key: string]: CmsField[] } = {};

  const removeBody = (fields: CmsField[]) =>
    fields.filter((f) => f.name !== "body");

  config.collections.forEach((col) => {
    if (col.files) {
      col.files.forEach((f) => {
        files.push(f.name);
        filesFields[f.name] = removeBody(f.fields || []);
      });
    } else {
      collections.push(col.name);
      collectionFields[col.name] = removeBody(col.fields || []);
    }
  });

  const filesInterface = makeInterfaceFromFields(filesFields, "PageFields");
  const collectionInterface = makeInterfaceFromFields(
    collectionFields,
    "CollectionFields"
  );

  Object.entries(filesInterface.defsSeen).forEach(([typedef, name]) => {
    contents += `
    export type ${name} = ${typedef}; 
    `;
  });
  Object.entries(collectionInterface.defsSeen).forEach(([typedef, name]) => {
    contents += `
    export type ${name} = ${typedef}; 
    `;
  });

  contents += `
    export type ${FileTypeName}Names = ${files.map(str).join("|")};
    export type ${CollectionTypeName}Names = ${collections.map(str).join("|")};

    export interface ${FileTypeName} {
      ${filesInterface.interfaceStr}
    }
    export interface ${CollectionTypeName} {
      ${collectionInterface.interfaceStr}
    }
  `;

  // Object.entries(collectionFields).forEach(([k, v]) => {
  //   contents += `
  //     ${k}: ${mapObject(v, (field) => {
  //     field;
  //   })};
  //   `;
  // });

  await fs.writeFile(file, prettier.format(contents, { parser: "typescript" }));
})().catch(console.error);

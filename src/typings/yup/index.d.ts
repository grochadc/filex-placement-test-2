import { StringSchema, StringSchemaConstructor } from "yup";

declare module "yup" {
  interface StringSchema {
    test(
      name: string,
      message: string,
      cb: (value: string) => any
    ): StringSchema;
  }
}

export const string: StringSchemaConstructor;

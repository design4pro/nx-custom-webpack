import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import {
  BrowserBuilderOptions,
  executeBrowserBuilder,
} from '@angular-devkit/build-angular';
import { json } from '@angular-devkit/core';
import { CustomWebpackSchema } from '../custom-webpack-schema';
import { getTransforms } from '../transforms';

export type CustomWebpackBrowserSchema = BrowserBuilderOptions &
  CustomWebpackSchema;

export const buildCustomWebpackBrowser = (
  options: CustomWebpackBrowserSchema,
  context: BuilderContext
): ReturnType<typeof executeBrowserBuilder> =>
  executeBrowserBuilder(options, context, getTransforms(options, context));

export default createBuilder<json.JsonObject & CustomWebpackBrowserSchema>(
  buildCustomWebpackBrowser
);

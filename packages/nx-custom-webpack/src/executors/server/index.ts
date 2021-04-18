import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import {
  executeServerBuilder,
  ServerBuilderOptions,
} from '@angular-devkit/build-angular';
import { json } from '@angular-devkit/core';
import { CustomWebpackSchema } from '../custom-webpack-schema';
import { customWebpackConfigTransformFactory } from '../transforms';

export type CustomWebpackServerSchema = ServerBuilderOptions &
  CustomWebpackSchema;

export const buildCustomWebpackServer = (
  options: CustomWebpackServerSchema,
  context: BuilderContext
): ReturnType<typeof executeServerBuilder> =>
  executeServerBuilder(options, context, {
    webpackConfiguration: customWebpackConfigTransformFactory(options, context),
  });

export default createBuilder<json.JsonObject & CustomWebpackServerSchema>(
  buildCustomWebpackServer
);

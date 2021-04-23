/**
 * check for TS node registration
 * @param file: file name or file directory are allowed
 * @todo tsNodeRegistration: require ts-node if file extension is TypeScript
 */
export function tsNodeRegister(file = '', tsConfig?: string) {
  if (file && file.endsWith('.ts')) {
    // Register TS compiler lazily
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('ts-node').register({
      project: tsConfig,
      compilerOptions: {
        module: 'CommonJS',
        types: [
          'node', // NOTE: `node` is added because users scripts can also use pure node's packages as webpack or others
        ],
      },
    });

    // Register paths in tsConfig
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const tsconfigPaths = require('tsconfig-paths');
    const { absoluteBaseUrl: baseUrl, paths } = tsconfigPaths.loadConfig(
      tsConfig
    );
    if (baseUrl && paths) {
      tsconfigPaths.register({ baseUrl, paths });
    }
  }
}

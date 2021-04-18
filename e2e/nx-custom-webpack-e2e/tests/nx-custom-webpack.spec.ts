import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('nx-custom-webpack e2e', () => {
  it('should create nx-custom-webpack', async (done) => {
    const plugin = uniq('nx-custom-webpack');
    ensureNxProject(
      '@design4pro/nx-custom-webpack',
      'dist/packages/nx-custom-webpack'
    );
    await runNxCommandAsync(
      `generate @design4pro/nx-custom-webpack:nx-custom-webpack ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('nx-custom-webpack');
      ensureNxProject(
        '@design4pro/nx-custom-webpack',
        'dist/packages/nx-custom-webpack'
      );
      await runNxCommandAsync(
        `generate @design4pro/nx-custom-webpack:nx-custom-webpack ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('nx-custom-webpack');
      ensureNxProject(
        '@design4pro/nx-custom-webpack',
        'dist/packages/nx-custom-webpack'
      );
      await runNxCommandAsync(
        `generate @design4pro/nx-custom-webpack:nx-custom-webpack ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});

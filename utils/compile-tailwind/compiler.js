function createCompileOptions({
  base,
  onDependency,
  shouldRewriteUrls,
  customCssResolver,
  customJsResolver,
}) {
  return {
    base,
    /**
     * @param {string} id
     * @param {string} base
     */
    async loadModule(id, base) {
      return loadModule(id, base, onDependency, customJsResolver);
    },
    /**
     * @param {string} id
     * @param {string} base
     */
    async loadStylesheet(id, base) {
      let sheet = await loadStylesheet(
        id,
        base,
        onDependency,
        customCssResolver,
      );

      if (shouldRewriteUrls) {
        sheet.content = await rewriteUrls({
          css: sheet.content,
          root: base,
          base: sheet.base,
        });
      }

      return sheet;
    },
  };
}

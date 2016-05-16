import ngAnnotate from 'ng-annotate';

class NgAnnotatedTypeScriptCompiler extends TypeScriptCompiler {
  constructor(options) {
    super(options);
  }

  processFilesForTarget(inputFiles) {
    inputFiles = inputFiles.map((inputFile) => {
      inputFile._addJavaScript = inputFile.addJavaScript;
      inputFile.addJavaScript = function(options) {
        const annotated = ngAnnotate(options.data, {
          add: true
        });

        if (annotated.errors) {
          throw new Error(annotated.errors.join(': '));
        }

        options.data = annotated.src;
        this._addJavaScript(options);
      };

      return inputFile;
    });

    super.processFilesForTarget(inputFiles);
  }
}

Plugin.registerCompiler({
  extensions: ['ts', 'tsx'],
  filenames: ['tsconfig.json']
}, function () {
  return new NgAnnotatedTypeScriptCompiler({
    // We define own helpers.
    noEmitHelpers: true,
    jsx: 'react'
  });
});

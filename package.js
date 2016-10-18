Package.describe({
  name: 'mys:typescript-ng-annotate',
  version: '0.0.2',
  summary: 'TypeScript for Meteor with ngAnnotate',
  git: 'https://github.com/kamilkisiela/typescript-ng-annotate',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: 'typescriptNgAnnotate',
  use: ['barbatus:typescript-compiler', 'ecmascript@0.2.0'],
  sources: ['plugin.js'],
  npmDependencies: {
    'ng-annotate': '1.2.1'
  }
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');

  api.use('isobuild:compiler-plugin@1.0.0');
  api.use('barbatus:typescript-compiler@0.7.0');

  api.imply('modules@0.6.4');

  api.imply('barbatus:typescript-runtime@0.1.2');
});

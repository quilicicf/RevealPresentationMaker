module.exports = (presentationNormalizedName) => {
  const packageFileContent = {
    name: presentationNormalizedName,
    version: '1.0.0',
    description: '',
    main: 'index.js',
    private: true,
    scripts: { start: 'live-server --port=1234' },
    license: 'UNLICENSED',
    dependencies: {
      'live-server': '1.2.1', // TODO: change with parcel once bundler-friendliness is achieved in Reveal
      'reveal.js': '3.9.2',
    },
  };

  return JSON.stringify(packageFileContent, null, 2);
};

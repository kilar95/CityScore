module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
          debug: false,
        },
      ],
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
  };
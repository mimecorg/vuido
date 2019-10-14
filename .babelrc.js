module.exports = {
  presets: [
    [ '@babel/preset-env', {
      targets: {
        node: 10
      },
      modules: false,
      useBuiltIns: 'entry'
    } ]
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-flow-strip-types'
  ],
  comments: false
}

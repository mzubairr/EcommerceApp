module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
      
      'react-native-worklets/plugin', //  must be last in the plugins array
    ],
};

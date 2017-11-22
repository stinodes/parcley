// window isn't defined as of react-native 0.45+ it seems
if (typeof window !== 'object') {
  global.window = global;
  global.window.navigator = {};
}
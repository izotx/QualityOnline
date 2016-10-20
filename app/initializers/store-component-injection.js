export function initialize( application) {
  // application.inject('route', 'foo', 'service:foo');
  application.inject('component', 'store', 'service:store');
}

export default {
  name: 'store-component-injection',
  initialize
};

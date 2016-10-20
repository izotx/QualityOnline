import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('departmentment-list', 'Integration | Component | departmentment list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{departmentment-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#departmentment-list}}
      template block text
    {{/departmentment-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

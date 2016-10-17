import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('faculty-training-list', 'Integration | Component | faculty training list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{faculty-training-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#faculty-training-list}}
      template block text
    {{/faculty-training-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

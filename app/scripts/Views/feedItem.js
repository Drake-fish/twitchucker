import $ from 'jquery';
import Backbone from 'backbone';

export default Backbone.View.extend({
  tagName: 'li',

  template(){
    return `
    <span>${this.model.get('name')} Wrote:</span>
    <p>${this.model.get('body')}</p>
    `;
  },

  render(){
    this.$el.append(this.template());
  }
});

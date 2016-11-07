import Backbone from 'backbone';
import Nav from './nav';
import $ from 'jquery';
let container = $('main');
export default Backbone.View.extend({
    initialize(opts) {
        this.children = opts.children || [];
    },
    render() {
        var nav = new Nav({
            model: this.model
        });
        nav.render();
        this.$el.append(nav.el);
        this.children.forEach((child, i, arr) => {
            if (child.collection) {
                child.collection.on('update', () => {
                    child.$el.empty();
                    child.render();
                });

            }
            if (child.model) {
                child.model.on('change', () => {
                    child.render();
                });
            }

            child.render();
            this.$el.append(child.el);
        });
    }

});

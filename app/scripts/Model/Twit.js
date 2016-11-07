import Backbone from 'backbone';
import $ from 'jquery';

export default Backbone.Model.extend({
    idAttribute: 'objectId',
    defaults: {
        timestamp: '',
        name: '',
        body: '',
        likes: 0,
        dislikes: 0

    },
    delete() {
        this.destroy();
    }
});

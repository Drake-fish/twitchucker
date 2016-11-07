import Backbone from 'backbone';
import router from '../router';

export default Backbone.View.extend({
    tagName: 'nav',
    template() {
        var data = ``;
        if (this.model.get('user-token')) {
            data += `
     <a id=logout href='#'>Logout</a>
      <a href="#profile">Profile</a>
      <a href="#feed">Feed</a>

      `;
        } else {
            data += `
      <a href="#">Login</a>
      <a href="#signup">Sign-Up</a>
      `;
        }
        return data;
    },
    render() {
        this.$el.append(this.template());
    },
    events: {
        'click #logout': 'logmeout'
    },
    logmeout(e) {
        this.model.userLogout();
    }
});

import Backbone from 'backbone';
import $ from 'jquery';



const profileHeader = Backbone.View.extend({
    template() {
        return `
      <img class="profilePic" src="http://cdn.1001freedownloads.com/vector/thumb/122862/purzen_Scary_face.png">
      <h2 class="profileName">${this.model.get('name')}'s Profile</h2>
      <h4 class="profileEmail">${window.localStorage.email}</h4>
`;
    },
    className: 'profileHeader',
    render() {
        console.log(this.model);
        this.$el.append(this.template());
    }
});

export default profileHeader;

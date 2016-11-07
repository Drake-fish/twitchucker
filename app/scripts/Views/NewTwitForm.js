import Backbone from 'backbone';
import $ from 'jquery';


const TwitForm = Backbone.View.extend({
    template() {
        return `
  <input id="twit" type="text" value="" placeholder="What's on your chuckin' mind?">
  <input id="send-twit" type="submit" value="CHUCK IT!">

    `;
    },
    render() {
        this.$el.append(this.template());

    },
    events: {
        'submit': 'submitTwit',
    },

    submitTwit(e) {
        e.preventDefault();
        const likes = 0;
        const dislikes = 0;
        const timestamp = new Date();
        const body = this.$('#twit').val();
        const name = window.localStorage.getItem('name');
        this.collection.create({
            name,
            body,
            timestamp,
            likes,
            dislikes
        }, {
            wait: true
        });
    },

    tagName: 'form',
    className: 'twitBox'


});
export default TwitForm;

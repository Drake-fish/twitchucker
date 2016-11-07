import Backbone from 'backbone';
import $ from 'jquery';


const Header = Backbone.View.extend({
    template() {
        return `
    <img class="logo" src="http://www.clipartbest.com/cliparts/pi5/685/pi56855iB.png">
    <h2 class="feedHeader">Hello ${window.localStorage.name}</h2>`;
    },
    className: 'feed-header',
    render() {
        this.$el.append(this.template());
    }
});

export default Header;

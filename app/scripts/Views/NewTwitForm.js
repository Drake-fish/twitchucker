import Backbone from 'backbone';
import $ from 'jquery';


const TwitForm=Backbone.View.extend({
  template(){
  return  `
  <button id="logout">Log out</button>
  <input id="twit" type="text" value="" placeholder="Write A Twit to Chuck!">
  <input type="submit" value="CHUCK IT!">

    `;
  },
  render(){
    this.$el.append(this.template());
  },
  events:{
    'submit': 'submitTwit',
    'click #logout': 'logout'
  },

  submitTwit(e){
    e.preventDefault();
    const twit=this.$('#twit').val();
    console.log(twit);
    console.log(this);
},
logout(){
  this.logout();
},
tagName:'form'


});
export default TwitForm;

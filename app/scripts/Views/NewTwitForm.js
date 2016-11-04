import Backbone from 'backbone';
import $ from 'jquery';


const TwitForm=Backbone.View.extend({
  template(){
  return  `
  <input id="twit" type="text" value="" placeholder="Write A Twit to Chuck!">
  <input type="submit" value="CHUCK IT!">

    `;
  },
  render(){
    this.$el.append(this.template());
  },
  events:{
    'submit': 'submitTwit',
  },

  submitTwit(e){
    e.preventDefault();
    const body=this.$('#twit').val();
    const name=window.localStorage.getItem('name');
    console.log(name);
    this.collection.create({name,body});
},

tagName:'form'


});
export default TwitForm;

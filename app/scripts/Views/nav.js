import Backbone from 'backbone';
import router from '../router';

export default Backbone.View.extend({
  tagName:'nav',
  template(){
    var data=``;
    if(this.model.get('user-token')){
     data+= `
      <a href=#profile>Profile</a>
      <a id=logout href='#'>LOGOUT</a>
      `;
    }else{
      data +=`
      <a href="#">Login</a>
      <a href="#signup">Sign-Up</a>
      `;
    }
    return data;
  },
  render(){
    this.$el.append(this.template());
  },
  events:{
    'click #logout': 'logmeout'
  },
  logmeout(e){
    this.model.userLogout();
  }
});

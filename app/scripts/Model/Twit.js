import Backbone from 'backbone';


export default Backbone.Model.extend({
  idAttribute:'objectId',
  defaults:{
    timestamp: '',
    name:'',
    body:'',
    likes:0,
    dislikes:0

  }
});

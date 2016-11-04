import Backbone from 'backbone';
import Twit from '../Model/Twit';


export default Backbone.Collection.extend({
  model:Twit,
  url:'https://api.backendless.com/v1/data/twits',
  parse(data){
    return data.data;
  }
});

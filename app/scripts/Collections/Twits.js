import Backbone from 'backbone';
import Twit from '../Models/Twit';


export default Backbone.Collection.extend({
  model:Twit,
  url:'https://api.backendless.come/v1/data/twits',
  parse(data){
    console.log(data);
    return data.data;
  }
});

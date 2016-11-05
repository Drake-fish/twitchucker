import $ from 'jquery';
import Backbone from 'backbone';
import FeedItem from './feedItem';
import Twits from '../Collections/Twits';
export default Backbone.View.extend({

  tagName: 'ul',
  className: 'feed-list',
  render(){
    this.$el.empty();
    this.collection.forEach((twit,i,arr)=>{
          let feedItem=new FeedItem({model:twit});
          feedItem.render();
          this.$el.prepend(feedItem.el);


    });
  }
});

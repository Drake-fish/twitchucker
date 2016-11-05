import $ from 'jquery';
import Backbone from 'backbone';
import moment from 'moment';
export default Backbone.View.extend({
  tagName: 'li',


  template(){
    return `

    <img class="profile-pic" src="http://cdn.1001freedownloads.com/vector/thumb/122862/purzen_Scary_face.png">
    <span class="name">${this.model.get('name')}</span>
    <span class="date">${moment(this.model.get('timestamp')).format('MMMM Do YYYY')}</span>
    <p class="post">${this.model.get('body')}</p>
    `;
  },

  render(){
    if(this.model.get('ownerId')===window.localStorage.ownerId){
      this.$el.append(`<button id="delete">Delete</button>`);
    }
    this.$el.append(this.template());
    this.$el.append(`<i id="like" class=" fa fa-thumbs-up" aria-hidden="true"></i><span class="likes">${this.model.get('likes')}<span>
                    <i id="dislike" class="fa fa-thumbs-down" aria-hidden="true"></i><span class="dislikes">${this.model.get('dislikes')}</span>`);
  },

    events:{
      'click #delete':'delete',
      'click #like':'like',
      'click #dislike':'dislike'

    },
    delete(){
      this.model.destroy();
    },
    like(){

      let likes=this.model.get('likes');
      let myName=window.localStorage.name;
      likes++;
      this.$el.append(`<span class="iLiked">${myName} Liked this post</span>`);
      this.model.save('likes',likes);
      this.$('#like').addClass('selected');



    },
    dislike(){
      let dislikes=this.model.get('dislikes');
      let myName=window.localStorage.name;
      this.model.save('dislikes',dislikes++);
      this.$el.append(`<span class="iLiked">${myName} chuckin' disliked this post</span>`);
      this.$('#dislike').addClass('selected');
    }

});

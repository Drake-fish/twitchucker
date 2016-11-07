import $ from 'jquery';
import Backbone from 'backbone';
import moment from 'moment';
export default Backbone.View.extend({
    tagName: 'li',


    template() {
        return `
    <img class="profile-pic" src="http://cdn.1001freedownloads.com/vector/thumb/122862/purzen_Scary_face.png">
    <span class="name">${this.model.get('name')}</span>
    <span class="date">${moment(this.model.get('timestamp')).format('MMMM Do YYYY')}</span>
  <i class="fa fa-quote-left" aria-hidden="true"></i><p class="post">${this.model.get('body')}<i class="fa fa-quote-right" aria-hidden="true"></i></p>
    `;
    },

    render() {
        console.log(this.model);
        if (this.model.get('ownerId') === window.localStorage.ownerId) {
            this.$el.append(`<button id="delete">Delete</button>`);
        }
        this.$el.append(this.template());
        this.$el.append(`<i id="like" class=" fa fa-thumbs-up" aria-hidden="true"></i><span class="likes">${this.model.get('likes')}<span>
                    <i id="dislike" class="fa fa-thumbs-down" aria-hidden="true"></i><span class="dislikes">${this.model.get('dislikes')}</span>`);

    },

    events: {
        'click #delete': 'delete',
        'click #like': 'like',
        'click #dislike': 'dislike'

    },
    delete() {
        this.model.delete();
    },
    like() {
        let likes = this.model.get('likes');
        let myName = window.localStorage.name;
        likes++;
        this.$el.append(`<span class="iLiked">${myName} Liked this post</span>`);
        setTimeout(function() {
            $('.iLiked').fadeOut();
        }, 2000);
        this.model.save('likes', likes);
        this.$('.likes').text(likes);
        this.$('#like').addClass('selected');
    },
    dislike() {

        let dislikes = this.model.get('dislikes');
        let myName = window.localStorage.name;
        dislikes++;
        this.$el.append(`<span class="iHated">${myName} Chuckin' disliked this post</span>`);
        setTimeout(function() {
            $('.iHated').fadeOut();
        }, 2000);
        this.model.save('dislikes', dislikes);
        this.$('.dislikes').text(this.model.get('dislikes'));
        this.$('#dislike').addClass('selected');
    }

});

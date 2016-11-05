import Backbone from 'backbone';
import $ from 'jquery';
import Session from './Model/Session';
import Sessions from './Collections/Sessions';
import secret from './secret';
import Login from './Views/login';
import Register from './Views/signup';
import TwitForm from './Views/NewTwitForm';
import Twit from './Model/Twit';
import NavContainer from './Views/viewWithNav';
import Nav from './views/nav';
import Twits from './Collections/Twits';
import FeedItem from './Views/feed';
import ProfilePage from './Views/profile';
import Header from './Views/header';
import ProfileHeader from './Views/profileHeader';
let session = new Session();
let twit= new Twit();
let twits= new Twits();
let container = $('main');

$(document).ajaxSend((evt, xhr, opts) => {
    console.log('interception!', opts);
    xhr.setRequestHeader('application-id', '2DA093B3-BEFC-8F94-FF9B-18A8F6670500');
    xhr.setRequestHeader('secret-key', secret());
    xhr.setRequestHeader('application-type', 'REST');
    xhr.setRequestHeader('user-token', session.get('user-token'));
});

const Router = Backbone.Router.extend({
    routes: {
        '': 'login',
        'signup': 'signup',
        'feed': 'feed',
        'profile':'profile'
    },
    protectedRoute(){
      if(session.get('user-token')){
        return true;
      }else{
        container.empty();
        this.navigate('',{trigger:true});
        return false;
      }
    },
    login() {
        if (session.get('user-token')) {
            this.navigate('feed', {
                trigger: true
            });
        } else {
            container.empty();
            let login = new Login({
                model: session,
                router: this,
                session: session
            });
            var loginPage=new NavContainer({
              model: session,
              children: [login]
            });
            loginPage.render();
            container.append(loginPage.el);

        }
    },
    signup() {
      if(session.get('user-token')){
        this.navigate('feed',{trigger:true});
      }else{
        container.empty();
        let register = new Register({
            model: session,
            session: session,
            router: this
        });
        var registerPage= new NavContainer({
          model: session,
          children: [register]
        });
        registerPage.render();
        container.append(registerPage.el);
      }
    },
    feed(){
      if(this.protectedRoute()){
        twits.fetch();
        twits.comparator='timestamp';
        container.empty();
        this.navigate('feed',{trigger:true});
        let twitForm= new TwitForm({
          collection: twits,
          model: session,
          session: session,
          router: this
        });
        let header= new Header({});
        var homePage=new NavContainer({
          model: session,
          children: [header,twitForm, new FeedItem({collection:twits})]
        });
        homePage.render();
        container.append(homePage.el);
      }


    },
    profile(){
      if(this.protectedRoute()){
        twits.fetch();
        twits.comparator='timestamp';
        container.empty();
        this.navigate('profile',{trigger:true});
        let twitForm=new TwitForm({
          collection:twits,
          model:session,
          router:this
        });
        let profileHeader=new ProfileHeader({model:session});
        var profilePage= new NavContainer({
          model:session,
          children: [profileHeader, twitForm, new ProfilePage({collection:twits})]

        });
        profilePage.render();
        container.append(profilePage.el);
      }

    }
});

const router = new Router();
export default router;

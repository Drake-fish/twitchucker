import Backbone from 'backbone';
import $ from 'jquery';
import Session from './Model/Session';
import secret from './secret';
import Login from './Views/login';
import Register from './Views/signup';
import TwitForm from './Views/NewTwitForm';
import Twit from './Model/Twit';
let session = new Session();
let twit= new Twit();
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
        'home': 'home'
    },
    login() {
        if (session.get('user-token')) {
            this.navigate('home', {
                trigger: true
            });
        } else {
            container.empty();
            let login = new Login({
                model: session
            });
            login.render();
            container.append(login.el);

        }
    },
    signup() {
        container.empty();
        let register = new Register({
            model: session
        });
        register.render();
        container.append(register.el);
    },
    home(){

      if(!session.get('user-token')){
        this.navigate('',{trigger:true});
      }else{
        container.empty();
        let twitForm= new TwitForm({
          model:{twit, session}
        });
        twitForm.render();

        container.append(twitForm.el);
      }

    }
});

const router = new Router();
export default router;

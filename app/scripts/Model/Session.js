import Backbone from 'backbone';
import $ from 'jquery';
import secret from '../secret';
import router from '../router';

export default Backbone.Model.extend({
    initialize() {
        if (window.localStorage.getItem('user-token')) {
            this.set('user-token', window.localStorage.getItem('user-token'));
        }
    },
    idAttribute: 'objectId',
    defaults: {
        name: '',
        email: '',
        'user-token': ''


    },

    validatePassword(password, confirmPassword) {
        if (password.trim() && password === confirmPassword) return true;
        return false;
    },
    userRegister(email, password) {
        console.log(email, password);
        $.ajax({
            type: 'POST',
            url: 'https://api.backendless.com/v1/users/register',
            contentType: 'application/json',
            data: JSON.stringify({
                email,
                password
            }),
            success: () => {
                this.userLogin(email, password);
            }

        });
    },
    userLogin(email, password) {
        $.ajax({
            type: 'POST',
            url: 'https://api.backendless.com/v1/users/login',
            contentType: 'application/json',
            data: JSON.stringify({
                login: email,
                password
            }),
            success: (response) => {
                this.set(response);
                window.localStorage.setItem('user-token', response['user-token']);
                router.navigate('home', {
                    trigger: true
                });
            },
            error:(error)=>{


            }
        });
    },
    userLogout() {
        $.ajax({
            url: 'https://api.backendless.com/v1/users/logout',
            success: () => {
                this.clear();
                window.localStorage.clear();
                router.navigate('login', {
                    trigger: true
                });
            }
        });
    }

});

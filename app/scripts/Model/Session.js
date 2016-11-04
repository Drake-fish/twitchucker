import Backbone from 'backbone';
import $ from 'jquery';
import secret from '../secret';
import router from '../router';

export default Backbone.Model.extend({
    initialize() {
        if (window.localStorage.getItem('user-token')) {
            this.set('user-token', window.localStorage.getItem('user-token'));
            this.set('name',window.localStorage.getItem('name'));
            this.set('ownerId', window.localStorage.getItem('ownerId'));
        }

    },
    idAttribute: 'objectId',
    defaults: {
        ownerId     : '',
        name        : '',
        email       : '',
        'user-token': ''


    },
    //get request data object to server {key: value} advanced object retrieval
    // data:{where: URLencoded('ownerId=${session.id}'}

    validatePassword(password, confirmPassword) {
        if (password.trim() && password === confirmPassword) return true;
        return false;
    },
    userRegister(email, password, name) {
        console.log(email, password);
        $.ajax({
            type: 'POST',
            url: 'https://api.backendless.com/v1/users/register',
            contentType: 'application/json',
            data: JSON.stringify({
                email,
                password,
                name
            }),
            success: () => {
                this.userLogin(email, password);
            }
//user comparator on collection.
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
                window.localStorage.setItem('name',response.name);
                window.localStorage.setItem('ownerId',response.ownerId);
                router.navigate('feed', {
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
                router.navigate('', {
                    trigger: true
                });
            }
        });
    }

});

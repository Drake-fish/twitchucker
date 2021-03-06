import $ from 'jquery';
import Backbone from 'backbone';


const Register = Backbone.View.extend({
    template() {
        return `
    <h2 class="signup-title">Chuckin' sign up page! </h2>
    <h3>Let's get you Chuckin Twits!</h3>
    <div class="error"></div>
    <input value='' id="name" type="text" placeholder="What's Your Name?">
    <input value='' id="email" type="email" placeholder="Chuckin' Email">
    <input value='' id="password" type="password" placeholder="Chuckin' Password">
    <input value='' id="confirmPassword" type="password" placeholder="Confirm Chuckin' password">
    <input value='Chuckin Sign Me Up!' id="submit" type="submit">
    <span class="toggleSignup registerButton">What you already have a Twit Chucker account? Well, Chuckin' <a href="#">Login Partner!</a><span>
`;
    },
    render() {
        this.$el.append(this.template());
    },
    events: {
        'submit': 'submitRegisterForm'
    },
    submitRegisterForm(e) {
        e.preventDefault();
        const name = this.$('#name').val();
        const email = this.$('#email').val();
        const password = this.$('#password').val();
        const confirmPassword = this.$('#confirmPassword').val();
        console.log(email, password);
        if (this.model.validatePassword(password, confirmPassword)) {
            console.log('registered!');
            this.model.userRegister(email, password, name);
        } else {
            console.log('passwords not matching');
            let errorBox = $('.error');
            errorBox.append(`<span>Your Chuckin' Passwords don't match!</span>`);
            errorBox.css('display', 'block');
            this.$('#password').val('');
            this.$('#confirmPassword').val('');

        }

    },
    tagName: 'form'
});

export default Register;

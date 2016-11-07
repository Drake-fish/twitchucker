import $ from 'jquery';
import Backbone from 'backbone';


const Login = Backbone.View.extend({
    template() {
        return `
    <div class="header">
    <img src="http://www.clipartbest.com/cliparts/pi5/685/pi56855iB.png">
    <h1>TWIT-CHUCKER</h1>
</div>
    <h2><span class="highlight">The BEST Chuckin' Way</span> to stay connected to your closest friends!</h2>
    <form>
    <div class="error"></div>
    <input value='' id="email" type="email" placeholder="Chuckin' Email">
    <input value='' id="password" type="password" placeholder="Chuckin' Password">
    <input value='LOG ME IN!' id="submit" type="submit">
    </form>
    <span class="toggleSignup"> Hey don't have a TwitChuckin' account?! What are you Chuckin' waitin' for! <a href="#signup">Chuckin' Sign up!</a><span>
`;
    },
    render() {
        this.$el.append(this.template());
    },
    events: {
        'submit': 'submitForm'
    },
    submitForm(e) {
        let errorDiv = $('.error');
        e.preventDefault();
        const email = this.$('#email').val();
        const password = this.$('#password').val();
        console.log(email, password);
        this.model.userLogin(email, password);
    },
});

export default Login;

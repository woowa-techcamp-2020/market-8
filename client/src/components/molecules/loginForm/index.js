import { form, div } from '/utils/elements.js';
import Button from '/components/atoms/button/index.js';
import Input from '/components/atoms/input/index.js';
import Img from '/components/atoms/img/index.js';

const LoginForm = () => 
    div({className: 'login-form-container'},
        form(
        { className : 'loginForm', action: 'users/login', method: 'post' },
        Img('https://ceo.baemin.com/lockpath/images/logo-ceo.png', '배민사장님광장', 274, 40),
        Input('atom.input.full', 'id', '아이디', 'text'),
        Input('atom.input.full', 'pw', '비밀번호', 'password'),
        Button('atom.button.full', '로그인'),
    )
)

export default LoginForm;



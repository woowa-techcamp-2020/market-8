import { div } from '/utils/elements.js';
import Button from '/components/atoms/button/index.js';

const LoginColumn = () => div(
    { className : 'molecules__loginColumn' },
    '사장님, 로그인해주세요!',
    Button('atoms.button.full', '로그인', () => location.href = '/login' ),
)

export default LoginColumn;


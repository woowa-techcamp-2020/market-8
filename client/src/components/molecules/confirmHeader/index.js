import { div } from '/utils/elements.js';
import Img from '/components/atoms/img/index.js';
import A from '/components/atoms/a/index.js';

const ConfirmHeader = () => div(
    { className : 'molecule-confirmHeader', },
    Img('https://ceo.baemin.com/lockpath/images/logo-ceo.png', '배민사장님광장', 274, 40),
    div({ className: 'aDiv' }, A('atom-a', '메인으로', '/login')),
)

export default ConfirmHeader;


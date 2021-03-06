import { div, span } from '/utils/elements.js';
import Text from '/components/atoms/text/index.js';
import Input from '/components/atoms/input/index.js';
import Button from '/components/atoms/button/index.js';
import { 
    validateStates
} from '/components/molecules/signupForm/validator.js'
/** @description insert newNde after refenceNode
     * @param {Node} newNode
     * @param {Node} referenceNode
     */
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/** @description delete sibling node
     * @param {Node} referenceNode
     */
const deleteSibling = (node) => {
    if(node && node.nextSibling) {
        node.parentNode.removeChild(node.nextSibling)
    }
};

/** @description insert newNde after refenceNode
     * @param {Node} newNode
     * @param {Node} referenceNode
     */
export const emailSelecthandler = (event) => {
    const inputDisabledClass = 'atom-input-disabled';
    const selectValue = event?.target?.value;
    const emailInput = document.getElementsByName("emailRear")?.[0];
    const rearInput = document.querySelector('input[name=emailRear]');

    const naverEmail = 'naver.com';
    const googleEmail = 'gmail.com';
    const nateEmail = 'nate.com';
    const hotEmail = 'hotmail.com';
    const hanEmail = 'hanmail.net';


    if(!selectValue || !emailInput) return;
    rearInput.disabled = true;

    switch(selectValue){
        case naverEmail:
            emailInput.value = naverEmail;
            break;
        case hanEmail:
            emailInput.value = hanEmail;
            break;
        case nateEmail:
            emailInput.value = nateEmail;
            break;
        case hotEmail:
            emailInput.value = hotEmail;
            break;
        case googleEmail:
            emailInput.value = googleEmail;
            break;
        case '직접입력':
            rearInput.disabled = false;
            emailInput.value = '';
            emailInput.className = '';
            break;
        default:
            emailInput.className = inputDisabledClass;
    }
}


export const phoneButtonHandler = (() => {
    let phoneContainer = null;
    let setIntervalId = null;
    let isAddInput = false;
    let timeDisplay = null;
    let confirmInput = null;
    let button = null;
    const defaultButtonClassName = 'atom-button-with-input phone-button';

    /** @description display time 
     * @param {number} time
     * @param {Node} displayNode
     * 
     */
    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        setIntervalId = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            
            const totalTime = minutes + ":" + seconds;

            if(totalTime === '00:00'){
                display.textContent = totalTime;
                deleteSibling(phoneContainer);
                isAddInput = false;
                const errorMsg = Text(
                    'atom-text-error', 
                    '입력시간을 초과하였습니다. 인증번호 재전송 후 다시 시도해 주세요.'
                    )
                insertAfter(errorMsg, phoneContainer);
                clearInterval(setIntervalId);
            }else{
                display.textContent = totalTime;
            }
    
            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }

    const confirmHandler = (event) => {
        event.preventDefault();
        const confirmNumber = confirmInput.value;
        if(confirmNumber.length === 6) {
            button.className = defaultButtonClassName + 'atom-button-finished';
            button.textContent = '인증완료';

            const phoneInput = document.querySelector('input[name=phoneNo]');
            phoneInput.disabled = true;
            deleteSibling(phoneContainer);
            validateStates.phoneConfirm = true;
        }
    }

    const addConfirmPhoneContainer = () => {
        phoneContainer = document.querySelector('.phone-container');
        timeDisplay = span({className: 'span-timer'}, '03:00');
        startTimer(60 * 3, timeDisplay)
        confirmInput = Input('atom-input-with-buton', 'confirmPhoneNO', '인증번호 6자리 입력', 'text');
        
        const inputContainer = 
            div({ className : 'button-input address-container'},
                confirmInput,
                timeDisplay,
                Button('atom-button-with-input atom-button-success confirm-button', '확인', confirmHandler),
            );
        insertAfter(inputContainer, phoneContainer);
        isAddInput = true;
    }

    return (event) => {
        event.preventDefault();

        if(!validateStates.phoneNo) return;

        button = document.querySelector('.phone-button');
        if(button.textContent === '인증받기') {
            addConfirmPhoneContainer();
            button.textContent = '재요청'
        }else if(button.textContent === '재요청') {
            clearInterval(setIntervalId);
            if(isAddInput) {
                console.log('delete sibling');
                startTimer(60 * 3, timeDisplay);
            }else {
                deleteSibling(phoneContainer);
                addConfirmPhoneContainer();
                isAddInput = true;
            }
        }
    }
})();

export const handleCheckTotal = (() => {
    let essentialCheck = null;
    let adCheck = null;

    setTimeout(() => {
        essentialCheck = document.querySelector('input[name=checkEssential]');
        adCheck = document.querySelector('input[name=isAdAgreed]');    
    });

    return (event) => {
        const inputButton = event.target;
        if(inputButton.checked) {
            essentialCheck.checked = true;
            adCheck.checked = true;
        }else {
            essentialCheck.checked = false;
            adCheck.checked = false;
        }
    }

})();


export const handleCheckEssential = (() => {
    let essentialCheck = null;
    let totalCheck = null;

    setTimeout(() => {
        essentialCheck = document.querySelector('input[name=checkEssential]');
        totalCheck = document.querySelector('input[name=checkTotal]');    
    });

    return (event) => {
        if(!essentialCheck.checked) {
            totalCheck.checked = false;
        }
    }
})();

export const handleFindAddress = (() => {
    let zipInput = null;
    let addressInput = null;

    setTimeout(() => {
        zipInput = document.querySelector('input[name=zipCode]');
        addressInput = document.querySelector('input[name=address1]');    
    });

    return (event) => {
        event?.preventDefault();
        new daum.Postcode({
            oncomplete: function(data) {
                zipInput.value = data.zonecode;
                addressInput.value = data.address;
            }
        }).open();
    }
})();

export const handleForm = (() => {
    const checkAddressClick = (name) => {
        if(name === 'zipCode' || name === 'address1'){
            const addressCheckInput = document.querySelector('input[name=checkAddress]');
            if(addressCheckInput.checked) {
                handleFindAddress();
            }
        }
    }

    return (event) => {
        const name = event.target.name;
        checkAddressClick(name);
    }
})();

export const handleCheckAddress = (() => {
    let zipInput = null;
    let addressInput = null;
    let detailAddressInput = null;
    let addressButton = null;
    let defaultBtnClassName = '';

    setTimeout(() => {
        zipInput = document.querySelector('input[name=zipCode]');
        addressInput = document.querySelector('input[name=address1]');  
        detailAddressInput = document.querySelector('input[name=address2]');    
        addressButton = document.querySelector('.find-address');   
        defaultBtnClassName = addressButton.className; 

        zipInput.disabled = true;
        addressInput.disabled = true;
        detailAddressInput.disabled = true;
        addressButton.disabled = true;
    });

    return (event) => {
        if(event.target.checked) {
            addressButton.className = defaultBtnClassName + ' atom-button-success';
            addressButton.disabled = false;
            detailAddressInput.disabled = false;
        }else {
            addressButton.className = defaultBtnClassName;
            addressButton.disabled = true;

            detailAddressInput.disabled = true;
        }
    }
})();


export const handleSingupButton = (() => {

    setTimeout(() => {
        

    });
    return (event) => {
        event.preventDefault();
        const inputs = [...document.getElementsByTagName('input')];
        const essentialCheck = document.querySelector('input[name=checkEssential]');
        const adCheck = document.querySelector('input[name=isAdAgreed]');

        const essentialStatue = essentialCheck.checked;
        const adStatue = adCheck.checked;

        inputs.forEach(element => {
            element.dispatchEvent(new Event('change'));
        });

        essentialCheck.checked = essentialStatue;
        adCheck.checked = adStatue;

        const erorrInput = document.querySelector('.atom-input-false')
        console.log(essentialCheck.checked);
        if(erorrInput){
            erorrInput.focus();
            erorrInput.scrollIntoView();
        }else if(!essentialCheck.checked){
            alert('필수 동의를 체크해주십시오');
            essentialCheck.focus();
            essentialCheck.scrollIntoView();
        }else {
            const rearInput = document.querySelector('input[name=emailRear]');
            rearInput.disabled = false;
            const phoneInput = document.querySelector('input[name=phoneNo]');
            phoneInput.disabled = false;
            const addressInput = document.querySelector('input[name=address1]');
            addressInput.disabled = false;
            const addressDetailInput = document.querySelector('input[name=address2]');
            addressDetailInput.disabled = false;
            const zipCodeInput = document.querySelector('input[name=zipCode]');
            zipCodeInput.disabled = false;
            const signupForm = document.querySelector('.molecule-signupForm');
            signupForm.submit();

        }
    }
})();


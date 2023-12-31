const nav = document.querySelector('#nav');
const navBtn = document.querySelector('#nav-btn');
const navBtnImg = document.querySelector('#nav-btn-img');

navBtn.addEventListener ('click', () => {
    if (nav.classList.toggle('open')) {
        navBtnImg.src = "./img/icons/nav-close.svg"
    } else {
        navBtnImg.src = "./img/icons/nav-open.svg"
    }
});

AOS.init({
    once: true
});

const modal = document.createElement('div');

modal.insertAdjacentHTML (
    "afterbegin",
    `<div class="popup__bg">
        <form class="popup">
            <img src="img/icons/nav-close.svg" alt="close" class="close-popup">
            <label>
                <input name="last_name" type="text" class="last-name _req">
                <div class="label__text">Last name</div>
            </label>
            <label>
                <input name="first_name" type="text" class="first-name _req">
                <div class="label__text">First name</div>
            </label>
            <label>
                <input name="middle_name" type="text" class="middle-name _req">
                <div class="label__text">Middle name</div>
            </label>
            <label>
                <input name="email" type="text" class="email _req _email">
                <div class="label__text">Email</div>
            </label>
            <label>
                <textarea name="message" class="mess"></textarea>
                <div class="label__text">Your message</div>
            </label>
            <button type="submit">Send</button>
        </form>
    </div>`
 );

document.body.appendChild(modal);

const popup__bg = document.querySelector('.popup__bg');
const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.send-message-btn');
const closePopup = document.querySelector('.close-popup');

openPopup.addEventListener ('click', (e) => {
    e.preventDefault;
    popup__bg.classList.add('active');
    popup.classList.add('active');
})

closePopup.addEventListener ('click', funClosePopup);

function funClosePopup () {
    popup__bg.classList.remove('active');
    popup.classList.remove('active');
}

// document.addEventListener ('click', (e) => {
//     if (e.target === popup__bg) {
//         funClosePopup();
//     }
// })

popup.addEventListener('submit', popupSend);

async function popupSend(e) {
    e.preventDefault();
    let error = popupValidate(popup);
    
    let popupData = {
        last_name: document.querySelector('.last-name').value,
        first_name: document.querySelector('.first-name').value,
        middle_name: document.querySelector('.middle-name').value,
        email: document.querySelector('.email').value,
        message: document.querySelector('.mess').value
    }
    
    if (error === 0) {
        popup.classList.add('_sending');
        let response = await fetch('./feedback.php', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(popupData)
        });
        if (response.ok) {
            let result = await response.json();
            alert("Your message has been sent successfully! You are the " + result.count + "st person who became interested in my portfolio and left feedback.");
            popup.reset();
            popup.classList.remove('_sending');
        }
        else {
            alert(response.ok);
            popup.classList.remove('_sending');
        }
    }
}

function popupValidate(popup) {
    let error = 0;
    let popupReq = document.querySelectorAll('._req');

    for (let index = 0; index < popupReq.length; index++) {
        const input = popupReq[index];
        popupRemoveError(input);

        if (input.classList.contains('_email')){
            if (emailTest(input)) {
                popupAddError(input);
                error++;
            }
        }else if(input.value === '') {
            popupAddError(input);
            error++;
        }
    }
    return error;
}

function popupAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}

function popupRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
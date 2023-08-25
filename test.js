async function runPuppeteer(data) {
  try {
    const response = await fetch('http://localhost:3000/run-puppeteer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    if (response.status >= 200 && response.status < 300) {
      console.log('Data sent successfully');
    } else {
      console.error('Failed to send data. Status code:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const name = document.querySelector('.name__input');
const addressSent = document.querySelector('.address-sent-letter__input');
const addressMail = document.querySelector('.address-mail__input');
const nameOwn = document.querySelector('.name-own__input');
const showUrl = document.querySelector('.show-url__input');
const branch = document.querySelector('.branch__input');
const country = document.querySelector('.country__select');
let countryName;
const trademarkRegister = document.querySelector('.trademark-register__input');
const provideUrl = document.querySelector('.provide-url__input');
const provideInfo = document.querySelector('.provide-infor__input');
const electronicSignature = document.querySelector(
  '.electronic_signature__input'
);
let arraySignature;

country.addEventListener('change', () => {
  const index = country.selectedIndex;
  countryName = country.options[index].innerText;
});

document.querySelector('.runButton').addEventListener('click', async () => {
  data = {
    name: name.value,
    addressSent: addressSent.value,
    addressMail: addressMail.value,
    nameOwn: nameOwn.value,
    showUrl: showUrl.value,
    branch: branch.value,
    countryName,
    trademarkRegister: trademarkRegister.value,
    provideUrl: provideUrl.value,
    provideInfo: provideInfo.value,
    arraySignature: electronicSignature.value.split('|'),
  };
  await runPuppeteer(data);
});

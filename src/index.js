import { launch } from 'puppeteer';
import readlineSync from 'readline-sync';


async function Robot() {
    // const browser = await puppeteer.launch({headless: false}); // lançando o navegador - headless => propriedade que se true oculta o navegador
    const browser = await launch({headless: true}); // lançando o navegador => a condição true não precisa ser marcada basta deixar vazio os parenteses
    const page = await browser.newPage(); // abrindo uma aba nova
    const moedaBase = readlineSync.question('Informe uma moeda base:') || `yuan`;
    const moedaFinal = readlineSync.question('Informe uma moeda desejada:') || 'real';
    const searchUrl = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&client=firefox-b-lm&sxsrf=ALiCzsaN5Hyx0ycP6_XKBbZSFfJYJSH2WA%3A1663211000042&ei=-JUiY--eAvGn5OUPjsmayAk&ved=0ahUKEwjv-t_m55X6AhXxE7kGHY6kBpkQ4dUDCA0&uact=5&oq=dolar+para+real&gs_lcp=Cgdnd3Mtd2l6EAMyCQgjECcQRhCCAjIFCAAQgAQyCAgAEIAEEIsDMggIABCABBCLAzIICAAQgAQQiwMyCAgAEIAEEIsDMggIABCABBCLAzIICAAQgAQQiwMyCAgAEIAEEIsDMggIABCABBCLAzoKCAAQRxDWBBCwAzoHCAAQsAMQQzoECCMQJzoHCAAQQxCLAzoECAAQQzoECC4QQzoKCC4Q1AIQQxCLAzoHCC4Q1AIQQzoSCCMQJxCLAxCmAxCoAxBGEIICSgQIQRgASgQIRhgAULcHWOolYM4paANwAXgAgAGtAYgBxw-SAQQwLjE3mAEAoAEByAEKuAEDwAEB&sclient=gws-wiz`
    await page.goto(searchUrl); // preenchendo um endereço
    // await page.screenshot({path: 'example.png'}); // salvando um print do site

    const resultado = await page.evaluate(() => {  // pega valores do devtools do navegador em sintaxe de frontend
      return  document.querySelector('.lWzCpb.a61j6').value;
    });

     
    console.log(`O valor de 1 ${moedaBase} em ${moedaFinal} é ${resultado}`)
    await browser.close(); // fechando navegador
}

Robot();


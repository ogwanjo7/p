

if('serviceWorker' in navigator){
window.addEventListener('load', () =>{
    navigator.serviceWorker
    .register('../sw.js')
    .then(reg => console.log("Service worker in"))
    .catch(err => console.log("Service worker is out: ${err}"))
})
}
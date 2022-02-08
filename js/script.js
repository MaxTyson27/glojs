'use strict';



// const appData = {
//   title: '',
//   screens: [],
//   screenPrice: 0,
//   rollback: 15,
//   fullPrice: 0,
//   adaptive: true,
//   allServicePrices: 0,
//   servicePercentPrice: 0,
//   services: {},
//   isSame: '',
//   start: function(){
//     appData.asking();
//     appData.addPrices();
//     appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
//     appData.getServicePercentPrices(appData.fullPrice, appData.getRollBack(appData.fullPrice, appData.rollback));
//     appData.getRollbackMessage(appData.fullPrice);
//     appData.getTitle(appData.title);

//     appData.logger();
    
//   },
//   isNumber: function (num) {
//     return !isNaN(parseFloat(num)) && isFinite(num);
//   },
//   isStr: function (str) {
//     return isNaN(str);
//   },
//   asking: function () {
    
//     do{
//       appData.title = prompt("Как называется ваш проект?", "калькулятор верстки");
//     } while (!appData.isStr(appData.title));

//     for (let i = 0; i < 2; i++) {
//       let price = 0;
//       let name;

//       do {
//         name = prompt("Какие типы экранов нужно разработать?");
//       } while (!appData.isStr(name));

//       do{
//         price = prompt("Сколько будет стоить данная работа?");
//       } while (!appData.isNumber(price));
//       price = parseFloat(price);

//       appData.screens.push({id: i, name: name, price: price});
//     }

//     for (let i = 0; i < 2; i++) {
//       let name;
//       let price = 0;

//       do{
//         name = prompt("Какой дополнительный вид услуги нужен?");
//       } while (!appData.isStr(name));
  
//       do{
//         price = prompt("Сколько это будет стоить?");
//       } while (!appData.isNumber(price));

      
//       if(i === 0){
//         appData.isSame = name;
//       } else if (i === 1 && name === appData.isSame){
//         name = `${name}-${i}`;
//       }

//       appData.services[name] = +price;
//     }
//     appData.adaptive = confirm("Нужен ли адаптив на сайте?");
//   },
//   addPrices: function() {
//     appData.screenPrice = appData.screens.reduce(function(sum, item) {
//       return sum + item.price;
//     }, 0);
    
//     for(let key in appData.services) {
//       appData.allServicePrices += appData.services[key];
//      }
//   },
//   getFullPrice: function (a, b) {
//     appData.fullPrice = a + b;
//   },
//   getTitle: function (str){
//     appData.title = str.trim()[0].toUpperCase() + str.trim().substr(1).toLowerCase();
//   },
//   getRollBack: function(full, roll){
//     return full * (roll / 100);
//   },
//   getServicePercentPrices: function(full, call){
//     appData.servicePercentPrice = Math.ceil(full - call);
//   },
//   getRollbackMessage: function(price) {
//     if (price >= 30000) {
//       console.log("Даем скидку в 10%")
      
//     } else if (price >= 15000 && price < 30000) {
//       console.log("Даем скидку в 5%")
    
//     } else if (price >= 0 && price < 15000) {
//       console.log("Скидка не предусмотрена")
    
//     } else {
//       console.log("Что то пошло не так")
//     }
//   },
//   logger: function(){
//     // for(let key in appData){
//     //   console.log(appData[key]);
//     // }
//     console.log(appData.fullPrice);
//     console.log(appData.servicePercentPrice);
//     console.log(appData.screens);
//     console.log(appData.services);
//   },
// }


// appData.start();



const title = document.getElementsByTagName('h1')[0];
const buttons = document.getElementsByClassName('handler_btn');
const screenBtn = document.querySelector('.screen-btn');
let itemsNumber = [];
let itemsPercent = [];
const rangeInput = document.querySelector('.rollback').querySelector('input[type="range"]');
const spanRange = document.querySelector('.rollback').querySelector('span.range-value');
const totalInputPrice = document.getElementsByClassName('total-input')[0];
const totalInputScreens = document.getElementsByClassName('total-input')[1];
const totalInputServices = document.getElementsByClassName('total-input')[2];
const totalInputFullPrice = document.getElementsByClassName('total-input')[3];
const totalInputRollback = document.getElementsByClassName('total-input')[4];
let screen = document.querySelectorAll('.screen');







const sortItems = function () {
  let items = document.querySelectorAll('.other-items');
  items.forEach(function(count) {
    if(count.classList.contains('percent')){
      itemsPercent.push(count);
    } else if (count.classList.contains('number')){
      itemsNumber.push(count);
    }
  });
};

sortItems();




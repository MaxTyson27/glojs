'use strict';

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  rollback: 15,
  fullPrice: 0,
  adaptive: true,
  allServicePrices: 0,
  serivcePercentPrice: 0,
  service1: '',
  service2: '',
  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "калькулятор верстки");
    appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные");
    do{
      appData.screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!appData.isNumber(appData.screenPrice));
    appData.screenPrice = parseFloat(appData.screenPrice);
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getAllServicePrices: function () {
    let sum = 0;
    
    for (let i = 0; i < 2; i++) {
      let price = 0;
  
      if(i == 0) {
        appData.service1 = prompt("Какой дополнительный вид услуги нужен?");
      } else if (i == 1) {
        appData.service2 = prompt("Какой дополнительный вид услуги нужен?");
      }
      do{
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));
  
      sum += +price;
      
    }
     
    return sum;
  },
  getFullPrice: function (a, b) {
    return a + b;
  },
  getTitle: function (str){
    return str.trim()[0].toUpperCase() + str.trim().substr(1).toLowerCase();
  },
  getRollBack: function(full, roll){
    return full * (roll / 100);
  },
  getServicePercentPrices: function(full, call){
    return  Math.ceil(full - call);
  },
  getRollbackMessage: function(price) {
    if (price >= 30000) {
      console.log("Даем скидку в 10%")
      
    } else if (price >= 15000 && price < 30000) {
      console.log("Даем скидку в 5%")
    
    } else if (price >= 0 && price < 15000) {
      console.log("Скидка не предусмотрена")
    
    } else {
      console.log("Что то пошло не так")
    }
  },
  start: function(){
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.serivcePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.getRollBack(appData.fullPrice, appData.rollback));
    appData.getRollbackMessage(appData.fullPrice);
    appData.title = appData.getTitle(appData.title);
    appData.logger();
    
  },
  logger: function(){
    for(let key in appData){
      console.log(appData[key]);
    }
  },
}


appData.start();





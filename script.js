'use strict';

let title;
let screens;
let screenPrice;
let rollback;
let fullPrice;
let adaptive;
console.log('Hello developer');


title = "project";
screens = "Простые, Сложные, Интерактивные";
screenPrice = 22;
rollback = 44;
fullPrice = 120000;
adaptive = true;


title = prompt("Как называется ваш проект?");
screens = prompt("Какие типы экранов нужно разработать?");
screenPrice = +prompt("Сколько будет стоить данная работа?");
adaptive = confirm("Нужен ли адаптив на сайте?");
let serviceName = prompt("Какой дополнительный вид услуги нужен?");
let servicePrice = +prompt("Сколько это будет стоить?");
let serviceName2 = prompt("Какой дополнительный вид услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

const showTypeOf = function(variable) {
  console.log(variable, typeof variable);
}

const getRollbackMessage = function(price) {
  if (price >= 30000) {
    return "Даем скидку в 10%"
    
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%"
  
  } else if (price >= 0 && price < 15000) {
    return "Скидка ге предусмотрена"
  
  } else {
    return "Что то пошло не так"
  }
};



const getAllServicePrices = function (a, b) {
  return a + b
};

let allServicePrices = getAllServicePrices(servicePrice, servicePrice2);

function getFullPrice(a, b) {
  return a + b;
};

fullPrice = getFullPrice(screenPrice, allServicePrices);
console.log(fullPrice)

const getTitle = function (str){
  let toUpAndLowCase = str[0].toUpperCase() + str.slice(1).toLowerCase();
  return toUpAndLowCase = toUpAndLowCase.replace(/^[^a-zа-яё]*([a-zа-яё])/i, function(str){
    return str.toUpperCase();
  });

};

const getRollBack = function(full, roll){
  return full * (roll / 100);
};


const getServicePercentPrices = function(full, call){
 return full - call;
};

let serivcePercentPrice = getServicePercentPrices(fullPrice, getRollBack(fullPrice, rollback));


showTypeOf(title)
showTypeOf(screenPrice)
showTypeOf(adaptive)
console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(serivcePercentPrice);














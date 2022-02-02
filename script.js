'use strict';

let title;
let screens;
let screenPrice;
let rollback;
let fullPrice;
let adaptive;
// let serviceName;
// let serviceName2;
let allServicePrices;
let serivcePercentPrice;


// screens = "Простые, Сложные, Интерактивные";
screenPrice = 22;
rollback = 15;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};


const asking = function () {
  title = prompt("Как называется ваш проект?", "калькулятор верстки");
  screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные");

  do{
    screenPrice = prompt("Сколько будет стоить данная работа?");
  } while (!isNumber(screenPrice));

  screenPrice = parseFloat(screenPrice);
  console.log(screenPrice)

  adaptive = confirm("Нужен ли адаптив на сайте?");
}


const showTypeOf = function(variable) {
  console.log(variable, typeof variable);
}

const getRollbackMessage = function(price) {
  if (price >= 30000) {
    return "Даем скидку в 10%"
    
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%"
  
  } else if (price >= 0 && price < 15000) {
    return "Скидка не предусмотрена"
  
  } else {
    return "Что то пошло не так"
  }
};

const getAllServicePrices = function () {
  let sum = 0;
  let sumArgument = 0;
  

  for (let i = 0; i < 2; i++) {

    
    const getSum = function () {
      do{
        sum = prompt("Сколько это будет стоить?");
      } while (!isNumber(sum));
    };

    if(i == 0) {
      prompt("Какой дополнительный вид услуги нужен?");
      getSum();
      sumArgument = parseFloat(sum);

    } else if (i == 1) {
      prompt("Какой дополнительный вид услуги нужен?");
      getSum();
      sum = parseFloat(sum) + sumArgument;
      console.log(sum);
    }
    
  }
   
  return sum;
};

function getFullPrice(a, b) {
  return a + b;
};

const getTitle = function (str){
  return str.trim()[0].toUpperCase() + str.trim().substr(1).toLowerCase();

};

const getRollBack = function(full, roll){
  return full * (roll / 100);
};

const getServicePercentPrices = function(full, call){
 return  Math.ceil(full - call);
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
serivcePercentPrice = getServicePercentPrices(fullPrice, getRollBack(fullPrice, rollback));
title = getTitle(title);


showTypeOf(title)
showTypeOf(screenPrice)
showTypeOf(adaptive)

console.log(allServicePrices);
console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(serivcePercentPrice);














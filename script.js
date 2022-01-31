'use strict';

let title;
let screens;
let screenPrice;
let rollback;
let fullPrice;
let adaptive;
console.log('Hello developer');
// alert("Hello");

title = "project";
screens = "Простые, Сложные, Интерактивные";
screenPrice = 22;
rollback = 44;
fullPrice = 120000;
adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " долларa");
console.log("Стоимость разработки сайта " + fullPrice + " долларов");
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback / 100));

title = prompt("Как называется ваш проект?");
screens = prompt("Какие типы экранов нужно разработать?");
screenPrice = +prompt("Сколько будет стоить данная работа?");
adaptive = confirm("Нужен ли адаптив на сайте?");
let serviceName = prompt("Какой дополнительный вид услуги нужен?");
let servicePrice = +prompt("Сколько это будет стоить?");
let serviceName2 = prompt("Какой дополнительный вид услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
fullPrice = screenPrice + servicePrice + servicePrice2;
let serivcePercentPrice = Math.ceil(fullPrice - ( fullPrice * ( rollback / 100) )); 
console.log(serivcePercentPrice);

if (fullPrice > 30000) {
  alert("Даем скидку в 10%");
  
} else if (15000 < fullPrice < 30000) {
  alert("Даем скидку в 5%");

} else if (0 < fullPrice < 15000) {
  alert("Скидка ге предусмотрена");

} else if (fullPrice < 0) {
  alert("Что то пошло не так");
}





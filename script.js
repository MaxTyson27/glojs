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
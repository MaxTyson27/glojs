'use strict';

const title = document.getElementsByTagName('h1')[0];

const buttonPlus = document.querySelector('.screen-btn');
let itemsNumber = document.querySelectorAll('.other-items.number');
let itemsPercent = document.querySelectorAll('.other-items.percent');


const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const rangeInput = document.querySelector('.rollback input')
const spanRange = document.querySelector('.rollback .range-value')

const totalInputPrice = document.getElementsByClassName('total-input')[0];
const totalInputScreens = document.getElementsByClassName('total-input')[1];
const totalInputServices = document.getElementsByClassName('total-input')[2];
const totalInputFullPrice = document.getElementsByClassName('total-input')[3];
const totalInputRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

let screenSelect = document.querySelectorAll('.screen select');
let screenInput = document.querySelectorAll('.screen input');


const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  allScreens: 0,
  rollback: 0,
  fullPrice: 0,
  adaptive: true,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function () {
    appData.addTitle();
    appData.isSelect();
    appData.isInput();
    startBtn.addEventListener('click', appData.start);
    buttonPlus.addEventListener('click', appData.addScreenBlock);
    rangeInput.addEventListener('input', appData.getInputRollBack)
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  isSelect: function (){
    screenSelect.forEach(function(item) {
      if(item.selectedIndex == 0) {
        startBtn.style.cursor = "not-allowed"
        startBtn.disabled = true;
      }
      item.addEventListener('change', function(event) {
        const option = item.options;
        if(option.selectedIndex == 0){
          appData.isSelect();
        } else {
          startBtn.style.cursor = "pointer";
          startBtn.disabled = false;
          appData.isSelect();
          appData.isInput();
        }
      })
    })
  },
  isInput: function () {
    screenInput.forEach(function(item) {
      if(item.value.length == 0 || isNaN(item.value)) {
        startBtn.style.cursor = "not-allowed"
        startBtn.disabled = true;
      }
      item.addEventListener('input', function () {
        if(item.value.length == 0 || isNaN(item.value)){
          appData.isInput();
        } else {
          startBtn.style.cursor = "pointer";
          startBtn.disabled = false;
          appData.isSelect();
        }
      })
    })
  },
  start: function(){
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
    appData.reset();
    // appData.getServicePercentPrices(appData.fullPrice, appData.getRollBack(appData.fullPrice, appData.rollback));
    // appData.getRollbackMessage(appData.fullPrice);
    // appData.logger();
  },
  
  showResult: function () {
    totalInputPrice.value = appData.screenPrice;
    totalInputServices.value = appData.servicePricesPercent + appData.servicePricesNumber;
    totalInputFullPrice.value = appData.fullPrice;
    totalInputRollback.value = appData.servicePercentPrice;
    totalInputScreens.value = +appData.allScreens;
  },
  reset: function () {
    appData.screens = [];
    appData.screenPrice = 0;
    appData.allScreens = 0;
    appData.fullPrice = 0;
    appData.servicePricesPercent = 0;
    appData.servicePricesNumber = 0;
    appData.servicePercentPrice = 0;
    appData.servicesPercent = {};
    appData.servicesNumber = {};
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach(function(screen, index){
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index, 
        name: selectName, 
        count: +input.value,
        price: +select.value * +input.value
      });
    });
  },
  addServices: function () {
    itemsPercent.forEach(function(item){
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if(check.checked){
        appData.servicesPercent[label.textContent] = +input.value
      }
    });
    itemsNumber.forEach(function(item){
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if(check.checked){
        appData.servicesNumber[label.textContent] = +input.value
      }
    });
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll('.screen');
    screenSelect = document.querySelectorAll('.screen select');
    screenInput = document.querySelectorAll('.screen input');
    appData.isSelect();
    appData.isInput();
  },
  addPrices: function() {
    appData.screenPrice = appData.screens.reduce(function(sum, item) {
      return sum + item.price;
    }, 0);

    appData.allScreens = appData.screens.reduce(function(sum, item) {
      return sum + item.count
    }, 0)
    
    for(let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for(let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));

    
  },
  getInputRollBack: function () {
    spanRange.textContent = rangeInput.value + "%"    
    appData.rollback = +rangeInput.value
  },
  logger: function(){
    // for(let key in appData){
    //   console.log(appData[key]);
    // }
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
    console.log(appData.services);
  },
}

appData.init();






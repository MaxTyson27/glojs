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
const cms = document.querySelector('#cms-open');
const cmsBlock = document.querySelector('.hidden-cms-variants');

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
    this.addTitle();
    this.isSelect();
    this.isInput();
    startBtn.addEventListener('click', this.start.bind(appData));
    buttonPlus.addEventListener('click', this.addScreenBlock.bind(appData));
    rangeInput.addEventListener('input', this.getInputRollBack.bind(appData));
    resetBtn.addEventListener('click', this.resetBtn.bind(appData));
    cms.addEventListener('click', this.openCms.bind(appData));
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  isSelect: function (){
    screenSelect.forEach((item) => {
      if(item.selectedIndex == 0) {
        startBtn.style.cursor = "not-allowed"
        startBtn.disabled = true;
      }
      item.addEventListener('change', (event) => {
        const option = item.options;
        if(option.selectedIndex == 0){
          this.isSelect();
        } else {
          startBtn.style.cursor = "pointer";
          startBtn.disabled = false;
          this.isSelect();
          this.isInput();
        }
      })
    })
  },
  isInput: function () {
    screenInput.forEach((item) => {
      if(item.value.length == 0 || isNaN(item.value)) {
        startBtn.style.cursor = "not-allowed"
        startBtn.disabled = true;
      }
      item.addEventListener('input', () => {
        if(item.value.length == 0 || isNaN(item.value)){
          this.isInput();
        } else {
          startBtn.style.cursor = "pointer";
          startBtn.disabled = false;
          this.isSelect();
        }
      })
    })
  },
  start: function(){
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();
    this.disabledAll(true);
    this.showResetBtn('none', 'block');
    // this.logger();
    // this.reset();
    // appData.getServicePercentPrices(appData.fullPrice, appData.getRollBack(appData.fullPrice, appData.rollback));
    // appData.getRollbackMessage(appData.fullPrice);
    
  },
  resetBtn: function () {
    this.disabledAll(false);
    this.reset();
    this.isSelect();
    this.showResult();
  },
  showResetBtn: function (startDisplay, resetDisplay) {
    startBtn.style.display = startDisplay
    resetBtn.style.display = resetDisplay
  },
  showResult: function () {
    totalInputPrice.value = this.screenPrice;
    totalInputServices.value = this.servicePricesPercent + this.servicePricesNumber;
    totalInputFullPrice.value = this.fullPrice;
    totalInputRollback.value = this.servicePercentPrice;
    totalInputScreens.value = +this.allScreens;
  },
  reset: function () {
    this.screens = [];
    this.screenPrice = 0;
    this.allScreens = 0;
    this.fullPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
  },
  disabledAll: function (bool) {
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    const buttonPlus = document.querySelectorAll('.screen-btn')
    const array = [screenInput, screenSelect, checkboxes, buttonPlus]
    array.forEach((item) => {
      item.forEach((item) => {
        item.disabled = bool;
      })
    })
    if(!bool){
      document.querySelector('.screen input').value = ''
      screenSelect.forEach((item) => {
        item.selectedIndex = 0;
      })
      checkboxes.forEach((item) => {
        item.checked = false;
      })
      if(this.screens.length > 1) {
        // item[index + 1].remove();
        screens.forEach((item, index) => {
          if(screens[0] === item){
            return false;
          } else {
            item.remove();
          }
        })
      }
      rangeInput.value = 0;
      this.getInputRollBack();
    }
    this.showResetBtn('block', 'none');
    // this.isSelect();
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;
      this.screens.push({
        id: index,
        name: selectName, 
        count: +input.value,
        price: +select.value * +input.value
      });
    });
  },
  addServices: function () {
    itemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if(check.checked){
        this.servicesPercent[label.textContent] = +input.value
      }
    });
    itemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if(check.checked){
        this.servicesNumber[label.textContent] = +input.value
      }
    });
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll('.screen');
    screenSelect = document.querySelectorAll('.screen select');
    screenInput = document.querySelectorAll('.screen input');
    this.isSelect();
    // this.isInput();
  },
  addPrices: function() {
    this.screenPrice = this.screens.reduce((sum, item) => {
      return sum + item.price;
    }, 0);

    this.allScreens = this.screens.reduce((sum, item) => {
      return sum + item.count
    }, 0)
    
    for(let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    for(let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;
    this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));

    
  },
  getInputRollBack: function () {
    spanRange.textContent = rangeInput.value + "%"    
    this.rollback = +rangeInput.value
  },
  openCms: function () {
    if(cms.checked){
      cmsBlock.style.display = 'flex';
      cmsBlock.addEventListener('change', () => {
        console.log(123);
      })
    } else {
      cmsBlock.style.display = 'none';
    }
    
  },
  logger: function(){
    // for(let key in appData){
    //   console.log(appData[key]);
    // }
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);
    console.log(this.rollback);
    console.log(this.screenPrice);
    console.log(this.servicePricesNumber);
    console.log(this.servicePercentPrice);
    console.log(this.servicesPercent);
    console.log(this.servicesNumber);
  },
}

appData.init();






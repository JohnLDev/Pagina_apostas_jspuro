(function(doc, win){
  
  'use strict';

  function DOM(element){
    this.element = doc.querySelectorAll(element)
  }

  DOM.prototype.on = function on (event, func)  {
    Array.prototype.forEach.call(this.element, (element)=>{
      element.addEventListener(event, func, false);
  })
  }

  DOM.prototype.off = function off (event, func) {
    Array.prototype.forEach.call(this.element, (element)=>{
      element.removeEventListener(event, func, false);
  })
  }

  DOM.prototype.get = function get() {return this.element}


  DOM.prototype.forEach = function forEach(func){
    Array.prototype.forEach.call(this.element,func)
  } 

  DOM.prototype.map = function map(func){
    return Array.prototype.map.call(this.element,func)
  } 

  DOM.prototype.find = function find(func){
    return Array.prototype.find.call(this.element,func)
  } 

  DOM.prototype.reduce = function reduce(func){
    return Array.prototype.reduce.call(this.element,func)
  } 

  DOM.prototype.reduceRight = function reduceRight(func){
    return Array.prototype.reduceRight.call(this.element,func)
  } 

  DOM.prototype.every = function every(func){
    return Array.prototype.every.call(this.element,func)
  } 
  
  DOM.prototype.some = function some(func){
    return Array.prototype.some.call(this.element,func)
  }

  DOM.isArray = function isArray(item){
    return Array.isArray(item)
  }


  DOM.isObject = function isObject(item){
    return Object.prototype.toString.call(item) === '[object Object]';
  }

  DOM.isFunction = function isFunction(item){
    return Object.prototype.toString.call(item) === '[object Function]'
  }

  DOM.isNumber = function isNumber(item){
    return typeof item === 'number'
  }

  DOM.isString = function isString(item){
    return typeof item === 'string'
  }

  DOM.isBoolean = function isBoolean(item){
    return typeof item === 'boolean'
  }


  DOM.isNull = function isNull(item){
    return Object.prototype.toString.call(item) === '[object Null]' || Object.prototype.toString.call(item) === '[object Undefined]'
  }




win.DOM = DOM

  
  
})(document, window)
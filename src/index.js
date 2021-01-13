(function(win, doc){
'use strict';

  const ajax = new XMLHttpRequest()

  const $buttonLotofacil = new DOM('[CLASS="facil"]')
  const $buttonMegaSena = new DOM('[CLASS="mega"]')
  const $buttonLotomania = new DOM('[CLASS="mania"]')
  const $buttonClear = new DOM('[CLASS="clear"]')
  const $buttoncomplete = new DOM('[CLASS="complete"]')
  const $buttonAdd = new DOM('[CLASS="add"]')
  const $buttonSave = new DOM('[CLASS="save-button"]')
  const $buttons_game = new DOM('[CLASS="buttons-game"]')
  const $description = new DOM('p')
  const $GameName = new DOM('[CLASS="type"]')
  const $numbers =  new DOM('[CLASS="number"]')
  const $cart =  new DOM('[CLASS="items"]')
  const $totalValue =  new DOM('[CLASS="total-value"]')

  let options
  let actualType
  let numbers
  let priceOfCart = 0



  getOptions()


  Array.prototype.forEach.call($buttons_game.get()[0].children,(button) => {
    button.addEventListener('click',()=>{setOption(button.textContent)})
  })
  $numbers.forEach((num)=> { num.addEventListener('click', ()=> selectNumber(num))})
  $buttonClear.on('click',clearSelection)
  $buttoncomplete.on('click',completeGame)
  $buttonAdd.on('click',addToCart)
  $buttonSave.on('click',save)

  
  function getOptions(){
    ajax.onloadend = () => {
      options = JSON.parse(ajax.responseText).types
    }
    ajax.open('GET', '../navigation.json' )
    ajax.send()
  }
  

  function setOption(type){
    if(actualType && type === actualType.type)
      return

      
      
    switch (type) {
        case 'Lotofácil':
          actualType = options[0]
          $buttonLotofacil.get()[0].classList.add('facilactive')
          $buttonMegaSena.get()[0].classList.remove('megaactive')
          $buttonLotomania.get()[0].classList.remove('maniaactive')
        break;

        case 'Mega-Sena':
          actualType = options[1]
          $buttonLotofacil.get()[0].classList.remove('facilactive')
          $buttonMegaSena.get()[0].classList.add('megaactive')
          $buttonLotomania.get()[0].classList.remove('maniaactive')
        break;


        case 'Lotomania':
          actualType = options[2]
          $buttonLotofacil.get()[0].classList.remove('facilactive')
          $buttonMegaSena.get()[0].classList.remove('megaactive')
          $buttonLotomania.get()[0].classList.add('maniaactive')
        break;
    
      default:
        break;  
    }
    setValidNumbers()  

    $GameName.get()[0].textContent = actualType.type
    $description.get()[0].textContent = actualType.description
    clearSelection()

  }

  function selectNumber(number){

    if(!actualType){
      alert('Primeiro selecione o tipo de jogo que deseja apostar')
      return
    }
   
    if(!numbers.some((num) => num == number.textContent)){
      if(numbers.length === actualType['max-number']){
        alert('Você já selecionou todos os numeros para a aposta')
        return
      }
      number.style.backgroundColor = actualType.color
      numbers.push(Number(number.textContent))
    } else {
      number.style.backgroundColor = "#ADC0C4"
     numbers = numbers.filter((num)=> num !== Number(number.textContent))
    }
  }

  function clearSelection(){
    $numbers.forEach((num)=>{
      num.style.backgroundColor = "#ADC0C4"
    })
    numbers = []
  }

  function setValidNumbers(){
   $numbers.forEach((num, index)=> {
     if(index >= actualType.range){
       num.disabled = true
       num.hidden = true
     } else{
      num.disabled = false
      num.hidden = false
     }
   })
  }

  function completeGame(){
    if(!actualType){
      alert('Primeiro selecione o tipo de jogo que deseja apostar')
      return
    }

   let random

   while (numbers.length !== actualType['max-number']) {
    do{
      random =  Math.floor(Math.random() * (actualType.range - 1 + 1)) + 1;
     } while(numbers.some((num)=> num === random))
     const num =  $numbers.find((n)=> n.textContent == random)
      selectNumber(num)
    }
   }

   function removeItem(){
    const item =  this.parentNode
    item.parentNode.removeChild(item)
    priceOfCart -= Number(item.lastElementChild.lastElementChild.lastElementChild.textContent.replace(/[^0-9,]/g, "").replace(',','.'))
    showCartPrice()
   }

   function addToCart(){
     if(numbers.length !== actualType['max-number'] ){
       alert(`Por favor complete sua aposta selecionando mais ${actualType['max-number'] - numbers.length} numeros`)
       return 
     }  
    

     $cart.get()[0].innerHTML += `
     <div class="item">
     <button class="remove-item"><img src="../assets/trash-2.svg" alt="trash" srcset=""></button>
     <div class="vertical-line " style="background-color:${actualType.color}"></div>
     <div class="data">
       <h2>${numbers.join()}</h2>
       <div class="price-div">
         <h2 class="item-name" style="color:${actualType.color}">${actualType.type}</h2>
         <h2 class="price">${actualType.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
       </div>
     </div>
   </div>
     `
     new DOM('[class="remove-item"]').on('click',removeItem)
     priceOfCart += actualType.price
     showCartPrice()
     clearSelection()

   }

  function showCartPrice(){
    $totalValue.get()[0].textContent = priceOfCart.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  function save(){
    if(!actualType){
      alert('Primeiro selecione o tipo de jogo que deseja apostar')
      return
    }
    if(priceOfCart < actualType['min-cart-value'] ){
      alert(`O valor minimo no carrinho para efetuar a compra é ${actualType['min-cart-value'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`)
      return
    }
    alert(`Sua aposta foi feita com sucesso`)
    $cart.get()[0].innerHTML= ''
    priceOfCart = 0
    showCartPrice()
    clearSelection()
  }

})(window, document)
(function(){
  'use restrict';
  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOff',ShoppingListCheckOff);

  ToBuyController.$inject = ['ShoppingListCheckOff'];
  function ToBuyController(ShoppingListCheckOff){
    var toBuy = this;
    toBuy.tobuyitems = ShoppingListCheckOff.tobuyitems();
    toBuy.removeItem = function(itemIndex){
      try{
        ShoppingListCheckOff.removeItem(itemIndex);
      }catch(error){toBuy.errorMessage = error.message;}
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOff'];
  function AlreadyBoughtController(ShoppingListCheckOff){
    var bought = this;
    bought.items = ShoppingListCheckOff.boughtItem();
  }

  function ShoppingListCheckOff(){
    var service = this;
    var tobuyitems = [{name:"cookies", quantity: "10"},{name:"Milk", quantity:"4 bags"},{name:"butter",quantity:"1 pack"},{name:"bread",quantity:"2 bags"}];
    var bought = [];
    service.tobuyitems = function(){
      return tobuyitems;
    };

    service.removeItem = function(itemIndex){

      if(tobuyitems.length>0){

          bought.push(tobuyitems[itemIndex]);
          tobuyitems.splice(itemIndex,1);
          console.log(tobuyitems.length);
      }
      else{
        throw new Error("Everything is Bought");
      }

    };

    service.boughtItem = function(){
      if(bought.length>=0)
      return bought;
      else{ throw new Error("Nothing bought yet.");}
    }
  }
})();

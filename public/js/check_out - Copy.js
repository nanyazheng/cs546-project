(function() {
    

    if (localStorage && localStorage.getItem('order_items')) {
    let orders_now = JSON.parse(localStorage.getItem('order_items'));
    console.log(orders_now[0].quantity);
    const orderDOM = document.getElementById("order_now");
    const priceDOM = document.getElementById("total_price");
    let totalPrice = 0;
    
      try {
      for (let i = 0; i < orders_now.length; i++) {
        let order_single = document.createElement("div");
        
        let order_single_dishName = document.createElement('div');
        let order_single_quantity = document.createElement('div');
        let order_single_price = document.createElement('div');
        
        
        order_single.setAttribute("class", "order_" + i);

        order_single_dishName.setAttribute("class", "order_" + i);
        order_single_quantity.setAttribute("class", "order_" + i);
        order_single_price.setAttribute("class", "order_" + i);

        let current_price = orders_now[i].price;
        let current_quantity = orders_now[i].quantity;
        let current_total = current_price * current_quantity;
        totalPrice += current_total;
        console.log(totalPrice);

        
        let dishNameText = document.createTextNode(orders_now[i].dish_name);
        let quantityText = document.createTextNode(current_quantity);
        let priceText = document.createTextNode(current_price);
        
        
        order_single_dishName.appendChild(dishNameText);
        order_single_quantity.appendChild(quantityText);
        order_single_price.appendChild(priceText);

        order_single.appendChild(order_single_dishName);
        order_single.appendChild(order_single_quantity);
        order_single.appendChild(order_single_price);
        
        orderDOM.appendChild(order_single);
      }
      console.log(totalPrice);
      let order_total_price = document.createElement("div");
      totalTextNode = document.createTextNode(totalPrice.toFixed(2));
      order_total_price.appendChild(totalTextNode);
      priceDOM.appendChild(order_total_price);
    } catch(e) {
      //do nothing
    }
    
    
    //orderDOM.appendChild(textNode);
    
    }
    // if (staticForm) {
  
    //   staticForm.addEventListener("submit", event => {
    //     event.preventDefault();
    //     try {
    //       const inputTextValue = inputTextElement.value;
    //       if (inputTextValue) {
    //       const newText = strip(inputTextValue);
    //       let resultList = document.createElement('li');
    //       let textNode = document.createTextNode(newText);
    //       resultList.appendChild(textNode);        
    //         if (isPalin(newText)) {
    //           resultList.setAttribute("class", "is-palindrome");
    //         } else {
    //            resultList.setAttribute("class", "not-palindrome")
    //         }
    //         resultContainer.appendChild(resultList);
    //       } else {
    //         alert("Empty Input");
    //       }
    //     } catch (e) {
          
    //     }
    //   });
    // }
  })();
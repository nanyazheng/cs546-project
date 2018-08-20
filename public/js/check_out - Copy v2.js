(function() {
  if (localStorage && localStorage.getItem('order_items')) {
    let orders_now = JSON.parse(localStorage.getItem('order_items'));
    //localStorage.clear();
    var orderDOM = document.getElementById('order_now');

    // var employeeListWrapper = document.createElement('ul');
    // employeeListWrapper.setAttribute('id', 'employeeListWrapper');
    // var employeeListName = document.createElement('li');
    //    employeeListName.appendChild(document.createTextNode(orders_now[0].dish_name));
    //    employeeListName.appendChild(document.createTextNode(orders_now[0].quantity));
    //    employeeListName.appendChild(document.createTextNode(orders_now[0].quantity * orders_now[0].price));
    // employeeListWrapper.appendChild(employeeListName);
    // orderDOM.appendChild(employeeListWrapper);

    let total_price = 0;
    let order = [];
    try {
    for (let i = 0; i < orders_now.length; i++) {
      console.log(orders_now[i]);
      let eachOrder = {};
      var ul = document.createElement("ul");
      var d=document.createElement("div"); 
      d.textContent = orders_now[i].dish_name;
      eachOrder.dish_name = orders_now[i].dish_name;
      ul.appendChild(d);
      var d=document.createElement("div"); 
      d.textContent = orders_now[i].quantity;
      eachOrder.quantity = orders_now[i].quantity;
      ul.appendChild(d);
      order.push(eachOrder);
      var d=document.createElement("div"); 
      d.textContent = "Price : " + orders_now[i].quantity * orders_now[i].price;
      total_price = total_price + orders_now[i].quantity * orders_now[i].price;
      ul.appendChild(d);
      var b=document.createElement("button");
      b.textContent = "Delete";
      b.className = "dish_single_delete";

      ul.appendChild(b);

      orderDOM.appendChild(ul);
    } //for
 

    
    var submit_button = document.getElementById('place_order');
    console.log(order);
    submit_button.setAttribute("order", order);
  
    $(document).ready(function() {
      $('.place_order').click(function() {
        let order = $(this).attr("order");
        $.ajax({
          url:'http://localhost:3000/check-out',
          method:'POST',
          data:{
            order: order,
            total_price : total_price
          },
          success:function(data){
            localStorage.clear();
          }
        });
      })
    });
  } catch (e) {
    
  }
      }//if 
  })();
(function($) {




	$(document).ready(function(){
		$(".cat-button").click(function(){
			let value = $(this).attr("data-filter");
			if (value == 'all') 
			{
				$(".dish_single").show("1000")
			} else {
				$(".dish_single").not("." + value).hide("1000");
				$(".dish_single").filter("." + value).show("1000");
			}
			
		})
	});

	$(document).ready(function(){
		$('.dish_single_add').click(function() {
			let dish_id = $(this).attr("dish-id");
			console.log(dish_id);
			let dish = $(this).attr("dish-name");
			//console.log(dish);
			let price = Number($(this).attr("dish-price"));
			//console.log(price);
			if (!localStorage.getItem('order_items')) {
			let orders = [];
			let current_order = {};
			current_order.dish_id = dish_id;
			current_order.dish_name = dish;
			current_order.price = price;
			current_order.quantity = 1;
			orders.push(current_order);
			localStorage.setItem('order_items', JSON.stringify(orders));
			console.log("init: " + JSON.parse(localStorage.getItem('order_items')));
			} else {
				let change = false;
				let orders_now = JSON.parse(localStorage.getItem('order_items'));
				for (let i = 0;i < orders_now.length; i++) {
					let current_item = orders_now[i];
					console.log(current_item.dish_id);
					if (current_item.dish_id == dish_id) {
						let quant_before = current_item.quantity;
						console.log(quant_before);
						orders_now[i].quantity = quant_before + 1;
						console.log(orders_now[i].quantity);
						localStorage.setItem('order_items', JSON.stringify(orders_now));
						change = true;
						return;
					} //update if exist
				}
				if (change == false) {
					let current_order = {};
					current_order.dish_id = dish_id;
					current_order.dish_name = dish;
					current_order.price = price;
					current_order.quantity = 1;
					orders_now.push(current_order);
					localStorage.setItem('order_items', JSON.stringify(orders_now));
				}
				
				console.log(orders_now);
			}
			// let current_order = {};

		})
	});



	// $(document).ready(function(){
	// 	$(".delete-button").click(function(){
	// 		let order_no = $(this).attr("order_no");
	// 		let currentID = "order_" + order_no;
	// 		let div_remove =document.getElementById(currentID);
	// 		order_now =JSON.parse(localStorage.getItem('order_items'));
	// 		order_after = order_now.splice(order_no, 1);
	// 		localStorage.setItem('order_items', JSON.stringify(order_after));
	// 	})
	// });


})(jQuery);



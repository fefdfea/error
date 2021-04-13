(() => {

	const item_name_first = $('#first');
	const item_name_second = $('#second');
	const item_name_third = $('#third');
	const item_name_four = $('#four');
	const item_bx_first = $('#first-box');
	const item_bx_second = $('#second-box');
	const item_bx_third = $('#third-box');
	const item_bx_four = $('#four-box');

	const search = $('#search');
		window.addEventListener('load',function(){
		data_binding();
	})
	//데이터 바인딩
	function data_binding(){
		const item_name = $('.item-name');
		const item_brand = $('.brand');
		const price = $('.price');
		const img = $('.img-bx img')
		$.ajax({
			url: './json/store.json',
			method : 'GET',
			dataType: 'json'
		}).done(function(data){
			for(index in data.products){
				item_name.eq(index).text(data.products[index].product_name);
				item_brand.eq(index).text(data.products[index].brand_name);
				price.eq(index).text(data.products[index].price);
				img.eq(index).attr('src',data.products[index].photo);
			}
		});
	}
	function Search (val){
		let search_val = val;
		console.log(search_val);
		if(item_name_first.text().indexOf(search_val) == -1){
			item_bx_first.css('display','none');
		}
		if(item_name_first.text().indexOf(search_val) !== -1){
			item_bx_first.css('display','block');
		}

		if(item_name_second.text().indexOf(search_val) == -1){
			item_bx_second.css('display','none');
		}
		if(item_name_second.text().indexOf(search_val) !== -1){
			item_bx_second.css('display','block');
		}

		if(item_name_third.text().indexOf(search_val) == -1){
			item_bx_third.css('display','none');
		}
		if(item_name_third.text().indexOf(search_val) !== -1){
			item_bx_third.css('display','block');
		}

		if(item_name_four.text().indexOf(search_val) == -1){
			item_bx_four.css('display','none');
		}
		if(item_name_four.text().indexOf(search_val) !== -1){
			item_bx_four.css('display','block');
		}
	}

})();
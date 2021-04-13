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

	$('#search').on('keyup',function(){
		let search_val = $('#search').val().replace(/(\s*)/g, "");
		console.log(search_val)
		console.log(item_name_second.text().replace(/(\s*)/g, ""));

		if(item_name_first.text().replace(/(\s*)/g, "").indexOf(search_val) == -1){
			item_bx_first.css('display','none');
		}
		if(item_name_first.text().replace(/(\s*)/g, "").indexOf(search_val) !== -1){
			item_bx_first.css('display','block');
		}

		if(item_name_second.text().replace(/(\s*)/g, "").indexOf(search_val) == -1){
			item_bx_second.css('display','none');
		}
		if(item_name_second.text().replace(/(\s*)/g, "").indexOf(search_val) !== -1){
			item_bx_second.css('display','block');
		}

		if(item_name_third.text().replace(/(\s*)/g, "").indexOf(search_val) == -1){
			item_bx_third.css('display','none');
		}
		if(item_name_third.text().replace(/(\s*)/g, "").indexOf(search_val) !== -1){
			item_bx_third.css('display','block');
		}

		if(item_name_four.text().replace(/(\s*)/g, "").indexOf(search_val) == -1){
			item_bx_four.css('display','none');
		}
		if(item_name_four.text().replace(/(\s*)/g, "").indexOf(search_val) !== -1){
			item_bx_four.css('display','block');
		}
	});

	// 드래그 앤 드롭 기능 구현
	$('.item-bx').draggable({
		revert: true,
	});

	$('.drag').droppable({
		drop: function(event,ui){
			const list = $('#shopping-list');
			const item = ui.draggable;
			list.append(item);
			calc();
		}
	});

	// 자동계산 기능 구현
	function calc (){
		let total = $('#total');
		let price = $('#shopping-list .price');
		let list_price = 0;
		price.each(function(index,item){
			list_price += parseInt(item.innerText,10);
			total.text(list_price);
		})
	}

	// 구입 , 캔버스
	function canvas (){
		const canvas = $('#receipt');
		const cv = canvas.getContext("2d")
		cv.font = 'bold 20px Malgun Gothic';
		cv.fillText('영수증',10,20);
	}
})();
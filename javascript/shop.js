(() => {

	const item_name_first = $('#first');
	const item_name_second = $('#second');
	const item_name_third = $('#third');
	const item_name_four = $('#four');
	const item_bx_first = $('#first-box');
	const item_bx_second = $('#second-box');
	const item_bx_third = $('#third-box');
	const item_bx_four = $('#four-box');
	const btn = $('#buy');
	const list = $('#shopping-list');
	let num = 0;

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
			drag_box(item);
			calc();
		}
	});

	// 자동계산 기능 구현
	function calc (){
		let total = $('#total');
		let price = $('#shopping-list .price');
		const div = $('#shopping-list .item-bx');
		let list_price = 0;
		price.each(function(index,item){
			list_price += parseInt(item.innerText,10);
			total.text(list_price);
		})
		if(div.length == 0){
			total.text(0);
		}
		
	}

	//드래그한 박스와 같은 박스를 만드는 함수
	function drag_box(item){
		const item_class = item.attr('class');
		const img_bx_class = item.find('.img-bx').attr('class');
		const item_id = item.attr('id');
		const item_img = item.find('img');
		const item_src = item_img.attr('src');
		const item_alt = item_img.attr('alt');
		const item_name_id = item.find('.item-name').attr('id');
		const item_produce_name = item.find('.item-name').text();
		const brand = item.find('.brand').text();
		const price = item.find('.price').text();
		const item_bx = $(`
			<div class="${item_class}" id="${item_id}">
				<div class="${img_bx_class}">
					<img src="${item_src}" alt="${item_alt}">
			</div>
				<h4 class="item-name" id="${item_name_id}">${item_produce_name}</h4>
				<p class="brand">${brand}</p>
			<div class="price">
				${price}
			</div>
			<button class="list-btn" type="button">X</button>
		</div>
		`);
		list.append(item_bx);
		remove(item_bx);
	};

//리스트 제거 버튼
function remove (item_bx){
	const btn = item_bx.find('.list-btn');
	btn.on('click',function(){
		let total = $('#total').text();
		item_bx.remove();
		calc();
	});
}

	// 구입 , 캔버스
	btn.on('click',() => {
		const receipt_state = $('#receipt');
		if(num == 1){
			alert('이미 영수증이 출력 되었습니다');
		}
		else{
			num = 1;
			canvas();
		}

	});

	function canvas (){
		const orderlist = $('#shopping-list .item-name').text();
		const orderbrand = $('#shopping-list .brand').text();
		const orderprice = $('#shopping-list .price').text();
		const orderQuantity = $('#shopping-list > div');
		const ordertotal = $('#total').text();
		const canvas_btn = $('.canvas-btn');

		var canvas = document.getElementById('receipt');
		var cv = canvas.getContext('2d');
		cv.clearRect(0,0, canvas.width, canvas.height);
		cv.font = '30px dotum';
		cv.fillText('영수증',400,40);
		cv.font = '20px dotum';
		cv.fillText(`주문목록:${orderlist}`,50,100);
		cv.fillText(`브랜드명:${orderbrand}`,50,150);
		cv.fillText(`가격:${orderprice}`,50,200);
		cv.fillText(`수량:${orderQuantity.length}`,50,250);
		cv.fillText(`합계:${ordertotal}`,50,300);
		$('.canvas').css('display','block');
		//캔버스 없애기
		canvas_btn.on('click',function(){
			num = 0;
			$('.canvas').css('display','none');
		});
	};


})();
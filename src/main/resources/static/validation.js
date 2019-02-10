	var validator = new Validator();
	var crdImg = null;
	
	window.addEventListener('message', function(event) {
		var data = event.data;
		var origin = event.origin;
		
		if(!origin.startsWith('https://') && !origin.startsWith('http://')){
			error = JSON.parse('{"response_code":"71022","masked_card_num":"","card_holder_name":"","card_token":"","response_text":"INVALID ORIGIN","card_type":"","card_expiry_date":"","one_time_token":"","zip":""}');
			responseHandler(error);
		}else if(data == 'aurus-token'){
			getCardToken();
		}else{
			error = JSON.parse('{"response_code":"71021","masked_card_num":"","card_holder_name":"","card_token":"","response_text":"INVALID POST MSG","card_type":"","card_expiry_date":"","one_time_token":"","zip":""}');
			responseHandler(error);
		}
	});
	
	function responseHandler(JSONData){
		var resp = 'response=' + JSON.stringify(JSONData);
		window.parent.postMessage(resp, '*');
		return false;
	}
	
	function getCardToken(){
		if(validateInputs()){
			var $form = $('#payment-form');
			var aurusPay = new AurusPay();
			aurusPay._getToken($form, responseHandler);
			$('.card-img').removeClass('cc_selected');
			$('.card-img').addClass('cc_deselected');
		}
		
		return false;
	}
	
	function validateCardNumber(){
		var cn = $('#payment-form :input[aurus-param="card"]');
		var lbl_cn = $('#lbl_cn');
		
		if(!validator._validateCN(cn.val())){
			cn.attr('style', 'border-color: #cc4b37; background-color: #f9ecea;');
			lbl_cn.attr('style', 'color: #cc4b37;');
			
			error = JSON.parse('{"response_code":"71019","masked_card_num":"","card_holder_name":"","card_token":"","response_text":"INVALID CARD NUMBER","card_type":"","card_expiry_date":"","one_time_token":"","zip":""}');
			responseHandler(error);
				
			crdImg = null;
			
			return false;
		}else{
			cn.removeAttr('style');
			lbl_cn.removeAttr('style');
		}

		return true;
	}
	
	function validateCardCVV(){
		var cvn = $('#payment-form :input[aurus-param="cvv"]');
		var lbl_cvn = $('#lbl_cvn');
		
		if(!validator._validateCVV(cvn.val())){
			cvn.attr('style', 'border-color: #cc4b37; background-color: #f9ecea;');
			lbl_cvn.attr('style', 'color: #cc4b37;');

			error = JSON.parse('{"response_code":"71018","masked_card_num":"","card_holder_name":"","card_token":"","response_text":"INVALID CVV/CVN","card_type":"","card_expiry_date":"","one_time_token":"","zip":""}');
			responseHandler(error);
			
			return false;
		}else{
			cvn.removeAttr('style');
			lbl_cvn.removeAttr('style');
		}

		return true;
	}
	
	function validateExpiryDate(){
		var mm = $('#payment-form :input[aurus-param="expiry_month"]');
		var yy = $('#payment-form :input[aurus-param="expiry_year"]');
		var lbl_mm = $('#lbl_mm');
		if(!validator._validateExpiry(mm.val(), yy.val())){
			mm.attr('style', 'border-color: #cc4b37; background-color: #f9ecea;');
			lbl_mm.attr('style', 'color: #cc4b37;');

			error = JSON.parse('{"response_code":"71020","masked_card_num":"","card_holder_name":"","card_token":"","response_text":"INVALID EXPIRY","card_type":"","card_expiry_date":"","one_time_token":"","zip":""}');
			responseHandler(error);
			
			return false;
		}else{
			mm.removeAttr('style');
			lbl_mm.removeAttr('style');
		}

		return true;
	}
	
	
	function validateInputs(){
		var error = null;
		
		if(!validateCardNumber()){
			error = JSON.parse('{"response_code":"71019","masked_card_num":"","card_holder_name":"","card_token":"","response_text":"INVALID CARD NUMBER","card_type":"","card_expiry_date":"","one_time_token":"","zip":""}');
			responseHandler(error);			
			return false;
		}			
			return false;
		}
		
		crdImg = null;
		
		return true;
	}
	
	
	function Validator(){
		this._validateCN = function (inputtxt) {
			var cardnum=inputtxt;
			var regex = null;
			if(cardnum.match(amexCard)){
				regex = amexCard;
				crdImg = 'img_ax';
			}else if(cardnum.match(visaCard)){
				regex = visaCard;
				crdImg = 'img_vi';
			}else if(cardnum.match(mastCard)){
				regex = mastCard;
				crdImg = 'img_mc';
			}else if(cardnum.match(discCard)){
				regex = discCard;
				crdImg = 'img_nv';
			}else if(cardnum.match(dinrCard)){
				regex = dinrCard;
				crdImg = 'img_dc';
			}else if(cardnum.match(jcbCard)){
				regex = jcbCard;
				crdImg = 'img_jb';
			}else{
				crdImg = null;
			}

			if (inputtxt.match(regex)) {
				populateCardImage();
				return true;
			} else {
				$(".card-img").addClass('cc_deselected');
				return false;
			}
		};
		
		this._validateCVV = function (inputtxt) {
			var regex = /^[0-9]{3,4}$/;
			if (inputtxt.match(regex)) {
				return true;
			} else {
				return false;
			}
		};

		this._validateExpiry = function (inputmm, inputyy) {
			var dt = new Date();
			var mm = dt.getMonth() + 1;
			var yy = dt.getFullYear() % 100;
			if (yy == Number(inputyy) && mm > Number(inputmm)) {
				return false;
			} else {
				return true;
			}
		};
		
		this._validateCardHolderName = function (inputchn) {
			var regex = /^[a-zA-Z ]*$/;
			if (inputchn == '' || !inputchn.match(regex)) {
				return false;
			} else {
				return true;
			}
		};
		
		this._validateZip = function (inputzip) {
			var regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
			if (inputzip == '' || !inputzip.match(regex)) {
				return false;
			} else {
				return true;
			}
		};
		
	}

var API_KEY = 'K8SxeJUqDCKL3wvYXY2N90';
var API_SECRET = 'LBszMuaqLlV4zvk7oNVe1SrM52aWV8At8UINm7cPn';

var LinkHay = {
	links: [],
	setUp: function() {
		$.ajaxSetup({
			timeout: 5000
		});
	},
	getNews: function(opt) {
		var options = opt || {channel:''};
		
		$.getJSON('/r/get/news/json/', {app_key: API_KEY}, function(json) {
			console.log(json);
			// 
			// LinkHay.links = json.data.map(function() {
			// 	return $(this).realurl;
			// });
			// 
			// console.log(LinkHay.links);
		});
	}
}

$(function() {
	LinkHay.setUp();
	LinkHay.getNews({});
	
	// var url = 'http://linkhay.com/actions/linkView/linkClick.php?id=376548';
	// 
	// $.getJSON("http://viewtext.org/api/text?url=" + url + "&callback=?", function(json) {
	// 	$('#theTitle').html(json.title);
	// 	$('#theTitle').attr('href', json.responseUrl);
	// 	$('#theTitle').attr('title', json.title);
	// 	
	// 	$('#theContent').html(json.content);
	// 	
	// 	$('#theContent img').addClass('alignright');
	// });
});
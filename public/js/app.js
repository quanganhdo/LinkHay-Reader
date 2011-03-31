var API_KEY = 'K8SxeJUqDCKL3wvYXY2N90';

var LinkHay = {
	everything: {},
	links: [],
	currentLinkIndex: 0,
	setUp: function() {
		$.ajaxSetup({
			timeout: 20000
		});
		
		$('#thePrev').click(LinkHay.getPrev);
		$('#theNext').click(LinkHay.getNext);
		
		LinkHay.resetContainer();
	},
	resetContainer: function() {
		$('#thePublished').html('Kênh Đang Tải');
		$('#thePoster').html('Chưa biết ma nào');
		
		$('#theTitle').html('Tin cũng đang tải...');
		$('#theTitle').attr('href', 'javascript:return false');
		$('#theTitle').attr('title', 'Bấm bấm cái gì mà bấm?');
		
		$('#theContent').html('<p>Đang lấy dữ liệu từ LinkHay... Hơi lâu một chút bạn thông cảm nhé... (Mà có không thông cảm cũng chẳng được, LOL)</p>');
	},
	getNews: function(opt) {
		var options = opt || {channel:''};
		
		$.getJSON('/r/get/news/json/?callback=?', {app_key: API_KEY}, function(json) {
			LinkHay.everything = json;
			
			LinkHay.links = json.data.map(function(link) {
				return link.realurl;
			});
			
			console.log(LinkHay.links);
			
			LinkHay.getNext();
		});
	},
	getNew: function() {
		LinkHay.resetContainer();		
		
		$.getJSON("http://viewtext.org/api/text?url=" + LinkHay.links[LinkHay.currentLinkIndex] + "&callback=?", function(json) {			
			$('#thePublished').html(LinkHay.everything.data[LinkHay.currentLinkIndex].channelname);
			$('#thePoster').html(LinkHay.everything.data[LinkHay.currentLinkIndex].postuser);
			
			$('#theTitle').html(json.title);
			$('#theTitle').attr('href', json.responseUrl);
			$('#theTitle').attr('title', json.title);
			
			$('#theContent').html(json.content);
			
			$('#theContent img').addClass('alignright');
		});		
	},
	getPrev: function() {
		if (LinkHay.currentLinkIndex > 0) {
			LinkHay.getNew();			
			LinkHay.currentLinkIndex--;
			
			return;
		}
		
		alert('Còn tin nào nữa đâu mà quay lại?');
	},
	getNext: function() {
		if (LinkHay.currentLinkIndex < LinkHay.links.length) {
			LinkHay.getNew();			
			LinkHay.currentLinkIndex++;
			
			return;
		}
		
		alert('Đọc trăm tin rồi, làm việc tiếp đi!');
	}
}

$(function() {
	LinkHay.setUp();
	LinkHay.getNews({});	
});
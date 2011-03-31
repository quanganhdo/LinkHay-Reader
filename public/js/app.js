var API_KEY = 'K8SxeJUqDCKL3wvYXY2N90';
var ITEMS_PER_PAGE = 100;

var LinkHay = {
	everything: {},
	caches: {},
	currentLinkIndex: 0,
	ignoreState: false,
	setUp: function() {
		$.ajaxSetup({
			timeout: 20000
		});
		
		$('.prev a').click(function(e) {
			e.preventDefault();
			LinkHay.getPrev();
		});
		
		$('.next a').click(function(e) {
			e.preventDefault();
			LinkHay.getNext();
		});
		
		if (!document.location.href.match(/#/)) {
			LinkHay.ignoreState = true;
			LinkHay.getNews();
		}
		
		$.History.bind(function(state) {
			if (state.split('/').length < 2) return;
			if (LinkHay.ignoreState) return;
			
			LinkHay.ignoreState = true;
			
			var linkid = state.split('/')[1];
			LinkHay.getId(linkid);
		});
		
		$(document).bind('keypress', 'j', LinkHay.getNext);
		$(document).bind('keypress', 'k', LinkHay.getPrev);
		
		LinkHay.resetItem();
	},
	resetItem: function() {
		LinkHay.setItem({
			channel: 'Kênh Đang Tải...',
			poster: 'Chưa biết ma nào',
			title: 'Tin cũng đang tải...',
			link: '', 
			content: '<p>Đang lấy dữ liệu từ LinkHay... Hơi lâu một chút bạn thông cảm nhé... (Mà có không thông cảm cũng chẳng được, LOL)</p><p>Đợi lâu quá không thấy gì thì chuyển sang tin kế tiếp cũng được.</p>',
			commentsHTML: ''
		});
	},
	getNews: function(opt) {
		var options = opt || {channel:''};
		
		$.getJSON('/r/get/news/json/?callback=?', {app_key: API_KEY, itemperpage: ITEMS_PER_PAGE}, function(json) {
			LinkHay.everything = json;
			
			LinkHay.getNew();
		});
	},
	getNew: function() {
		LinkHay.resetItem();		
		
		var url = LinkHay.everything.data[LinkHay.currentLinkIndex].realurl ? LinkHay.everything.data[LinkHay.currentLinkIndex].realurl : LinkHay.everything.data[LinkHay.currentLinkIndex].real_url;
		$.getJSON("http://viewtext.org/api/text?callback=?", {url: url}, function(json) {			
			var currentLink = LinkHay.everything.data[LinkHay.currentLinkIndex];
			var item = {
				channel: 'Kênh ' + (currentLink.channelname ? currentLink.channelname : currentLink.channel_name),
				poster: currentLink.postuser ? currentLink.postuser : currentLink.post_user,
				title: json.title,
				link: json.responseUrl, 
				content: json.content.replace(/style=".*?"/ig, '').replace(/<\/?span.*?>/ig, ''),
				commentsHTML: '<a target="_blank" href="http://linkhay.com' + currentLink.link_detail_url + '">' + (currentLink.votecount ? currentLink.votecount : currentLink.vote_count) + ' vote, ' + (currentLink.commentcount ? currentLink.commentcount : currentLink.comment_count) + ' bình luận</a>'
			};
			
			LinkHay.setItem(item);
			
			if (currentLink.linkid)
				$.History.go('/' + currentLink.linkid + '/' + currentLink.slug)
			else
				$.History.go('/' + currentLink.link_id + '/' + currentLink.slug)			
		});		
	},
	setItem: function(item) {
		$('#thePublished').html(item.channel);
		$('#thePoster').html(item.poster);
		
		$('#theTitle').html(item.title);
		$('#theTitle').attr('href', item.link);
		$('#theTitle').attr('title', item.title);
		
		$('#theContent').html(item.content);				
		$('#theContent img').addClass('alignright');
		
		$('#theComments').html(item.commentsHTML);
	},
	getId: function(id) {
		LinkHay.resetItem();
		
		$.getJSON('/r/get/link/json/?callback=?', {app_key: API_KEY, id: id}, function(json) {
			LinkHay.everything = json;
			
			LinkHay.getNew();
		});
	},
	getPrev: function() {
		if (LinkHay.currentLinkIndex > 0) {
			LinkHay.currentLinkIndex--;
			LinkHay.getNew();						
			
			return;
		}
		
		alert('Còn tin nào nữa đâu mà quay lại?');
	},
	getNext: function() {
		if (LinkHay.currentLinkIndex < LinkHay.everything.data.length-1) {
			LinkHay.currentLinkIndex++;
			LinkHay.getNew();						
			
			return;
		}
		
		document.location.href = '/';
	}
}

$(function() {
	LinkHay.setUp();	
});
var API_KEY = 'K8SxeJUqDCKL3wvYXY2N90';

var LinkHay = {
	everything: {},
	links: [],
	currentLinkIndex: 0,
	setUp: function() {
		$.ajaxSetup({
			timeout: 20000
		});
		
		$(document).bind('keypress', 'j', LinkHay.getNext);
		$(document).bind('keypress', 'k', LinkHay.getPrev);
		
		$('.prev a').click(function(e) {
			e.preventDefault();
			LinkHay.getPrev();
		});
		
		$('.next a').click(function(e) {
			e.preventDefault();
			LinkHay.getNext();
		});
		
		LinkHay.resetContainer();
	},
	resetContainer: function() {
		$('#thePublished').html('Kênh Đang Tải');
		$('#thePoster').html('Chưa biết ma nào');
		
		$('#theTitle').html('Tin cũng đang tải...');
		$('#theTitle').attr('href', '');
		$('#theTitle').attr('title', 'Bấm bấm cái gì mà bấm?');		
		
		$('#theContent').html('<p>Đang lấy dữ liệu từ LinkHay... Hơi lâu một chút bạn thông cảm nhé... (Mà có không thông cảm cũng chẳng được, LOL)</p>');
		
		$('#theComments').html('');
	},
	getNews: function(opt) {
		var options = opt || {channel:''};
		
		$.getJSON('/r/get/news/json/?callback=?', {app_key: API_KEY, itemperpage: 100}, function(json) {
			LinkHay.everything = json;
			
			LinkHay.links = json.data.map(function(link) {
				return link.realurl;
			});
			
			LinkHay.getNew();
		});
	},
	getNew: function() {
		LinkHay.resetContainer();		
		
		$.getJSON("http://viewtext.org/api/text?url=" + LinkHay.links[LinkHay.currentLinkIndex] + "&callback=?", function(json) {			
			var currentLink = LinkHay.everything.data[LinkHay.currentLinkIndex];
			
			$('#thePublished').html(currentLink.channelname);
			$('#thePoster').html(currentLink.postuser);
			
			$('#theTitle').html(json.title);
			$('#theTitle').attr('href', json.responseUrl);
			$('#theTitle').attr('title', json.title);
			
			$('#theContent').html(json.content);
			
			$('#theContent img').addClass('alignright');
			
			$('#theComments').html('<a target="_blank" href="http://linkhay.com' + currentLink.link_detail_url + '">' + currentLink.votecount + ' vote, ' + currentLink.commentcount + ' bình luận</a>');
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
		if (LinkHay.currentLinkIndex < LinkHay.links.length-1) {
			LinkHay.currentLinkIndex++;
			LinkHay.getNew();						
			
			return;
		}
		
		alert('Đọc trăm tin rồi, làm việc tiếp đi!');
	}
}

$(function() {
	LinkHay.setUp();
	LinkHay.getNews({});	
});

/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function(jQuery){
	
	jQuery.hotkeys = {
		version: "0.8",

		specialKeys: {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
		},
	
		shiftNums: {
			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
			".": ">",  "/": "?",  "\\": "|"
		}
	};

	function keyHandler( handleObj ) {
		// Only care when a possible input has been specified
		if ( typeof handleObj.data !== "string" ) {
			return;
		}
		
		var origHandler = handleObj.handler,
			keys = handleObj.data.toLowerCase().split(" ");
	
		handleObj.handler = function( event ) {
			// Don't fire in text-accepting inputs that we didn't directly bind to
			if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
				 event.target.type === "text") ) {
				return;
			}
			
			// Keypress represents characters, not special keys
			var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
				character = String.fromCharCode( event.which ).toLowerCase(),
				key, modif = "", possible = {};

			// check combinations (alt|ctrl|shift+anything)
			if ( event.altKey && special !== "alt" ) {
				modif += "alt+";
			}

			if ( event.ctrlKey && special !== "ctrl" ) {
				modif += "ctrl+";
			}
			
			// TODO: Need to make sure this works consistently across platforms
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
				modif += "meta+";
			}

			if ( event.shiftKey && special !== "shift" ) {
				modif += "shift+";
			}

			if ( special ) {
				possible[ modif + special ] = true;

			} else {
				possible[ modif + character ] = true;
				possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if ( modif === "shift+" ) {
					possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
				}
			}

			for ( var i = 0, l = keys.length; i < l; i++ ) {
				if ( possible[ keys[i] ] ) {
					return origHandler.apply( this, arguments );
				}
			}
		};
	}

	jQuery.each([ "keydown", "keyup", "keypress" ], function() {
		jQuery.event.special[ this ] = { add: keyHandler };
	});

})( jQuery );
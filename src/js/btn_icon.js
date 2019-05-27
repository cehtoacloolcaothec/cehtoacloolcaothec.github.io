var icon_url = '../../src/icons/{0}/icon-{0}-{1}.svg';

function redirect(url) {
	window.location.assign('file:///C:/Users/tubi/Desktop/jos%C3%A9/' + url);
	//window.location.replace('http://cehtoacloolcaothec.github.io/' + url);
}

function buttonPress(element) {
	var icon = element.find('.iicon');
	var name = icon.attr('class').split(' ')[1].split("-")[1];

	element.on({
		'mouseenter' : function() {
			icon.attr('src', icon_url.format(name, 'hover'));
		},

		'mouseleave' : function() {
			icon.attr('src', icon_url.format(name, 'normal'));
		},

		'mousedown' : function() {
			icon.attr('src', icon_url.format(name, 'click'));
		},

		'mouseup' : function() {
			window.setTimeout(function(){
				if (element.filter(':hover').length != 0)
					icon.attr('src', icon_url.format(name, 'hover'));
				else
					icon.attr('src', icon_url.format(name, 'normal'));
				
				if (icon.data('link') != '' && icon.data('link') != '#' && icon.data('link') != undefined)
					redirect(icon.data('link'));
				else if (icon.data('link') == '#')
					window.location.href = '#';
			}, 300);
		}
	});
}

$(document).ready(function() {
	$('li.btn-icon, .btn-icon').each(function() {
		buttonPress($(this));
	});
});
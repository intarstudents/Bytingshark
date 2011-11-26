// ==UserScript==
// @name           Bytingshark
// @namespace      Bytingshark
// @description    Add missing file size UI to Grooveshark!
// @include        http://preview.grooveshark.com/*
// @include        http://grooveshark.com/*
// ==/UserScript==

function GM_wait(){
	if (typeof unsafeWindow.Grooveshark == "undefined"){

		setTimeout(GM_wait, 1000);

	}else{

		unsafeWindow.Grooveshark.setSongStatusCallback(function(){
			var song_size = unsafeWindow.Grooveshark._lastStatus.bytesTotal;
			var size_element = null;

			if (song_size > 0){

				if ((size_element = unsafeWindow.document.getElementById("bytingshark")) == null){
					size_element = document.createElement("span");
					size_element.setAttribute("id", "bytingshark");
					size_element.style.marginLeft = "10px";
				}

				size_element.innerHTML = formatBytes(song_size, 2);
				unsafeWindow.document.getElementById("playerDetails_current_song").appendChild(size_element);

			}
		});

	}
}

GM_wait();

// http://stackoverflow.com/questions/4258025/php-format-bytes-translation-to-javascript/4258080#4258080

function formatBytes(bytes, precision) {
	var units = ['b', 'KB', 'MB', 'GB', 'TB'];
	var bytes = Math.max(bytes, 0);
	var pow = Math.floor((bytes ? Math.log(bytes) : 0) / Math.log(1024));
	pow = Math.min(pow, units.length - 1);
	bytes = bytes / Math.pow(1024, pow);
	precision = (typeof(precision) == 'number' ? precision : 0);
	return (Math.round(bytes * Math.pow(10, precision)) / Math.pow(10, precision)) + ' ' + units[pow];
}
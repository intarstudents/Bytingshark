// ==UserScript==
// @name           Bytingshark
// @namespace      Bytingshark
// @description    Add missing file size UI to Grooveshark!
// @include        http://preview.grooveshark.com/*
// @include        http://grooveshark.com/*
// ==/UserScript==

function Bytingshark(){
	if (typeof Grooveshark == "undefined"){

		setTimeout(Bytingshark, 1000);

	}else{

		Grooveshark.setSongStatusCallback(function(){
			var song_size = Grooveshark._lastStatus.bytesTotal;
			var size_element = null;

			if (song_size > 0){

				if ((size_element = document.getElementById("bytingshark")) == null){
					size_element = document.createElement("span");
					size_element.setAttribute("id", "bytingshark");
					size_element.style.marginLeft = "10px";
				}

				size_element.innerHTML = formatBytes(song_size, 2);
				document.getElementById("playerDetails_current_song").appendChild(size_element);

			}
		});

	}
}

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

var s = document.createElement("script");
s.innerHTML = Bytingshark + formatBytes + " Bytingshark();";
document.body.appendChild(s);
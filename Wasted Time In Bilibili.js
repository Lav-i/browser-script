// ==UserScript==
// @name         Wasted Time In Bilibili
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  calculate remain time in watchlater
// @author       Lavi
// @match        https://www.bilibili.com/watchlater/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var watchlater_enhance = {
        load: false,
        init: function () {
            if (!this.load) {
                this.load = true;

                var list = document.getElementsByClassName("corner");
                var remainTime = 0;
                for (var i = 0; i < list.length; i++) {
                    var time = list[i].innerText.split(":");
                    remainTime = parseInt(remainTime) + parseInt(time[0] * 60) + parseInt(time[1]);
                }
                remainTime = parseInt(remainTime / 60) + ":" + parseInt(remainTime % 60);
                remainTime = "你还要在这个破站浪费" + remainTime + "这么久";
                console.log(remainTime);

                document.getElementsByTagName("header")[0].firstElementChild.innerText = document.getElementsByTagName("header")[0].firstElementChild.innerText + remainTime;
            }
        }
    }
    document.getElementsByClassName("watch-later-list")[0].addEventListener('DOMNodeInserted', function () {
        watchlater_enhance.init();
    });
})();
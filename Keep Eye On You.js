// ==UserScript==
// @name         Keep Eye On You
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  keep eye on lecture
// @author       Lavi
// @match        http://yjsy.buct.edu.cn:8080/pyxx/txhdgl/hdlist.aspx?xh=*
// @grant        none
// ==/UserScript==

(function () {
    'use strict'

    window.onload = function () {
        console.log('keep eye on this?')
        console.log(sessionStorage.getItem('keepEyeOnThis') != null ? 'yeap' : 'nope')

        var model = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'))
        var startBtn = model.appendChild(document.createElement('div'))
        var stopBtn = model.appendChild(document.createElement('div'))
        var audio = model.appendChild(document.createElement('audio'))
        var timeInterval = 60000

        model.style.cssText = 'position: fixed;\
            top: 100px;\
            z-index: 999;\
            opacity: 0.8;\
            text-align: center;\
            cursor: pointer;\
            background: #9caab2;'
        startBtn.textContent = 'start'
        stopBtn.textContent = 'stop'
        startBtn.style.cssText = 'height: 40px;\
            width: 40px;\
            border: 2px solid white;\
            font-size: 18px;\
            line-height: 40px;'
        stopBtn.style.cssText = 'height: 40px;\
            width: 40px;\
            border: 2px solid white;\
            font-size: 18px;\
            line-height: 40px;'
        startBtn.onclick = startWatching
        stopBtn.onclick = stopWatching
        audio.setAttribute('autoplay', 'autoplay')

        if (sessionStorage.getItem('keepEyeOnThis') == 'yeap') {
            setTimeout(function () {
                var list = document.getElementById('dgData00').children[0].children
                var isSucceed = false
                for (var i = 1; i < list.length; i++) {
                    var item = list[i].children
                    if (parseInt(item[6].textContent) > parseInt(item[7].textContent)) {
                        list[i].style.backgroundColor = 'red'
                        isSucceed = true
                    }
                }
                if (isSucceed) {
                    audio.setAttribute('src', 'http://data.huiyi8.com/2017/gha/03/17/1702.mp3')
                    sessionStorage.removeItem('keepEyeOnThis')
                } else {
                    document.getElementById('cmdRefresh').click()
                }
            }, timeInterval)
        }

        function startWatching() {
            sessionStorage.setItem('keepEyeOnThis', 'yeap')
            document.getElementById('cmdRefresh').click()
        }

        function stopWatching() {
            sessionStorage.removeItem('keepEyeOnThis')
        }
    }
})()
// ==UserScript==
// @name         Keep Eye On You
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  keep eye on lecture
// @author       Lavi
// @match        http://yjsy.buct.edu.cn:8080/pyxx/txhdgl/hdlist.aspx?xh=*
// @match        https://yjsy-8080.w.buct.edu.cn/pyxx/txhdgl/hdlist.aspx?xh=*
// @homepageURL  https://github.com/Lav-i/browser-script
// @supportURL   https://github.com/Lav-i/browser-script/issues
// @downloadURL  https://raw.githubusercontent.com/Lav-i/browser-script/master/Keep%20Eye%20On%20You.user.js
// @updateURL    https://raw.githubusercontent.com/Lav-i/browser-script/master/Keep%20Eye%20On%20You.user.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict'

    window.onload = function () {

        var model = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'))
        var startBtn = model.appendChild(document.createElement('div'))
        var stopBtn = model.appendChild(document.createElement('div'))
        var audio = model.appendChild(document.createElement('audio'))
        var timer

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
            if (checkList()) {
                audio.setAttribute('src', 'http://data.huiyi8.com/2017/gha/03/17/1702.mp3')
                sessionStorage.removeItem('keepEyeOnThis')
            } else {
                var time = new Date().getMinutes()
                var timeInterval = 5000
                if (time > 2 && time < 57) {
                    timeInterval = (57 - time) * 60 * 1000
                }
                fresh(timeInterval)
            }
        }

        function startWatching() {
            sessionStorage.setItem('keepEyeOnThis', 'yeap')
            fresh(0)
        }

        function stopWatching() {
            sessionStorage.removeItem('keepEyeOnThis')
            clearTimeout(timer)
            console.log('停止监控')
        }

        function fresh(time) {
            if (time == 5000) {
                console.log((time / 1000) + '秒后再次刷新')
            } else {
                console.log((time / 60 / 1000) + '分钟后再次刷新')
            }
            timer = setTimeout(function () {
                location.replace(location.href)
            }, time)
        }

        function checkList() {
            console.log('正在监控')
            var list = document.getElementById('dgData00').children[0].children
            var isSucceed = false
            for (var i = 1; i < list.length; i++) {
                var item = list[i].children
                if (parseInt(item[6].textContent) > parseInt(item[7].textContent)) {
                    list[i].style.backgroundColor = 'green'
                    isSucceed = true
                } else {
                    list[i].style.backgroundColor = 'red'
                }
            }
            return isSucceed
        }
    }
})()
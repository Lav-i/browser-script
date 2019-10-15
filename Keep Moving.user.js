// ==UserScript==
// @name         Keep Moving
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  keep moving on video
// @author       Lavi
// @match        https://grabuct.xuetangx.com/lms*
// @homepageURL  https://github.com/Lav-i/browser-script
// @supportURL   https://github.com/Lav-i/browser-script/issues
// @downloadURL  https://raw.githubusercontent.com/Lav-i/browser-script/master/Keep%20Moving.user.js
// @updateURL    https://raw.githubusercontent.com/Lav-i/browser-script/master/Keep%20Moving.user.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict'

    window.onload = function () {
        console.log('keep moving')

        var time = document.getElementsByClassName('xt_video_player_current_time_display fl')[0].children
        var startTime = time[0].textContent
        var stopTime = time[1].textContent

        document.getElementsByClassName("xt_video_player_common_list")[0].firstChild.click()

        function compare() {
            startTime = time[0].textContent
            stopTime = time[1].textContent

            if (startTime == stopTime) {
                document.getElementsByClassName("select-chapter")[0].click()
                var activateVideo = document.getElementsByClassName("section-video-name video-active")[0]
                var nextVideo = activateVideo.parentNode.parentNode.parentNode.nextSibling
                nextVideo.firstChild.firstChild.lastChild.click()
                setTimeout(function () {
                    document.getElementsByClassName("element-wrap")[1].click()
                }, 1000)
            }
        }

        this.setInterval(compare, 10000)

    }
})()
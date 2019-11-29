// ==UserScript==
// @name         Keep Moving
// @namespace    http://tampermonkey.net/
// @version      0.2
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

    setTimeout(function () {

        console.log('keep moving')

        var video = document.getElementsByTagName('video')[0]

        video.play()
        document.getElementsByClassName("xt_video_player_common_list")[0].firstChild.click()

        video.onpause = function () {
            video.play()
            document.getElementsByClassName("xt_video_player_common_list")[0].firstChild.click()
        }

        video.onended = function () {
            document.getElementsByClassName("select-chapter")[0].click()
            var activateVideo = document.getElementsByClassName("section-video-name video-active")[0]
            var nextVideo = activateVideo.parentNode.parentNode.parentNode.nextSibling
            nextVideo.firstChild.firstChild.lastChild.click()
            setTimeout(function () {
                document.getElementsByClassName("element-wrap")[1].click()
            }, 1000)
        }

    }, 5000)

})()
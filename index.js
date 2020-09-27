(function flexible (window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1
  var isHS = false

  // adjust body font size
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  //判断手机横竖屏状态
  function judgeHorizontalScreen () {
    if (window.orientation === 180 || window.orientation === 0) { 
      isHS = false
    } 
    if (window.orientation === 90 || window.orientation === -90 ){ 
      isHS = true
    }
  }
  judgeHorizontalScreen();
  window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", judgeHorizontalScreen, false)

  // set 1rem = viewWidth / 10
  function setRemUnit () {
    var rem = isHS ? docEl.clientHeight / 10 : docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))

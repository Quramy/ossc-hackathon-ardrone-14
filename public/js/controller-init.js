var pausedFrame = null
var latestFrame = null

window.onkeypress = function(e) {
  if (e.charCode == 32) {
    if (pausedFrame == null) {
      pausedFrame = latestFrame
    } else {
      pausedFrame = null
    }
  }
}

var controller = new Leap.Controller({enableGestures: true})
controller.loop(function(frame) {
  latestFrame = frame
  //document.getElementById('out').innerHTML = (pausedFrame ? "<p><b>PAUSED</b></p>" : "") + "<div>"+(pausedFrame || latestFrame).dump()+"</div>"
  doFrame(pausedFrame || latestFrame)
})

controller.on('ready', function() {
  console.log("ready")
})

controller.on('connect', function() {
  console.log("connect")
})

controller.on('disconnect', function() {
  console.log("disconnect")
})

controller.on('focus', function() {
  console.log("focus")
})

controller.on('blur', function() {
  console.log("blur")
})

controller.on('deviceConnected', function() {
  console.log("deviceConnected")
})

controller.on('deviceDisconnected', function() {
  console.log("deviceDisconnected")
})
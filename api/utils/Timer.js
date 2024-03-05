class TimerOnServer {
    isRunning = false
    timeoutId
    name
    constructor(name, callback) {
      this.name = name
      this.callback = callback()
    }
    start() {
      this.isRunning = true
      let i = 2
  
      var time = () => {
        if (!this.isRunning) {
          this.stop()
          return
        }
        i--
        console.log(this.name, "тик так", i)
        if (i > 0) {
          this.timeoutId = setTimeout(time, 1000)
        }
        if (i === 0) {
          this.stop()
          callback()
          //что то произошло
        }
      }
      time()
    }
    stop() {
      clearTimeout(this.timeoutId)
      this.isRunning = false
    }
  }
//   var timer1 = new TimerOnServer('первый')
//   var timer2 = new TimerOnServer('второй')
//   timer1.start()
//   // Останавливаем первый таймер через 3 секунды
//   setTimeout(function() {
//     timer1.stop()
//   }, 3000)
//   timer2.start()

export default TimerOnServer
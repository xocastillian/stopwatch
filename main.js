document.addEventListener('DOMContentLoaded', function () {
	// Получаем элементы
	const timerElement = document.querySelector('.timer')
	const startBtn = document.querySelector('.startBtn')
	const stopBtn = document.querySelector('.stopBtn')
	const resetBtn = document.querySelector('.resetBtn')

	let timerInterval
	let seconds = 0
	let paused = false
	let pauseTime

	function formatTime(secs) {
		const hours = Math.floor(secs / 3600)
		const minutes = Math.floor((secs % 3600) / 60)
		const seconds = secs % 60
		return `${String(hours).padStart(
			2,
			'0'
		)}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
	}

	function updateTimer() {
		if (!paused) {
			timerElement.textContent = formatTime(seconds)
			seconds++
		}
	}

	startBtn.addEventListener('click', function () {
		if (!timerInterval) {
			timerInterval = setInterval(updateTimer, 1000)
			startBtn.disabled = true
		}
	})

	stopBtn.addEventListener('click', function () {
		if (!paused) {
			paused = true
			clearInterval(timerInterval)
			pauseTime = seconds
			startBtn.disabled = true
			stopBtn.textContent = `Continue`
			stopBtn.classList.add('btn-warning')
		} else {
			paused = false
			timerInterval = setInterval(updateTimer, 1000)
			startBtn.disabled = true
			stopBtn.textContent = `Stop`
			stopBtn.classList.remove('btn-warning')
		}
	})

	resetBtn.addEventListener('click', function () {
		clearInterval(timerInterval)
		seconds = 0
		paused = false
		updateTimer()
		timerInterval = null
		startBtn.disabled = false
		stopBtn.textContent = `Stop`
		stopBtn.classList.remove('btn-warning')
	})
})

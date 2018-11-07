window.addEventListener('load', function() {
	particlesJS.load('particles-js', 'json/particles-config.json', function() {
		console.log('callback - particles.js config loaded');
	});

	Game.init();
}, false);

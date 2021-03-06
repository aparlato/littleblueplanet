function initialize() {
  var earth = new WE.map('earth_div');
  WE.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);

  // Start a simple rotation animation
var before = null;
requestAnimationFrame(function animate(now) {
var c = earth.getPosition();
var elapsed = before? now - before: 0;
before = now;
earth.setCenter([c[0], c[1] + 0.1*(elapsed/30)]);
requestAnimationFrame(animate);
});
//-------------------------------------------------------------------------

  var marker = WE.marker([51.5, -0.09]).addTo(earth);
  marker.bindPopup("<b>Hello world!</b><br>I am a popup.<br /><span style='font-size:10px;color:#999'>Tip: Another popup is hidden in Cairo..</span>", {maxWidth: 150, closeButton: true}).openPopup();

  var marker2 = WE.marker([30.058056, 31.228889]).addTo(earth);
  marker2.bindPopup("<b>Cairo</b><br>Yay, you found me!", {maxWidth: 120, closeButton: false});

  var markerCustom = WE.marker([50, -9], '/img/logo-webglearth-white-100.png', 100, 24).addTo(earth);

  earth.setView([51.505, 0], 6);
}



jQuery(document).ready(function($) {
var location;
var temp_f;

var latitude=39.2904;

var longitude=-76.6122;
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.007;




//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//-------------------------------------------------------------

$( "#testy" ).click(function() {

    var city = document.getElementById('test1').value;
    var state = document.getElementById('test2').value;

//-------------------------------------------------------------
  $.ajax({

  url : "http://api.wunderground.com/api/b3f430ab2b2ad94f/geolookup/conditions/q/"+state+"/"+city+".json",
  dataType : "jsonp",
  success : function(parsed_json) {
   location = parsed_json['location']['city'];
   temp_f = Math.round(parsed_json['current_observation']['temp_f']);

  //alert("Current temperature in " + location + " is: " + temp_f);
  $("#hello").text(location+" "+temp_f);


  //changing longitude and latitude
  latitude=22;
  longitude=44;


//THIS IS WHERE WE WILL CHANGE COLORS ACCORDING TO TEMPERATURE
if (temp_f>=75){

colors.length=0;

 colors = new Array(
   [255,0,0],
   [255,90,0],
   [255,135,0],
   [255,180,0],
   [255,210,0],
   [255,255,0]);

}
else if (temp_f<75&&temp_f>=60){

colors.length=0;

 colors = new Array(
   [255,217,110],
   [180,220,126],
   [156,212,65],
   [128,217,0],
   [255,158,32],
   [242,217,0]);

}


//-----------------------------------------------------------

  }

  });

//-------------------------------------------------------------
});


function updateGradient()
{

  if ( $===undefined ) return;

var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

  }
}

setInterval(updateGradient,10);

//-------------------------------------------------------------
//----------------THIS IS THE EARTH_____________________________

var map;
  var earth = new WE.map('earth_div', {
    center: [39.2904, -76.6122],
    zoom: 2,
    dragging: true,
    scrollWheelZoom: false,
    proxyHost: 'http://srtm.webglearth.com/cgi-bin/corsproxy.fcgi?url='
  });


  WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);

/*  // Start a simple rotation animation
var before = null;
requestAnimationFrame(function animate(now) {
var c = earth.getPosition();
var elapsed = before? now - before: 0;
before = now;
earth.setCenter([c[0], c[1] + 0.1*(elapsed/30)]);
requestAnimationFrame(animate);
});  */
//-------------------------------------------------------------------------

  var marker = WE.marker([latitude, longitude]).addTo(earth);
  marker.bindPopup("<b>Hello world!</b><br>I am a popup.<br /><span style='font-size:10px;color:#999'>Tip: Another popup is hidden in Cairo..</span>", {maxWidth: 150, closeButton: true}).openPopup();


  var markerCustom = WE.marker([50, -9], '/img/logo-webglearth-white-100.png', 100, 24).addTo(earth);



//TEST//
$( "#comeon" ).click(function() {
//prompt(longitude);
map.setView([27.988056, 86.925278]);

panTo([65, -19]);

});
//-------------------------------------------------------------

});


//----------------------------------------------------------------
/* var map;
function initialize() {
  var earth = new WE.map('earth_div', {
    center: [39.2904, -76.6122],
    zoom: 2,
    dragging: true,
    scrollWheelZoom: false,
    proxyHost: 'http://srtm.webglearth.com/cgi-bin/corsproxy.fcgi?url='
  });


  WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);

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

  var marker = WE.marker([latitude, longitude]).addTo(earth);
  marker.bindPopup("<b>Hello world!</b><br>I am a popup.<br /><span style='font-size:10px;color:#999'>Tip: Another popup is hidden in Cairo..</span>", {maxWidth: 150, closeButton: true}).openPopup();


  var markerCustom = WE.marker([50, -9], '/img/logo-webglearth-white-100.png', 100, 24).addTo(earth);


}

function panTo() {
  prompt(77);
  map.panTo([65, -19]);
}
*/

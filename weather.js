var latitude=39.2904;

var longitude=-76.6122;

var marker;

var trueBoy=true;

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
var gradientSpeed = 0.005;

var earthZoom=0;


function panTo() {

jQuery(document).ready(function($) {

var location;
var temp_f;

var intervalId = "";

var rainyDay;

var outside;
//-------------------------------------------------------------


    var city = document.getElementById('city').value;

//-------------------------------------------------------------
  $.ajax({

  url : "http://api.wunderground.com/api/b3f430ab2b2ad94f/geolookup/conditions/q/"+city+".json",
  dataType : "jsonp",
  success : function(parsed_json) {
   location = parsed_json['location']['city'];
   temp_f = Math.round(parsed_json['current_observation']['temp_f']);

rainyDay = parsed_json['current_observation']['icon'];

outside = parsed_json['current_observation']['weather'];

  //alert("Current temperature in " + location + " is: " + temp_f);
  $("#hello").text(location);
  $("#temp").text(temp_f+String.fromCharCode(176));



  $('#outside').fadeTo('slow', 0.3, function()
  {
          $(this).css('padding-top', '150px');
      $(this).text(outside);
  }).fadeTo('slow', 1);


  //changing longitude and latitude
  latitude=Number(parsed_json['location']['lat'])-1.5;
  longitude=Number(parsed_json['location']['lon'])-1.5;

//THIS IS WHERE WE WILL CHANGE COLORS ACCORDING TO TEMPERATURE
//HOT
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
//MODERATE
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
//CHILLY
else if (temp_f<60&&temp_f>=32){

colors.length=0;

 colors = new Array(
   [55,209,123],
   [58,223,148],
   [156,212,206],
   [95,217,214],
   [61,121,230],
   [95,74,214]);

}
//COLD
else if (temp_f<32){

colors.length=0;

 colors = new Array(
   [0,74,255],
   [0,144,255],
   [156,130,255],
   [146,41,255],
   [111,0,255],
   [42,30,112]);

}

funny(latitude,longitude);

//-----------------------------------------------------------


if (rainyDay==="rain"){
  $('#animation').fadeTo('slow', 0.3, function()
  {
      $(this).css('background', 'url(icons/rainy.png)');
  }).fadeTo('slow', 1);
}

else if (rainyDay==="cloudy"){
  $('#animation').fadeTo('slow', 0.3, function()
  {
      $(this).css('background', 'url(icons/cloudy.png)');
  }).fadeTo('slow', 1);

}

else if (rainyDay==="snow"||rainyDay==="sleet"||rainyDay==="flurries"){

  $('#animation').fadeTo('slow', 0.3, function()
  {
      $(this).css('background', 'url(icons/snowy.png)');
  }).fadeTo('slow', 1);

}

else if (rainyDay==="mostlycloudy"||rainyDay==="partlysunny"){

  $('#animation').fadeTo('slow', 0.3, function()
  {
      $(this).css('background', 'url(icons/mostlycloudy.png)');
  }).fadeTo('slow', 1);

}

else if (rainyDay==="mostlysunny"||rainyDay==="partlycloudy"){

  $('#animation').fadeTo('slow', 0.3, function()
  {
      $(this).css('background', 'url(icons/mostlysunny.png)');
  }).fadeTo('slow', 1);

}

else if (rainyDay==="tstorms"){
  $('#animation').fadeTo('slow', 0.3, function()
  {
      $(this).css('background', 'url(icons/tstorms.png)');
  }).fadeTo('slow', 1);
}

else if (rainyDay==="sunny"||rainyDay==="clear"){
  $('#animation').fadeTo('slow', 0.3, function()
  {
      $(this).css('background', 'url(icons/sunny.png)');
  }).fadeTo('slow', 1);
}

else {
  $('#animation').fadeTo('slow', 0.3, function()
  {
      $(this).css('background', 'url()');
  }).fadeTo('slow', 1);}


//-----------------------------------------------------------

  }
  //-----------------------------------------------------------




  //-----------------------------------------------------------


  });

//-------------------------------------------------------------


});

//This is the end of my function housing ALL jquery
}
//---------------EARTH-------------------------------------------------

var map;
function initialize(){
  map = WE.map('earth_div', {
    center: [36.057944835, -112.18688965],
    zoom: 1.85,
    dragging: true,
    scrollWheelZoom: false,
    //proxyHost: 'http://srtm.webglearth.com/cgi-bin/corsproxy.fcgi?url='
  });

  var baselayer = WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  //var baselayer = WE.tileLayer('test/index.html/{z}/{x}/{y}.png',{


    //attribution: '© OpenStreetMap contributors'
  }).addTo(map);


};



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


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
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//used a callback to make it run when it needs to
function funny(lat, lon) {
  map.panTo([lat, lon]);
  //addSomeMarkers();
  if (trueBoy){
  marker = WE.marker([lat-2, lon+2], 'icon03.png',25,25).addTo(map);
  //marker.bindPopup("<b>Hello world!</b><br>I am a popup.<br /><span style='font-size:10px;color:#999'>Tip: Another popup is hidden in Cairo..</span>", {maxWidth: 150, closeButton: true}).openPopup();

  trueBoy=false;
}
  if (!trueBoy){
marker.setLatLng([lat-2, lon+2]);
//marker.bindPopup("<b>Hello world!</b><br>I am a popup.<br /><span style='font-size:10px;color:#999'>Tip: Another popup is hidden in Cairo..</span>", {maxWidth: 150, closeButton: true}).openPopup();
}

}

//-------------------------------------------------------------------------------------

$(document).ready(function(){
    $('#city').keypress(function(e){
      if(e.keyCode==13)
      $('#testy').click();
    });
});

const ipAddress = document.getElementById("ip-address");
const ipLocation = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
const input = document.querySelector(".search-form");
var map = L.map('map');

let lat;
let lng;

const displayMap = () => {
  var markerIcon = L.icon({
      iconUrl: 'images/icon-location.svg',

      iconSize:     [46, 56], // size of the icon
      iconAnchor:   [23, 55], // point of the icon which will correspond to marker's location
  });
  map.setView([lat, lng], 17);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: false
  }).addTo(map);

  L.marker([lat, lng], {icon: markerIcon}).addTo(map)

};

const displayIpInfos = (data) => {
  ipAddress.innerText = data.ip;
  ipLocation.innerText = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
  timezone.innerText = `UTC ${data.location.timezone}`;
  isp.innerText = data.isp;
};

const getIpInfos = (ipAddress = "") => {
fetch(`https://geo.ipify.org/api/v1?apiKey=at_mGXeU1zY4JbFU1sxUdh1WsaPcmALT&ipAddress=${ipAddress}`)
  .then(response => response.json())
  .then(data => {
    lat = data.location.lat;
    lng = data.location.lng;
    displayIpInfos(data);
    displayMap();
  })
};

getIpInfos();

input.addEventListener("submit", event => {
  event.preventDefault()
  getIpInfos(event.target[0].value);
  event.target[0].value = "";
});



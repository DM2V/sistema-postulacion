import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

function MapView() {
  const position: LatLngExpression = [-0.62455, -78.74368];
  const markets = [
    {
      name: "Campus Matriz Sangolquí",
      lat: -0.31455,
      lon: -78.44368,
    },
    {
      name: "Campus Latacunga Centro",
      lat: -0.9355531,
      lon: -78.6116068,
    },
    {
      name: "Campus Latacunga Belisario Quevedo",
      lat: -0.9976251,
      lon: -78.5835337,
    },
    {
      name: "Campus Santo Domingo",
      lat: -0.41313,
      lon: -79.30946,
    },
  ];

  const customIcon = new L.Icon({
    iconUrl: "/market.svg",
    iconSize: [25, 25],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="w-72 md:w-[600px] lg:h-[10vh] lg:w-[100%]">
      <div className="w-72 md:w-[600px] lg:h-[10vh] lg:w-[100%]">
        <MapContainer center={position} zoom={9} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markets.map((market, index) => (
            <Marker
              key={index}
              position={[market.lat, market.lon]}
              icon={customIcon}
            >
              <Tooltip direction="bottom" opacity={1} permanent>
                {market.name}
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
export default MapView;

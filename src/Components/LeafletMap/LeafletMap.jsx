import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import logoSomosMas from "../../assets/images/logo.png";
import { BiWorld } from "react-icons/bi";
import { FaMapPin } from "react-icons/fa";

const LeafletMap = () => {
	const somosMasCoordinates = [4.668941320745149, -74.06208361585688];
	const somosMasIcon = L.icon({
		iconUrl: logoSomosMas,
		iconSize: [100, 100], // size of the icon
		iconAnchor: [40, 20], // point of the icon which will correspond to marker's location
		popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
	});
	return (
		<MapContainer
			className="leaflet__map"
			center={somosMasCoordinates}
			zoom={18}
			scrollWheelZoom={false}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={somosMasCoordinates} icon={somosMasIcon}>
				<Popup>
					<h3>Corporación Somos Más</h3>
					<div className="popup__item">
						<FaMapPin />
						Cra. 22 ## 80-73, Bogotá, Colombia
					</div>
					<div className="popup__item">
						<BiWorld />
						<a
							href="https://www.somosmas.org/"
							target="_blank"
							rel="noopener noreferrer"
						>
							www.somosmas.org
						</a>
					</div>
					<div className="popup__item">
						<a
							href="https://www.google.com.ar/maps/place/Corporaci%C3%B3n+Somos+M%C3%A1s/@4.6689404,-74.062345,18.75z/data=!4m5!3m4!1s0x8e3f9aeee54d868d:0xff383cc9d5430db2!8m2!3d4.6686543!4d-74.0620427"
							target="_blank"
							rel="noopener noreferrer"
							className="p-6px item__edit-link"
						>
							Mas info
						</a>
					</div>
				</Popup>
			</Marker>
		</MapContainer>
	);
};

export default LeafletMap;

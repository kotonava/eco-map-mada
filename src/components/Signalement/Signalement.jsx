import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import "./Signalement.css";

/* ---- Fix des icônes Leaflet (ESM-compatible) ---- */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

/* ---- Données d’exemple pour la colonne droite ---- */
const RECENTS = [
  { id: 101, type: "Plastique", gravite: "critique", region: "Analamanga", coords: [-18.91, 47.53], date: "2025-08-14 10:22" },
  { id: 102, type: "Organiques", gravite: "élevée", region: "Atsinanana", coords: [-18.15, 49.40], date: "2025-08-13 17:05" },
  { id: 103, type: "Plastique", gravite: "faible", region: "Boeny", coords: [-15.72, 46.32], date: "2025-08-13 08:41" },
];

/* ---- Hook pour placer le marqueur au clic sur la carte ---- */
function ClickToPlace({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function Signalement() {
  const [dark, setDark] = useState(true); // démarre en mode sombre comme votre capture
  const [center, setCenter] = useState([-18.9, 47.5]); // Madagascar
  const [marker, setMarker] = useState([-18.9, 47.5]);

  // formulaire
  const [typeDechet, setTypeDechet] = useState("");
  const [gravite, setGravite] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [dateFiltre, setDateFiltre] = useState("");
  const [photos, setPhotos] = useState([]); // File[]
  const [previews, setPreviews] = useState([]); // dataURL[]

  // preview photos
  useEffect(() => {
    if (!photos?.length) {
      setPreviews([]);
      return;
    }
    const readers = [];
    const urls = [];
    photos.forEach((file) => {
      const r = new FileReader();
      readers.push(r);
      r.onload = (e) => {
        urls.push(e.target.result);
        if (urls.length === photos.length) setPreviews(urls);
      };
      r.readAsDataURL(file);
    });
    return () => readers.forEach((r) => r.abort?.());
  }, [photos]);

  // choisir la position depuis un recent
  const mapRef = useRef(null);
  const goto = (coords) => {
    setMarker(coords);
    setCenter(coords);
  };

  // soumission simulée
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Signalement envoyé ✅\n\nType: ${typeDechet || "-"}\nGravité: ${gravite || "-"}\nCoordonnées: ${marker?.[0]?.toFixed(4)}, ${marker?.[1]?.toFixed(4)}`
    );
    // reset light
    setTypeDechet("");
    setGravite("");
    setDescription("");
    setPhotos([]);
    setPreviews([]);
  };

  // GPS auto
  const handleGPS = () => {
    if (!navigator.geolocation) {
      alert("Géolocalisation non supportée par ce navigateur.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setMarker(coords);
        setCenter(coords);
      },
      () => alert("Impossible d'obtenir la position GPS.")
    );
  };

  const classRoot = useMemo(() => `sig-root ${dark ? "theme-dark" : "theme-light"}`, [dark]);

  return (
    <div className={classRoot}>
      {/* Header */}
      <div className="sig-header">
        <h1>Signalement</h1>
        <div className="sig-actions">
          <button className="btn ghost" onClick={() => setDark((v) => !v)}>
            {dark ? "Mode clair" : "Mode sombre"}
          </button>
        </div>
      </div>

      {/* Grille principale */}
      <div className="sig-grid">
        {/* Col gauche – formulaire */}
        <section className="sig-card">
          <form onSubmit={handleSubmit} className="sig-form">
            <div className="form-group">
              <label>Localisation</label>
              <div className="inline">
                <button type="button" className="btn outline" onClick={handleGPS}>
                  GPS automatique
                </button>
                <span className="hint">ou cliquez sur la carte</span>
              </div>
            </div>

            <div className="form-group">
              <label>Photo(s) du site</label>
              <label className="upload">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setPhotos(Array.from(e.target.files || []))}
                />
                <span>Ajouter une photo</span>
              </label>
              {!!previews.length && (
                <div className="preview-grid">
                  {previews.map((src, i) => (
                    <img key={i} src={src} alt={`preview-${i}`} />
                  ))}
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Type de déchet</label>
                <select value={typeDechet} onChange={(e) => setTypeDechet(e.target.value)}>
                  <option value="">Sélectionner</option>
                  <option>Plastique</option>
                  <option>Verre</option>
                  <option>Papier</option>
                  <option>Organique</option>
                  <option>Mixte</option>
                  <option>Électronique</option>
                </select>
              </div>

              <div className="form-group">
                <label>Niveau de gravité</label>
                <select value={gravite} onChange={(e) => setGravite(e.target.value)}>
                  <option value="">Sélectionner</option>
                  <option value="faible">Faible</option>
                  <option value="moyenne">Moyenne</option>
                  <option value="élevée">Élevée</option>
                  <option value="critique">Critique</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows={4}
                placeholder="Ajouter une description…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button type="submit" className="btn primary block">
              Envoyer
            </button>
          </form>
        </section>

        {/* Carte centrale */}
        <section className="sig-card">
          <div className="map-wrap">
            <MapContainer
              ref={mapRef}
              center={center}
              zoom={7}
              scrollWheelZoom
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ClickToPlace onSelect={setMarker} />
              {marker && (
                <Marker position={marker}>
                  <Popup>
                    <b>Point sélectionné</b>
                    <br />
                    {marker[0].toFixed(4)}, {marker[1].toFixed(4)}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </section>

        {/* Colonne droite – récents + filtres */}
        <aside className="sig-card">
          <div className="side-head">Signalements récents</div>

          <div className="filters">
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">Région (toutes)</option>
              <option>Analamanga</option>
              <option>Atsinanana</option>
              <option>Boeny</option>
              <option>Haute Matsiatra</option>
              <option>Diana</option>
            </select>
            <input
              type="date"
              value={dateFiltre}
              onChange={(e) => setDateFiltre(e.target.value)}
            />
          </div>

          <ul className="recent-list">
            {RECENTS.filter((r) => !region || r.region === region).map((r) => (
              <li key={r.id} className="recent-item" onClick={() => goto(r.coords)}>
                <span className={`badge ${r.gravite}`}>{r.gravite}</span>
                <div className="recent-main">
                  <div className="title">{r.type}</div>
                  <div className="meta">
                    {r.region} • {r.date}
                  </div>
                </div>
                <button className="btn link">Voir</button>
              </li>
            ))}
          </ul>

          <div className="side-head mt">Consignes</div>
          <ul className="tips">
            <li>Précisez un repère (marché, rue, école…).</li>
            <li>Évitez les visages reconnaissables sur la photo.</li>
            <li>Activez le GPS pour une meilleure précision.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

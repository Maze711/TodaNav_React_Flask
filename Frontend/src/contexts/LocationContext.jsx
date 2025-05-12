import React, { createContext, useState } from "react";

export const muntinlupaLocations = () => ({
  barangays: {
    "Alabang": [14.418364, 121.0385],
    "Ayala Alabang": [14.406064, 121.022355],
    "Bayanan": [14.407797, 121.049972],
    "Buli": [14.443, 121.0505],
    "Cupang": [14.4315, 121.04861],
    "New Alabang Village": [14.4175, 121.0275],
    "Poblacion": [14.385411, 121.029033],
    "Putatan": [14.398367, 121.036378],
    "Sucat": [14.4365, 121.0503],
    "Tunasan": [14.372544, 121.036378],
  },
  landmarks: {
    "Alabang Town Center": [14.423477, 121.029795],
    "Festival Malls": [14.4157, 121.038902],
    "St. Jerome Parish Church": [14.421944, 121.031389],
    "Muntinlupa City Hall": [14.385411, 121.029033],
    "Muntinlupa Sports Complex": [14.383712, 121.02895],
    "Filinvest City": [14.417472, 121.041944],
    "South Luzon Expressway (SLEX) Alabang Exit": [14.43, 121.03],
    "Alabang Public Market": [14.42, 121.03],
    "Museo ng Muntinlupa": [14.385411, 121.029033],
    "Jamboree Lake": [14.389, 121.031],
    "Muntinlupa Sunken Garden": [14.385411, 121.029033],
    "Sucat People's Park": [14.468, 121.045],
    "Japanese Cemetery": [14.385, 121.032],
    "Sacred Heart of Jesus Parish": [14.386, 121.034],
    "Memorial Hill": [14.388, 121.033],
    "Alabang Philippines Temple": [14.417, 121.038],
  },
  buildings: {
    "Insular Life Corporate Centre I": [14.418, 121.03],
    "Bristol at Parkway Place": [14.421, 121.03],
    "Insular Life Corporate Centre II": [14.419, 121.03],
    "Commercenter Alabang": [14.42, 121.03],
    "Madrigal Business Park": [14.418, 121.03],
    "Alabang Medical Clinic": [14.42, 121.03],
    "Asian Hospital and Medical Center": [14.418, 121.03],
    "Muntinlupa Doctors Hospital": [14.385411, 121.029033],
    "Alabang Convention Center": [14.417, 121.038],
    "Botanika Nature Residences": [14.417, 121.038],
    "South Park District": [14.417, 121.038],
  },
  schools: {
    "Muntinlupa National High School": [14.38881, 121.0275],
    "Santo Niño School of Muntinlupa": [14.38606, 121.04791],
    "Muntinlupa Science High School": [14.38407, 121.0519],
    "De La Salle Santiago Zobel School": [14.405, 121.022],
    "Southernside Montessori School": [14.387887, 121.039171],
    "South Crest School": [14.398, 121.035],
    "Muntinlupa Business High School": [14.426, 121.045],
    "Pamantasan ng Lungsod ng Muntinlupa": [14.385411, 121.029033],
    "Lyceum of Alabang INC.": [14.417, 121.038],
    "Holy Infant Academy": [14.386, 121.034],
    "Infant Jesus Montessori School of Muntinlupa": [14.385, 121.033],
    "Tunasan Elementary School": [14.372544, 121.036378],
    "Victoria Elementary School": [14.373, 121.037],
    "Christian Love School": [14.374, 121.038],
    "Itaas Elementary School": [14.375, 121.039],
    "Poblacion Elementary School": [14.385411, 121.029033],
    "Muntinlupa Christian Academy": [14.377, 121.041],
    "Muntinlupa Elementary School": [14.385411, 121.029033],
    "Poblacion National High School": [14.385411, 121.029033],
    "Our Lady of The Abandoned Catholic School": [14.38, 121.044],
    "Putatan Elementary School": [14.398367, 121.036378],
    "South Mansfield College": [14.382, 121.046],
    "Soldier's Hills Elementary School": [14.383, 121.047],
    "Bayanan Elementary School": [14.407797, 121.049972],
    "Maranatha Christian Academy - Bayanan": [14.407797, 121.049972],
    "Alabang Elementary School": [14.418364, 121.0385],
    "Far Eastern University Alabang": [14.418364, 121.0385],
    "Liceo de Alabang, Inc.": [14.418364, 121.0385],
    "Saint Bernadette College of Alabang": [14.406064, 121.022355],
    "San Roque Catholic School": [14.385411, 121.029033],
    "STI College (Alabang Branch)": [14.418364, 121.0385],
    "Maria Montessori Foundation": [14.406064, 121.022355],
    "PAREF Woodrose School": [14.406064, 121.022355],
    "Cupang Elementary School": [14.4315, 121.04861],
    "San Beda College Alabang": [14.406064, 121.022355],
    "Buli Elementary School": [14.443, 121.0505],
    "Muntinlupa Business High School (Sucat Annex)": [14.4365, 121.0503],
    "Sucat Elementary School": [14.4365, 121.0503],
    "Colegio De Muntinlupa": [14.4365, 121.0503],
  },
});

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const calculateFare = (dist) => {
  const baseFare = 40;
  const perKm = 12;
  return Math.round(baseFare + dist * perKm);
};

// TODA locations data
export const todaLocations = [
  {
    name: "BBTODAI (Bayanan Baywalk Tricycle Operators and Drivers Association, Inc.)",
    location: "Barangay Bayanan, Muntinlupa City",
    coordinates: [14.407797, 121.049972],
  },
  {
    name: "ABCMSTODA (Alabang-Bayanan-Cupang-Market Site Tricycle Operators and Drivers Association)",
    location: "Primarily operates in Barangays Alabang, Bayanan, and Cupang, Muntinlupa City",
    coordinates: [14.418364, 121.0385],
  },
];

// Helper function to find nearby TODAs within a certain radius (e.g., 5 km)
export const findNearbyTODA = (userLat, userLon, radiusKm = 5) => {
  return todaLocations.filter((toda) => {
    const dist = calculateDistance(
      userLat,
      userLon,
      toda.coordinates[0],
      toda.coordinates[1]
    );
    return dist <= radiusKm;
  });
};

// LocationContext to provide user location and updater
export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState([14.407797, 121.049972]); // Default to Bayanan

  // Function to update user location (simulate real-time)
  const updateUserLocation = (newLocation) => {
    setUserLocation(newLocation);
  };

  // New function to fetch user's exact location using browser Geolocation API
  const fetchUserLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        console.log("User location updated:", latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error.message);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <LocationContext.Provider
      value={{ userLocation, updateUserLocation, findNearbyTODA, fetchUserLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

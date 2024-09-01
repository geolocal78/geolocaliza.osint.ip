// Inicializa el mapa
const map = L.map('map').setView([0, 0], 2); // Centra el mapa en el mundo con zoom bajo

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

document.getElementById('search-button').addEventListener('click', function() {
    const ip = document.getElementById('ip-input').value;
    fetch(`/ip-location?ip=${ip}`)
        .then(response => response.json())
        .then(data => {
            if (data.lat && data.lon) {
                map.setView([data.lat, data.lon], 13); // Ajusta el zoom según sea necesario
                L.marker([data.lat, data.lon]).addTo(map)
                    .bindPopup('Ubicación de IP: ' + ip)
                    .openPopup();
            } else {
                alert('No se encontraron datos para la IP.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al buscar la ubicación.');
        });
});

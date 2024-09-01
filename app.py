from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Reemplaza con tu clave de API de OpenCage
OPENCAGE_API_KEY = 'a01cfe38610542758aa90d99d6607949'
# URL para IP API
IP_API_URL = 'http://ip-api.com/json/'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/geocode', methods=['GET'])
def geocode():
    address = request.args.get('address')
    url = f'https://api.opencagedata.com/geocode/v1/json?q={address}&key={OPENCAGE_API_KEY}'
    response = requests.get(url)
    data = response.json()
    print("Geocode Data:", data)  # Imprimir datos para depuración
    return jsonify(data)

@app.route('/reverse-geocode', methods=['GET'])
def reverse_geocode():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    url = f'https://api.opencagedata.com/geocode/v1/json?q={lat},{lon}&key={OPENCAGE_API_KEY}'
    response = requests.get(url)
    data = response.json()
    print("Reverse Geocode Data:", data)  # Imprimir datos para depuración
    return jsonify(data)

@app.route('/ip-location', methods=['GET'])
def ip_location():
    ip = request.args.get('ip')
    url = f'{IP_API_URL}{ip}'
    response = requests.get(url)
    data = response.json()
    print("IP Location Data:", data)  # Imprimir datos para depuración
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  # Cambia el host a 0.0.0.0 y el puerto a 5000

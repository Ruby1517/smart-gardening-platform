from machine import Pin, ADC, I2C
from time import sleep
import network
import urequests
import bme280_float  # You may need to upload this module manually

# hardware/pico_w_sensor_code.py 
# ---- Wi-Fi Setup ----
SSID = 'rodella'
PASSWORD = '@235235$'

def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(SSID, PASSWORD)
    while not wlan.isconnected():
        print("Connecting to WiFi...")
        sleep(1)
    print("Connected to:", SSID)
    print("IP:", wlan.ifconfig()[0])
    return wlan

# ---- Initialize Sensors ----
# Soil Moisture Sensor (analog pin)
moisture_adc = ADC(Pin(26))  # GP26 = ADC0

# BME280 Sensor (I2C)
i2c = I2C(0, scl=Pin(1), sda=Pin(0))  # GP1=SCL, GP0=SDA
bme = bme280_float.BME280(i2c=i2c)

# ---- Main Loop ----
def read_sensors():
    # Moisture values range from 0 (wet) to ~65535 (dry)
    moisture_raw = moisture_adc.read_u16()
    moisture_percent = 100 - ((moisture_raw / 65535.0) * 100)

    temp, pressure, humidity = bme.read_compensated_data()

    print("🌱 Soil Moisture:", round(moisture_percent, 1), "%")
    print("🌡️ Temp:", round(temp, 2), "°C")
    print("💧 Humidity:", round(humidity, 2), "%")
    print("📊 Pressure:", round(pressure / 100), "hPa")
    print("-" * 30)

    # Optional: Send to backend API
    # payload = {
    #     "moisture": round(moisture_percent, 1),
    #     "temperature": round(temp, 2),
    #     "humidity": round(humidity, 2)
    # }
    # response = urequests.post("https://your-backend/api/sensors", json=payload)
    # print("Data sent:", response.status_code)

# ---- Run ----
connect_wifi()

while True:
    read_sensors()
    sleep(5)

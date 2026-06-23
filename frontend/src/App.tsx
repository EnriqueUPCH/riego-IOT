import { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Telemetria {
  temperatura: number;
  humedad: number;
  bateria: number;
  valvula: string;
  fecha: string;
}

function App() {
  const [estado, setEstado] = useState<Telemetria>({
    temperatura: 0,
    humedad: 0,
    bateria: 0,
    valvula: "desconocida",
    fecha: "",
  });

  const [historial, setHistorial] = useState<Telemetria[]>([]);

  const cargarEstado = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/estado"
      );

      setEstado(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarHistorial = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/historial"
      );

      setHistorial(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarEstado();
    cargarHistorial();

    const timer = setInterval(() => {
      cargarEstado();
      cargarHistorial();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold mb-8">
        Sistema de Riego IoT
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 mb-2">
            🌡 Temperatura
          </h2>

          <p className="text-4xl font-bold">
            {estado.temperatura} °C
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 mb-2">
            💧 Humedad
          </h2>

          <p className="text-4xl font-bold">
            {estado.humedad} %
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 mb-2">
            🔋 Batería
          </h2>

          <p className="text-4xl font-bold">
            {estado.bateria} %
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 mb-2">
            🚰 Válvula
          </h2>

          <p className="text-4xl font-bold">
            {estado.valvula}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Historial de Sensores
        </h2>

        <div style={{ width: "100%", height: 450 }}>
          <ResponsiveContainer>
            <LineChart data={historial}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="fecha"
                tickFormatter={(value) =>
                  new Date(value).toLocaleTimeString()
                }
              />

              <YAxis />

              <Tooltip
                labelFormatter={(value) =>
                  new Date(value).toLocaleString()
                }
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="temperatura"
                name="Temperatura (°C)"
              />

              <Line
                type="monotone"
                dataKey="humedad"
                name="Humedad (%)"
              />

              <Line
                type="monotone"
                dataKey="bateria"
                name="Batería (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

export default App;
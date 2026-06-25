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
  id?: number;
  nodo_id?: number;
  temperatura: number;
  humedad: number;
  bateria: number;
  valvula: string;
  fecha: string;
}

const API = "http://136.248.71.101:8000";

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
      const res = await axios.get(`${API}/estado`);
      setEstado(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarHistorial = async () => {
    try {
      const res = await axios.get(`${API}/historial`);
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

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Sistema de Riego IoT
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">

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

            <p className="text-3xl font-bold">
              {estado.valvula}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500 mb-2">
              📡 Nodo
            </h2>

            <p className="text-4xl font-bold">
              {historial.length > 0
                ? historial[historial.length - 1].nodo_id
                : "-"}
            </p>
          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            Historial de Sensores
          </h2>

          <div style={{ width: "100%", height: 500 }}>
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
                    new Date(value as string).toLocaleString()
                  }
                />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="temperatura"
                  name="Temperatura °C"
                  stroke="#ef4444"
                  strokeWidth={3}
                />

                <Line
                  type="monotone"
                  dataKey="humedad"
                  name="Humedad %"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />

                <Line
                  type="monotone"
                  dataKey="bateria"
                  name="Batería %"
                  stroke="#22c55e"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Últimos Registros
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Nodo</th>
                  <th className="text-left p-2">Temperatura</th>
                  <th className="text-left p-2">Humedad</th>
                  <th className="text-left p-2">Batería</th>
                  <th className="text-left p-2">Válvula</th>
                  <th className="text-left p-2">Fecha</th>
                </tr>
              </thead>

              <tbody>

                {[...historial]
                  .reverse()
                  .slice(0, 10)
                  .map((item) => (
                    <tr
                      key={item.id}
                      className="border-b"
                    >
                      <td className="p-2">
                        {item.id}
                      </td>

                      <td className="p-2">
                        {item.nodo_id}
                      </td>

                      <td className="p-2">
                        {item.temperatura}
                      </td>

                      <td className="p-2">
                        {item.humedad}
                      </td>

                      <td className="p-2">
                        {item.bateria}
                      </td>

                      <td className="p-2">
                        {item.valvula}
                      </td>

                      <td className="p-2">
                        {new Date(item.fecha)
                          .toLocaleString()}
                      </td>
                    </tr>
                  ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
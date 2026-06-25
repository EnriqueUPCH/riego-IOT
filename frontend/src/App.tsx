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
  id: number;
  nodo_id: number;
  temperatura: number;
  humedad: number;
  bateria: number;
  valvula: string;
  fecha: string;
}

interface Resumen {
  temperatura_promedio: number;
  humedad_promedio: number;
  bateria_promedio: number;
  nodos: number;
}

const API = "http://136.248.71.101:8000";

function App() {
  const [resumen, setResumen] = useState<Resumen>({
    temperatura_promedio: 0,
    humedad_promedio: 0,
    bateria_promedio: 0,
    nodos: 0,
  });

  const [historialGlobal, setHistorialGlobal] = useState<Telemetria[]>([]);
  const [historialNodo, setHistorialNodo] = useState<Telemetria[]>([]);
  const [nodoSeleccionado, setNodoSeleccionado] = useState<number>(1);

  const cargarResumen = async () => {
    try {
      const res = await axios.get(`${API}/resumen`);
      setResumen(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarHistorialGlobal = async () => {
    try {
      const res = await axios.get(`${API}/historial`);
      setHistorialGlobal(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarHistorialNodo = async (nodo: number) => {
    try {
      const res = await axios.get(
        `${API}/historial/${nodo}`
      );

      setHistorialNodo(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarTodo = async () => {
    await cargarResumen();
    await cargarHistorialGlobal();
    await cargarHistorialNodo(nodoSeleccionado);
  };

  useEffect(() => {
    cargarTodo();

    const timer = setInterval(() => {
      cargarTodo();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    cargarHistorialNodo(nodoSeleccionado);
  }, [nodoSeleccionado]);

  const nodosDisponibles = [
    ...new Set(
      historialGlobal.map((item) => item.nodo_id)
    ),
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold mb-8">
        Sistema de Riego IoT
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 mb-2">
            🌡 Temperatura Promedio
          </h2>

          <p className="text-4xl font-bold">
            {resumen.temperatura_promedio} °C
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 mb-2">
            💧 Humedad Promedio
          </h2>

          <p className="text-4xl font-bold">
            {resumen.humedad_promedio} %
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 mb-2">
            🔋 Batería Promedio
          </h2>

          <p className="text-4xl font-bold">
            {resumen.bateria_promedio} %
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 mb-2">
            📡 Nodos Activos
          </h2>

          <p className="text-4xl font-bold">
            {resumen.nodos}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Historial General
        </h2>

        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <LineChart data={historialGlobal}>
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
                name="Temperatura"
              />

              <Line
                type="monotone"
                dataKey="humedad"
                name="Humedad"
              />

              <Line
                type="monotone"
                dataKey="bateria"
                name="Batería"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Sensores por Nodo
        </h2>

        <select
          className="border rounded p-2"
          value={nodoSeleccionado}
          onChange={(e) =>
            setNodoSeleccionado(Number(e.target.value))
          }
        >
          {nodosDisponibles.map((nodo) => (
            <option
              key={nodo}
              value={nodo}
            >
              Nodo {nodo}
            </option>
          ))}
        </select>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Historial Nodo {nodoSeleccionado}
        </h2>

        <div style={{ width: "100%", height: 450 }}>
          <ResponsiveContainer>
            <LineChart data={historialNodo}>
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
                name="Temperatura"
              />

              <Line
                type="monotone"
                dataKey="humedad"
                name="Humedad"
              />

              <Line
                type="monotone"
                dataKey="bateria"
                name="Batería"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

export default App;
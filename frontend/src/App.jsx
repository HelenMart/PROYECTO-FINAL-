import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {

  const [metricas, setMetricas] = useState([]);

  const obtenerMetricas = async () => {

    try {

      const respuesta = await axios.get(
        "http://localhost:3000/metricas"
      );

      setMetricas(respuesta.data.data || respuesta.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

  const cargar = async () => {
    await obtenerMetricas();
  };

  cargar();

}, []);

  const data = {

    labels: metricas.map((m) => m.id),

    datasets: [
      {
        label: "CPU",
        data: metricas.map((m) => m.uso_cpu),
        borderColor: "rgb(255,99,132)"
      },
      {
        label: "RAM",
        data: metricas.map((m) => m.uso_ram),
        borderColor: "rgb(54,162,235)"
      }
    ]
  };

  return (

    <div
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "30px"
      }}
    >

      <h1>DataOps Control Center</h1>

      <h2>Métricas</h2>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px"
        }}
      >

        <Line data={data} />

      </div>

      {metricas.map((m) => (

        <div
          key={m.id}
          style={{
            border: "1px solid white",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px"
          }}
        >

          <p>CPU: {m.uso_cpu}</p>
          <p>RAM: {m.uso_ram}</p>
          <p>Estado: {m.estado}</p>

        </div>
      ))}

    </div>
  );
}

export default App;
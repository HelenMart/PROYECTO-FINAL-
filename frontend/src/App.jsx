import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import {
  Line,
  Bar,
  Doughnut
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function App() {

  const [metricas, setMetricas] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [queries, setQueries] = useState([]);

  const obtenerMetricas = async () => {
  try {
    const respuesta = await axios.get("http://localhost:3000/metricas");

    console.log("RESPUESTA COMPLETA:", respuesta.data);

    const datos = respuesta.data?.data ?? [];

    console.log("DATOS EXTRAÍDOS:", datos);

    setMetricas(datos);

  } catch (error) {
    console.log(error);
  }
};
  

  const obtenerAlertas = async () => {
  try {
    const respuesta = await axios.get("http://localhost:3000/alertas");

    console.log("ALERTAS RAW:", respuesta.data);

    const datos =
      respuesta.data?.data ??
      respuesta.data ??
      [];

    setAlertas(datos);

  } catch (error) {
    console.log(error);
  }
};

  const obtenerQueries = async () => {
  try {
    const respuesta = await axios.get("http://localhost:3000/consultas-lentas");

    console.log("QUERIES RAW:", respuesta.data);

    const datos =
      respuesta.data?.data ??
      respuesta.data ??
      [];

    setQueries(datos);

  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {

  const cargarDatos = async () => {

    await obtenerMetricas();
    await obtenerAlertas();
    await obtenerQueries();

  };

  cargarDatos();

}, []);

  const lineData = {
  labels: metricas.map((m) =>
    new Date(m.fecha_registro).toLocaleTimeString()
  ),


  datasets: [
    {
      label: "CPU",
      data: metricas.map((m) => Number(m.uso_cpu)),
      borderColor: "rgb(255,99,132)"
    },
    {
      label: "RAM",
      data: metricas.map((m) => Number(m.uso_ram)),
      borderColor: "rgb(54,162,235)"
    },
    {
      label: "Conexiones",
      data: metricas.map((m) => Number(m.conexiones_activas)),
      borderColor: "rgb(255,206,86)"
    }
  ]
};

  const disponibilidadData = {

    labels: ["Disponible", "No Disponible"],

    datasets: [
      {
        data: [99.9, 0.1],
        backgroundColor: [
          "#22c55e",
          "#ef4444"
        ]
      }
    ]
  };

  const backupsData = {

    labels: [
      "Exitosos",
      "Fallidos"
    ],

    datasets: [
      {
        label: "Backups",
        data: [95, 5],
        backgroundColor: [
          "#3b82f6",
          "#ef4444"
        ]
      }
    ]
  };


  return (

    <div
      style={{
        backgroundColor: "#0f172a",
        color: "white",
        minHeight: "100vh",
        padding: "25px",
        fontFamily: "Arial"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        DataOps Business Intelligence Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "30px"
        }}
      >

        <div style={cardStyle}>
          <h3>Disponibilidad</h3>
          <h1>99.9%</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Métricas</h3>
          <h1>{metricas.length}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Alertas Críticas</h3>
          <h1>{alertas.length}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Backups SLA</h3>
          <h1>95%</h1>
        </div>

      </div>

      <div style={chartContainer}>
        <h2>Rendimiento Temporal</h2>
        <div style={{ height: "350px" }}>
          <Line data={lineData} />
        </div>
      </div>
        

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px"
        }}
      >

        <div style={smallChart}>
          <h2>Disponibilidad Global</h2>

          <Doughnut data={disponibilidadData} />
        </div>

        <div style={smallChart}>
          <h2>Estado Backups SLA</h2>

          <Bar data={backupsData} />
        </div>

      </div>

      <div style={tableContainer}>

        <h2>Top Queries Lentas</h2>

        <table style={tableStyle}>

          <thead>

            <tr>
              <th>ID</th>
              <th>Consulta</th>
              <th>Tiempo</th>
            </tr>

          </thead>

          <tbody>

            {queries.slice(0,10).map((q) => (

              <tr key={q.id}>

                <td>{q.id}</td>

                <td>{q.consulta}</td>

                <td>{q.tiempo_ejecucion}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <div style={tableContainer}>

        <h2>Heatmap de Actividad</h2>

        <table style={tableStyle}>

          <thead>

            <tr>
              <th>Hora</th>
              <th>Actividad</th>
            </tr>

          </thead>

          <tbody>

            <tr><td>08:00</td><td>Alta</td></tr>
            <tr><td>12:00</td><td>Media</td></tr>
            <tr><td>18:00</td><td>Baja</td></tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

const cardStyle = {

  backgroundColor: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  width: "220px"
};

const chartContainer = {

  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px"
};

const smallChart = {

  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "450px"
};

const tableContainer = {

  backgroundColor: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "30px"
};

const tableStyle = {

  width: "100%",
  borderCollapse: "collapse",
  color: "white"
};

export default App;
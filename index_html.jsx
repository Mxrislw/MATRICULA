// App.jsx
import React, { useState } from "react";
import "./App.css";

const horarios = [
  { curso: "MATEMÁTICA I", profesor: "PROLEON", hora: "7:30 - 9:20", día: "LUNES" },
  { curso: "MATEMÁTICA I", profesor: "PROLEON", hora: "7:30 - 9:20", día: "MIERCOLES" },
  { curso: "MATEMÁTICA I", profesor: "PROLEON", hora: "9:30 - 11:20", día: "LUNES" },
  { curso: "MATEMÁTICA I", profesor: "PROLEON", hora: "9:30 - 11:20", día: "MIERCOLES" },
  { curso: "LENGUAJE I", profesor: "HUATUCO", hora: "3:30 - 5:20", día: "MARTES" },
  { curso: "LENGUAJE I", profesor: "HUATUCO", hora: "3:30 - 5:20", día: "JUEVES" },
  { curso: "CONTA INTER", profesor: "QUEVEDO", hora: "7:30 - 9:20", día: "MARTES" },
  { curso: "CONTA INTER", profesor: "QUEVEDO", hora: "7:30 - 9:20", día: "JUEVES" },
  { curso: "CONTA INTER", profesor: "QUEVEDO", hora: "11:30 - 1:20", día: "SÁBADO" },
  { curso: "PSICOLOGÍA", profesor: "SOLANO DANTE", hora: "4:30 - 6:20", día: "LUNES" },
  { curso: "PSICOLOGÍA", profesor: "SOLANO DANTE", hora: "5:30 - 7:20", día: "MIERCOLES" },
];

const dias = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SÁBADO"];
const horas = [
  "7:30 - 9:20",
  "9:30 - 11:20",
  "11:30 - 1:20",
  "3:30 - 5:20",
  "4:30 - 6:20",
  "5:30 - 7:20"
];

const coloresCursos = {
  "MATEMÁTICA I": "bg-pink-200",
  "LENGUAJE I": "bg-purple-200",
  "CONTA INTER": "bg-yellow-200",
  "PSICOLOGÍA": "bg-blue-200",
};

function App() {
  const [seleccionados, setSeleccionados] = useState([]);

  const toggleSeleccion = (slot) => {
    const yaExiste = seleccionados.some(
      (s) => s.día === slot.día && s.hora === slot.hora
    );

    if (yaExiste) {
      setSeleccionados(seleccionados.filter(
        (s) => !(s.día === slot.día && s.hora === slot.hora)
      ));
    } else {
      const hayConflicto = seleccionados.some(
        (s) => s.día === slot.día && s.hora === slot.hora
      );

      if (!hayConflicto) setSeleccionados([...seleccionados, slot]);
    }
  };

  const getClaseEnHorario = (dia, hora) => {
    return seleccionados.find(
      (s) => s.día === dia && s.hora === hora
    );
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Horario Dinámico - Mari</h1>

      <h2 className="text-xl font-semibold mb-3">Selecciona horarios disponibles</h2>
      <div className="grid grid-cols-6 gap-4 text-center">
        {dias.map((dia) => (
          <div key={dia}>
            <h2 className="font-semibold mb-2">{dia}</h2>
            <div className="flex flex-col gap-2">
              {horarios
                .filter((h) => h.día === dia)
                .map((h, idx) => {
                  const seleccionado = seleccionados.some(
                    (s) => s.día === h.día && s.hora === h.hora
                  );
                  return (
                    <button
                      key={idx}
                      className={`p-2 rounded-xl text-sm shadow-md transition-all border border-gray-300 hover:scale-105 ${
                        seleccionado ? "ring-2 ring-black" : ""
                      } ${coloresCursos[h.curso]}`}
                      onClick={() => toggleSeleccion(h)}
                    >
                      <div>{h.curso}</div>
                      <div>{h.profesor}</div>
                      <div>{h.hora}</div>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-3">Calendario Visual</h2>
      <div className="overflow-auto">
        <table className="min-w-full border text-center">
          <thead>
            <tr>
              <th className="border px-2 py-1">Hora</th>
              {dias.map((d) => (
                <th key={d} className="border px-2 py-1">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horas.map((hora) => (
              <tr key={hora}>
                <td className="border px-2 py-1 font-medium">{hora}</td>
                {dias.map((dia) => {
                  const clase = getClaseEnHorario(dia, hora);
                  return (
                    <td
                      key={dia + hora}
                      className={`border px-2 py-1 text-sm h-16 ${
                        clase ? coloresCursos[clase.curso] : ""
                      }`}
                    >
                      {clase ? (
                        <>
                          <div>{clase.curso}</div>
                          <div className="text-xs">{clase.profesor}</div>
                        </>
                      ) : (
                        ""
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

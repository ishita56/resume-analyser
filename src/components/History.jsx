import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {

  const [history, setHistory] =
    useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory =
    async () => {

      try {

        const response =
          await axios.get(
            "https://resume-analyser-prld.onrender.com/api/history"
          );

        setHistory(
          response.data.history
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

      <h2 className="text-3xl font-bold mb-8 text-gray-900">
        Analysis History
      </h2>

      <div className="space-y-5">

        {history.map((item) => (

          <div
            key={item._id}
            className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition"
          >

            <div className="flex justify-between items-center">

              <div>

                <h3 className="text-xl font-semibold text-gray-800">
                  {item.filename}
                </h3>

                <p className="text-gray-500 mt-1">
                  ATS Score:
                  {" "}
                  {item.score}%
                </p>

              </div>

              <div>

                <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium">
                  {item.score >= 70
                    ? "Strong"
                    : item.score >= 50
                    ? "Average"
                    : "Needs Work"}
                </span>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
import { useState } from "react";

import axios from "axios";

import {
  BarChart3,
  Brain,
  Sparkles,
} from "lucide-react";

import Navbar from "../components/Navbar";

import Hero from "../components/Hero";

import Footer from "../components/Footer";

import Card from "../components/Card";

import UploadResume from "../components/UploadResume";

import ResumeResult from "../components/ResumeResult";

import Loading from "../components/Loading";

import History from "../components/History";

const features = [
  {
    title: "ATS Score",

    description:
      "Check if your resume passes ATS systems",

    icon: BarChart3,
  },

  {
    title: "Skill Extraction",

    description:
      "Extract important skills from your resume",

    icon: Brain,
  },

  {
    title: "Missing Skills",

    description:
      "Find skills missing for the job role",

    icon: Sparkles,
  },
];

export default function Home() {

  const [resume, setResume] =
    useState(null);

  const [analysis, setAnalysis] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [jobdesc, setJobDesc] =
    useState("");

  const handleAnalyze =
    async () => {

      if (!resume || !jobdesc)
        return;

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "resume",
        resume
      );

      formData.append(
        "jobdesc",
        jobdesc
      );
console.log("RESUME:", resume);
 console.log("JOBDESC:", jobdesc);
  console.log("FORM DATA READY"); 
      try {

        const response =
          await axios.post(
            "https://resume-analyser-prld.onrender.com/api/analyze",
            formData
          ,
          {
            headers: { "Content-Type": "multipart/form-data" }
          }
        );

        setAnalysis(
          response.data.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">

      <div className="max-w-6xl mx-auto p-6 space-y-12">

        <Navbar />

        <Hero />

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10">

          {features.map(
            (
              feature,
              index
            ) => (

              <Card
                key={index}
                title={
                  feature.title
                }
                description={
                  feature.description
                }
                icon={
                  feature.icon
                }
              />
            )
          )}

        </section>

        <UploadResume
          resume={resume}
          setResume={setResume}
          jobdesc={jobdesc}
          setJobDesc={setJobDesc}
          onAnalyze={
            handleAnalyze
          }
        />

        {loading && <Loading />}

        {analysis &&
          !loading && (

            <ResumeResult
              analysis={
                analysis
              }
            />
          )}

        <History />

        <Footer />

      </div>

    </div>
  );
}
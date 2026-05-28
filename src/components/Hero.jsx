export default function Hero() {
  return (
    <section className="relative text-center min-h-[85vh] flex items-center justify-center overflow-hidden px-6">

   
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-300 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative z-10">

      
        <p className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium mb-6">
          AI Powered Resume Analysis
        </p>

      
<h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight text-gray-900">

          Analyze Your Resume <br />

          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Like a Recruiter
          </span>

        </h1>

       
        <p className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Get ATS score, skill extraction, missing skills,
          and AI-powered recommendations instantly.
        </p>

    
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

        
          <a
            href="#upload-section"
            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-indigo-700 hover:shadow-2xl transition duration-300"
          >
            Upload Resume
          </a>

         
<a
  href="#features"
  className="border border-gray-300 bg-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition duration-300"
>
  Learn More
</a>
 

        </div>

      </div>

    </section>
  );
}
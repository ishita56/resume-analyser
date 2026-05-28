export default function UploadResume({
  setResume,
  resume,
  jobdesc,
  setJobDesc,
  onAnalyze,
}) {
  return (
    <section
      id="upload-section"
      className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 border border-gray-100"
    >

      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        Upload Your Resume
      </h2>

      <p className="text-gray-600 mb-10">
        Upload your resume and paste the job description
        to get AI-powered analysis.
      </p>

      <div className="space-y-8">

       
        <label className="flex flex-col items-center justify-center w-full p-6 sm:p-8 md:p-10 border-2 border-dashed border-gray-300 rounded-3xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition duration-300">

          <input
            type="file"
            className="hidden"
            onChange={(e) => setResume(e.target.files[0])}
          />

         
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-5">

            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

          </div>

          <p className="text-lg font-semibold text-gray-700">
            Click to upload resume
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Supports PDF & DOCX files
          </p>

          {resume && (
            <p className="mt-4 text-green-600 font-medium">
              Uploaded: {resume.name}
            </p>
          )}

        </label>

      
        <textarea
          rows="6"
          placeholder="Paste job description here..."
          value={jobdesc}
          onChange={(e) => setJobDesc(e.target.value)}
          className="
            w-full
            border border-gray-200
            rounded-2xl
            p-5
            resize-none
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:border-indigo-500
            text-gray-700
            transition
          "
        />

      
        <button
          onClick={onAnalyze}
          className="
            w-full
            bg-indigo-600
            text-white
            py-4
            rounded-2xl
            font-semibold
            text-lg
            hover:bg-indigo-700
            hover:shadow-xl
            hover:scale-[1.02]
            transition duration-300
          "
        >
          Analyze Resume
        </button>

      </div>

    </section>
  );
}
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_desc", jobDesc);

    const res = await axios.post("http://localhost:5000/analyze", formData);
    setResult(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Resume Analyzer</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />

      <textarea
        placeholder="Paste Job Description"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        rows={5}
        cols={50}
      />
      <br /><br />

      <button onClick={handleSubmit}>Analyze</button>

      {result && (
        <div>
          <h3>ATS Score: {result.score}%</h3>
          <p>Matched Skills: {result.matched_skills.join(", ")}</p>
          <p>Missing Skills: {result.missing_skills.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default App;
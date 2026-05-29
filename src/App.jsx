import { useState } from "react";

function App() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState(null);

  async function askQuestion() {

    const response = await fetch(
      "https://complianceaiagent-production-b4fe.up.railway.app/ask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question
        })
      }
    );

    const data = await response.json();

    setAnswer(data.answer);

  }

  async function uploadDocument() {

    if (!file) return;

    const formData = new FormData();

    formData.append("document", file);

    const response = await fetch(
      "https://complianceaiagent-production-b4fe.up.railway.app/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    alert(data.message);

  }

  return (

    <div style={{ padding: "40px" }}>

      <h1>Compliance AI</h1>

      <input
        type="text"
        placeholder="Ask a question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "400px",
          padding: "10px"
        }}
      />

      <button
        onClick={askQuestion}
        style={{
          marginLeft: "10px",
          padding: "10px"
        }}
      >
        Ask
      </button>

      <br /><br />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadDocument}
        style={{
          marginLeft: "10px",
          padding: "10px"
        }}
      >
        Upload Document
      </button>

      <br /><br />

      <h3>Answer:</h3>

      <p>{answer}</p>

    </div>

  );

}

export default App;
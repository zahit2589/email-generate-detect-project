import { useState } from "react";

const EmailDetection = () => {
  const [emailText, setEmailText] = useState("");
  const [detectedBy, setDetectedBy] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDetect = async () => {
    if (!emailText.trim()) return;

    setLoading(true);
    setDetectedBy("");

    try {
      const response = await fetch("http://localhost:8000/detect-text-source", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: emailText }),
      });

      const data = await response.json();

      if (data.source === "AI") {
        setDetectedBy("Yapay Zeka tarafından yazılmış");
      } else {
        setDetectedBy("İnsan tarafından yazılmış");
      }
    } catch (error) {
      setDetectedBy("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        E-posta Kaynağı Tespiti
      </h1>

      <textarea
        rows={10}
        className="w-full p-4 text-white bg-gray-700 rounded mb-4"
        placeholder="E-posta metnini buraya girin..."
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
      />

      <button
        onClick={handleDetect}
        disabled={!emailText.trim() || loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Tahmin Ediliyor..." : "Tahmin Et"}
      </button>

      {detectedBy && (
        <div className="mt-6 p-4 bg-gray-600 rounded text-white text-center">
          <strong>Sonuç:</strong> {detectedBy}
        </div>
      )}
    </div>
  );
};

export default EmailDetection;

import { useState } from "react";

function GenerateNewMail() {
  const [formData, setFormData] = useState({
    name: "",
    recipient: "",
    main_points: "",
  });
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedEmail("");

    try {
      const response = await fetch("http://localhost:8000/generate-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setGeneratedEmail(result.email);
    } catch (error) {
      console.error("Error:", error);
      setGeneratedEmail("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Adınız"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-600 text-white"
          required
        />
        <input
          type="text"
          name="recipient"
          placeholder="Alıcı"
          value={formData.recipient}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-600 text-white"
          required
        />
        <textarea
          name="main_points"
          placeholder="Ana Noktalar"
          value={formData.main_points}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 rounded bg-gray-600 text-white"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          {loading ? "Oluşturuluyor..." : "E-posta Oluştur"}
        </button>
      </form>

      {generatedEmail && (
        <div className="mt-4 p-4 bg-gray-600 rounded">
          <h2 className="font-bold mb-2">Oluşturulan E-posta:</h2>
          <pre className="whitespace-pre-wrap">{generatedEmail}</pre>
        </div>
      )}
    </div>
  );
}

export default GenerateNewMail;

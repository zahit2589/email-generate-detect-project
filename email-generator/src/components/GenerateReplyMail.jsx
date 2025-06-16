import { useState } from "react";

function GenerateReplyMail() {
  const [formData, setFormData] = useState({
    name: "",
    recipient: "",
    original_email: "",
    reply_purpose: "",
  });
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedReply("");

    try {
      const response = await fetch("http://localhost:8000/generate-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setGeneratedReply(result.email);
    } catch (error) {
      console.error("Error:", error);
      setGeneratedReply("Bir hata oluştu.");
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
          placeholder="E-postayı gönderen kişi"
          value={formData.recipient}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-600 text-white"
          required
        />
        <textarea
          name="original_email"
          placeholder="Gelen e-posta içeriği"
          value={formData.original_email}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 rounded bg-gray-600 text-white"
          required
        />
        <textarea
          name="reply_purpose"
          placeholder="Yanıt amacınız (örneğin: teşekkür etmek, bilgi istemek)"
          value={formData.reply_purpose}
          onChange={handleChange}
          rows={2}
          className="w-full p-2 rounded bg-gray-600 text-white"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
        >
          {loading ? "Oluşturuluyor..." : "Yanıt Oluştur"}
        </button>
      </form>

      {generatedReply && (
        <div className="mt-4 p-4 bg-gray-600 rounded">
          <h2 className="font-bold mb-2">Oluşturulan Yanıt:</h2>
          <pre className="whitespace-pre-wrap">{generatedReply}</pre>
        </div>
      )}
    </div>
  );
}

export default GenerateReplyMail;

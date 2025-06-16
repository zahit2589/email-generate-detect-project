from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoTokenizer, AutoModelForCausalLM, AutoModelForSequenceClassification
import torch

app = FastAPI()

# CORS Ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Geliştirme aşamasında * kullanılır, prod'da değiştirilmeli
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Email Üretme Modeli ve Tokenizer
EMAIL_MODEL_NAME = "sagorsarker/emailgenerator"
email_tokenizer = AutoTokenizer.from_pretrained(EMAIL_MODEL_NAME)
email_model = AutoModelForCausalLM.from_pretrained(EMAIL_MODEL_NAME)

# AI-Human Detection Modeli ve Tokenizer
DETECTOR_MODEL_NAME = "Juner/AI-generated-text-detection"
detector_tokenizer = AutoTokenizer.from_pretrained(DETECTOR_MODEL_NAME)
detector_model = AutoModelForSequenceClassification.from_pretrained(DETECTOR_MODEL_NAME)


# Metin Üretme Fonksiyonu
def generate_email_text(prompt: str) -> str:
    inputs = email_tokenizer(prompt, return_tensors="pt", truncation=True, padding=True)

    with torch.no_grad():
        outputs = email_model.generate(
            inputs["input_ids"],
            max_length=256,
            num_beams=5,
            early_stopping=True
        )

    return email_tokenizer.decode(outputs[0], skip_special_tokens=True)


# E-posta Oluşturma İstek Modeli
class EmailRequest(BaseModel):
    name: str
    recipient: str
    main_points: str


# Yanıt E-postaşı Oluşturma İstek Modeli
class ReplyEmailRequest(BaseModel):
    name: str
    recipient: str
    original_email: str
    reply_purpose: str


# Metin Kaynağı Tespiti İstek Modeli
class DetectionRequest(BaseModel):
    text: str


# E-posta Üretme Endpoint'i
@app.post("/generate-email")
async def generate_email(data: EmailRequest):
    prompt = f"Write an email from {data.name} to {data.recipient} about {data.main_points}."
    email_content = generate_email_text(prompt)
    return {"email": email_content}


# Yanıt E-postaşı Üretme Endpoint'i
@app.post("/generate-reply")
async def generate_reply(data: ReplyEmailRequest):
    prompt = (
        f"Write a reply from {data.name} to {data.recipient}. "
        f"Original email: '{data.original_email}'. "
        f"Purpose of the reply: {data.reply_purpose}."
    )
    reply_content = generate_email_text(prompt)
    return {"email": reply_content}


# Metin Kaynağı Tespiti Endpoint'i
@app.post("/detect-text-source")
async def detect_text_source(data: DetectionRequest):
    inputs = detector_tokenizer(data.text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = detector_model(**inputs)
        logits = outputs.logits
        predicted_class_id = torch.argmax(logits, dim=1).item()

    source = "AI" if predicted_class_id == 1 else "Human"
    return {"source": source}

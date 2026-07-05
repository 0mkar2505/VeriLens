# VeriLens

AI-powered content verification platform for detecting AI-generated images and text.

VeriLens is a full-stack web application that helps users verify the authenticity of digital content by classifying images and text as either **AI-Generated** or **Human-Created**. The platform combines deep learning, stylometric analysis, secure authentication, and persistent verification history within a modern web application.

> **Project Status:** Active Development (`v0.1.0`)

---

## Overview

### Image Verification
- Upload and analyze images using a trained EfficientNet-B0 model
- Binary classification: AI-Generated vs Human-Created
- Confidence scores and per-class probabilities
- Image preprocessing using OpenCV and Pillow

### Text Verification
- Heuristic-based stylometric analysis
- Lexical diversity detection
- Sentence variance analysis
- Repetition and punctuation density metrics
- Detailed indicator breakdowns

### Dashboard
- Verification statistics
- Recent activity feed
- Quick action cards
- User-specific insights

### Analysis History
- Persistent verification logs
- View previous analyses
- Delete historical records
- User-scoped data management

### Authentication
- User registration and login
- JWT-based authentication
- Protected API routes
- Secure password hashing with bcrypt

### Frontend Experience
- Responsive layouts
- Dark and light theme support
- Page transitions
- Protected and public routing

---

## Architecture

```text
React + Vite Frontend
          │
          ▼
FastAPI Backend API
          │
    ┌─────┴─────┐
    ▼           ▼
MongoDB     PyTorch Model
              (EfficientNet-B0)
```

---

## Technology Stack

### Backend
- FastAPI
- Motor (Async MongoDB Driver)
- PyTorch and Torchvision
- OpenCV
- Pillow (PIL)
- python-jose
- passlib (bcrypt)
- Pydantic Settings

### Frontend
- React 19
- Vite 6
- TypeScript
- Tailwind CSS 4
- Radix UI
- React Router v7
- Axios
- Lucide React

### Machine Learning
- EfficientNet-B0
- Binary Classification (AI / Real)
- PyTorch Training Pipeline
- Saved Model Weights and Class Metadata

---

## Database Schema

### Users Collection

```json
{
  "email": "user@example.com",
  "hashed_password": "...",
  "role": "user",
  "subscription": "free"
}
```

### Analysis Logs Collection

```json
{
  "user_id": "...",
  "type": "image | text",
  "prediction": "AI-Generated",
  "confidence": 0.97,
  "metadata": {},
  "timestamp": "2025-01-01T00:00:00Z"
}
```

---

## Project Structure

```text
VeriLens/
│
├── Backend/
│   ├── auth/
│   ├── dashboard/
│   ├── history/
│   ├── model/
│   ├── utils/
│   └── app.py
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│   │
│   └── public/
│
└── README.md
```

---

## Local Development

### Clone the Repository

```bash
git clone https://github.com/<username>/VeriLens.git
cd VeriLens
```

### Backend Setup

```bash
cd Backend

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt

uvicorn app:app --reload
```

The backend runs on:

```text
http://localhost:8000
```

### Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

## Machine Learning Pipeline

VeriLens uses an EfficientNet-B0 architecture trained on a binary dataset:

```text
Dataset/
├── AI/
└── Real/
```

The training pipeline:

- Loads and preprocesses images
- Fine-tunes EfficientNet-B0
- Saves model weights (`.pth`)
- Exports class names for inference

---

## Roadmap

### Current (v0.1.0)
- [x] Image verification
- [x] Text verification
- [x] User authentication
- [x] Dashboard
- [x] Analysis history
- [x] Responsive frontend

### Planned
- [ ] Explainable AI insights
- [ ] Advanced text detection models
- [ ] User profiles and settings
- [ ] Subscription tiers
- [ ] Batch analysis support
- [ ] API rate limiting
- [ ] Cloud deployment

---

## License

License information will be added in a future release.
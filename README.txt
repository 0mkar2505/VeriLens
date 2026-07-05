# VeriLens

<p align="center">
  <img src="assets/logo.png" width="140" alt="VeriLens Logo">
</p>

<p align="center">
  <strong>Detect. Verify. Trust.</strong>
</p>

<p align="center">
AI-powered media authenticity platform for detecting AI-generated and manipulated content.
</p>

---

VeriLens is a full-stack machine learning application that combines computer vision, stylometric analysis, and modern web technologies to help users determine whether digital content was created by humans or artificial intelligence.

The long-term vision is to evolve from simple AI detection into a forensic analysis platform capable of identifying deepfakes, AI edits, and manipulated media with explainable predictions and visual evidence. :contentReference[oaicite:1]{index=1}

---

## Current Capabilities

- Image authenticity analysis using EfficientNet-B0
- Text analysis using stylometric heuristics
- Confidence scoring and prediction breakdowns
- JWT-based authentication system
- User dashboards and verification history
- Dark/light themed responsive frontend
- Persistent analysis logs using MongoDB

---

## Technology

| Layer | Stack |
|--------|--------|
| Frontend | React 19, Vite 6, TypeScript, Tailwind CSS 4 |
| Backend | FastAPI, Motor, MongoDB |
| Machine Learning | PyTorch, Torchvision, EfficientNet-B0 |
| Authentication | JWT, bcrypt, python-jose |
| UI | Radix UI, Lucide React |

---

## System Architecture

```text
Frontend (React + Vite)
            │
            ▼
Backend (FastAPI)
            │
     ┌──────┴──────┐
     ▼             ▼
 MongoDB      ML Inference
                │
                ▼
         EfficientNet-B0
```

---

## Roadmap

### Version 1

- [x] Image verification
- [x] Text verification
- [x] Authentication
- [x] Dashboard and history
- [x] Responsive UI

### Future Work

- [ ] Grad-CAM explainability
- [ ] Deepfake localization
- [ ] AI-edited image detection
- [ ] Multi-stage forensic pipelines
- [ ] Subscription and user management
- [ ] Cloud deployment

---

## Running Locally

```bash
# Backend
cd Backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload

# Frontend
cd Frontend
npm install
npm run dev
```

---

## Status

VeriLens is currently in active development (`v0.1.0`) with ongoing work focused on explainability, model improvements, and production readiness.

---
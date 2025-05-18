# Life Expectancy Calculator

A web application that estimates personalized life expectancy based on personal information, lifestyle habits, medical history, and preventive care data, powered by an XGBoost machine learning model.

## 🚀 Features

- **Interactive Multi-Step Form**: Four sections (Personal Info, Lifestyle, Medical History, Preventive Care) with animated Lottie characters and smooth transitions.
- **Machine Learning**: Uses a pre-trained XGBoost model to compute life expectancy.
- **Synthetic Data Generation**: Includes a Python script to build a realistic, privacy-preserving synthetic dataset derived from public health surveys, ensuring robust model training.
- **Realistic Synthetic Data**: Model trained on a synthetically generated, yet realistic dataset derived from public health surveys.
- **Dynamic Tips**: Contextual health tips based on your inputs.
- **Review & Edit**: Step-by-step review carousel with the ability to jump back and modify answers.

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lottie animations
- **Backend**: Flask API serving the XGBoost model
- **Machine Learning**: XGBoost
- **Synthetic Data Script**: Python (`Data/GenerateData.ipynb`) for creating privacy‑preserving synthetic samples
- **Package Management**: npm
- **Deployment**:

  - Frontend on **Vercel**
  - Backend on **AWS EC2**

## 🤝 Contributing

Contributions are welcome!

## ✉️ Contact

- Maher Salman — [linkedin.com/in/maher-salman](https://www.linkedin.com/in/maher-salman/)
- Adan Butto — [linkedin.com/in/adan-butto-659288232](https://www.linkedin.com/in/adan-butto-659288232/)

# Life Expectancy Calculator

A comprehensive web application that estimates personalized life expectancy based on personal information, lifestyle habits, medical history, and preventive care data, powered by an XGBoost machine learning model.

## 🚀 Features

- **Interactive Multi-Step Form**: Four sections (Personal Info, Lifestyle, Medical History, Preventive Care) with animated Lottie characters and smooth transitions
- **Machine Learning Predictions**: Uses a pre-trained XGBoost model to compute life expectancy estimates
- **Realistic Synthetic Data**: Model trained on synthetically generated, privacy-preserving dataset derived from WHO life expectancy data and heart disease surveys
- **Dynamic Health Tips**: Contextual health recommendations based on user inputs
- **Review & Edit Interface**: Step-by-step review carousel with the ability to jump back and modify answers
- **Full-Stack Architecture**: Complete solution from data generation to model serving to web interface

## 🏗️ Repository Structure

```
├── Data/                    # Dataset and data generation scripts
├── life-expectancy-app/     # Next.js frontend application
├── ML-Server/              # Flask API server and XGBoost model
├── .gitattributes         # Git LFS configuration
├── Poster.pdf             # Project presentation poster
├── README.md              # Main documentation
└── Report.docx            # Detailed project report
```

## 🛠️ Tech Stack

**Frontend**

- Next.js with TypeScript
- React with Framer Motion animations
- Tailwind CSS for styling
- Lottie animations for interactive elements

**Backend & ML**

- Flask API server
- XGBoost machine learning model
- Python data processing pipeline

**Data Pipeline**

- Synthetic life expectancy labeling using evidence-based penalty adjustments
- Individual health records from CDC's BRFSS survey (400,000+ adults)
- WHO life expectancy baselines by country, sex, and age groups
- 26 health indicators across four domains (personal, lifestyle, medical, preventive care)

**Deployment**

- Frontend: Vercel
- Backend: AWS EC2

## 📊 Data Component

The `Data/` folder contains the foundation of our machine learning pipeline:

- **Synthetic Dataset Generation**: Python script (`GenerateData.ipynb`) that creates realistic, privacy-preserving synthetic life expectancy labels
- **WHO Life Expectancy Data**: `xmart.csv` containing country-level life expectancy statistics by sex and age groups (used as baseline parameters)
- **Heart Disease Dataset**: `heart_2022_with_nans.csv` from CDC's BRFSS survey with 400,000+ individual health records
- **Evidence-Based Penalty System**: Applies research-backed adjustments to create realistic individual life expectancy estimates

### Data Generation Process

1. **Baseline Establishment**: Extract official life-table statistics from WHO data (`xmart.csv`) by country, sex, and age categories
2. **Individual Data Processing**: Clean and preprocess BRFSS records (`heart_2022_with_nans.csv`), handling missing values and categorical encoding
3. **Synthetic Life Expectancy Labeling**: For each individual record:
   - Start with appropriate life-table baseline (birth or age 60) plus Gaussian noise
   - Apply evidence-based penalties/benefits for health factors (smoking: -6.8 to -8.8 years, physical activity: +0.4 to +6.9 years, etc.)
   - Add controlled random noise and clamp within realistic bounds
4. **Feature Standardization**: Normalize all numerical features using z-score normalization
5. **Train/Test Split**: 80/20 stratified split preserving demographic distributions

## 🤖 ML Server Component

The `ML-Server/` folder contains the machine learning backend:

- **XGBoost Model**: Pre-trained gradient boosting model for life expectancy prediction
- **Flask API**: RESTful server that serves predictions
- **Model Training Pipeline**: Scripts for training and validating the XGBoost model
- **Prediction Endpoint**: API endpoint that processes user inputs and returns life expectancy estimates

### Model Features

The XGBoost model analyzes 26 evidence-based health indicators across four key domains:

**Personal Information (2 features):**

- Body Mass Index (BMI) and biological sex

**Lifestyle Behaviors (5 features):**

- Smoking/vaping status, physical activity, sleep duration, alcohol consumption

**Medical History (15 features):**

- Chronic conditions (heart attack, stroke, diabetes, COPD, depression, etc.)
- Functional limitations (mobility, vision, hearing, cognitive difficulties)

**Preventive Care (4 features):**

- Vaccination status (influenza, pneumococcal, tetanus)
- High-risk health condition status

Each indicator's impact is calibrated using evidence-based research, with smoking reducing life expectancy by 6.8-8.8 years, physical activity adding 0.4-6.9 years, and other factors contributing proportional adjustments.

## 🌐 Frontend Application

The `life-expectancy-app/` folder contains the Next.js web application:

### Key Features

- **Multi-step Form**: Intuitive four-section questionnaire
- **Interactive Animations**: Lottie animations for enhanced user experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Validation**: Form validation with helpful error messages
- **Results Dashboard**: Detailed life expectancy results with health recommendations

### Form Sections

1. **Personal Information**: Basic demographics and location
2. **Lifestyle Habits**: Exercise, diet, smoking, and alcohol consumption
3. **Medical History**: Chronic conditions and family health history
4. **Preventive Care**: Regular checkups and health screenings

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.8+
- pip package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone [your-repo-url]
   cd life-expectancy
   ```

2. **Set up the Frontend**

   ```bash
   cd life-expectancy-app
   npm install
   npm run dev
   ```

   **Note:**

   - If your API is hosted on AWS EC2 (or any other remote server), update the destination URL in your `vercel.json` file to point at that host.
   - If you're running the server locally, set `SERVER_URL` to `http://localhost:5000` (or whatever port you've configured). The `SERVER_URL` variable can be found in `src/utils/fetchResult.ts`.

3. **Set up the ML Server**

   ```bash
   cd ML-Server
   pip install -r requirements.txt
   python app.py
   ```

4. **Access the Application**
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:5000`

## 📈 Model Performance

The XGBoost model achieves strong predictive performance on synthetic test data:

- **RMSE**: 5.73 years (average prediction deviation)
- **MAE**: 4.4 years (median absolute error)
- **R²**: 0.65 (65% of life expectancy variance explained)
- **MAPE**: 6.6% (average relative error)
- **Explained Variance**: 0.65

The model demonstrates unbiased predictions with normally distributed residuals and consistent performance across the prediction range, validating the effectiveness of our evidence-based synthetic data generation approach.

## 🔒 Privacy & Ethics

- **Synthetic Data**: No real personal health data is used in training
- **Privacy-Preserving**: All predictions are processed locally without storing personal information
- **Transparency**: Clear explanations of how predictions are generated
- **Educational Purpose**: Results are estimates for informational purposes only

## 📄 Documentation

- **Poster.pdf**: Visual project overview and key findings
- **Report.docx**: Detailed technical report with methodology and results

## ✉️ Contact

- **Maher Salman** — [linkedin.com/in/maher-salman](https://www.linkedin.com/in/maher-salman/)
- **Adan Butto** — [linkedin.com/in/adan-butto-659288232](https://www.linkedin.com/in/adan-butto-659288232/)

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

_This application provides life expectancy estimates for educational and informational purposes only. Results should not be considered as medical advice or definitive health predictions._

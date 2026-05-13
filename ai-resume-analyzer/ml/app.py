from flask import Flask, request, jsonify
import spacy

app = Flask(__name__)
nlp = spacy.load("en_core_web_sm")

def extract_skills(text):
    skills = ["python", "java", "react", "node", "machine learning", "docker", "aws"]
    text = text.lower()
    return [skill for skill in skills if skill in text]

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    resume = data["resume_text"]
    job_desc = data["job_desc"]

    resume_skills = set(extract_skills(resume))
    job_skills = set(extract_skills(job_desc))

    matched = resume_skills.intersection(job_skills)
    score = int((len(matched) / len(job_skills)) * 100) if job_skills else 0
    missing = list(job_skills - resume_skills)

    return jsonify({
        "score": score,
        "matched_skills": list(matched),
        "missing_skills": missing
    })

if __name__ == "__main__":
    app.run(port=8000)
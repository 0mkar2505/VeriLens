import math
import re
from collections import Counter


WORD_PATTERN = re.compile(r"\b[\w']+\b")
SENTENCE_PATTERN = re.compile(r"[^.!?]+[.!?]?")


def clamp(value, minimum=0.0, maximum=1.0):
    return max(minimum, min(maximum, value))


def split_sentences(text):
    sentences = [
        sentence.strip()
        for sentence in SENTENCE_PATTERN.findall(text)
        if sentence.strip()
    ]

    return sentences


def calculate_text_features(text):
    words = [word.lower() for word in WORD_PATTERN.findall(text)]
    sentences = split_sentences(text)
    word_count = len(words)
    sentence_count = len(sentences)

    sentence_lengths = [
        len(WORD_PATTERN.findall(sentence))
        for sentence in sentences
    ]

    unique_words = len(set(words))
    lexical_diversity = unique_words / word_count if word_count else 0

    average_sentence_length = (
        sum(sentence_lengths) / sentence_count
        if sentence_count
        else 0
    )

    if sentence_count > 1:
        variance = sum(
            (length - average_sentence_length) ** 2
            for length in sentence_lengths
        ) / sentence_count
        sentence_length_variance = math.sqrt(variance)
    else:
        sentence_length_variance = 0

    word_counts = Counter(words)
    repeated_words = sum(
        count - 1
        for count in word_counts.values()
        if count > 1
    )
    repetition_ratio = repeated_words / word_count if word_count else 0

    punctuation_count = sum(1 for char in text if char in ",;:!?")
    punctuation_density = punctuation_count / word_count if word_count else 0

    return {
        "word_count": word_count,
        "sentence_count": sentence_count,
        "lexical_diversity": round(lexical_diversity, 3),
        "average_sentence_length": round(average_sentence_length, 2),
        "sentence_length_variance": round(sentence_length_variance, 2),
        "repetition_ratio": round(repetition_ratio, 3),
        "punctuation_density": round(punctuation_density, 3)
    }


def score_text(features):
    ai_score = 0.5
    indicators = []

    if features["word_count"] < 80:
        indicators.append(
            "Text is short, so the estimate has limited reliability."
        )

    if features["lexical_diversity"] < 0.42:
        ai_score += 0.12
        indicators.append("Lower lexical diversity suggests repeated wording.")
    elif features["lexical_diversity"] > 0.65:
        ai_score -= 0.08
        indicators.append("Higher lexical diversity suggests more varied wording.")

    if features["sentence_length_variance"] < 5 and features["sentence_count"] >= 4:
        ai_score += 0.14
        indicators.append("Sentence lengths are unusually consistent.")
    elif features["sentence_length_variance"] > 12:
        ai_score -= 0.08
        indicators.append("Sentence lengths vary naturally.")

    if features["repetition_ratio"] > 0.36:
        ai_score += 0.12
        indicators.append("Repeated words and phrasing are relatively frequent.")
    elif features["repetition_ratio"] < 0.18 and features["word_count"] >= 80:
        ai_score -= 0.06
        indicators.append("Low repetition suggests more organic variation.")

    if features["punctuation_density"] < 0.04 and features["word_count"] >= 80:
        ai_score += 0.08
        indicators.append("Punctuation use is sparse for the text length.")
    elif features["punctuation_density"] > 0.12:
        ai_score -= 0.04
        indicators.append("Punctuation use is varied.")

    ai_score = clamp(ai_score)
    human_score = 1 - ai_score

    if not indicators:
        indicators.append("No strong stylometric indicators were detected.")

    return {
        "prediction": "AI Generated" if ai_score >= 0.5 else "Human Created",
        "ai_probability": round(ai_score * 100, 2),
        "human_probability": round(human_score * 100, 2),
        "features": features,
        "indicators": indicators,
        "note": "Heuristic estimate only. This is not a trained text model."
    }


def predict_text(text):
    cleaned_text = text.strip()

    if not cleaned_text:
        raise ValueError("Text cannot be empty.")

    features = calculate_text_features(cleaned_text)
    return score_text(features)

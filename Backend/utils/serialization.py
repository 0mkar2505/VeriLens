from datetime import date, datetime

from bson import ObjectId


def _json_safe(value):
    if isinstance(value, ObjectId):
        return str(value)

    if isinstance(value, (datetime, date)):
        return value.isoformat()

    if isinstance(value, list):
        return [_json_safe(item) for item in value]

    if isinstance(value, dict):
        return {
            key: _json_safe(item)
            for key, item in value.items()
        }

    return value


def serialize_analysis(doc):
    analysis = _json_safe(dict(doc))
    analysis["id"] = analysis.pop("_id")
    return analysis

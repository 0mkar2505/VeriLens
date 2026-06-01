from fastapi import APIRouter, Depends

from Backend.auth.dependencies import get_current_user
from Backend.db.mongodb import get_database
from Backend.utils.serialization import serialize_analysis


router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"]
)


def _recent_response(analysis):
    return {
        "analysis_type": analysis.get("analysis_type"),
        "prediction": analysis.get("prediction"),
        "created_at": analysis.get("created_at")
    }


@router.get("/stats")
async def get_dashboard_stats(current_user=Depends(get_current_user)):
    db = get_database()
    user_filter = {
        "user_id": str(current_user["_id"])
    }

    total_analyses = await db.analysis_logs.count_documents(user_filter)
    image_analyses = await db.analysis_logs.count_documents({
        **user_filter,
        "analysis_type": "image"
    })
    text_analyses = await db.analysis_logs.count_documents({
        **user_filter,
        "analysis_type": "text"
    })

    return {
        "total_analyses": total_analyses,
        "image_analyses": image_analyses,
        "text_analyses": text_analyses
    }


@router.get("/recent")
async def get_dashboard_recent(current_user=Depends(get_current_user)):
    db = get_database()
    cursor = db.analysis_logs.find({
        "user_id": str(current_user["_id"])
    }).sort("created_at", -1).limit(10)

    analyses = await cursor.to_list(length=10)
    return [
        _recent_response(serialize_analysis(analysis))
        for analysis in analyses
    ]

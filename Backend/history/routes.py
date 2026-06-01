from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status

from Backend.auth.dependencies import get_current_user
from Backend.db.mongodb import get_database
from Backend.utils.serialization import serialize_analysis


router = APIRouter(
    prefix="/history",
    tags=["history"]
)


def _history_response(analysis):
    return {
        "id": analysis["id"],
        "analysis_type": analysis.get("analysis_type"),
        "prediction": analysis.get("prediction"),
        "created_at": analysis.get("created_at")
    }


@router.get("")
async def get_history(current_user=Depends(get_current_user)):
    db = get_database()
    cursor = db.analysis_logs.find({
        "user_id": str(current_user["_id"])
    }).sort("created_at", -1)

    analyses = await cursor.to_list(length=None)
    return [
        _history_response(serialize_analysis(analysis))
        for analysis in analyses
    ]


@router.delete("/{analysis_id}")
async def delete_history_item(
    analysis_id: str,
    current_user=Depends(get_current_user)
):
    if not ObjectId.is_valid(analysis_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid analysis id."
        )

    db = get_database()
    analysis = await db.analysis_logs.find_one({
        "_id": ObjectId(analysis_id)
    })

    if analysis is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found."
        )

    if analysis["user_id"] != str(current_user["_id"]):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found."
        )

    await db.analysis_logs.delete_one({
        "_id": ObjectId(analysis_id)
    })

    return {
        "message": "Analysis deleted."
    }

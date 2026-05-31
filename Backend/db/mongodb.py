from motor.motor_asyncio import AsyncIOMotorClient

from Backend.core.config import settings


client = None
database = None


def get_mongo_client():
    global client

    if client is None:
        if not settings.mongodb_uri:
            raise RuntimeError(
                "MONGODB_URI is missing. Add it to Backend/.env."
            )

        client = AsyncIOMotorClient(settings.mongodb_uri)

    return client


def get_database():
    global database

    if database is None:
        database = get_mongo_client()[settings.mongodb_db]

    return database


async def create_user_indexes():
    db = get_database()
    await db.users.create_index("email", unique=True)


def close_mongo_client():
    global client, database

    if client is not None:
        client.close()

    client = None
    database = None

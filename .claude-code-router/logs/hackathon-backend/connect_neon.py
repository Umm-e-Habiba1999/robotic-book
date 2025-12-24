import asyncpg
import os
import asyncio

DB_URL = os.getenv("NEON_DB_URL")  # environment variable se url le rahe hain

async def connect_db():
    try:
        conn = await asyncpg.connect(DB_URL)
        print("Connected to Neon Postgres!")
        await conn.close()
    except Exception as e:
        print("Error connecting to Neon:", e)

asyncio.run(connect_db())

from fastapi import FastAPI

from app.api.routes.users import router as users_router

app = FastAPI(title="REST Edu Backend")
app.include_router(users_router, prefix="/api")


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}

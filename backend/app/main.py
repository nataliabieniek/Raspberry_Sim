from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.users import router as users_router

app = FastAPI(title="REST Edu Backend")

# Umozliwia wywolania API z frontendu uruchamianego na porcie 5173.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router, prefix="/api")


@app.get("/")
def root() -> dict[str, str]:
    return {
        "message": "Backend dziala. Uzyj /api/users albo /health.",
    }


@app.get("/api")
def api_root() -> dict[str, str]:
    return {
        "message": "API dziala.",
        "users": "/api/users",
    }


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}

from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["users"])


@router.get("")
def list_users() -> list[dict[str, str]]:
    return [
        {"id": "1", "email": "student@example.com", "role": "student"},
        {"id": "2", "email": "teacher@example.com", "role": "teacher"},
    ]

from app.models.user import User


class UserRepository:
    def get_all(self) -> list[dict[str, str]]:
        return [
            {"id": "1", "email": "student@example.com", "role": "student"},
            {"id": "2", "email": "teacher@example.com", "role": "teacher"},
        ]

from app.repositories.user_repository import UserRepository


class UserService:
    def __init__(self, repository: UserRepository | None = None) -> None:
        self.repository = repository or UserRepository()

    def list_users(self) -> list[dict[str, str]]:
        return self.repository.get_all()

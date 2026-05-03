from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_list_users_returns_examples() -> None:
    response = client.get('/api/users')

    assert response.status_code == 200
    assert len(response.json()) == 2

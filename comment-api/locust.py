from locust import HttpUser, task, between
import random
class WebUser(HttpUser):
    wait_time = between(1, 5)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        self.user = f'test_user_{random.randint(1, 1000)}'
        self.password = 'test'
        self.email = f'{self.user}@test.com'

    def on_start(self):
        self.client.post('/users/signup',
                         json={
                             'username': self.user,
                             'password': self.password,
                             'email': self.email
                         })
        
        login_response = self.client.post('/users/login', json={'username': self.user, 'password': self.password})

        if login_response.status_code != 200:
            print(f'Failed to login: {login_response.text}')

    @task
    def login(self):
        self.client.post('/users/login', json={'username': self.user, 'password': self.password, 'email': self.email})

    @task
    def test_login(self):
        self.client.get('/users/test_login')


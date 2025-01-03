포스트가 있고, 사용자들은 포스트에 댓글을 달 수 있다.

추가사항: 댓글에 대댓글을 달 수 있다. (우선은 메인기능부터 구현할 것)

### Database Schema

Post ↔ Comment (1:N)

Post: [ author, content, created_at, updated_at]

Comment: [post, content, author,  created_at, updated_at]

### Database Model(구현체)

```python
class Post(models.Model):
	author = models.ForeignKey('users.User', on_delete = models.CASCADE)
	title = models.TextField()
	content = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now_add=True)
	
class Comment(models.Model):
	post = models.ForeignKey(Post, on_delete = models.CASCADE)
	author = models.ForeignKey('users.User', on_delete = models.CASCADE)
	content = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now_add=True)
```

### API Endpoint

| url | method | 기능 |
| --- | --- | --- |
| /posts | `GET` | 포스트 조회 |
| /posts | `POST` | 포스트 생성 |
| /posts/<int:post_id>/ | `GET`  | 특정 포스트 조회 |
| posts/<int:post_id>/comments | `GET` | 포스트의 댓글 조회 |
| posts/<int:post_id>/comments | `POST` | 포스트에 댓글 생성 |


TODO

- [ ]  Author 부분은 보통 어떻게 처리하는지?
    - [ ]  self.request.user에 대한 예외 처리의 best practice 필요.
- [x]  Post에 달린 `comment_url` 해당 post에 특정된 주소가 아니라, 일반적인 comment 생성 url을 리턴함.  CommentListCreateAPIView가 Create시에 특정 Post에 속한 Comment를 작성하도록 만들 필요가 있음.
=> view에서 kwargs로 전달받은 url의 일부를 serializer 저장.

- [ ] 유저 관리. 동작 방식
	- DB 저장 방식
	- 토큰 발급 방식
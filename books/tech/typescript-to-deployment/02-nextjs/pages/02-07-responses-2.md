### The status codes worth remembering

| Code | Use it when |
|---|---|
| 200 | it worked and you have a body |
| 201 | you created something |
| 204 | it worked and there is nothing to send |
| 400 | the request body failed validation |
| 401 | no valid credentials |
| 403 | valid credentials, wrong permissions |
| 404 | the resource does not exist |
| 409 | it conflicts with current state |
| 422 | shape is fine, values are not |
| 500 | your bug |

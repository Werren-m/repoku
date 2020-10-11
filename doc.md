# **USER API**


## REGISTER
---
### Method POST (https://quiet-hollows-95792.herokuapp.com/register) 
### Request Header
> none
### Request Body
>email : <asset_email> <br>password: <asset_password> <br>name: <asset_name><br> image: <asset_image>
### Response (200)
>"token": "<your_token>"
### Response (400 - Bad Request)
>"msg": "<error_msg>"
---
<br>

## Login
---
### Method POST  (https://quiet-hollows-95792.herokuapp.com/login)
### Request Header
> none
### Request Body
>email : <asset_email> <br>password: <asset_password>
### Response (200)
>"token": "<your_token>"
### Response (400 - Bad Request)
>"msg": "<error_msg>"
---
<br>

## Get User
---
### Method GET (https://quiet-hollows-95792.herokuapp.com/user)
### Request Header
> "token": "<your_token>"
### Request Body
> none
### Response (200)
>**User Table** <br>"email": "<asset_email>"<br> "password": "<asset_password>" <br> "name": "<asset_name>" <br> "image": "<asset_image>"<br>**Review Table** <br> "userId": "<asset_userId>"<br> "MovieId": "<asset_movieId>"<br> "content": "<asset_content>" <br>
"rating": "asset_rating"
### Response (400 - Bad Request)
>"msg": "<error_msg>"
---
<br>

## Edit(GET) User
---
### Method GET (https://quiet-hollows-95792.herokuapp.com/user/edit)
### Request Header
> "token": "<your_token>"
### Request Body
> none
### Response (200)
>"email": "<asset_email>"<br> "password": "<asset_password>" <br> "name": "<asset_name>" <br> "image": "<asset_image>"
### Response (400 - Bad Request)
>"msg": "<error_msg>"
---
<br>

## Delete User
---
### Method DELETE (https://quiet-hollows-95792.herokuapp.com/user/)
### Request Header
> "token": "<your_token>"
### Request Body
> none
### Response (200)
>"msg": "user deleted"
### Response (400 - Bad Request)
>"msg": "<error_msg>"
---
<br>

## Update User
---
### Method PUT (https://quiet-hollows-95792.herokuapp.com/user/edit)
### Request Header
> "token": "<your_token>"
### Request Body
> "email": "<asset_email>"<br> "password": "<asset_password>" <br> "name": "<asset_name>" <br> "image": "<asset_image>"
### Response (200)
>"email": "<asset_email>"<br> "password": "<asset_password>" <br> "name": "<asset_name>" <br> "image": "<asset_image>"
### Response (400 - Bad Request)
>"msg": "<error_msg>"
---
<br>

---
# **MOVIE API**
---

## Get Movies
---
### Method GET (https://quiet-hollows-95792.herokuapp.com/)
### Request Header
> none
### Request Body
> none
### Response (200)
>"title": "<asset_title>"<br> "poster": "<asset_poster>" <br> "backdrop": "<asset_backdrop>" <br> "synopsis": "<asset_synopsis>" <br> "trailer": "<URL_asset_trailer>" <br> "rating": "<asset_rating>" <br> "category": "<asset_category>"
### Response (400 - Bad Request)
>"msg": "<error_msg>"
---
<br>

## Search by Title
---
### Method GET (https://quiet-hollows-95792.herokuapp.com/titlesearch)
### Request Header
> none
### Request query
> "title": "<asset_title>"
### Request Body
> none
### Response (200)
>[{"title": "<asset_title>"<br> "poster": "<asset_poster>" <br> "backdrop": "<asset_backdrop>" <br> "synopsis": "<asset_synopsis>" <br> "trailer": "<URL_asset_trailer>" <br> "rating": "<asset_rating>" <br> "category": "<asset_category>"}]
### Response (404 - Not Found)
>"msg": "<error_msg>"
---
<br>

## Search by Category
---
### Method GET (https://quiet-hollows-95792.herokuapp.com/categorysearch)
### Request Header
> none
### Request query
> "category": "<asset_category>"
### Request Body
> none
### Response (200)
>[{"title": "<asset_title>"<br> "poster": "<asset_poster>" <br> "backdrop": "<asset_backdrop>" <br> "synopsis": "<asset_synopsis>" <br> "trailer": "<URL_asset_trailer>" <br> "rating": "<asset_rating>" <br> "category": "<asset_category>"}]
### Response (404 - Not Found)
>"msg": "<error_msg>"
---
<br>

## Get Movies Paginated
---
### Method GET (https://quiet-hollows-95792.herokuapp.com/movie)
### Request Header
> none
### Request Query
> "page": "<page_number>" <br> "limit": "<limit_per_page>"
### Request Body
> none
### Response (200)
>[{"title": "<asset_title>"<br> "poster": "<asset_poster>" <br> "backdrop": "<asset_backdrop>" <br> "synopsis": "<asset_synopsis>" <br> "trailer": "<URL_asset_trailer>" <br> "rating": "<asset_rating>" <br> "category": "<asset_category>"}]
### Response (400 - Bad Request)
>"msg": "<error_msg>"
---
<br>

## Add Movie
---
### Method POST (https://quiet-hollows-95792.herokuapp.com/movie/addMovie)
### Request Header
> "token": "<your_token>"
### Request Body
> "title": "<asset_title>"<br> "poster": "<asset_poster>" <br> "backdrop": "<asset_backdrop>" <br> "synopsis": "<asset_synopsis>" <br> "trailer": "<URL_asset_trailer>" <br> "rating": "<asset_rating>" <br> "category": "<asset_category>"
### Response (200)
> "msg:" "Movie created successfully"
### Response (400 - Bad Request)
>"msg": "<error_msg>"
---
<br>

## Update Movie
---
### Method PUT (https://quiet-hollows-95792.herokuapp.com/movie/editMovie)
### Request Header
> "token": "<your_token>"
### Request Params
> "id": "<asset_id>"
### Request Body
> "title": "<asset_title>"<br> "poster": "<asset_poster>" <br> "backdrop": "<asset_backdrop>" <br> "synopsis": "<asset_synopsis>" <br> "trailer": "<URL_asset_trailer>" <br> "rating": "<asset_rating>" <br> "category": "<asset_category>"
### Response (200)
> "title": "<asset_title>"<br> "poster": "<asset_poster>" <br> "backdrop": "<asset_backdrop>" <br> "synopsis": "<asset_synopsis>" <br> "trailer": "<URL_asset_trailer>" <br> "rating": "<asset_rating>" <br> "category": 
### Response (400 - Bad Request)
>"msg": "<error_msg>"
---
<br>

## Edit(GET) Movie
---
### Method GET (https://quiet-hollows-95792.herokuapp.com/movie/editMovie)
### Request Header
> "token": "<your_token>"
### Request Params
> "id": "<asset_id>"
### Request Body
> none
### Response (200)
> "title": "<asset_title>"<br> "poster": "<asset_poster>" <br> "backdrop": "<asset_backdrop>" <br> "synopsis": "<asset_synopsis>" <br> "trailer": "<URL_asset_trailer>" <br> "rating": "<asset_rating>" <br> "category": 
### Response (400 - Bad Request)
>"msg": "<error_msg>"
---
<br>


## Delete Movie
---
### Method DELETE (https://quiet-hollows-95792.herokuapp.com/movie/)
### Request Header
> "token": "<your_token>"
### Request Params
> "id": "<asset_id>"
### Request Body
> none
### Response (200)
> "msg": "Movie deleted successfully"
### Response (400 - Bad Request)
>"msg": "<error_msg>"
---
<br>

---
# **REVIEW API**
---

## Add Review
---
### Method POST (https://quiet-hollows-95792.herokuapp.com/review/)
### Request Header
> "token": "<your_token>"
### Request Query
> "MovieId": "<movie_id>"
### Request Body
> "content": "<asset_content>"<br> "rating": "asset_rating"
### Response (200)
> "msg": "Review Submitted Successfully"
### Response (400 - Bad Request)
>"msg": "<error_msg>"
---
<br>

## GET Review
---
### Method GET (https://quiet-hollows-95792.herokuapp.com/review/)
### Request Header
> "token": "<your_token>"
### Request Query
> "MovieId": "<movie_id>"
### Request Body
> none
### Response (200)
> #### **Review Table** <br> "userId" : "<asset_userId>"<br> "MovieId": "<asset_MovieId>" <br> "rating": "<asset_rating>" <br> "content": "<asset_content>" <br>
> #### **User Table** <br> "email": "<asset_email>"<br> "password": "<asset_password>" <br> "name": "<asset_name>" <br> "image": "<asset_image>" <br> 
> #### **Movie Table** <br> "title": "<asset_title>"<br> "poster": "<asset_poster>" <br> "backdrop": "<asset_backdrop>" <br> "synopsis": "<asset_synopsis>" <br> "trailer": "<URL_asset_trailer>" <br> "rating": "<asset_rating>" <br> "category": "<asset_category>"

### Response (404 - Not Found)
>"msg": "<error_msg>"
---
<br>

## Update Review
---
### Method UPDATE (https://quiet-hollows-95792.herokuapp.com/review/)
### Request Header
> "token": "<your_token>"
### Request Query
> "MovieId": "<movie_id>"
### Request Body
> "content": "<asset_content>"<br> "rating": 
### Response (200)
> #### **Review Table** <br> "userId" : "<asset_userId>"<br> "MovieId": "<asset_MovieId>" <br> "rating": "<asset_rating>" <br> "content": "<asset_content>" <br>
> #### **User Table** <br> "email": "<asset_email>"<br> "password": "<asset_password>" <br> "name": "<asset_name>" <br> "image": "<asset_image>" <br> 
> #### **Movie Table** <br> "title": "<asset_title>"<br> "poster": "<asset_poster>" <br> "backdrop": "<asset_backdrop>" <br> "synopsis": "<asset_synopsis>" <br> "trailer": "<URL_asset_trailer>" <br> "rating": "<asset_rating>" <br> "category": "<asset_category>"

### Response (404 - Not Found)
>"msg": "<error_msg>"
---
<br>

## DELETE Review
---
### Method UPDATE (https://quiet-hollows-95792.herokuapp.com/review/)
### Request Header
> "token": "<your_token>"
### Request Query
> "MovieId": "<movie_id>"
### Request Body
> "content": "<asset_content>"<br> "rating": 
### Response (200)
> "msg": "Review Deleted successfully"
### Response (404 - Not Found)
>"msg": "<error_msg>"
---
<br>
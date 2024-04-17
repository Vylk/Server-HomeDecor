# Server-HomeDecor

## Mục lục
- [Giới thiệu](#introduction)
- [Cài đặt](#setup)
<br>- [MongoDB](#mongod)
<br>- [Nginx](#nginx)
<br>- [Node](#node)
<br>- [Môi trường](#env)
- [API](#api)
- [Ví dụ](#example)


<a name='introduction'></a>
## Giới thiệu
HomeDecor là một trò chơi thuộc dạng "match-3", là một minigame của dự án Metacity trên điện thoại(bao gồm cả IOS và  Android), đăng nhập dựa trên Google và Apple được xây dựng bằng Unity.
<br>Server HomeDecor của game được xây dựng bằng NodeJS. Gồm hai version v1(giao tiếp dựa trên HTTPS) và v2 (dựa trên socketio). Cả 2 version được chạy trên cùng một VPS Azure và sử dụng Nginx(Proxypass) để điều hướng tới đúng server.

<a name='setup'></a>
## Cài đặt
<a name='mongod'></a>
- MongoDB version: v4.4
- Nginx
<br> Chỉnh sửa file nginx.conf
```
map $http_upgrade $connection_upgrade{
            default upgrade;
            `` close;
}

upstream devserver{ 
                server localhost:3001;
}
```
**Lưu ý: devserver là host của proxy_pass phần dưới.
<br>
Hoặc thực hiện lệnh sau:
```
$sudo cp nginx/nginx.conf /etc/nginx/nginx.conf
```

Thêm file vào thư mực /etc/nginx/site-enables/

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        #listen 443 ssl; 
        server_name dev.klyvngo.pro;
        location / {
                
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;

        proxy_pass http://devserver/;
    
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        }
}
```
**Lưu ý: Cần chỉnh sửa lại server_name.
<br> Hoặc thực hiện lệnh sau

```
$sudo cp nginx/dev /etc/nginx/site-enables/dev
```
Khởi chạy lại Nginx
```
$systemctl restart nginx
```

- Node Version: v19.9.0
- NPM version: v9.6.3
<br>Install package/module
```
$npm i
```
<a name='env'></a>
<br> Thêm env
```NODE_ENV=dev
DEV_APP_PORT=3001
DEV_DB_HOST=localhost
DEV_DB_PORT=27017
DEV_DB_NAME=HomeDecor
GOOGLE_CLIENT_ID=864100335320-l91bn1hm9c8qp3f38ugrc6bjqsg8b79j.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_REDIRECT_URL=dev.klyvngo.pro/api/oauthgoole
```
```
$cp .env_default .env
```
Install PM2 version : v5.3.1
```
$pm2 start server.js --name "Server-HomeDecor"
```
<a name='api'></a>
## API
1. Đăng nhập với Google
- Request
<br>GET /api/login
```
curl --location '<host>:<port>/api/login'
```
- Response
```
redirect(Oauth_Google)
```

2. Nhận dữ liệu OAuth từ google
- Request 
<br>GET /api/oauthgoole
- Response
```
{
        message,
        context,
        status,
        metadata : {
                userid,
                name,
                email,
                auth_code
        }
}
```

3. Lấy Process hiện tại của người dùng
- Request
<br> POST /api/getprocess
```
curl --location '<host>:<port>/api/getprocess' \
--header 'Content-Type: application/json' \
--data '{
    userid, auth_token
}'
```
- Response
```
{
    message,
    context,
    status,
    metadata: {
        userid,
        data: {
            level,
            score
        }
    }
}
```

4. Cập nhập Process của người dùng
- Request
<br> POST /api/updateprocess
```
curl --location '<host>:<port>/api/getprocess' \
--header 'Content-Type: application/json' \
--data '{
    userid,
    auth_token,
    data: {
        level,
        score
    }
}'
```
- Response
```
{
    message,
    context,
    status,
    metadata: {
        userid,
        data: {
            level,
            score
        }
    }
}
```
<a name='example'></a>
## Ví dụ
```
1. GET https://dev.klyngo.pro/api/login
2. GET https://dev.klyvngo.pro/api/oauthgoogle
3. POST https://dev.klyvngo.pro/api/getprocess
4. POST https://dev.klyvngo.pro/api/updateprocess
```
- Khi lựa chọn Đăng nhập(1) sẽ được điều hướng đến trang OAuth của Google, khi người dùng đăng nhập xong tại trang của Google và cấp quyền, dịch vụ của Google sẽ gọi đến API(2) để cũng cấp access_token và id_token. Sử dụng JWT decode id_token sẽ thu được dữ liệu mà mình cần (email, name).
- Từ email và name đó sẽ tạo dữ liệu người dùng trong MongoDB và tạo một auth_code và trả về dữ liệu của người dùng.
```
{
  "message": "Login With Google Success",
  "context": "/api/oauthgoole",
  "status": 200,
  "metadata": {
    "userid": "9a9ad1fd23795a2c2ad4",
    "name": "Quang Vinh Ngo",
    "email": "ngovinh1112000@gmail.com",
    "auth_code": "ya29.a0Ad52N39Na1wY1lO1mrq0NvduFr058pQW6ki9pjtXcEyu-6sVmj2_j6T0NH0ftIqjCuJp1aUgTUap_rOtzDbXU4AQcHjQTxALlxXEaFrxBEF4Jl_O8fNfOTQn0QiLntKhG_fP_QwFwS1AHSz_5McB0B-2t-HnYBZ5d_MaCgYKAWASARESFQHGX2MiK1ypM90cpoO5L5u2UOwuww0170"
  }
}
```
- Sử dụng userid và auth_code để thực hiện các hành động (3) và (4)
```
curl --location 'dev.klyvngo.pro/api/getprocess' \
--header 'Content-Type: application/json' \
--data '{
    "userid" : "9a9ad1fd23795a2c2ad4",
    "auth_code": "ya29.a0Ad52N39Na1wY1lO1mrq0NvduFr058pQW6ki9pjtXcEyu-6sVmj2_j6T0NH0ftIqjCuJp1aUgTUap_rOtzDbXU4AQcHjQTxALlxXEaFrxBEF4Jl_O8fNfOTQn0QiLntKhG_fP_QwFwS1AHSz_5McB0B-2t-HnYBZ5d_MaCgYKAWASARESFQHGX2MiK1ypM90cpoO5L5u2UOwuww0170"
}'
```
```
{
    "message": "Get process done",
    "context": "/api/getprocess",
    "status": 200,
    "metadata": {
        "userid": "9a9ad1fd23795a2c2ad4",
        "data": {
            "level": 0,
            "score": 0
        }
    }
}
```

```
curl --location 'dev.klyvngo.pro/api/updateprocess' \
--header 'Content-Type: application/json' \
--data '{
    "userid" : "9a9ad1fd23795a2c2ad4",
    "auth_code": "ya29.a0Ad52N39Na1wY1lO1mrq0NvduFr058pQW6ki9pjtXcEyu-6sVmj2_j6T0NH0ftIqjCuJp1aUgTUap_rOtzDbXU4AQcHjQTxALlxXEaFrxBEF4Jl_O8fNfOTQn0QiLntKhG_fP_QwFwS1AHSz_5McB0B-2t-HnYBZ5d_MaCgYKAWASARESFQHGX2MiK1ypM90cpoO5L5u2UOwuww0170",
    "data": {
            "level": 4,
            "score": 205
        }
}'
```
```
{
    "message": "Update Process 9a9ad1fd23795a2c2ad4 done",
    "context": "/api/updateprocess",
    "status": 200,
    "metadata": {
        "userid": "9a9ad1fd23795a2c2ad4",
        "data": {
            "level": 4,
            "score": 205
        }
    }
}
```
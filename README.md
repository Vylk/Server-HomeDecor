# Server-HomeDecor
1. Cài đặt
- Node Version: v16.20.2
- Install Nginx và cài đặt:
```
#Chỉnh sửa /etc/nginx/nginx.conf
map $http_upgrade $connection_upgrade{
            default upgrade;
            `` close;
}

        ##
        # Basic Settings
        ##
upstream devserver{
                server localhost:3001;
}
```
Thêm file dev vào thư mực /etc/nginx/site-enables/

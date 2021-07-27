# 📀 Showcase

### How to install dependencies ?

Run `install.sh`

### How to run it ?

Start a HTTP server at the root of this folder

### Docker

#### Using nginx

##### Image

```
docker build -t server .
docker run -it -p 8080:80 -d server
```

##### Bind mount

```
docker run -it -p 8080:80 -d --name server -v $PWD:/usr/share/nginx/html nginx
```

Then visit `localhost:8080`

### TODO
```
    [Buttons]
        > Button that redirect to the chart
            > Back button
        > Button that redirect to the double pendulum
            > Back button

    [Pi]
        > Pi representation (x first digits)
            > color square for each digit
        > Pi representation (Adjacents numbers (1-2 distances))
            > Color palette
```
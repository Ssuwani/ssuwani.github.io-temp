---
title: '[MNIST Classification - 3] 도커 컨테이너로 각 서비스 구현'
date: '2021-10-10'
category: 'blog'
description: ''
emoji: '📚'
---

# 도커 컨테이너로 각 서비스 구현

실험 날짜: 2021년 10월 10일
실험자: Suwan Jang


앞서 만든 프론트엔드와 백엔드를 컨테이너로 동작되도록 구현한다.

MNIST 모델 학습을 위한 코드도 컨테이너로 구현한다.

이때 학습코드와 Flask 서버과의 model 공유가 되어야 하므로 Volume mount를 구현한다.

### 📚 Stack

- Docker
- Volume mount

**Todo**

- [x]  React App Dockerize
- [x]  MNIST Train Dockerize
- [x]  Flask WebApp Dockerize

**✓ React App Dockerize**

아래 사이트를 거의 그대로 따라했다!! 

[React Docker 배포](https://velog.io/@esc/React-Docker)

실행

```bash
docker run -p 8300:80 ssuwani/mnist_web-app
```

**✓ MNIST Train Dockerize**

- Dockerfile
    
    ```docker
    FROM python:3.7
    
    COPY . .
    
    RUN pip install -r requirements.txt
    
    ENTRYPOINT ["python", "train.py"]
    CMD [ "--epochs", "1", "--save-model"]
    ```
    
- Build
    
    ```bash
    docker build -t ssuwani/mnist_train .
    ```
    
- Run
    
    Flask 서버와 학습 모델을 공유해야 하기 때문에 Volume을 하나 생성해서 mount 하였다.
    
    Volume을 만드는 방법은 간단하다. `docker volume create vol` 이후에 아래를 실행하자.
    
    ```bash
    docker run -v vol:/app ssuwani/mnist_train --epochs 1 --save-model --save-model-path /app/mnist.pt
    ```
    

**✓ Flask WebApp Dockerize**

- Dockerfile
    
    ```docker
    FROM python:3.7
    
    COPY . .
    
    RUN pip install -r requirements.txt
    
    ENTRYPOINT ["python", "app.py"]
    CMD ["--model_path", "mnist.pt" ]
    ```
    
- Build
    
    ```bash
    docker build -t ssuwani/mnist_app .
    ```
    
- Run
    
    ```bash
    docker run -v vol:/app -p 5000:5000 ssuwani/mnist_app --model_path /app/mnist.pt
    ```
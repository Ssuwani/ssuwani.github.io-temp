---
title: '[백준-다이나믹프로그래밍] 설탕배달'
date: '2021-11-05'
category: 'algorithm'
description: ''
emoji: '1️⃣'
---

[[info | 백준 설탕배달 문제 보러가기]]
| https://www.acmicpc.net/problem/2839

## 문제 요약

설탕의 무게가 주어졌을 때 3kg 혹은 5kg 봉지에 담을 수 있는 데 가장 작게 담을 수 있는 봉지의 갯수를 출력하라

#### 조건

- 설탕의 무게는 3이상 5000이하

## 문제 접근 방식

1. 그리디하게 문제를 접근해도 괜찮지 않을까 생각했다.
2. 무게가 5의 배수라면 5kg의 봉지에 담는게 가장 최선이다.
3. 따라서 5의 배수인지 체크하고 그렇다면 5kg 봉지에 다 담는다.
4. 5의 배수가 아니라면 3kg의 봉지에 담아야 한다.
5. 설탕을 다 담을 때 까지 3번, 4번을 반복한다.
6. 무게가 0 미만이 되었다는 것은 3kg 혹은 5kg으로 다 담을 수 없다는 것이다. 이때 -1를 반환한다.

## 풀이코드

```python
weight = int(input())
cnt = 0
while weight:
    if weight % 5 == 0:
        print(cnt + weight // 5)
        break
    weight -= 3
    cnt += 1
    if weight < 0:
        print(-1)
        break
    if weight == 0:
        print(cnt)
```
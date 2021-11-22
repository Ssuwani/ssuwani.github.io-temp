---
title: '[백준-그래프이론] 단지번호 붙이기'
date: '2021-11-23'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 단지번호 붙이기 문제 보러가기]]
| https://www.acmicpc.net/problem/2667

## 문제 요약

지도가 주어졌을 때 단지로 그룹을 묶고 단지에 있는 아파트의 수를 구하라

#### 조건

- 단지의 크기는 5X5 ~ 25X25이다

## 문제 접근 방식

1. DFS로 풀지 BFS로 풀지 생각해봤을 때 DFS였다. 왜냐하면 아파트가 없는 곳 한번에 전체를 탐색해야 중복되지 않게 셀 수 있다고 판단했다. BFS로 하면 같은 단지인지 파악하기 힘들겠다는 생각을 했다.. 좀 헷갈리긴한다 .. 
2. 아파트내 모든 지역을 완벽탐색할 건데 DFS를 통하면 이미 탐색한 지역에 다시 안갈 수 있었다.

## 풀이코드

```python
n = int(input())

graph = [list(input()) for _ in range(n)]


# 스택을 이용한
visited = [[False] * n for _ in range(n)]

dx = [1, -1, 0, 0]
dy = [0, 0, 1, -1]


def dfs(x, y, graph, visited):
    global cnt
    cnt += 1
    x = int(x)
    y = int(y)
    visited[x][y] = True
    for i in range(4):
        nx = x + dx[i]
        ny = y + dy[i]
        if 0 <= nx < n and 0 <= ny < n:
            if not visited[nx][ny]:
                if graph[nx][ny] == "1":
                    graph[nx][ny] = int(graph[x][y]) + 1
                    dfs(nx, ny, graph, visited)


answer = []
for x in range(n):
    for y in range(n):
        if graph[x][y] == "1":
            cnt = 0
            dfs(x, y, graph, visited)
            answer.append(cnt)
print(len(answer))
answer.sort()
[print(ans) for ans in answer]
```






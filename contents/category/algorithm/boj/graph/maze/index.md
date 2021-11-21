---
title: '[백준-그래프이론] 미로 탐색'
date: '2021-11-22'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 미로 탐색 문제 보러가기]]
| https://www.acmicpc.net/problem/2178

## 문제 요약

미로 칸이 입력으로 주어질 때 왼쪽 상단에서 오른쪽 하단으로 이동할 수 있는 최소거리를 출력하라.

#### 조건

- 미로 칸의 가로 세로는 2이상 100이하의 자연수이다.

## 문제 접근 방식

1. DFS로 할까? BFS로 할까? 고민해봤을 때 BFS가 더 적절해 보이지만 DFS로도 충분히 할 수 있을 것 같았다.
1. DFS로 구현을 해보고자 했는데 실패했다.. 
1. BFS로 하면 최소거리로 마지막에 도착할 수 있음을 보장할 수 있지만 DFS로는 도착이 최소임을 보장할 수 없다. 랜덤성이 강하다. 

## 풀이코드

```python
from collections import deque

N, M = map(int, input().split())

graph = []

for _ in range(N):
  graph.append(list(map(int, input())))

def bfs(x, y):
  dx = [-1, 1, 0, 0] 
  dy = [0, 0, -1, 1]

  queue = deque()
  queue.append((x, y))

  while queue:
    x, y = queue.popleft()
    
    for i in range(4):
      nx = x + dx[i]
      ny = y + dy[i]

      if nx < 0 or nx >= N or ny < 0 or ny >= M:
        continue
      
      if graph[nx][ny] == 0:
        continue
      
      if graph[nx][ny] == 1:
        graph[nx][ny] = graph[x][y] + 1
        queue.append((nx, ny))
  
  return graph[N-1][M-1]

print(bfs(0, 0))
```






---
title: '[백준-그래프이론] DFS와 BFS'
date: '2021-11-21'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 DFS와 BFS 문제 보러가기]]
| https://www.acmicpc.net/problem/1260

## 문제 요약

N개의 정점과 M개의 간선 그리고 시작할 정점의 번호가 주어진다. DFS, BFS 각각의 수행 결과를 출력해라

#### 조건

- 정점의 갯수는 [1, 1000] 
- 간선의 갯수는 [1, 10000]

## 문제 접근 방식

1. DFS는 스택, BFS는 큐를 이용해서 풀었다.
1. 스택은 FILO, First in Last Out
1. 큐는 FIFO, Fist in First Out
1. DFS에서 스택을 사용하고 재귀로 함수를 호출했다.
1. BFS에서 큐를 사용하고 자식노드를 다 넣었다고 순서대로 빼고를 반복했다. 

## 풀이코드

```python
from collections import deque

n, m, v = map(int, input().split())

graph = [[] for _ in range(n + 1)]

for i in range(m):
    a, b = map(int, input().split())
    graph[a].append(b)
    graph[b].append(a)
    graph[a].sort()
    graph[b].sort()


visited = [False] * (n + 1)


def dfs(graph, v, visited):
    visited[v] = True
    print(v, end=" ")
    for i in graph[v]:
        if not visited[i]:
            dfs(graph, i, visited)


def bfs(graph, v, visited):
    visited = [False] * (n + 1)
    queue = deque([v])
    visited[v] = True
    while queue:
        pop = queue.popleft()
        print(pop, end=" ")
        for i in graph[pop]:
            if not visited[i]:
                queue.append(i)
                visited[i] = True


dfs(graph, v, visited)
print()
bfs(graph, v, visited)
```






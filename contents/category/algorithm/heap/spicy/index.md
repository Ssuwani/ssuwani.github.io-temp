---
title: '[프로그래머스-힙] 더 맵게'
date: '2021-10-09'
category: 'algorithm'
description: ''
emoji: '🌶️'
---

[[info | 프로그래머스 더 맵게 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/42626



#### 배운점

- heapq는 데이터를 정렬된 상태로 저장한다.

## 문제 요약

매움의 정보를 표시하는 스코빌 지수를 K이상으로 만들기 위한 조합의 횟수를 반환하라.

#### 조건

- 스코빌의 길이는 2 이상 1,000,000 이하이다.
- 모든 음식이 K 이상으로 만들 수 없는 경우 -1을 반환

## 문제 접근 방식

1. 조건을 보는 순간 당연히 이중 반복문은 고려하면 안된다.
2. 정렬을 하기위한 시간복잡도를 피하기 위해 heap을 사용한다.
3. heap을 사용하면 첫번째, 두번째를 빼서 연산을 하면 된다.

## 풀이코드

```python
import heapq
def solution(s_l, K):
    heap = []
    for num in s_l:
        heapq.heappush(heap,num)
    mix_cnt = 0
    while heap[0]<K:
        try:
            heapq.heappush(heap, heapq.heappop(heap) + heapq.heappop(heap)*2)
        except:
            return -1
        mix_cnt += 1
    return mix_cnt
```

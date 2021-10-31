---
title: '[프로그래머스-탐욕법] 구명보트'
date: '2021-10-31'
category: 'algorithm'
description: ''
emoji: '🦺'
---

[[info | 프로그래머스 구명보트 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/42885



## 문제 요약

사람들의 몸무게 리스트가 주어졌을 때 최소로 필요한 보트의 갯수를 구하라. 보트는 수용가능한 최대 몸무게가 있다.

#### 조건

- 최대 2 사람 밖에 탈 수 없다.
- 사람들의 리스트는 50,000 이하
- 한명도 실을 수 없는 경우는 없다.

## 문제 접근 방식

1. 처음엔 오름차순으로 정렬해서 하나씩 더하가면 되지 않을까 했는데 반례까 존재했다.
2. limit가 100이라 가정했을 때 `[40], [50], [50], [60]` 이와 같이 리스트가 있다면 40, 50 두사람을 보트에 태우면 안된다. 40, 60 을 태워야 [40, 60], [50, 50] 단 두대만으로 구출이 가능하다.
3. 그래서 정렬 한 뒤 양 끝의 비교가 필요했다. 좌 우는 큰수가 오든 작은수가 오든 상관없지만 더해서 limit보다 크다면 그 큰수는 어떠한 수를 더하더라도 같이 탈 수 없다. 그래서 혼자 타야한다.
4. 정리하면 정렬 한 뒤 가장 큰수와 작은 수를 비교하고 limit보다 크다면 큰 수는 혼자탄다. limit보다 작다면 같이 탄다. 이게 전부다.
5. 사실 최대 2 사람 밖에 탈 수 없다는 문제의 조건을 제대로 읽지 않아서 3번의 생각을 하지 못했었다.

## 풀이코드

```python
from collections import deque
def solution(people, limit):
    people.sort(reverse=True)
    people = deque(people)
    cnt = 0
    
    while people:
        if len(people) == 1:
            cnt += 1
            people.popleft()
        elif people[0] + people[-1] <= limit:
            people.popleft()
            people.pop()
            cnt += 1
        else:
            people.popleft()
            cnt += 1
    return cnt
```
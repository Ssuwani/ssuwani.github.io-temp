---
title: '[프로그래머스-스택/큐] 기능개발'
date: '2021-10-02'
category: 'algorithm'
description: ''
emoji: '🧩'
---

[[info | 프로그래머스 기능개발 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/42586



#### 배운점

- 파이썬에서 int, boolean 의 합
- 2 + True -> 3
- 2 + False -> 2



## 문제 요약

기능의 진도 %와 개발 속도가 주어졌을 때 배포가능한 기능의 갯수를 반환하는 문제

#### 조건

- 작업의 갯수와 속도는의 배열은 100 이하

## 문제 접근 방식

1. 먼저 기능의 개발이 순차적으로 진행되는 것이 아니라 병렬적으로 개발된다는 점을 확인해야 한다.
2. 기능은 앞선 기능에 의존적이기 때문에 앞의 기능이 개발과 함께 배포가 가능하다. (뒤의 기능이 먼저 개발되었다고 배포 불가능)
3. 기능별 완성까지의 소요일을 계산한다.
4. 여기서 나머지 처리를 위해 Boolean과의 연산을 하였다.
5. a를 배포할 때 뒤의 기능 중 가능한 것이 있다면 같이 배포하기 위해 탐색한다.
6. 더 기간이 오래걸리는 기능이 나오면 전까지의 기능을 함께 배포한다.
7. 5번, 6번과정을 반복한다.

## 풀이코드

```python
def solution(progresses, speeds):
    # 7, 3, 9
    prior_task_day = 0
    cnt = 0
    result = []
    for p, s in zip(progresses, speeds):
        
        left_percent = 100 - p
        day_to_finish = left_percent // s + (left_percent % s != 0)
        
        if prior_task_day < day_to_finish:
            if cnt != 0:
                result.append(cnt)
                cnt = 0
            prior_task_day = day_to_finish
        cnt += 1
    result.append(cnt)
    return result
```
---
title: '[프로그래머스-완전탐색] 모의고사'
date: '2021-11-04'
category: 'algorithm'
description: ''
emoji: '💯'
---

[[info | 프로그래머스 모의고사 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/42840


## 문제 요약

시험 문제의 정답이 주어졌을 때 수포자들의 찍기로 최다 득점자의 리스트를 반환하라.

#### 조건

- 시험은 최대 10,000 문제이다.
- 1,2,3,4,5 번 중 답이있다.

## 문제 접근 방식

1. 수포자들은 특정 패턴의 답을 반복한다. 반복한다는 문장에서 나머지 연산을 떠올리니 생각보다 쉬워졌다.
2. `answer == sol[i%len(sol)]` 문제의 정답과 수포자가 낸 답이 같은 지 비교하는 코드이다. i는 i번째 문제를 이야기한다. sol은 수포자가 반복해서 내는 패턴의 리스트를 담고있다.
3. 코드의 가독성은 떨어지지만 이중 반복문을 연습한다는 생각으로 코드를 이렇게 작성해보았다.

## 풀이코드

```python
def solution(answers):
    sol1 = [1,2,3,4,5]
    sol2 = [2,1,2,3,2,4,2,5]
    sol3 = [3,3,1,1,2,2,4,4,5,5]
    scores = [sum([answer == sol[i%len(sol)] for i, answer in enumerate(answers)]) for sol in [sol1, sol2, sol3]]
    
    return [i+1 for i, score in enumerate(scores) if max(scores) == score]
            
```
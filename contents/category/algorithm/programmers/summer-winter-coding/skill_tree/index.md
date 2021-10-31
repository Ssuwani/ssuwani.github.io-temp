---
title: '[프로그래머스-Summer/Winter 2018] 스킬트리'
date: '2021-11-01'
category: 'algorithm'
description: ''
emoji: '🌳'
---

[[info | 프로그래머스 스킬트리 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/49993



## 문제 요약

선행되어야 하는 스킬의 순서와 스킬을 찍고자하는 순서가 리스트로 주어졌을 때 가능한 스킬의 구성의 갯수를 반환하라.

#### 조건

- 선행 스킬 순서의 길이는 26 이하
- 스킬의 순서가 담긴 리스트의 길이는 20 이하

## 문제 접근 방식

1. 선행스킬 이외의 나머지 스킬의 순서는 중요하지 않다는 조건이 있었다.
2. 나머지 스킬을 없애 버려도 상관없다는 의미이다.
3. 지우고 난 뒤 리스트가 선행 스킬의 앞부분과 같으면 가능한 스킬트리이다.

## 풀이코드

```python
def solution(skill, skill_trees):
    answer = 0
    for tree in skill_trees:
        learn = ''.join(list(filter(lambda x: x in skill, tree)))
        if learn == skill[:len(learn)]:
            answer += 1
    return answer
```

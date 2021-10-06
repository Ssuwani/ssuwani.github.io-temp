---
title: '[프로그래머스-스택/큐] 프린터'
date: '2021-10-06'
category: 'algorithm'
description: ''
emoji: '🧩'
---

[[info | 프로그래머스 프린터 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/42587



#### 배운점

- 파이썬에서 같은 값은 하나의 메모리에 저장된다.

## 문제 요약

우선순위가 담긴 목록이 입력되면 우선순위에 따라 프린터의 작업을 수행한다.

#### 조건

- 작업의 중요도는 1~9로 표기
- 100개 이하의 문서

## 문제 접근 방식

1. 입력의 순서를 종료 시점에 이야기 해야 하기 때문에 기록해야 했었다.
2. 우선순위가 같은 문서가 있을 수 있으므로 고유의 값으로 나타내야한다.
3. `id(number)` 로 시도해보았으나 같은 숫자는 같은 id 값을 가진다.
4. 생각해보니 각 자리의 숫자가 고유한 숫자였다..ㅎㅎ..
5. 현재 인덱스 정보를 가지는 리스트를 하나 더 만들고 우선 순위를 담은 리스트의 변환과 동일하게 지정해준다.
6. 우선 순위 리스트에 아무런 값이 없을 때 까지 수행한다.

## 풀이코드

```python
def solution(ps, location):
    ls = list(range(len(ps)))
    result = {}
    order = 1
    while ps:
        m_index = ps.index(max(ps))
        ps = ps[m_index: ] + ps[:m_index]
        ls = ls[m_index: ] + ls[:m_index]
        ps.pop(0)
        result[ls.pop(0)] = order
        order += 1
    return result[location]
```
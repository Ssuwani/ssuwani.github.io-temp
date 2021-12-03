---
title: '[프로그래머스-2019 카카오 블라인드 채용] 실패율'
date: '2021-12-03'
category: 'algorithm'
description: ''
emoji: '1️⃣'
---

[[info | 프로그래머스 실패율 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/42889



## 문제 요약

플레이어들이 위치해 있는 스테이지의 리스트가 주어졌을 때 어려운 스테이지의 순서를 구하라

#### 조건

- 스테이지의 갯수는 500개이하
- 사용자는 200,000명 이하

## 문제 접근 방식

1. 2번 스테이지의 실패율을 구하려면 다음과 같은 식으로 구해야 한다. `2번 스테이지에 머물러 있는 사람 수 / 2번 스테이지 보다 크거나 같은 스테이지의 사람수`
1. filter를 사용해 분모를 구했고
1. count를 사용해 분자를 구했다.
1. 다만 주의할 점은 나눗셈의 분모가 0이면 안된다.
1. 분모가 0이 되는 경우는 아무도 해당 스테이지를 통과하지 못한 경우다. 예외처리 해주자

## 풀이코드

```python
def solution(N, stages):
    fail_per_stage = {}

    for i in range(1, N+1):
        gte = list(filter(lambda x:x>=i, stages))
        equal = gte.count(i)
        if gte:
            fail_per_stage[i] = equal / len(gte)
        else:
            fail_per_stage[i] = 0
        fail_per_stage = dict(sorted(fail_per_stage.items(), key=lambda x:x[1], reverse=True))
    
    return list(fail_per_stage.keys())
```
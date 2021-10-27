---
title: '[프로그래머스-2020 카카오 블라인드 채용] 문자열 압축'
date: '2021-10-26'
category: 'algorithm'
description: ''
emoji: '🗜️'
---

[[info | 프로그래머스 문자열 압축 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/60057



## 문제 요약

문자열이 주어졌을 때 반복되는 단위로 압축해서 제일 작은 문자열 길이를 반환하라.

#### 조건

- 문자열의 길이는 1,000 이하

## 문제 접근 방식

1. 입력되는 문자열의 길이가 충분히 작으므로 완전 탐색해야 겠다는 생각! 
2. 1개씩 쪼개는 것부터 전체 길이의 절반씩으로 쪼개는 것까지를 반복하면 됨
3. temp 변수에 비교해야 할 값을 수정해 나감

## 풀이코드

```python
def solution(s):
    length = []
    result =""
    if len(s) == 1:
        return 1
    for cut in range(1, len(s)//2+1):
        count = 1
        tempStr = s[:cut]
        for i in range(cut, len(s), cut):
            if s[i:i+cut] ==tempStr:
                count += 1
            else:
                if count == 1:
                    count = ""
                result += str(count) + tempStr
                tempStr = s[i:i+cut]
                count = 1
        if count == 1:
            count = ""
        result += str(count) + tempStr
        length.append(len(result))
        result = ""
    return min(length)
```
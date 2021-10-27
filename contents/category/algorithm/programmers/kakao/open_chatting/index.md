---
title: '[프로그래머스-2019 카카오 블라인드] 오픈채팅방'
date: '2021-10-18'
category: 'algorithm'
description: ''
emoji: '💬'
---

[[info | 프로그래머스 오픈채팅방 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/42888



## 문제 요약

채팅방에서의 Enter, Leave, Change의 기록이 입력되었을 때 실제 채팅방에 출력되는 메시지를 반환하라.

#### 조건

- 로그의 길이는 1,000 이하

## 문제 접근 방식

1. uid에 따른 사용자 이름을 추적해야한다. 이름이 바뀌었을 때 이전 기록의 출력도 변경되어야 하기 때문이다.
2. 첫번째 반복문을 돌면서 사용자별 최종 이름을 저장한다.
3. 두번째 반복문을 돌면서 출력 메시지를 만든다.

## 풀이코드

```python
def solution(record):
    names = dict()
    for r in record:
        commands = r.split(" ")
        if len(commands) == 3:
            uid = commands[1]
            name = commands[2]
            names[uid] = name
    result = []
    for r in record:
        commands = r.split(" ")
        if commands[0] == 'Enter':
            result.append(f"{names[commands[1]]}님이 들어왔습니다.")
        elif commands[0] == 'Leave':
            result.append(f"{names[commands[1]]}님이 나갔습니다.")
    return result
```
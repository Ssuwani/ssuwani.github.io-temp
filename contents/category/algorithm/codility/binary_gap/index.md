---
title: '[Codility] Binary Gap'
date: '2021-11-08'
category: 'algorithm'
description: ''
emoji: '🔢'
---

[[info | Codility Binary Gap 문제 보러가기]]
| https://app.codility.com/c/run/training7JX8WJ-RVH/



## 문제 요약

숫자가 주어졌을 때 binary 값으로 변환한 뒤 1사이에 있는 0의 길이 중 최댓값을 반환하라.

#### 조건

- 입력되는 숫자는 2,147,483,647 이하의 자연수

## 문제 접근 방식

1. 먼저 숫자를 bin 함수를 사용해 binary 값으로 변환해준다. 0b .. 형태로 출력이 되기 때문에 인덱스 2부터 슬라이싱 한다.
1. 반복문을 돌면서 '1'이라면 이때까지 이전 '1'이 나온 뒤부터 더해 둔 0의 숫자를 결과 리스트에 더한다. 이진수로 변환 한 뒤의 결과는 문자열이므로 숫자 1과 비교하지 않도록 주의해야한다.
1. result중 최댓값을 출력한다.

## 풀이코드

```python
def solution(N):
    zero_cnt = 0
    result = []
    for k in bin(N)[2:]:
        if k == '1':
            result.append(zero_cnt)
            zero_cnt = 0
        else:
            zero_cnt += 1
    return max(result)
```




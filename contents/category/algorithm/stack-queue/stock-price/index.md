---
title: '[프로그래머스-스택/큐] 주식 가격'
date: '2021-10-08'
category: 'algorithm'
description: ''
emoji: '📈'
---

[[info | 프로그래머스 주식 가격 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/42584



#### 배운점

- 시간 복잡도만으로 시간초과를 판단해선 안된다.

## 문제 요약

주식 가격이 입력된다. 각 시점의 가격에서 몇초간 떨어지지 않았는지를 반환하라.

#### 조건

- prices의 길이는 2 이상 100,000 이하

## 문제 접근 방식

1. 특정 시점에서 다른 시점을 탐색해야 하므로 당연히 이중 반복문을 사용 해야겠다고 생각했다.
2. 시간초과 문제로 통과하지 못했다. 
3. 이중 for 문을 사용하면 시간초과가 무조건 나는건지 확인하려고 코드를 작성해서 시간초과가 나는지 확인하였다.
4. 이중 반복문을 사용하면 안되겠다고 생각했지만 다른 방법이 생각이 않나 다시 시도하였다..
5. 통과했다. 3에서 이중 반복문을 테스트했던 것보다 빠르겠지만 **2와의 차이는 여전히 모르겠다.**

## 풀이코드

```python
def solution(prices):
    answer = []
    for i in range(len(prices)):
        cnt = 0
        for j in range(i+1, len(prices)):
            cnt += 1
            if prices[i] > prices[j]:
                break
        answer.append(cnt)
    return answer
```

#### 이중 For문 시간초과 확인

```python
for target in prices:
    for target in prices:
        pass
```

위의 코드는 이중 반복문을 사용하면 안되는건지 확인하기 위함이였다.<br/>
정확성 테스트는 런타임 에러로 실패했고 효율성 테스트는 시간초과로 실패했다. 이는 이중 for문을 사용하면 효율성 테스트에서 통과할 수 없음을 의미한다고 생각했다. -> 하지만 같은 $O(n**2)$ 이더라도 반복문을 중간에 멈추는 break를 통해 전체적인 시간을 줄이면 테스트에 성공할 수도 있다.(내 정답 코드는 이렇게 성공했다고 생각한다.)


#### 효율성 문제 prices 리스트 길이 확인

```python
if len(prices) < 50000:
    return Error

for target in prices:
    for target in prices:
        pass
```

위의 코드에의 결과는 예상대로:

- 정확성 테스트: 런타임에러 
- 효율성 테스트: 시간초과

prices의 제한조건은 리스트의 길이 100,000이하이다. 만약 prices의 길이가 50,000 보다 작다면 바로 Error를 return 해서 런타임 에러가 발생 했을것이다. 이는 큰 의미가 있는건 아니지만 시간초과 문제의 원인이 시간복잡도임에 정당성을 더 부여했다고 생각한다.

#### 첫번째 코드 (효율성 시간초과 에러)

```python
result = []
def solution(prices):
    for i, target in enumerate(prices):
        for j, other in enumerate(prices[i+1:]):
            if target > other:
                result.append(j+1)
                break
        else:
            result.append(len(prices[i+1: ]))
    return result
```

나는 지금 개발자들의 가장 큰 난제 중 하나인 "이게 왜 돼?" 상태에 있다.. ㅠㅠ 

혹시 이 글을 보는 누군가가 설명해주리라 생각하며 사건의 개요를 적어본다.
> 문제를 보자마자 바로 위의 첫번째 코드로 작성하였다. 시간초과를 받았고 앞서 설명한 디버깅 기법을 거치면서 이중반복문이 문제일거라 확신하였다. 이중반복을 사용하지 않고 어떻게 풀지 생각하다가 하나의 반복문에 `map`으로 문제를 해결했지만 이 역시 이중반복을 사용하는것과 같이 O(n**2)의 시간복잡도를 가졌다. 어떻게 풀 수 있을지 도저히 감이 잡히지 않아, 다시 이중 반복문을 시도하였다. 됐다.. 첫번째 풀이와 다른점을 찾지 못하겠다.
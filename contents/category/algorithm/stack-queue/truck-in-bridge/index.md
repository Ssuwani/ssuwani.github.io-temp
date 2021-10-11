---
title: '[프로그래머스-스택/큐] 다리를 지나는 트럭'
date: '2021-10-11'
category: 'algorithm'
description: ''
emoji: '🚚'
---

[[info | 프로그래머스 다리를 지나는 트럭 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/42583



#### 배운점

- 문제를 바라보는 관점 (너무 단순하게 구현하려고만 생각하지 말자.)



## 문제 요약

다리의 길이, 다리가 버틸 수 있는 무게, 트럭별 무게가 주어졌을 때 트럭이 다리를 다 건너는 데 걸리는 시간을 반환하라.

#### 조건

- 세가지 입력 모두 1 이상 10,000 이하

## 문제 접근 방식

1. 문제를 천천히 읽으면 충분히 이해가 되고 그냥 단순히 구현에 신경썼다.
2. 조건에 만족되면 다리에 트럭을 올리고 조건에 만족되면 다리를 트럭에서 빼야한다고 생각했다.
3. 올리는 조건은 간단하지만 빼는 조건에서 특정 트럭이 언제 올라갔는지 확인하기가 까다로웠다.
4. 트럭의 무게는 당연히 같을 수 있으므로 uuid 라이브러리를 사용해서 서로 다른 트럭으로 구분하여 다리에 올라간 시간을 추적하였다.
5. 문제를 풀긴했지만 더 간단한 풀이가 있을거라 생각했다.
6. 마음에 드는 풀이가 있어 가져왔다.
7. 트럭이 다리를 지나는 과정에 대해 조금 더 잘 이해한 풀이였다.

## 풀이코드(좋은)

```python
def solution(bridge_length, weight, truck_weights):
    time = 0
    
    on = [0] * bridge_length
    
    while len(on) != 0:
        time += 1
        
        on.pop(0)
        
        if truck_weights:
            if sum(on) + truck_weights[0] <= weight:
                on.append(truck_weights.pop(0))
            else:
                on.append(0)
    return time
```



#### 나의 이상한 풀이;

```python
import uuid
def solution(bridge_length, weight, truck_weights):
    in_bridge_weight = 0
    passed = []
    in_bridge = []
    yet = truck_weights
    time = 0
    my_dict = dict()
    while yet or in_bridge:
        time += 1

        for i, v in my_dict.items():
            if time - v == bridge_length:
                passed.append(in_bridge.pop(0))
        if yet:
            if sum(in_bridge) + yet[0] <=  weight:
                in_bridge.append(yet.pop(0))
                my_dict[uuid.uuid1()] = time
    return time
```


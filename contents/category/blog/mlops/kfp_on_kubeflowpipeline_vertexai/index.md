---
title: '[MLOps] KFP v2 on Kubeflow Pipeline and Vertex AI'
date: '2021-10-28'
category: 'blog'
description: ''
emoji: '👷'

---

# KFP v2 on Kubeflow Pipeline and Vertex AI

> 하나의 코드로 두 플랫폼에 Pipeline 을 실행해보자

**Reference**

- [Introducing Kubeflow Pipelines SDK v2](https://www.kubeflow.org/docs/components/pipelines/sdk/v2/v2-compatibility/)
- [Google Cloud - build pipeline](https://cloud.google.com/vertex-ai/docs/pipelines/build-pipeline)



Kubeflow 공식문서에 kfp v2로 Kubeflow Pipeline을 배포하는 법, Google Cloud 공식문서에 kfp v2로 Vertex Ai에 배포하는법이 설명되어 있다. 이 포스팅은 그 두개를 합친 포스팅밖에 되지 못한다. 각 플랫폼마다의 장단점이 존재하는 것 같아 필요에 따라 배포 플팻폼을 변경할 수 있다는 점을 상기하기 위해 포스팅을 작성해본다.



내가 생각하는 Vertex AI의 단점

- 조금 더 추상적이다. Vertex AI는 Kubeflow Pipeline을 기반으로 사용자 친화적으로 만든 Wrapper이다. 그렇기 때문인 것 같은데, Pipeline을 만들고 실행을 하면 Component들이 결국 Pod 단위로 실행되는데, `kubectl` 로 Pod의 상태가 조회가 안된다. [여기](https://towardsdatascience.com/serverless-machine-learning-pipelines-with-vertex-ai-an-introduction-30af8b53188e)를 보니 마침내 Vertex AI에서 serverless Pipeline을 실행할 수 있게 되었다는데 그게 Pod의 조회가 안되는 것과 상관이 있는지 모르겠다. 여튼 안된다. Kubeflow Pipeline에서는 된다.

단점의 내용은 확실하지 않다. 그리고 장점에 대해서 언급하기 위해 공부하던 중 비교해놓은 [공식문서](https://cloud.google.com/vertex-ai/docs/pipelines/build-pipeline#compare)가 있다.! 읽다보니 이정도면 그냥 Vertex AI를 사용하는게 맞지 않나싶다.. Vertex AI에선 Cloud Storage를 지정하면 알아서 마운트된 볼륨으로 서 이용할 수 있어 되게 편했다. 하지만 Kubeflow Pipeline에서는 안되는 듯 하다. **그래서 단순히 배포 방식을 변경한다고 해서 두개의 플랫폼에서 정상적으로 동작한다고 단언하지는 못한다. ** 



*kfp version은 '1.8.6' 이다*

## Add Component 작성하기

```python
import kfp
import kfp.dsl as dsl
from kfp.v2.dsl import component

@component
def add(a: float, b: float) -> float:
    '''Calculates sum of two arguments'''
    return a + b

@dsl.pipeline(
    name='addition-pipeline',
    description='An example pipeline that performs addition calculations.',
    # pipeline_root='gs://my-pipeline-root/example-pipeline'
)
def add_pipeline(a: float=1, b: float=7):
    add_task = add(a, b)
```



#### Kubeflow Pipelines에 배포하기

```python
KUBEFLOW_PIPELINES_HOST = "<Kubeflow Pipelines HOST URL>"

from kfp import compiler
compiler.Compiler(mode=kfp.dsl.PipelineExecutionMode.V2_COMPATIBLE)\
.compile(pipeline_func=add_pipeline, package_path='pipeline.yaml')

client = kfp.Client(host=KUBEFLOW_PIPELINES_HOST)
# run the pipeline in v2 compatibility mode
client.create_run_from_pipeline_func(
    add_pipeline,
    arguments={'a': 7, 'b': 8},
    mode=kfp.dsl.PipelineExecutionMode.V2_COMPATIBLE,
)
```

#### Vertex AI Pipeline에 배포하기

```python
PROJECT_ID = "<Project ID>"
REGION = "<Region: where you want deploy>"
BUCKET_URI = "<Bucket URI>"
from kfp.v2 import compiler
from kfp.v2.google.client import AIPlatformClient
compiler.Compiler().compile(pipeline_func=add_pipeline,
        package_path='add_pipeline.json')

api_client = AIPlatformClient(project_id=PROJECT_ID, region=REGION)

response = api_client.create_run_from_job_spec(
    'add_pipeline.json',
    pipeline_root=BUCKET_URI,
    parameter_values={
        'a': 7,
        'b': 8
    })
```


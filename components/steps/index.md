# Steps

- category: Components
- chinese: 步骤条
- order: 8
- cols: 1

---

引导用户按照流程完成任务的导航条。

## 何时使用

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

## API

### Steps

步骤条的整体

| 参数      | 说明                                     | 类型       |  可选值 |默认值 |
|-----------|------------------------------------------|------------|-------|--------|
|  size | 可选参数，指定大小（目前只支持普通和迷你两种大小） | string    |  small, default | default    |
|  maxDescriptionWidth | 可选参数，指定步骤的详细描述文字的最大宽度 | number | 无 | 100 |

### Steps.Step

步骤条的每一个步

| 参数      | 说明                                     | 类型       |  可选值 |默认值 |
|-----------|------------------------------------------|------------|-------|--------|
|  status | 必要参数，指定状态 | string    |  wait, process, finish | 无    |
|  title   | 必要参数，标题 | string/jsx | 无 | 无     |
|  description | 可选参数，步骤的详情描述 | string/jsx | 无 | 空  |
|  icon    | 可选参数，步骤的Icon。如果不指定，则使用默认的样式。 | string/jsx | 无  | 空 |

## Todo

* 竖状步进条
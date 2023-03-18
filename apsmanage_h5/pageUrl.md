# baseurl http//:192.168.8.136:7777/#/
## 0.5
我的客户
```
myClient
```
业务需求填写
```
addDemand
```
客户详情预览
```
customerDemand/:id
```
会议结果录入
```
meetingInput/:id
```
董事长审批
```
leaderCheck/:id'
```

## 0.6
上传初版加工协议
```
uploadProtocol/:id
```
录入问题
```
entryQuestions/:id
```
回复问题
```
answerQuestions/:id
```
法务评估
```
legalAppraise/:id
```
待修改加工协议
```
legalAppraise/:id
```
与客户沟通结果
```
offlineBridge/:id
```
上传回签协议
```
uploadSignPro/:id
```


## 0.7.1
客户报价规则
```
quote/customerRules 
```

## 0.7.2

发起报价
```
quote/initiateQuotation
```
上传我司BOM
```
quote/uploadCorpBOM/:offerId
```
待检查BOM
```
quote/checkCorpBOM/:offerId
```
工程报价
```
quote/projectPrice/:offerId
```
关务报价
```
quote/customPrice/:offerId
```
物流报价
```
quote/logisticPrice/:offerId
```
物料报价
```
quote/materialPrice/:offerId
```
sourcing报价
```
quote/sourcePrice/:offerId
```
外发报价调整
```
quote/adjustPrice/:offerId
```
报价单预览
```
quote/preview/:offerId
```
董事长审批
```
quote/superAudit/:offerId
```

待客户确认
```
quote/customerConfirm/:offerId
```

报价单预览
```
quote/preview/:offerId
```

## 0.8

发起立项申请
```
setProject/init
```
已退回-发起立项申请
```
setProject/back/:id
```
核签
```
setProject/audit/:id
```
预约审批会议
```
setProject/meeting/:id
```
录入会议结果
```
setProject/saveMeet/:id
```
预览
```
setProject/preview/:id
```

FCS记录
```
fcs/record/
```

发起FCS产前准备
```
fcs/init/:businessId?
```

FCS处理-物控任务
```
fcs/material/:fcsTaskId
```
FCS处理-关务任务
```
fcs/custom/:fcsTaskId
```

FCS处理-工程任务
```
fcs/project/:fcsTaskId
```
FCS处理-物流任务
```
fcs/logistic/:fcsTaskId
```
FCS处理-FCS商务详情
```
fcs/preview/:fcsTaskId
```

FCS任务历史记录
```
fcs/history/:fcsBaseId
```

FCS任务历史记录-详情
```
fcs/historyPreview/:fcsTaskId
```

## bps

订单编号信息
```
prodFow/schedule
```
订单编号信息
```
prodFow/schedule/detail
```
生产排程信息
```
prodFow/workOrder
```
生产排程概况
```
prodFow/workOrder/detail
```
抽检不合格任务处理 type: 1-抽检不合格处理（向当线人员推送） 2-抽检处理方式确认（上级决议推送） 3-抽检不合格处理（抽检超时推送）
```
prodFow/spotCheck/:type
```
抽检不合格处理任务
```
prodFow/spotCheck/:type/detail/:id
```
备料通知推送type:1  备料超时推送上级type:2  领料通知:3
```
prodFow/stock/:type
```
备料任务
```
prodFow/stock/:type/detail/:id
```

设备异常处理任务 type:1  设备异常推送通知  type:2  设备异常处理超时通知
```
prodFow/exceptionFlow/:type
```
设备异常处理任务详情
```
prodFow/exceptionFlow/:type/detail/:id
```

## 借板

发起借板
```
borrowPlate/init
```

借板记录
```
borrowPlate/record
```

驳回借板
```
borrowPlate/back/:id
```

归还借板
```
borrowPlate/return/:id
```

组长确认
```
borrowPlate/audit/:id
```

接收人确认
```
borrowPlate/customerConfirmation/:id
```

仓库确认还板页
```
borrowPlate/storehouseConfirmation/:id
```

申请人填电话
```
borrowPlate/applicantTel/:id
```

借板详情
```
borrowPlate/preview/:id
```




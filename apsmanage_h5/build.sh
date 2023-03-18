docker login harbor-rongshu-saas.com -u rongshu -p Rs123456
docker build -t harbor-rongshu-saas.com/front/apsmanage_h5:0.015 .
docker push harbor-rongshu-saas.com/front/apsmanage_h5:0.015

#kubectl set image -n rs-dev deployment/apsmanage-h5  apsmanage-h5=harbor-rongshu-saas.com/front/apsmanage_h5:0.003
#curl http://192.168.28.51:30300/api/customer/customer/pageInfo

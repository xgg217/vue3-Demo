<template>
  <div class="demandFormWrap">
    <el-form ref="ruleFormRef" :model="demandForm" label-width="90px" label-position="left" :disabled="!isEdit" class="demandForm" :class="{'busCancelEdit': !isEdit}" :rules="formRule">
      <slot name="quotaState" :data="demandForm"></slot>
      <el-form-item label="客户状态" v-if="(demandForm.status || demandForm.status === 0) && route.name != 'addDemand' && !isQuota " >
        <span :class="statusList[demandForm.status].className">{{ statusList[demandForm.status].lable }} {{ demandForm.status == 0 ? '剩余' + (demandForm.days || '-') + '天到期' : '' }}</span>
      </el-form-item>

      <el-form-item label="客户名称" prop="customerName" :rules="[{ validator: checkCustomName, trigger: 'change' }]" id="customerName" v-if="!isQuota">
        <remoteSelectInput ref="remoteSelectInputRef" v-if="isEdit && demandForm.status == null && route.name == 'addCustomers'" @getCustomerInfo="getCustomerInfo" :initInfo="{id: demandForm.customerId, name: demandForm.customerName}"></remoteSelectInput>
        <el-input v-else :disabled="demandForm.status > -1 " v-model="demandForm.customerName"></el-input>
      </el-form-item>

      <el-form-item label="办公/厂房" prop="officeBuild" id="officeBuild" v-if="!isQuota">
        <el-radio-group v-model="demandForm.officeBuild">
          <el-radio :label="1">自有</el-radio>
          <el-radio :label="2">租赁</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="员工人数" prop="employeeNumber" id="employeeNumber" v-if="!isQuota">
        <el-select v-model="demandForm.employeeNumber" placeholder="选择员工人数范围" style="width: 100%">
          <el-option
            v-for="item in employeeNumberOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!--发起报价界面需要显示-->
      <el-form-item label="办公地址" prop="officeAddress" id="officeAddress" v-if="!isQuota || isQuotaInitiateQuotation">
        <div class="a-blue-color more grayWrap" @click="openMapWindow(0)"><van-icon name="location" color="#1572F9;" style="margin-right: 0.1rem" /> {{ demandForm.officeAddress || '选择地址'}}</div>
      </el-form-item>


      <el-form-item label="注册地址" prop="registeredAddress" id="registeredAddress" v-if="!isQuota">
        <div class="a-blue-color more grayWrap" @click="openMapWindow(1)"><van-icon name="location" color="#1572F9;" style="margin-right: 0.1rem" /> {{ demandForm.registeredAddress || '选择地址'}}</div>
      </el-form-item>

      <el-form-item label="法定代表人" :rules="[
        { validator: checkLegalPerson, trigger: 'change' },
      ]" prop="legalPerson" id="legalPerson" v-if="!isQuota">
        <el-input v-model="demandForm.legalPerson" placeholder="法定代表人姓名" />
      </el-form-item>

      <el-form-item label="注册资本" :rules="[
        { validator: checkRegisteredCapital, trigger: 'change' },
      ]" prop="registeredCapital" id="registeredCapital" v-if="!isQuota">
        <div class="flex">

          <el-select v-if="isEdit" v-model="demandForm.currency" placeholder="币别" class="flex1" style="margin-right: 2vw">
            <el-option
              v-for="item in currencyList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <span v-else class="relative">{{ currencyList[demandForm.currency - 1].label }}</span>

          <el-input v-model="demandForm.registeredCapital"  @focus="deleteComma('registeredCapital')" @change="($value) => transComma($value ,'registeredCapital')" @blur="blurTrans('registeredCapital')" class="flex2" placeholder="数字" />
        </div>
      </el-form-item>

      <el-form-item label="结算币别" prop="settlementCurrency" id="settlementCurrency" v-if="!isQuota">
        <el-select v-if="isEdit" v-model="demandForm.settlementCurrency" placeholder="币别" class="flex1">
          <el-option
            v-for="item in currencyList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span v-else class="relative">{{ currencyList[demandForm.settlementCurrency - 1].label }}</span>
      </el-form-item>

      <el-form-item label="报价币别" prop="offerCurrency" id="offerCurrency">
        <el-select v-if="isEdit" v-model="demandForm.offerCurrency" placeholder="币别" class="flex1">
          <el-option
            v-for="item in currencyList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span v-else class="relative ui-cell">
          {{ currencyList[demandForm.offerCurrency - 1].label }}
          <div v-if="demandForm.offerCurrency!=1">
            <van-icon class="ml-20 mr-5" name="warning" color="#FA8603"/>
            <span class="fz-12" style="color: #FA8603;">所有报价请按此币别的金额维护</span>
          </div>
        </span>
      </el-form-item>

      <template v-if="isQuota && !isEdit">
        <slot name="quotaInfo" :data="demandForm"></slot>
        <el-form-item label="合作方式" label-width="90px">
          <el-radio-group v-model="demandForm.cooperateType" class="quotaRadio">
            <el-radio :label="1">保税加工</el-radio>
            <el-radio :label="2">国内加工</el-radio>
            <el-radio :label="3">纯垫资代采</el-radio>
          </el-radio-group>
        {{ demandForm.purchaseModel === 1 ? "客供" : "代采" }}
        </el-form-item>
        <!--7.0版本中发起报价页面外层不需要显示产品和价格工序，其他页面需要-->
        <el-form-item label="产品" v-if="!isQuotaInitiateQuotation">
          {{ demandForm.productName }}
        </el-form-item>
        <el-form-item label="加工工序" v-if="!isQuotaInitiateQuotation">
          <div>
            {{ demandForm.ideaProcessList.join(' + ') }}
            <van-icon class="showMoreIcon" :name="!quoteShowMore ? 'arrow-down' : 'arrow-up'" @click="changeQuoteShowMore"/>
            <!-- <van-icon name="arrow-up" /> -->
          </div>
        </el-form-item>
      </template>

      <el-form-item label="签约工厂" prop="contractFactoryId" id="contractFactoryId" v-if="!isQuota">
        <el-select v-if="isEdit" v-model="demandForm.contractFactoryId" placeholder="选择签约工厂" class="flex1">
          <el-option
            v-for="item in factory"
            :key="item.paramKey"
            :label="item.paramName"
            :value="item.paramValue"
          />
        </el-select>
        <span v-else class="relative">{{ getFactory(demandForm.contractFactoryId) }}</span>
      </el-form-item>

      <el-form-item :label="(isQuota && !isEdit) ? '' : '合作方式'" label-width="90px">
        <el-radio-group v-model="demandForm.cooperateType" v-if="!(isQuota && !isEdit)">
          <el-radio :label="1">保税加工</el-radio>
          <el-radio :label="2">国内加工</el-radio>
          <el-radio :label="3" v-if="!isQuota">纯垫资代采</el-radio>
        </el-radio-group>
        <div class="innerFormItem" :class="{'mrgin5': !isEdit}" v-if="(demandForm.cooperateType || demandForm.cooperateType === 0) && quoteShowMore">
          <el-form-item label="" v-if="demandForm.cooperateType != 3" prop="purchaseModel" id="purchaseModel"> <!-- 纯垫资代采不显示 -->
            <el-radio-group v-model="demandForm.purchaseModel" v-if="!(isQuota && !isEdit)">
              <el-radio :label="1">客供</el-radio>
              <el-radio :label="2">代采</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="公司信用情况" label-width="28vw" class="flex-cul" v-if="(demandForm.cooperateType == 2 && demandForm.purchaseModel == 2) || demandForm.cooperateType != 2 && !isQuota" prop="companyCredit" id="companyCredit"> <!-- 国内加工时，需要代采显示 -->
            <el-input v-model="demandForm.companyCredit" placeholder="文本" />
            <!-- <div class="flex-center" style="width: 4rem"><van-icon name="share" color="#0096FF" /></div> -->
          </el-form-item>

          <el-form-item label="垫资额度" label-width="20vw" :rules="[
            { validator: checkRegisteredCapital, trigger: 'change' },
          ]" prop="advanceQuota" id="advanceQuota" v-if="(demandForm.cooperateType == 2 && demandForm.purchaseModel == 2) || demandForm.cooperateType == 3"><!-- 需国内加工并代采显示 || 纯垫资代采显示 -->
            <div class="flex">
              <el-select v-if="isEdit" v-model="demandForm.advanceQuotaCurrency" placeholder="币别" class="flex1-5" style="margin-right: 2vw">
                <el-option
                  v-for="item in currencyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>

              <span v-else class="relative">{{ currencyList[demandForm.advanceQuotaCurrency - 1].label }}</span>

              <el-input v-model="demandForm.advanceQuota" class="flex2" @focus="deleteComma('advanceQuota')" @change="($value) => transComma($value ,'advanceQuota')" @blur="blurTrans('advanceQuota')" placeholder="数字" />
            </div>
          </el-form-item>

          <el-form-item label="垫资服务费率" label-width="28vw" :rules="[
              { validator: checkAdvanceRate, trigger: 'change' },
            ]" prop="advanceRate" id="advanceRate" v-if="demandForm.cooperateType == 3"> <!-- 纯垫资代采显示 -->
              <el-input v-if="isEdit" v-model="demandForm.advanceRate" placeholder="数字">
                <template #append>%</template>
              </el-input>
              <span v-else>{{ demandForm.advanceRate + ' %' }}</span>
            </el-form-item>
          <!--0.72 版本 在isQuota，并且是发布报价页面isQuotaInitiateQuotation，才在内层显示产品和产品工序-->
          <template v-if="isQuota && isQuotaInitiateQuotation" >
            <el-form-item label="产品" label-width="12vw" v-if="demandForm.cooperateType != 3" prop="productName" id="productName">
              <!-- <remoteSelectPro v-if="isEdit" @getProductInfo="getProductInfo" :initInfo="{id: demandForm.productId, name: demandForm.productName}"></remoteSelectPro>
              <el-input v-else v-model="demandForm.productName"></el-input> -->
            </el-form-item>
            <el-form-item label="加工工序" label-width="22vw" v-if="demandForm.cooperateType != 3" prop="ideaProcessList" id="ideaProcessList">
              <el-checkbox-group class="changeCheckMargin" v-model="demandForm.ideaProcessList">
                <el-checkbox :label="item.value" v-for="item in processDict" :key="item.name">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </template>
          <!--之前的还是走正常的流程-->
          <template v-if="!isQuota">
            <el-form-item label="产品" label-width="12vw" v-if="demandForm.cooperateType != 3" prop="productName" id="productName">
              <!-- <remoteSelectPro v-if="isEdit" @getProductInfo="getProductInfo" :initInfo="{id: demandForm.productId, name: demandForm.productName}"></remoteSelectPro>
              <el-input v-else v-model="demandForm.productName"></el-input> -->
            </el-form-item>
            <el-form-item label="加工工序" label-width="22vw" v-if="demandForm.cooperateType != 3" prop="ideaProcessList" id="ideaProcessList">
              <el-checkbox-group class="changeCheckMargin" v-model="demandForm.ideaProcessList">
                <el-checkbox :label="item.value" v-for="item in processDict" :key="item.name">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </template>
          <el-form-item label="费用承担" label-width="22vw" v-if="demandForm.cooperateType != 3">
            <div>
              <div style="width: 100%">
                <el-checkbox v-model="demandForm.smeltTool" label="钢网冶具费" />
                <div v-if="demandForm.smeltTool" class="innerForm">
                  <el-form-item label="" prop="smeltToolFee" id="smeltToolFee" :style="{'marginBottom': isEdit ? '4.8vw' : '0'}">
                    <el-radio-group v-model="demandForm.smeltToolFee">
                      <div style="margin: 0; width: 100%" class="flex">
                        <el-radio :label="1">我司</el-radio>
                        <el-input style="width: 36vw" v-show="demandForm.smeltToolFee == 1" v-model="demandForm.smeltToolFeeText"  placeholder="文字" />
                      </div>
                      <div style="margin: 0; width: 100%" class="flex">
                        <el-radio :label="2">客户</el-radio>
                        <el-input style="width: 36vw" v-if="demandForm.smeltToolFee == 2" v-model="demandForm.smeltToolFeeText"  placeholder="文字" />
                      </div>

                    </el-radio-group>
                  </el-form-item>
                </div>
              </div>


              <template v-if="demandForm.cooperateType == 2">
                <div style="width: 100%">
                  <el-checkbox v-model="demandForm.materialCost" label="物流费" />
                  <el-form-item v-if="demandForm.materialCost" label="" prop="materialCostType" id="materialCostType" :style="{'marginBottom': isEdit ? '4.8vw' : '0'}">
                    <div style="margin-left: 0.5rem" v-if="demandForm.materialCost">
                      <el-radio-group v-model="demandForm.materialCostType">
                        <el-radio :label="1">我司</el-radio>
                        <el-radio :label="2">客户</el-radio>
                      </el-radio-group><br />
                    </div>
                  </el-form-item>
                </div>
              </template>

              <!-- 合作方式为保税 -->
              <template v-if="demandForm.cooperateType == 1">
                <div style="width: 100%">
                  <el-checkbox v-model="demandForm.materialCost" label="物流费 物料进 成品出" />
                  <div v-if="demandForm.materialCost" class="innerForm">
                    <el-form-item label="进口物料 承担方" label-width="32vw" :class="{'flex-cul': isEdit}" prop="importMaterialBear" id="importMaterialBear">
                      <el-radio-group v-model="demandForm.importMaterialBear">
                        <el-radio :label="1">我司</el-radio>
                        <el-radio :label="2">客户</el-radio>
                      </el-radio-group><br />
                    </el-form-item>

                    <el-form-item label="出口成品 承担方" label-width="32vw" :class="{'flex-cul': isEdit}" prop="exportProductBear" id="exportProductBear">
                      <el-radio-group v-model="demandForm.exportProductBear">
                        <el-radio :label="1">我司</el-radio>
                        <el-radio :label="2">客户</el-radio>
                      </el-radio-group><br />
                    </el-form-item>

                    <el-form-item label="报关费用 承担方" label-width="32vw" :class="{'flex-cul': isEdit}" prop="customsCostBear" id="customsCostBear">
                      <el-radio-group v-model="demandForm.customsCostBear">
                        <el-radio :label="1">我司</el-radio>
                        <el-radio :label="2">客户</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                </div>
              </template>


              <div class="flex">
                <el-checkbox v-model="demandForm.otherCheck" label="其他" style="margin-right: 4vw" />
                <el-form-item v-if="demandForm.otherCheck" label="" class="flex-cul" prop="other" id="other">
                  <!-- <el-input :rows="3" maxlength="200" type="textarea" style="width: 36vw" v-model="demandForm.other"  placeholder="文字" /> -->
                  <el-input v-if="isEdit" :rows="3" type="textarea" style="width: 36vw" maxlength="200" v-model="demandForm.other" placeholder="文字"></el-input>
                  <div v-else style="width: 100%; white-space: pre-line">{{ demandForm.other }}</div>
                </el-form-item>

              </div>
            </div>
          </el-form-item>

          <el-form-item label="入料途径" label-width="90px" v-if="demandForm.cooperateType === 1" id="material" :class="{'changeMarginTo5': !isEdit}">
            <div>
              <!-- <span class="e-gray-color">物料</span> -->
              <el-form-item label="物料" label-width="11vw" prop="material" id="material" :class="{'changeMarginTo5': !isEdit}">
                <el-checkbox-group v-model="demandForm.material">
                  <el-checkbox :label="1">HK入料</el-checkbox>
                  <el-checkbox :label="2">国内转厂</el-checkbox>
                </el-checkbox-group>
              </el-form-item>

            </div>
          </el-form-item>

          <el-form-item label="" label-width="90px" v-if="demandForm.cooperateType === 1" id="packageMaterial" :class="{'changeMarginTo5': !isEdit}">
            <div>
              <!-- <span class="e-gray-color">包材</span> -->
              <el-form-item label="包材" label-width="11vw" prop="packageMaterial" id="packageMaterial" :class="{'changeMarginTo5': !isEdit}">
                <el-checkbox-group v-model="demandForm.packageMaterial">
                  <el-checkbox :label="1">HK入料</el-checkbox>
                  <el-checkbox :label="2">国内转厂</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </el-form-item>


          <template v-if="demandForm.purchaseModel == 2 && demandForm.cooperateType == 1"> <!-- 保税加工、且代采显示 -->
            <el-form-item label="垫资额度" label-width="20vw" :rules="[
              { validator: checkRegisteredCapital, trigger: 'change' },
            ]" prop="advanceQuota" id="advanceQuota">
              <div class="flex">
                <el-select v-if="isEdit" v-model="demandForm.advanceQuotaCurrency" placeholder="币别" class="flex1-5" style="margin-right: 2vw">
                  <el-option
                    v-for="item in currencyList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>

                <span v-else class="relative">{{ currencyList[demandForm.advanceQuotaCurrency - 1].label }}</span>

                <el-input v-model="demandForm.advanceQuota" class="flex2" @focus="deleteComma('advanceQuota')" @change="($value) => transComma($value ,'advanceQuota')" @blur="blurTrans('advanceQuota')" placeholder="数字" />
              </div>
            </el-form-item>

            <el-form-item label="垫资服务费率" label-width="28vw" :rules="[
              { validator: checkAdvanceRate, trigger: 'change' },
            ]" prop="advanceRate" id="advanceRate">
              <el-input v-if="isEdit" v-model="demandForm.advanceRate" placeholder="数字">
                <template #append>%</template>
              </el-input>
              <span v-else>{{ demandForm.advanceRate + ' %' }}</span>
            </el-form-item>

            <el-form-item label="垫资本金范围" label-width="28vw" prop="advanceCapitalCurrency" id="advanceCapitalCurrency">
              <el-select v-model="demandForm.advanceCapitalCurrency" placeholder="币别" class="flex1-5" v-if="isEdit">
                <el-option
                  v-for="item in currencyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <div v-if="!isEdit"><span style="margin-right: 4vw">{{ currencyList[demandForm.advanceCapitalCurrency - 1].label }}</span> {{ demandForm.advanceQuotaMin }} - {{ demandForm.advanceQuotaMax }}</div>
              <el-form-item label="范围" style="margin-top: 0.5rem" class="flex-cul" v-if="isEdit">
                <el-form-item label="" label-width="0vw" :rules="[
                  { validator: checkRangeMin, trigger: 'change' },
                ]" prop="advanceQuotaMin" id="advanceQuotaMin" class="flex1">
                  <el-input v-model="demandForm.advanceQuotaMin"  @focus="deleteComma('advanceQuotaMin')" @change="($value) => transComma($value ,'advanceQuotaMin')" @blur="blurTrans('advanceQuotaMin')" placeholder="数字" />
                </el-form-item>
                <span style="margin: 0 2vw">-</span>
                <el-form-item label="" label-width="0vw" :rules="[
                  { validator: checkRangeMax, trigger: 'change' },
                ]" prop="advanceQuotaMax" id="advanceQuotaMax" class="flex1">
                  <el-input v-model="demandForm.advanceQuotaMax"  @focus="deleteComma('advanceQuotaMax')" @change="($value) => transComma($value ,'advanceQuotaMax')" @blur="blurTrans('advanceQuotaMax')" placeholder="数字" />
                </el-form-item>
              </el-form-item>

            </el-form-item>
          </template>

          <template v-if="demandForm.cooperateType != 3">
            <el-form-item label="物料损耗率" label-width="90px" :rules="[
              { validator: demandForm.lossA ? checkAdvanceRate : '', trigger: 'change' },
            ]" prop="lossARate" id="lossARate" style="margin-bottom: 4vw" v-if="isEdit || demandForm.lossA">
              <div class="flex">
                <el-checkbox v-model="demandForm.lossA" label="A料" style="margin-right: 4vw" />
                <template v-if="demandForm.lossA">
                  <el-input v-if="isEdit" v-model="demandForm.lossARate" placeholder="数字">
                    <template #append>%</template>
                  </el-input>
                  <span v-else>{{ demandForm.lossARate + ' %' }}</span>
                </template>
              </div>
            </el-form-item>

            <el-form-item label="" label-width="90px" :rules="[
                { validator: demandForm.lossB ? checkAdvanceRate : '', trigger: 'change' },
              ]" prop="lossBRate" id="lossBRate" style="margin-bottom: 4vw" v-if="isEdit || demandForm.lossB">
              <div class="flex">
                <el-checkbox v-model="demandForm.lossB" label="B料" style="margin-right: 4vw" />
                <template v-if="demandForm.lossB">
                  <el-input v-if="isEdit" v-model="demandForm.lossBRate" placeholder="数字">
                    <template #append>%</template>
                  </el-input>
                  <span v-else>{{ demandForm.lossBRate + ' %' }}</span>
                </template>
              </div>
            </el-form-item>

            <el-form-item label="" label-width="90px" :rules="[
                { validator: demandForm.lossC ? checkAdvanceRate : '', trigger: 'change' },
              ]" prop="lossCRate" id="lossCRate" v-if="isEdit || demandForm.lossC">
              <div class="flex">
                <el-checkbox v-model="demandForm.lossC" label="C料" style="margin-right: 4vw" />
                <template v-if="demandForm.lossC">
                  <el-input v-if="isEdit" v-model="demandForm.lossCRate" placeholder="数字">
                    <template #append>%</template>
                  </el-input>
                  <span v-else>{{ demandForm.lossCRate + ' %' }}</span>
                </template>
              </div>
            </el-form-item>
          </template>

          <el-form-item label="成品报废率" label-width="90px" :rules="[
              { validator: checkAdvanceRate, trigger: 'change' },
            ]" prop="scrapRate" id="scrapRate" v-if="demandForm.cooperateType != 3 && !isQuota">
            <el-input v-if="isEdit" v-model="demandForm.scrapRate" placeholder="数字">
              <template #append>%</template>
            </el-input>
            <span v-else>{{ demandForm.scrapRate + ' %' }}</span>
          </el-form-item>

          <el-form-item label="结工单要求" label-width="90px" v-if="demandForm.cooperateType != 3 && !isQuota" prop="workOrderAsk" id="workOrderAsk">
            <el-input v-if="isEdit" :rows="3" maxlength="200" type="textarea" v-model="demandForm.workOrderAsk" placeholder="文字"></el-input>
            <div v-else class="textAreaTextWrap">
              {{ demandForm.workOrderAsk }}
            </div>
          </el-form-item>

          <el-form-item label="出货要求" label-width="90px" v-if="demandForm.cooperateType != 3" prop="shipmentAskList" id="shipmentAskList">
            <el-checkbox-group v-model="demandForm.shipmentAskList">
              <el-checkbox :label="'散货出'">散货出</el-checkbox>
              <el-checkbox :label="'栈板出'">栈板出</el-checkbox>
              <el-checkbox :label="'静电箱出'">静电箱出</el-checkbox>
              <el-checkbox :label="'周转箱出'">周转箱出</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="回购条款" label-width="90px" v-if="demandForm.cooperateType != 3 && !isQuota" prop="buybackProvision" id="buybackProvision">
            <div style="width: 100%">
              <el-radio-group v-model="demandForm.buybackProvision">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group><br />
            </div>

            <template v-if="demandForm.buybackProvision == 1">
              <el-form-item label="库存回购天数" label-width="28vw" style="margin-top: 0" prop="buybackDays" id="buybackDays" :rules="[
                { validator: checkRegisteredCapital, trigger: 'change' },
              ]">
                <el-input v-if="isEdit" v-model="demandForm.buybackDays" :min="0" placeholder="数字"></el-input>
                <div v-else style="width: 100%">{{ demandForm.buybackDays }}</div>
              </el-form-item>

              <el-form-item label="回购对账要求" label-width="28vw" class="flex-cul" prop="buybackAsk" id="buybackAsk">
                <el-input v-if="isEdit" :rows="3" type="textarea" maxlength="200" v-model="demandForm.buybackAsk" placeholder="文字"></el-input>
                <div v-else style="width: 100%; white-space: pre-line">{{ demandForm.buybackAsk }}</div>
              </el-form-item>
            </template>

          </el-form-item>

          <el-form-item label="成品售后条款" label-width="28vw" v-if="demandForm.cooperateType != 3 && !isQuota" prop="afterSalesProvision" id="afterSalesProvision">
            <el-input v-if="isEdit" :rows="3" type="textarea" maxlength="200" v-model="demandForm.afterSalesProvision" placeholder="文字"></el-input>
            <div v-else class="textAreaTextWrap">{{ demandForm.afterSalesProvision }}</div>
          </el-form-item>

          <el-form-item label="付款条件" label-width="90px" :class="{'changeMaterialCheckMargin': isEdit, 'changeMarginTo5': !isEdit}" v-if="!isQuota">
            <el-checkbox style="width: 100%" v-model="demandForm.materialCheck" label="材料款" />
            <div v-if="demandForm.materialCheck" style="width: 60vw">
              <span class="e-gray-color" style="padding-left: 4vw;">对账周期</span>
              <el-form-item label="" label-width="0vw" class="flex-cul" prop="materialAccountCycleType" id="materialAccountCycleType" :class="{'changeMarginTo5': !isEdit}">
                <el-select v-model="demandForm.materialAccountCycleType" placeholder="请选择">
                  <el-option
                    v-for="item in accountCycleTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <span class="e-gray-color" style="padding-left: 4vw;">账期</span>
              <el-form-item label="" label-width="0vw" class="flex-cul" prop="materialAccountCycle" id="materialAccountCycle" :class="{'changeMarginTo5': !isEdit}">
                <el-select v-model="demandForm.materialAccountCycle" placeholder="请选择">
                  <el-option
                    v-for="item in accountCycleList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <span class="e-gray-color" style="padding-left: 4vw;">结算起始点</span>
              <el-form-item label="" label-width="0vw" class="flex-cul" prop="materialInitiationPoint" id="materialInitiationPoint" :class="{'changeMarginTo5': !isEdit}">
                <el-select v-model="demandForm.materialInitiationPoint" placeholder="请选择">
                  <el-option
                    v-for="item in innitiationPointList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>

            <el-checkbox style="width: 100%" v-model="demandForm.otherAccountCheck" label="其他款项" />
            <div v-if="demandForm.otherAccountCheck" style="width: 60vw">
              <span class="e-gray-color" style="padding-left: 4vw;">对账周期</span>
              <el-form-item label="" label-width="0vw" class="flex-cul" prop="otherAccountCycleType" id="otherAccountCycleType" :class="{'changeMarginTo5': !isEdit}">
                <el-select v-model="demandForm.otherAccountCycleType" placeholder="请选择">
                  <el-option
                    v-for="item in accountCycleTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <span class="e-gray-color" style="padding-left: 4vw;">账期</span>
              <el-form-item label="" label-width="0vw" class="flex-cul" prop="otherAccountCycle" id="otherAccountCycle" :class="{'changeMarginTo5': !isEdit}">
                <el-select v-model="demandForm.otherAccountCycle" placeholder="请选择">
                  <el-option
                    v-for="item in accountCycleList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <span class="e-gray-color" style="padding-left: 4vw;">结算起始点</span>
              <el-form-item label="" label-width="0vw" class="flex-cul" prop="otherInitiationPoint" id="otherInitiationPoint" :class="{'changeMarginTo5': !isEdit}">
                <el-select v-model="demandForm.otherInitiationPoint" placeholder="请选择">
                  <el-option
                    v-for="item in innitiationPointList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>

            <el-checkbox style="width: 100%" v-model="demandForm.processCycleTypeCheck" label="加工费款项" />
            <div v-if="demandForm.processCycleTypeCheck" style="width: 60vw">
              <span class="e-gray-color" style="padding-left: 4vw;">对账周期</span>
              <el-form-item label="" label-width="0vw" class="flex-cul" prop="processCycleType" id="processCycleType" :class="{'changeMarginTo5': !isEdit}">
                <el-select v-model="demandForm.processCycleType" placeholder="请选择">
                  <el-option
                    v-for="item in accountCycleTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <span class="e-gray-color" style="padding-left: 4vw;">账期</span>
              <el-form-item label="" label-width="0vw" class="flex-cul" prop="processCycle" id="processCycle" :class="{'changeMarginTo5': !isEdit}">
                <el-select v-model="demandForm.processCycle" placeholder="请选择">
                  <el-option
                    v-for="item in accountCycleList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <span class="e-gray-color" style="padding-left: 4vw;">结算起始点</span>
              <el-form-item label="" label-width="0vw" class="flex-cul" prop="processInitiationPoint" id="processInitiationPoint" :class="{'changeMarginTo5': !isEdit}">
                <el-select v-model="demandForm.processInitiationPoint" placeholder="请选择">
                  <el-option
                    v-for="item in innitiationPointList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>

            <el-checkbox style="width: 100%" v-model="demandForm.defaultClause" label="违约条款" />
            <el-form-item v-if="demandForm.defaultClause"  label="" label-width="0vw" class="flex-cul" prop="defaultClauseText" id="defaultClauseText" :class="{'changeMarginTo5': !isEdit}">
              <el-input v-if="isEdit"  :rows="3" type="textarea" maxlength="200" v-model="demandForm.defaultClauseText" placeholder="文字"></el-input>
              <div class="textAreaTextWrap" v-else>{{ demandForm.defaultClauseText }}</div>
            </el-form-item>
          </el-form-item>

          <el-form-item label="我方与供应商协议" label-width="90%" class="flex-cul" v-if="demandForm.cooperateType != 1 && !isQuota" prop="supplierFileList" id="supplierFileList">
            <div class="vantUploadWrap">
              <div style="width: 100%; margin: 0.5rem 0" v-if="isEdit">
                <vantUpload @getFileInfo="getFileInfo" :filesList="demandForm.supplierFileList"></vantUpload>
              </div>
              <!-- <businessFileList :fileList="demandForm.supplierFileList" @removeFile="removeFile" :showDelete="isEdit"></businessFileList> -->
            </div>
          </el-form-item>

          <el-form-item label="开票要求" label-width="90px" :prop="demandForm.cooperateType == 3 ? 'invoiceAskListRadio' : 'invoiceAskList'" :id="demandForm.cooperateType == 3 ? 'invoiceAskListRadio' : 'invoiceAskList'" v-if="!isQuota">
            <template v-if="demandForm.cooperateType != 3">
              <el-checkbox-group v-model="demandForm.invoiceAskList" class="changeCheckMargin">
                <el-checkbox :label="'成品发票'">成品发票</el-checkbox>
                <el-checkbox :label="'加工费发票'">加工费发票</el-checkbox>
                <el-checkbox :label="'材料费发票'">材料费发票</el-checkbox><br/>
                <el-checkbox :label="'服务费发票'">服务费发票</el-checkbox>
              </el-checkbox-group>
            </template>
            <template v-else>
              <el-radio-group v-model="demandForm.invoiceAskListRadio">
                <div style="width: 100%"><el-radio :label="'材料费发票'">材料费发票</el-radio></div>
                <div style="width: 100%"><el-radio :label="'服务费发票'">服务费发票</el-radio></div>
                <div style="width: 100%"><el-radio :label="'不开票'">不开票</el-radio></div>
              </el-radio-group>
            </template>

          </el-form-item>

          <el-form-item label="售后条件" label-width="90px" v-if="demandForm.cooperateType == 3">
            <el-input v-if="isEdit" :rows="3" type="textarea" maxlength="200" v-model="demandForm.afterSalesAsk" placeholder="文字"></el-input>
            <div class="textAreaTextWrap" v-else>{{ demandForm.afterSalesAsk }}</div>
          </el-form-item>

          <el-form-item label="对等性" label-width="90px" v-if="demandForm.cooperateType == 3">
            <el-radio-group v-model="demandForm.parity">
              <div style="width: 100%">
                <el-radio :label="1">对等</el-radio>
                <el-form-item style="width: 58vw" v-if="demandForm.parity == 1 && isEdit" label="" label-width="0vw" prop="parityReason" id="parityReason">
                  <el-input :rows="3" type="textarea" maxlength="200" v-model="demandForm.parityReason"  placeholder="文字" />
                  <div class="textAreaTextWrap" v-if="!isEdit">{{ demandForm.parityReason }}</div>
                </el-form-item>
              </div>
              <div style="width: 100%">
                <el-radio :label="2">不对等</el-radio>
                <el-form-item style="width: 58vw" v-if="demandForm.parity == 2 && isEdit" label="" label-width="0vw" prop="parityReason" id="parityReason">
                  <el-input :rows="3" type="textarea" maxlength="200" v-model="demandForm.parityReason"  placeholder="文字" />
                  <div class="textAreaTextWrap" v-if="!isEdit">{{ demandForm.parityReason }}</div>
                </el-form-item>
              </div>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form-item>

      <el-form-item label="" label-width="4vw" :prop="demandForm.remarksCheck ? 'remarks' : 'remarks2'" :id="demandForm.remarksCheck ? 'remarks' : 'remarks2'" v-if="!isQuota">
        <el-checkbox style="width: 100%" v-model="demandForm.remarksCheck" label="其他补充" />
        <el-input v-if="demandForm.remarksCheck && isEdit" :rows="3" type="textarea" maxlength="200" v-model="demandForm.remarks" placeholder="文字"></el-input>
        <div v-if="!isEdit" class="textAreaTextWrap">{{ demandForm.remarks }}</div>
        <div class="vantUploadWrap">
          <div style="width: 100%; margin: 0.5rem 0" v-if="isEdit && demandForm.fileList.length < 5">
            <vantUpload @getFileInfo="getOtherFileInfo" :filesList="demandForm.fileList"></vantUpload>
          </div>
          <!-- <businessFileList :fileList="demandForm.fileList" @removeFile="removeOtherFile" :showDelete="isEdit"></businessFileList> -->
        </div>
      </el-form-item>

      <el-form-item label="业务姓名" prop="businessName" id="businessName" v-if="!isQuota">
        <div class="flex ui-cell-sb" style="width: 100%">
          <span>{{ isEdit? nickName:demandForm.businessName }}</span>
          <span class="e-gray-color">{{ demandForm.createdTime ? getYMD(demandForm.createdTime) : '' }}</span>
        </div>
      </el-form-item>
    </el-form>
    <!-- 地图窗口 -->
    <div class="mapWindow" v-show="mapWindow">
      <Gaodemap @getAddressInfo='getAddressInfo' :lnglat="reAdress" v-model="mapWindow" :isEdit="isEdit"></Gaodemap>
    </div>
  </div>

</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, reactive, watch, onMounted } from 'vue';
import employeeNumberOptionsList from '@/enum/employeeNumberOptions'; // 员工人数
import currencyArr from '@/enum/currencyList'; // 员工人数
  import remoteSelectInput from "./remoteSelectInput.vue"

  // import remoteSelectPro from "./remoteSelectPro.vue"
  // import businessFileList from "./businessFileList.vue"
  import checkName from "./../utils/checkName"
  import addComma from "./../utils/addComma"
  import { getYMD } from './../utils/timeFormat'
  // import {customerDetailInfo, changeCustomerState, customerInfo, getHttpInternalOfferBusinessInfo} from "@/api/business"
  import { useUserStore } from '@/store/modules/user'
  import { useBusinessStore } from "@/store/modules/business"
  // import { openLoading, closeLoading, failTip, successTip } from "@/utils/toastTips"
  import statusList from "./../utils/businessStatus"

  import bus from "@/utils/bus"
  import {getItem} from "@/utils/utils";
  import {useDictStore} from "@/store/modules/dict";
  /* pinia */
  const userStore = useUserStore()
  const { nickName, userId } = userStore
  const businessStore = useBusinessStore()
  // const { id, state, cusId } = storeToRefs(businessStore)
  /* route */
  const route = useRoute()
  const router = useRouter()

  const props = defineProps(["submitForm", "setMeetingInfo"])

  const ruleFormRef = ref()

  const isQuota = ref(false) //v7.2
  const isQuotaInitiateQuotation = ref(false) //v.7.2 发起报价
  const processDict= [
        {name:'SMT',value:'SMT'},
        {name:'DIP',value:'DIP'},
        {name:'TEST',value:'TEST'},
        {name:'ASM',value:'ASM'},
        {name:'PACK',value:'PACK'}
      ]
  if (route.fullPath.indexOf("/quote/") > -1 ) {
    isQuota.value = true
  }
  if (route.fullPath.indexOf("/quote/initiateQuotation") > -1 ) {
    isQuotaInitiateQuotation.value = true
  }

  /* 报价规则展示更多 */
  const quoteShowMore = ref(true)
  if (isQuota.value && !isQuotaInitiateQuotation.value) {
    quoteShowMore.value = false
  }

  /* 改变显隐 */
  const changeQuoteShowMore = () => {
    quoteShowMore.value = !quoteShowMore.value
  }

  const demandForm = ref({
    status: null, // 会议状态
    customerName: '', // 用户名称
    customerId: '', // 用户id
    officeBuild: null, // 厂房信息 0自有/1租赁
    employeeNumber: '', // 员工人数
    officeAddress: '', // 办公地址
    officeLongitude: '', // 办公地址经度
    officeLatitude: '', // 纬度
    registeredAddress: '', // 注册地址
    registeredLongitude: '', // 经度
    registeredLatitude: '', // 纬度
    legalPerson: '', // 法定代表人
    registeredCapital: '', // 注册资本
    currency: 1, // 注册资本币别
    settlementCurrency: 1, // 结算币别
    offerCurrency: 1, // 报价币别
    contractFactoryId: null, // 签约工厂
    cooperateType: null, // 合作方式
    purchaseModel: null, // 采购方式
    companyCredit: '', // 公司信用情况
    productName: '', // 产品
    productId: '', // 产品
    ideaProcessList: [], // 加工工序
    /* 费用承担 */
    smeltTool: false, // 钢网冶具费, 上传需删掉
    smeltToolFee: null, // 承担方
    smeltToolFeeText: '', // 费用文本

    materialCost: null, // 物流费（物料进 成品出）;1 是 2 否
    materialCostType: null, // 物流费, 需转换费数字1，2
    importMaterialBear: null, // 进出口料承担方 2 客户
    exportProductBear: null, // 出口成品承担方 2 客户
    customsCostBear: null, // 报关费用承担方 2 客户

    other: '', // 其他文本
    otherCheck: false, // 需删

    /* 入料途径 */
    material: [], // 物料 1 HK入料 2 国内转厂
    packageMaterial: [], // 包材

    /* 垫资 */
    advanceQuotaCurrency: 1, // 币别
    advanceQuota: '', // 额度
    advanceRate: 0, // 垫资服务率
    advanceCapitalCurrency: 1, // 垫资本金币别
    advanceQuotaMin: '', // 垫资本金最小值
    advanceQuotaMax: '', // 垫资本金最大值

    /* 物料损耗率 */
    // 提交需转换为lossRateList 字符串数组
    lossA: false,
    lossARate: '',
    lossB: false,
    lossBRate: '',
    lossC: false,
    lossCRate: '',

    scrapRate: '', // 成品报废率
    workOrderAsk: '', // 结工单要求
    shipmentAskList: [], // 出货要求
    // invoiceAskListRadio: null,

    /* 回购条款 */
    buybackProvision: null, // 回购条款
    buybackDays: null, // 回购天数
    buybackAsk: '', // 回购对账要求

    /* 付款条件 */
    materialCheck: false, // 需删
    materialAccountCycleType: '', // 对账周期
    materialAccountCycle: '', // 账期
    materialInitiationPoint: '', // 结算起始点

    otherAccountCheck: false, // 需删
    otherAccountCycleType: '', // 对账周期(其它)
    otherAccountCycle: '', // 账期
    otherInitiationPoint: '', // 结算起始点

    processCycleTypeCheck: false, // 需删
    processCycleType: '', // 对账周期(其它)
    processCycle: '', // 账期
    processInitiationPoint: '', // 结算起始点

    defaultClause: null, // 违约条款;1 是 2 否
    defaultClauseText: '', // 违约条款文本

    invoiceAskList: [], // 开票要求
    invoiceAskListRadio: null,

    supplierFileList: [], // 我方与供应商协议文件列表
    afterSalesAsk: '', // 售后条件

    /* 对等性 */
    parity: null, // 对等性;1 对等 2 不对等
    parityReason: '', // 对等性原因

    remarksCheck: false, // 上传需删
    remarks: '',

    fileList: [], // 附件

    businessName: '',
    userId: '',
  })

  const formRule = reactive({
    employeeNumber: [{ required: true, message: '请选择员工人数', trigger: 'blur' }],
    officeAddress: [{ required: true, message: '请选择办公地址', trigger: 'blur' }],
    registeredAddress: [{ required: true, message: '请选择注册地址', trigger: 'blur' }],
    companyCredit: [{ required: true, message: '请填写公司信用情况', trigger: 'blur' }],
    productName: [{ required: true, message: '请填写产品名称', trigger: 'change' }],
    ideaProcessList: [ {type: 'array', required: true, message: '请至少选择一项', trigger: 'change'} ],
    shipmentAskList: [ {type: 'array', required: true, message: '请至少选择一项', trigger: 'change'} ],
    invoiceAskListRadio: [ {required: true, message: '请选择', trigger: 'change'} ],
    buybackDays: [{ required: true, message: '请填写回购天数', trigger: 'change' }],
    materialAccountCycleType: [{ required: true, message: '请选择对账周期', trigger: 'blur' }], // 对账周期
    materialAccountCycle: [{ required: true, message: '请选择账期', trigger: 'blur' }], // 账期
    materialInitiationPoint: [{ required: true, message: '请选择结算起始点', trigger: 'blur' }], // 结算起始点
    otherAccountCycleType: [{ required: true, message: '请选择对账周期', trigger: 'blur' }], // 对账周期(其它)
    otherAccountCycle: [{ required: true, message: '请选择账期', trigger: 'blur' }],
    otherInitiationPoint: [{ required: true, message: '请选择结算起始点', trigger: 'blur' }],

    processCycleType: [{ required: true, message: '请选择对账周期', trigger: 'blur' }], // 对账周期(其它)
    processCycle: [{ required: true, message: '请选择账期', trigger: 'blur' }],
    processInitiationPoint: [{ required: true, message: '请选择结算起始点', trigger: 'blur' }],

    defaultClauseText: [{ required: true, message: '请填写违约条款', trigger: 'blur' }],
    invoiceAskList: [ {type: 'array', required: true, message: '请至少选择一项', trigger: 'change'} ],
    supplierFileList: [ {type: 'array', required: true, message: '请上传协议', trigger: 'change'} ],
    workOrderAsk: [{ required: true, message: '请填写要求', trigger: 'blur' }],
    buybackAsk: [{ required: true, message: '请填写要求', trigger: 'blur' }],
    afterSalesProvision: [{ required: true, message: '请填写条款', trigger: 'blur' }],
    parityReason: [{ required: true, message: '请填写对等性', trigger: 'blur' }],
    remarks: [{ required: true, message: '请填写内容', trigger: 'blur' }],
    remarks2: [{ required: false }],
    // businessName: [{ required: true, message: '获取业务员姓名失败', trigger: 'blur' }],

    officeBuild: [{ required: true, message: '请选择', trigger: 'blur' }],
    currency: [{ required: true, message: '请选择', trigger: 'blur' }], // 注册资本币别
    settlementCurrency: [{ required: true, message: '请选择', trigger: 'blur' }],
    offerCurrency: [{ required: true, message: '请选择', trigger: 'blur' }],
    contractFactoryId: [{ required: true, message: '请选择', trigger: 'blur' }],
    cooperateType: [{ required: true, message: '请选择', trigger: 'blur' }], // 合作方式
    purchaseModel: [{ required: true, message: '请选择', trigger: 'blur' }], // 采购方式
    smeltToolFee: [{ required: true, message: '请选择', trigger: 'blur' }], // 承担方
    materialCostType: [{ required: true, message: '请选择', trigger: 'blur' }], // 物流费, 需转换费数字1，2
    importMaterialBear: [{ required: true, message: '请选择', trigger: 'blur' }], // 进出口料承担方 2 客户
    exportProductBear: [{ required: true, message: '请选择', trigger: 'blur' }], // 出口成品承担方 2 客户
    customsCostBear: [{ required: true, message: '请选择', trigger: 'blur' }], // 报关费用承担方 2 客户
    material: [ {type: 'array', required: true, message: '请至少选择一项', trigger: 'change'} ], // 物料 1 HK入料 2 国内转厂
    packageMaterial: [ {type: 'array', required: true, message: '请至少选择一项', trigger: 'change'} ], // 包材
    advanceQuotaCurrency: [{ required: true, message: '请选择', trigger: 'blur' }], // 币别
    advanceCapitalCurrency: [{ required: true, message: '请选择', trigger: 'blur' }], // 垫资本金币别
    buybackProvision: [{ required: true, message: '请选择', trigger: 'blur' }], // 回购条款
    parity: [{ required: true, message: '请选择', trigger: 'blur' }], // 对等性;1 对等 2 不对等
    other: [{ required: true, message: '请填写', trigger: 'blur' }],
  })

  const checkObj = { // 币别"
    "registeredCapital": "currency",
    "advanceQuota": "advanceQuotaCurrency"
  }

  const isEdit = ref(true)

  if (demandForm.value.status > 0) {
    isEdit.value = false
  }
  /* 客户名称*/
  /* 组件回调 */
  const getCustomerInfo = (info) => {
    if (typeof info === 'string') {
      demandForm.value.customerName = info
    } else {
      demandForm.value.customerName = info.name
      demandForm.value.customerId = info.id
    }
  }

  const checkCustomName = (rule, value, callback) => {
    if (!value) {
      callback(new Error("请填写客户名称"))
      return
    }
    // const info = checkName(value, "客户名称", 60)
    if (value.length > 60) {
      callback(new Error("超出长度限制！"))
      return
    }
    callback()
  }

  /* 员工人数 */
  const employeeNumberOptions = employeeNumberOptionsList

  /* 签约工厂 */
  // const {factory} = storeToRefs(useDictStore())
  const {factory} = useDictStore()
  console.log(factory);
  /* 获取签约工厂 */
  const getFactory = (id) => {
    let name = '--'
    for(let i of factory.value) {
      if (i.paramValue == id) {
        name = i.paramName
        break
      }
    }
    return name
  }

  /* 地图选取 */
  const mapWindow = ref(false)
  const addressType = ref(0)
  const reAdress = reactive({lng: 113.94027, lat: 22.512353})

  const openMapWindow = (type) => {
    window.openMap = () => {
      mapWindow.value = false
    }

    mapWindow.value = true
    addressType.value = type
    if (addressType.value && demandForm.value.registeredAddress) {
      reAdress.lng = demandForm.value.registeredLongitude
      reAdress.lat = demandForm.value.registeredLatitude
    }
    if (!addressType.value && demandForm.value.officeAddress) {
      reAdress.lng = demandForm.value.officeLongitude
      reAdress.lat = demandForm.value.officeLatitude
    }
  }

  const getAddressInfo = (info) => {
    const { name, lnglat } = info
    if (addressType.value) {
      demandForm.value.registeredAddress = name
      demandForm.value.registeredLongitude = lnglat.lng
      demandForm.value.registeredLatitude = lnglat.lat
      return
    }
    demandForm.value.officeAddress = name
    demandForm.value.officeLongitude = lnglat.lng
    demandForm.value.officeLatitude = lnglat.lat
  }

  /* 法定代表人 */
  const checkLegalPerson = (rule, value, callback) => {
    if (!value) {
      callback(new Error("请输入法定代表人姓名"))
    }
    const info = checkName(value, "名字", 20)
    if (info) {
      callback(new Error(info))
    }
    callback()
  }

  /* 注册资本 */
  const currencyList = currencyArr
  // 转换，号
  const transComma = (value, sttr) => {
    demandForm.value[sttr] = addComma(value)
  }
  // 第二次blur
  const blurTrans = (sttr) => {
    if (demandForm.value[sttr].indexOf(',') < 0) {
      demandForm.value[sttr] = addComma(demandForm.value[sttr])
    }
  }
  // 取消，号
  const deleteComma = (sttr) => {
    demandForm.value[sttr] = demandForm.value[sttr].replace(/[,]/g, '')
  }
  // 检查数字
  const checkRegisteredCapital = (rule, value, callback) => {
    if (!value && value !== 0) {
      callback(new Error('请输入数字'))
    }

    if ((value + '').length > 20) {
      callback(new Error('数字超长'))
      return
    }

    if(!Number.isInteger(Number((value + '').replace(/[,]/g, '')))){
      callback(new Error('只能为整数！'))
    }
    callback()
  }

  // 检查垫金范围
  const checkRangeMin = (rule, value, callback) => {
    if (!value && value !== 0) {
      callback(new Error('请输入数字'))
    }

    if ((value + '').length > 20) {
      callback(new Error('数字超长'))
      return
    }

    if(!Number.isInteger(Number((value + '').replace(/[,]/g, '')))){
      callback(new Error('只能为整数！'))
    }

    if (demandForm.value.advanceQuotaMax && value.replace(/[,]/g, '') > demandForm.value.advanceQuotaMax.replace(/[,]/g, '')) {
      callback(new Error('不能大于最大值'))
    } else {
      ruleFormRef.value.clearValidate(["advanceQuotaMax"])
    }
    callback()
  }

  const checkRangeMax = (rule, value, callback) => {
    if (!value && value !== 0) {
      callback(new Error('请输入数字'))
    }

    if ((value + '').length > 20) {
      callback(new Error('数字超长'))
      return
    }

    if(!Number.isInteger(Number((value + '').replace(/[,]/g, '')))){
      callback(new Error('只能为整数！'))
    }

    if (demandForm.value.advanceQuotaMin && demandForm.value.advanceQuotaMin.replace(/[,]/g, '') > value.replace(/[,]/g, '')) {
      callback(new Error('不能小于最小值'))
    } else {
      ruleFormRef.value.clearValidate(["advanceQuotaMin"])
    }
    callback()
  }

  /* 产品 */
  const getProductInfo = (info) => {
    if (typeof info === 'string') {
      demandForm.value.productName = info
    } else {
      demandForm.value.productName = info.productName
      demandForm.value.productId = info.id
    }
  }

  /* 垫资 */
  const checkAdvanceRate = (rule, value, callback) => {
    if (!value && value !== 0) {
      callback(new Error('请输入数字'))
      return
    }

    if ((value + '').length > 20) {
      callback(new Error('数字超长'))
      return
    }

    if(!(Number(value)) && Number(value) != 0){
      callback(new Error('只能为数字'))
    }
    if ((value + '').indexOf('.') > 0) {
      const valueList = (value + '').split('.')
      const endIndex = valueList.length - 1
      if (valueList[endIndex].length > 2) {
        callback(new Error('最多只能有两位小数'))
      }
    }
    callback()
  }

  /* 付款条件 */
  // 对账周期
  const accountCycleTypeList = window.accountCycleTypeList

  const accountCycleList = window.accountCycleList

  const innitiationPointList = window.innitiationPointList

  /* 我方与供应商协议 */
  const getFileInfo = (info) => {
    info.name = '国内加工-' + info.name
    demandForm.value.supplierFileList.push(info)
  }
  const removeFile = (info) => {
    demandForm.value.supplierFileList.splice(info.index, 1)
  }

  /* 其他 */
  const getOtherFileInfo = (info) => {
    demandForm.value.fileList.push(info)
  }
  const removeOtherFile = (info) => {
    demandForm.value.fileList.splice(info.index, 1)
  }

  /* 业务姓名 */
  // demandForm.value.businessName = nickName.value
  // demandForm.value.userId = userId.value

  /* 请求 */

  watch(() => route.name, ()=> {
    // if (route.name === "customerDemand" || route.name === "processDetail") {
    //   getFormData()
    // }
  }, { immediate: false })



  // const getFormData = () => {
  //   // openLoading()
  //   customerDetailInfo(route.params.id * 1)
  //     .then((res) => {
  //       if (res.code == 200) {
  //         if (res.msg == '暂无承载数据') {
  //           // closeLoading()
  //           // failTip(res.code + ' - 请求异常，暂无承载数据')
  //           return
  //         }
  //         // res.data.status = route.query.status
  //         if (res.data.status > 8) {
  //           // getOtherCustomerInfo(res.data.protocolId)
  //         }

  //         if (route.meta.status && res.data.status < route.meta.status) {
  //           router.push("/statusError")
  //           // closeLoading()
  //           return
  //         }

  //         const { customerBaseId, status, id, customerName } = res.data
  //         businessStore.updatePageInfo({id: customerBaseId, state: status, cusId: id, cusName: customerName})
  //         businessStore.updateData(res.data)

  //         setViewData(res.data)
  //       } else {
  //         // failTip(res.code + ' - ' + res.msg)
  //       }
  //       // closeLoading()
  //     })
  //     .catch((e) => {
  //       console.log("customerBaseInfo", e)
  //       // failTip('网络请求异常，请联系管理员')
  //     }).finally(() => {
  //       // closeLoading()
  //     })
  // }

  /* 提交 */
  const submit = async (flag) => {
    // console.log(demandForm.value)
    // submitForm新增第三个参数，如果是报价预览跳过来的，需要在提交后，再调一个关联报价id的操作，
    if (!demandForm.value.customerId) {
      // failTip("请先选择客户！")
      return
    }
    if (!flag) {
      props.submitForm(demandForm, flag,{isOutData:isOutData.value})
      return
    }
    if (!ruleFormRef) return
    await ruleFormRef.value.validate((valid, fields) => {
      if (valid) {
        props.submitForm(demandForm, flag,{isOutData:isOutData.value})
      } else {
        let key = Object.keys(fields)[0]
        document.querySelector('#' + key).scrollIntoView()
        // failTip("表单未填写完整，请完成后提交！")
      }
    })
  }

  onMounted(() => {
    /* 新增客户和填写客户报价规则不请求 */
    /* route.name !== "addDemand" && route.name !== "initiateQuotation" */
    // if (route.params.id) {
    //   getFormData()
    // }
  })

  bus.on("refreshData", () => {
    // getFormData()
  })

  /* 属性关联 */
  const setViewData = (info) => {
    Object.keys(info).forEach(item => {
      if (Array.isArray(info[item])) {
        if (info[item].length == 1 && (info[item][0] == '' || info[item][0] == 'null')) {
          info[item] = []
        }
      }
    })
    const loss = {
      lossA: true,
      lossARate: '',
      lossB: false,
      lossBRate: '',
      lossC: false,
      lossCRate: '',
      invoiceAskListRadio: '',
      // buybackProvision: ''
    }
    info = Object.assign(info, loss)
    /* 修改关联属性 */
    info.smeltToolFee && (info['smeltTool'] = true)
    if (info.cooperateType === 3) {
      info.invoiceAskListRadio = info.invoiceAskList[0]
    }

    // if (info.buybackDays || info.buybackAsk) {
    //   info.buybackProvision = 1
    // } else {
    //   info.buybackProvision = 2
    // }

    if (info.importMaterialBear || info.exportProductBear || info.customsCostBear || info.materialCost) {
      info['materialCost'] = true
    }
    info.other && (info['otherCheck'] = true)

    if (info.lossRateList.length) {
      info.lossRateList.forEach(item => {
        const strList = item.split(':')
        info['loss' + strList[0]] = true
        info['loss' + strList[0] + "Rate"] = strList[1].replace('%', '')
      })
    }

    if (info.materialAccountCycleType || info.materialAccountCycle || info.materialInitiationPoint) { info['materialCheck'] = true }

    if (info.otherAccountCycleType || info.otherAccountCycle || info.otherInitiationPoint) { info['otherAccountCheck'] = true }

    if (info.processCycleType || info.processCycle || info.processInitiationPoint) { info['processCycleTypeCheck'] = true }

    info.defaultClauseText && (info['defaultClause'] = true)
    info.defaultClause = info.defaultClause == 1 ? true : false

    info.remarks && (info['remarksCheck'] = true)

    const numList = ['advanceQuota', 'advanceQuotaMax', 'advanceQuotaMin', 'registeredCapital']
    numList.forEach(item => {
      info[item] = addComma(info[item])
    })

    info.material = info.material ? info.material.split(",").map(item => item * 1) : []
    info.packageMaterial = info.packageMaterial ? info.packageMaterial.split(",").map(item => item * 1) : []

    demandForm.value = info
    if (demandForm.value.status > 0) {
      if (demandForm.value.status === 6 && (route.name === 'customerDemand' || route.name === "processDetail")) {
        isEdit.value = true
        return
      }
      isEdit.value = false
    }
  }

  /* 修改用户状态 */
  // const changeState = (status, id) => {
  //   // openLoading()
  //   return new Promise(resolve => {
  //     changeCustomerState({status: status})
  //       .then((res) => {
  //         if (res.code == 200) {
  //           // successTip("修改成功")
  //           if (status == 1) {
  //             router.push({path: "/myClient"})
  //           }
  //         } else {
  //           // failTip(res.code + ' - ' + res.msg)
  //         }
  //         resolve()
  //         // closeLoading()
  //       })
  //       .catch((e) => {
  //         // failTip('网络请求异常，请联系管理员')
  //         resolve()
  //       })
  //   })
  // }

  /* 获取0.6的客户信息 */
  // const getOtherCustomerInfo = (id) => {
  //   // openLoading()
  //   customerInfo(id)
  //     .then((res) => {
  //       if (res.code == 200) {
  //         businessStore.updateProtocolData(res.data)
  //         businessStore.updateProtocolId(id)
  //       } else {
  //         // failTip(res.code + ' - ' + res.msg)
  //       }
  //       // closeLoading()
  //     })
  // }
  /* 提交时的数据转换 */
  const dataTrans = () => {
    return new Promise((res,rej)=>{
      if (!ruleFormRef) res({})
      ruleFormRef.value.validate((valid, fields) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(demandForm.value))
          params.status = 0

          /* 删除配合字段 */
          delete params.smeltTool
          delete params.otherCheck
          delete params.materialCheck
          delete params.otherAccountCheck
          delete params.remarksCheck

          /* 修改类型 */
          if (params.materialCost != null) {
            params.materialCost = params.materialCost ? 1 : 2
          }
          if (params.defaultClause != null) {
            params.defaultClause = params.defaultClause ? 1 : 2
          }

          if (params.cooperateType === 3) {
            params.invoiceAskList = [params.invoiceAskListRadio]
          }

          /* 修改数字 */
          const numList = ['advanceQuota', 'advanceQuotaMax', 'advanceQuotaMin', 'registeredCapital']
          numList.forEach(item => {
            params[item] = params[item].replace(/[,]/g, '') * 1
          })

          /* 物品损耗率数据转换 */
          params['lossRateList'] = []
          const l = ['A', 'B', 'C']
          l.forEach(item => {
            const name1 = 'loss' + item
            const name2 = `loss${item}Rate`
            if (params[name1]) {
              params.lossRateList.push(item + ':' + params[name2] + '%')
            }
            delete params[name1]
            delete params[name2]
          })
          res(params)
        } else {
          let key = Object.keys(fields)[0]
          document.querySelector('#' + key).scrollIntoView()
          // failTip("表单未填写完整，请完成后提交！")
          res({})
        }
      })
    })
  }
  /**
   * outData 从预览页面进来的
   * 1、把数据带过来，处理数据并成功渲染
   * 2、用传过来的数据，调一下新增客户
   * 3、暂存和发起审批成功后，调接口把客户ID绑定到报价单
   */
  let isOutData=ref(false)
  let remoteSelectInputRef=ref()
  watch(()=>route.query,async (val)=>{
    let data=getItem('outData')
    if(val.outData && data){
      isOutData.value=true
      delete data.offerDetail.advanceQuota
      delete data.offerDetail.advanceQuotaMax
      delete data.offerDetail.advanceQuotaMin
      delete data.offerDetail.registeredCapital
      delete data.offerDetail.id
      delete data.offerDetail.ideaProcess
      delete data.offerDetail.shipmentAsk
      demandForm.value = {
      ...demandForm.value,
      ...data.offerDetail
    }
    await nextTick()
    // 自动新建客户
    remoteSelectInputRef.value.submit(data?.customerName)
    }
  },{
    immediate:true
  })
  /* 暴露表单信息 */
  defineExpose({
    submit,
    // changeState,
    demandForm,
    // getFormData,
    isEdit,
    dataTrans,
    ruleFormRef,
  })
</script>

<style lang="scss">
  .el-form-item__label{
    &::before{
      display: none;
    }
  }
  .demandForm{
    .showMoreIcon{
      position: absolute;
      top: 8px;
      right: 0;
      color: #999999;
    }
    input::placeholder {
      color: #B2BAD1;
    }
    .changeCheckMargin{
      display: flex;
      flex-wrap: wrap;
      .el-checkbox{
        margin-right: 6vw;
      }
    }
    .changeMaterialCheckMargin{
      .el-form-item{
        margin-bottom: 18px;
      }
    }
    .changeMarginTo5{
      margin-bottom: 0px !important;
    }
    .el-input-group__append, .el-input-group__prepend{
      background-color: unset;
    }
    .el-input.is-disabled .el-input__wrapper{
      background-color: white;
    }
    .el-select .el-input__wrapper.is-focus {
      box-shadow: none !important;
    }
    .el-select .el-input.is-focus .el-input__wrapper, .el-input-group__append{
      box-shadow: none !important;
    }
    .el-input__wrapper{
      box-shadow: none !important;
      background-color: #F6F6FB;
      border-radius: 2px;
    }
    .el-form-item__label{
      color: #A2A2A2;
    }

    .el-textarea__inner{
      background-color: #F6F6FB;
      border: unset;
      box-shadow: unset;
    }
    .grayWrap{
      background-color: #F6F6FB;
      border-radius: 2px;
      width: 100%;
      padding-left: 10px;
      box-sizing: border-box;
    }
    .innerFormItem{
      position: relative;
      left: -24.5vw;
      margin-top: 10px;
      // width: 100vw;
      box-sizing: border-box;
      padding: 4vw;
      border: 1px solid #EBECEC;
      background-color: #F2F8FD;
      .el-input__wrapper{
        background-color: #E3EEFE;
      }
      .el-input.is-disabled .el-input__wrapper{
        background-color: unset;
        // border: 1px solid #EBECEC;
      }
      &>.el-form-item{
        width: 82vw;
        margin-bottom: 18px;
      }
      .el-textarea__inner{
        background-color: #E3EEFE;
        border: unset;
        box-shadow: unset;
      }
    }
    .mrgin5{
      .el-form-item{
        margin-bottom: 5px;
      }
    }
    .innerForm{
      // background-color: #F6F6FB;
      box-sizing: border-box;
      padding: 0 5px;
      border-radius: 4px;
    }

    .vantUploadWrap{
      width: 100%;
      // padding-left: 10px;
      box-sizing: border-box;
      overflow: hidden;
      .el-form-item__content{
        width: 100%;
      }
      // li{
      //   width: 100%;
      //   height: 40px;
      //   line-height: 40px;
      //   margin-bottom: 10px;
      //   padding: 0 10px;
      //   box-sizing: border-box;
      //   background-color: #F6F6FB;
      // }
    }
  }
  .el-input.is-disabled .el-input__inner{
    color: #4A4A4A;
  }
  .mapWindow{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
  }
  .quotaRadio{
    .el-radio{
      margin-right: 20px
    }
  }
</style>

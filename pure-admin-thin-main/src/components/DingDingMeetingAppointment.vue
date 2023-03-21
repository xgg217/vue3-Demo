<!-- 会议预约 -->
<script setup lang='ts'>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { apiUserGetList } from '@/api/user';
import { apiMeetingCreate } from '@/api/business';
import { Calendar, Clock, User, Location, Document } from '@element-plus/icons-vue'
import { useUserStoreHook } from '@/store/modules/user'

const { unionId } = useUserStoreHook();


const props = defineProps<{
  index?: number; // 传递的索引，会监听每次变化，用于清空数据
  ids?: string; // 会议id
}>();

const emit = defineEmits<{
  (event: 'close'): void;
  (event: 'save', ...args: any[]): void;
}>()

const iconSize = 24;
const USER_LIST = "USER_LIST"

// 标题
const {
  titleVal,
  titlePlaceholderVal,
  titleTypeVal
} = (function() {
  const titleVal = ref('');
  const titleTypeVal = ref('1');

  const titlePlaceholderVal = computed(() => {
    let title = titleTypeVal.value === '1' ? '会议' : '活动'
    return "添加" + title + "标题"
  })
  return {
    titleVal,
    titlePlaceholderVal,
    titleTypeVal,
  }
})();

// 时间
const {
  dateVal,
  setDefaultValue
} = (function() {
  const dateVal = ref<[string, string]>(['', '']);
  // const defaultTime = reactive<[Date, Date]>([new Date(), new Date()]); // 默认显示时间
  // const defaultValue = reactive<[Date, Date]>([new Date(), new Date()]); // 默认显示时间

  // 设置默认时间
  const setDefaultValue = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    const d = now.getDate();
    const h = now.getHours();

    // 默认开始时间
    const start = new Date(new Date(y, m, d, h, 0, 0).getTime() + 60 * 60 * 1000);
    const end = new Date(new Date(y, m, d, h, 0, 0).getTime() + 2 * 60 * 60 * 1000);

    const newStart = dayjs(start).format('YYYY-MM-DDTHH:mm:ssZ')
    const newEnd = dayjs(end).format('YYYY-MM-DDTHH:mm:ssZ')

    dateVal.value = [newStart, newEnd]
  }

  return {
    dateVal,
    setDefaultValue
  }
})();


// 参与人员
const {
  userList,
  mandatoryParticipants,
  asyncGetUserAll
} = (function() {
  interface IUser {
    label: string;
    value: string;
  }

  // const partakeShow = ref(false);
  const mandatoryParticipants = ref<string[]>([]); // 必须参与人
  // const optionalParticipants = ref<string[]>([]); // 可选参与人

  const userList = ref<IUser[]>([]);

  // 切换
  // const hanldeToggle = () => {
  //   partakeShow.value = !partakeShow.value;
  // };

  const asyncGetUserAll = () => {
    const userListStr = sessionStorage.getItem(USER_LIST);
    if(userListStr) {
      userList.value = JSON.parse(userListStr)
      return
    }

    apiUserGetList().then(res => {
      if (!res.success) { return }
      userList.value = res.data.map((item: any) => {
        return Object.freeze({
          label: item.nickName,
          value: item.unionId
        })
      }).filter(item => {
        return item.value
      });

      sessionStorage.setItem(USER_LIST, JSON.stringify(userList.value));
    }).catch(err => {
      console.log(err)
    });
  }

  return {
    userList,
    mandatoryParticipants,
    asyncGetUserAll
  }
})();

// 会议地点
const {
  conferenceRoom
} = (function() {
  const conferenceRoom = ref('');
  return {
    conferenceRoom
  }
})();

// 会议描述
const {
  descriptionVal
} = (function() {
  const descriptionVal = ref('');
  return {
    descriptionVal
  }
})();

// 会议提醒
// const {
//   tipList,
//   tipShow,
//   handleOneAddTips,
//   handleAddTips,
//   handleDelTips,
// } = (function () {
//   interface ITip {
//     key: number;
//     dates: string;
//     type: string;
//   }

//   let index = 1;

//   const tipList = reactive<ITip[]>([]);
//   const tipShow = ref(false);

//   // 第一次添加
//   const handleOneAddTips = () => {
//     tipShow.value = true;
//     handleAddTips();
//   }

//   // 持续添加
//   const handleAddTips = () => {
//     const len = tipList.length;

//     // 第一次添加
//     if(len === 0) {
//       tipList.push({
//         key: index++,
//         dates: '3',
//         type: '1'
//       })
//       return;
//     }

//     const {dates} = tipList[len - 1]

//     // 最后一个
//     if(Number(dates) === 9) {
//       tipList.push({
//         key: index++,
//         dates: '9',
//         type: '2'
//       })
//       return
//     }

//     // 中间
//     tipList.push({
//       key: index++,
//       dates: Number(dates) + 1 + '',
//       type: '1'
//     })
//   }

//   // 删除
//   const handleDelTips = (key: ITip["key"] ) => {
//     tipList.splice(tipList.findIndex((item) => item.key === key), 1);
//     // 最后一项删除后隐藏
//     if(tipList.length === 0) {
//       tipShow.value = false;
//     }

//   }

//   return {
//     tipList,
//     tipShow,
//     handleOneAddTips,
//     handleAddTips,
//     handleDelTips,
//   }
// })();

// 提交 / 取消
const {
  handleSubmit,
  handleCancel,
} = (function() {
  // 校验
  const validate = () => {
    if(!titleVal.value.trim()) {
      ElMessage.error('标题不能为空')
      return false;
    }

    // 日期判断
    const [ , endTime ] = dateVal.value;
    const now = new Date(endTime).getTime();
    if(now < Date.now()) {
      ElMessage.error('结束时间不能小于当前时间')
      return false;
    }

    return true;
  }

  // 发送日程数据
  const asyncSendSchedule = () => {
    console.log(mandatoryParticipants.value);

    const unionIds = mandatoryParticipants.value.map(item => {
      return {
        id: item,
        isOptional: false // 是否非必须参与人
      }
    })
    const obj = {
      summary: titleVal.value + `PX01(${props.ids}-1)`, // 标题
      startTime: dateVal.value[0], // 会议开始时间
      endTime: dateVal.value[1], // 会议结束时间
      unionIds,
      createdId: unionId,
      location: conferenceRoom.value, // 会议地点
      description: descriptionVal.value, // 会议描述
    }

    return apiMeetingCreate(obj).then(res => {
      if (res.success) {
        return true
      } else {
        return false
      }
    }).catch(err => {
      console.error(err);
    })
  }

  // 提交
  const handleSubmit = () => {
    const isBool = validate();
    if(!isBool) return;

    asyncSendSchedule().then((res) => {
      if (res) {
        ElMessage.success('提交成功');
        emit('save')
        return
      } else {
        ElMessage.error('提交失败');
        return
      }
    }).catch(err => {
      console.log(err);
    })
  }

  // 取消
  const handleCancel = () => {
    console.log('取消');
    emit('close')
  }

  return {
    handleSubmit,
    handleCancel,
  }
})();

// 页面打开
watch(() => props.index, () => {
  console.log(props.index);
  const init = () => {
    titleVal.value = '';
    titleTypeVal.value = '1';

    // 时间
    setDefaultValue()

    conferenceRoom.value = '';
    descriptionVal.value = '';
    // tipShow.value = false;
    // tipList.splice(0, tipList.length);
  }

  init()
}, { immediate: true })

onMounted(() => {
  console.log('mounted');
  asyncGetUserAll()
})


</script>

<template>
  <div class="warpp">
    <div class="head">
      <p>品鑫泰供应链(深圳)有限公司</p>
      <p>会议公约</p>
    </div>
    <!-- <el-card class="forms"> -->
    <ul class="forms">
      <!-- 会议标题 -->
      <li>
        <p class="left">
          <el-icon :size="iconSize">
            <Calendar />
          </el-icon>
        </p>
        <div class="right title">
          <el-input v-model="titleVal" :placeholder="titlePlaceholderVal" class="input-with-select" size="large"
            :autosize="{ minRows: 1 }" type="textarea" style="width: 380px"></el-input>

          <el-select v-model="titleTypeVal" placeholder="请选择" style="width: 100px">
            <el-option label="会议" value="1" />
            <el-option label="活动" value="2" />
          </el-select>
        </div>
      </li>

      <!-- 时间 -->
      <li>
        <p class="left">
          <el-icon :size="iconSize">
            <Clock />
          </el-icon>
        </p>
        <div class="right">

          <el-date-picker v-model="dateVal" type="datetimerange" range-separator="至" start-placeholder="开始时间"
            end-placeholder="结束时间" size="large" value-format="YYYY-MM-DDTHH:mm:ssZ" />
        </div>
      </li>

      <!-- 人员 -->
      <li>
        <p class="left">
          <el-icon :size="iconSize">
            <User />
          </el-icon>
        </p>
        <div class="right">
          <div>
            <el-select v-model="mandatoryParticipants" multiple placeholder="添加必须参与人" style="width: 480px;" size="large"
              filterable>
              <template v-for="item of userList" :key="item.label + item.value">
              <el-option :label="item.label" :value="item.value" />
            </template>
              <!-- <el-option label="人员1" value="1"/>
                <el-option label="人员2" value="2"/>
              <el-option label="人员3" value="3"/> -->
            </el-select>
            <!-- <el-button type="" text :icon="ArrowDown" v-if="!partakeShow" @click="hanldeToggle"></el-button>
              <el-button type="" text :icon="ArrowUp" v-else @click="hanldeToggle"></el-button> -->
        </div>

        <!-- <el-select v-model="optionalParticipants" multiple placeholder="添加可选参与人" style="width: 425px;" v-show="partakeShow" class="partakeOptional" size="large">
            <el-option label="人员1" value="1"/>
              <el-option label="人员2" value="2"/>
              <el-option label="人员3" value="3"/>
            </el-select> -->
        </div>
      </li>

      <!-- 地点 -->
      <li>
        <p class="left">
          <el-icon :size="iconSize">
            <Location />
          </el-icon>
        </p>
        <div class="right">
          <el-select v-model="conferenceRoom" placeholder="选择会议室" size="large">
            <el-option label="南山孙总会议室" value="南山孙总会议室" />
            <el-option label="南山第一会议室" value="南山第一会议室" />
            <el-option label="南山第二会议室" value="南山第二会议室" />
            <el-option label="盐田1楼大会议室" value="盐田1楼大会议室" />
            <el-option label="龙华中会议室" value="龙华中会议室" />
            <el-option label="龙华大会议室" value="龙华大会议室" />
          </el-select>
        </div>
      </li>

    <!-- 视频会议 -->
    <!-- <li>
        <p class="left">
          <el-icon :size="iconSize">
            <VideoCamera />
          </el-icon>
          </p>
          <div class="right"></div>
        </li> -->

      <!-- 会议描述 -->
      <li>
        <p class="left">
          <el-icon :size="iconSize">
            <Document />
          </el-icon>
        </p>
        <div class="right">
          <el-input v-model="descriptionVal" :rows="2" type="textarea" placeholder="请输入会议描述" style="width: 450px;" />
        </div>
      </li>

    <!-- 会议提醒 -->
    <!-- <li>
        <p class="left">
          <el-icon :size="iconSize">
            <Bell />
          </el-icon>
        </p>
        <div class="right">
          <el-button v-show="!tipShow" :icon="Plus" @click="handleOneAddTips">添加会议提醒</el-button>
          <ul v-show="tipShow">
            <li class="row" v-for="item of tipList" :key="item.key">
              <el-select v-model="item.dates" placeholder="选择提醒时间" size="large">
                <el-option label="开始时" value="1" />
                <el-option label="开始前5分钟" value="2" />
                <el-option label="开始前15分钟" value="3" />
                <el-option label="开始前30分钟" value="4" />
                <el-option label="开始前1小时" value="5" />
                <el-option label="开始前2小时" value="6" />
                <el-option label="开始前1天" value="7" />
                <el-option label="开始前2天" value="8" />
                <el-option label="开始前7天" value="9" />
              </el-select>
              <el-select v-model="item.type" style="width: 150px;" placeholder="提醒方式" size="large">
                <el-option label="应用内提醒" value="1" />
                <el-option label="短信提醒" value="2" />
                <el-option label="电话提醒" value="3" />
              </el-select>

              <el-button type="" text :icon="CloseBold" @click="handleDelTips(item.key)"></el-button>

              <el-button type="" text :icon="Plus" @click="handleAddTips"></el-button>
            </li>
            </ul>
          </div>
        </li> -->
    </ul>
    <!-- </el-card> -->

    <div class="footer">
      <el-button type="primary" size="large" @click="handleSubmit">确认</el-button>
      <el-button size="large" @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.head {
  width: 550px;
  // border: 1px solid #000;
  font-size: 16px;
  padding: 5px 0 5px 50px;

  p:nth-child(1) {
    font-weight: bold;
  }

  p:nth-child(2) {
    font-size: 14px;
    color: #409eff;
  }
}

ul {
  padding: 0;
}

ul.forms {
  // border: 1px solid #000;
  width: 550px;
  // height: 430px;
  padding: 5px 0;
  // overflow-y: scroll;
}

ul li {
  list-style: none;

  display: flex;
  margin-bottom: 20px;

  .left {
    width: 50px;
    // border: 1px solid #000;
    text-align: center;
    padding: 8px 0 0 0;
  }

  .title {
    display: flex;
    align-items: center;
  }

  .partakeOptional {
    margin-top: 10px;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 450px;
  }
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.footer {
  padding: 20px 0 0 50px;
  // border: 1px solid #000;
}
</style>

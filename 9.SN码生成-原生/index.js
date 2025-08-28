// 数字枚举
var NUM = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

// 大写字母枚举
var varTER = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]

var { init } = (() => {
  var seleArr = [...NUM, ...varTER];

  var aaaaDom = document.querySelector('.AAAA');
  var aDom = document.querySelector('.A');
  var yDom = document.querySelector('.Y');
  var yTipDom = document.querySelector('.Ytd p');
  var wwDom = document.querySelector('.WW');
  var lDom = document.querySelector('.l');
  var sss1Dom = document.querySelector('.sss1');
  var sss2Dom = document.querySelector('.sss2');
  var sss3Dom = document.querySelector('.sss3');
  var sss4Dom = document.querySelector('.sss4');
  var submitDom = document.querySelector('.submit'); // 提交

  var date = new Date();




  var init = () => {
    // 下拉列表初始化
    {
      var selStr = seleArr.map(item => {
        return `<option value="${item}">${item}</option>`
      }).join('');

      lDom.insertAdjacentHTML('afterbegin', selStr);
      sss1Dom.insertAdjacentHTML('afterbegin', selStr);
      sss2Dom.insertAdjacentHTML('afterbegin', selStr);
      sss3Dom.insertAdjacentHTML('afterbegin', selStr);
    }

    // 设置默认值
    {
      var yVal = date.getFullYear() + '';
      setY(yVal);

      sss4Dom.value = 1;
    }
  }

  // 设置 Y的值
  var setY = (str) => {
    yDom.value = str;
    if (str)
    {
      var len = str.length;
      yTipDom.innerText = str.split('')[len - 1];
    }

  }

  // 获取值
  var getVal = () => {
    var row = {
      AAAA: '',
      A: '',
      Y: '',
      WW: '',
      L: '',
      SSS: '',
      num: 0
    };

    row.AAAA = aaaaDom.value;
    row.A = aDom.value;


    // y 处理
    {
      const val = yDom.value;
      row.Y = val[3];
    }

    // WW 处理
    {
      var val = wwDom.value;
      console.log(val);

      if (val)
      {
        row.WW = val.split('W')[1];
      }
    }

    row.L = lDom.value;

    // ss
    {
      var str = `${sss1Dom.value}${sss2Dom.value}${sss3Dom.value}`;
      row.SSS = str;
    }
    row.num = sss4Dom.value - 0;

    return row;
  }

  // 校验
  var check = (row) => {


    // 校验
    for (var key in row)
    {
      // 校验不通过
      if (!row[key])
      {
        alert(`${key} 请输入正确内容`)
        return false
      }
    }

    if (row.AAAA.length !== 4)
    {
      alert("AAAA 请输入4位");
      return false;
    }

    if (row.A.length !== 1)
    {
      alert("A 请输入1位");
      return false;
    }

    if (row.num <= 0)
    {
      alert("需要生成的数量不能小于等于0");
      return false
    }

    return true
  }

  submitDom?.addEventListener('click', () => {
    var row = getVal();
    var isBool = check(row)
    if (!isBool) { return }

    var arr = getSNCode(row);
    getExcel(arr)
  })


  return {
    init
  }
})();

console.log(ExcelJS);


// 生成excel
var { getExcel, getSNCode } = (() => {
  var incrementBase36 = (base36Str) => {
    // 将36进制字符串转换为十进制数字
    var decimalNum = parseInt(base36Str, 36)

    // 对十进制数字加1
    decimalNum++

    // 将十进制数字转换回36进制字符串，并转换为大写（如果需要）
    var newBase36Str = decimalNum.toString(36).toUpperCase()

    // 如果需要保持原字符串的长度（通过前置0填充），则进行填充
    // 假设我们想要保持原字符串的长度
    var originalLength = base36Str.length
    newBase36Str = newBase36Str.padStart(originalLength, '0')

    return newBase36Str
  }

  // 按照顺序生成指定数量 SSS
  var getSSS = (str, num) => {
    var arr = [str]
    // var ind = 100
    while (arr.length < num)
    {
      var str = arr[arr.length - 1]
      var s = incrementBase36(str)
      arr.push(s)

      var v = arr[arr.length - 1]
      if (v === 'ZZZ')
      {
        break
      }
    }
    // console.log(arr);
    return arr
  }

  // 生成校验位
  var luhnCheckChars = (s) => {
    var b = 36
    var sum = 0
    var f = 2
    var n = s.length

    // First pass
    for (var i = n - 1; i >= 0; i--)
    {
      var c = s.charCodeAt(i)
      if (c >= 65)
      {
        c = c - 55
      } else
      {
        c = c - 48
      }
      var add = c * f
      add = Math.floor(add / b) + (add % b)
      sum += add
      f = 2 / f
    }

    sum = sum % b
    sum = (b - sum) % b
    var c = sum >= 10 ? sum + 55 : sum + 48
    s = s.slice(-10) + String.fromCharCode(c)

    n = s.length

    for (var i = n - 1; i >= 0; i--)
    {
      var c2 = s.charCodeAt(i)
      if (c2 >= 65)
      {
        c2 = c2 - 55
      } else
      {
        c2 = c2 - 48
      }
      var add = c2 * f
      add = Math.floor(add / b) + (add % b)
      sum += add
      f = 2 / f
    }

    sum = sum % b
    sum = (b - sum) % b
    var c2 = sum >= 10 ? sum + 55 : sum + 48

    return String.fromCharCode(c) + String.fromCharCode(c2)
  }

  // 生成 sncode
  var getSNCode = (row) => {
    var { AAAA, A, Y, WW, L, SSS, num } = row

    // var arr: IItem[] = []
    console.log(AAAA, A, Y, WW, L, SSS, num)

    var arr = getSSS(SSS, num).map((item) => {
      var str = `${AAAA}${A}${Y}${WW}${L}${item}`

      var code = luhnCheckChars(str)

      return str + code
    })
    // console.log(a)
    return arr
  }

  // 生成excel
  var getExcel = (arr) => {
    var wb = new ExcelJS.Workbook()

    var Sheet1 = wb.addWorksheet('Sheet1')
    Sheet1.columns = [
      { header: '序号', key: 'id', width: 20 },
      { header: 'CUSTOMER_SN', key: 'sn', width: 30 }
    ]

    var data = []

    arr.forEach((item, index) => {
      data.push({
        id: index + 1,
        sn: item
      })
    })
    Sheet1.addRows(data)

    wb.xlsx
      .writeBuffer()
      .then((data) => {
        var blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        var a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = 'SN码.xlsx'
        var event = new MouseEvent('click')
        a.dispatchEvent(event)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return {
    getExcel,
    getSNCode
  }
})();

init();



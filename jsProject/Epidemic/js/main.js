// Promise封装AJAX
class Http {
    get(url) {
        return new Promise((resolved, rejected) => {
            //创建ajax对象
            let xhr = new XMLHttpRequest();

            //监听ajax状态变化
            xhr.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {

                    //凝固结果
                    resolved(this.responseText);
                }
            }

            //建立服务器连接
            xhr.open('GET', url, true);

            //发起请求
            xhr.send();
        })
    }
}

// 工具对象
let utils = {

    //获取元素
    query(selector) {
        //selector：选择器
        return document.querySelectorAll(selector);
    },

    // 处理时间戳
    tranTime(val) {
        if (val) {
            let date = new Date(val)
            let Y = date.getFullYear();
            let M = date.getMonth() + 1;
            let D = date.getDate();
            let h = date.getHours();
            let m = date.getMinutes();
            if (M < 10) {
                M = '0' + M;
            }
            if (D < 10) {
                D = '0' + D;
            }
            if (h < 10) {
                h = '0' + h;
            }
            if (m < 10) {
                m = '0' + m;
            }

            return Y + '-' + M + '-' + D + ' ' + h + ':' + m;
        } else {
            return '';
        }
    },

    // 处理数字,正数前面加+，负数加-
    num(n) {
        return n >= 0 ? `+${n}` : n
    },

    //处理文本，返回前8个字符
    text(text) {
        return text.length > 8 ? text.slice(0, 8) : text
    },

    // 处理数字,数字为0返回空值
    zeroNum(n) {
        return n == 0 ? `` : n
    },

    // 改变内容
    changeHtml(className, dataDesc) {
        this.query(className)[0].innerHTML = dataDesc
    },

}

let http = new Http();
// 发起get请求
// 国内
http.get("http://api.tianapi.com/txapi/ncov/index?key=e6dd59fdff89fe13a4060eeca449795f").then(result => {
    // 处理服务器返回的数据
    result = JSON.parse(result);
    // console.log(result)
    // 存储数据
    let data = result.newslist[0]
    // console.log(data)

    // 赋值
    utils.changeHtml(".time_info span", utils.tranTime(data.desc.modifyTime))

    utils.changeHtml(".epi_in .currentConfirmedCount", data.desc.currentConfirmedCount)
    utils.changeHtml(".epi_in .currentConfirmedIncr", utils.num(data.desc.currentConfirmedIncr))

    utils.changeHtml(".epi_in .confirmedCount", data.desc.confirmedCount)
    utils.changeHtml(".epi_in .confirmedIncr", utils.num(data.desc.confirmedIncr))

    utils.changeHtml(".epi_in .curedCount", data.desc.curedCount)
    utils.changeHtml(".epi_in .curedIncr", utils.num(data.desc.curedIncr))

    utils.changeHtml(".epi_in .seriousCount", data.desc.seriousCount)
    utils.changeHtml(".epi_in .seriousIncr", utils.num(data.desc.seriousIncr))

    utils.changeHtml(".epi_in .deadCount", data.desc.deadCount)
    utils.changeHtml(".epi_in .deadIncr", utils.num(data.desc.deadIncr))

    utils.changeHtml(".epi_in .suspectedCount", data.desc.suspectedCount)
    utils.changeHtml(".epi_in .suspectedIncr", utils.num(data.desc.suspectedIncr))

})

// 省市
http.get("http://api.tianapi.com/txapi/ncovcity/index?key=e6dd59fdff89fe13a4060eeca449795f").then(result => {
    result = JSON.parse(result);
    let list = result.newslist;
    // console.log(result.newslist)

    // 存储元素
    let fragment = document.createDocumentFragment()
    // 遍历数组
    list.forEach(element => {
        // console.log(element.cities)
        // 创建节点
        let li = document.createElement("li")
        // 插入html内容
        li.innerHTML = `
        <div class="list_head">
            <span>${element.provinceName}</span>
            <span>${element.currentConfirmedCount}</span>
            <span>${element.confirmedCount}</span>
            <span>${element.deadCount}</span>
            <span>${element.curedCount}</span>
        </div>
        <ol class="list_city">
        </ol>
        `
        // 获取城市信息
        let list_cities = element.cities;
        let ol = li.querySelector(".list_city")
        // 判断list_cities是否为空
        // 不为空:
        if (list_cities.length != 0) {
            // console.log("不等于")
            let olFragment = document.createDocumentFragment()
            list_cities.forEach(ele => {
                // console.log(ele)
                let ol_li = document.createElement("li");
                ol_li.innerHTML = `
                <span>${utils.text(ele.cityName)}</span>
                <span>${utils.zeroNum(ele.currentConfirmedCount)}</span>
                <span>${utils.zeroNum(ele.confirmedCount)}</span>
                <span>${utils.zeroNum(ele.deadCount)}</span>
                <span>${utils.zeroNum(ele.curedCount)}</span>
            `
                olFragment.appendChild(ol_li)
            })
            ol.appendChild(olFragment)
        }
        else {
            // let olFragment = document.createDocumentFragment()
            let ol_li = document.createElement("li");
            ol_li.innerHTML = `
                <span>${utils.text(element.provinceName)}</span>
                <span>${utils.zeroNum(element.currentConfirmedCount)}</span>
                <span>${utils.zeroNum(element.confirmedCount)}</span>
                <span>${utils.zeroNum(element.deadCount)}</span>
                <span>${utils.zeroNum(element.curedCount)}</span>
            `
            // olFragment.appendChild(ol_li)
            ol.appendChild(ol_li)

        }

        fragment.appendChild(li)
    });
    utils.query(".epi_in_etails .epi_list")[0].appendChild(fragment)
    utils.query(".epi_in_etails .epi_list li ").forEach(element => {
        element.onclick = () => {
            if (!/active/.test(element.className)) {
                element.classList.add("active")
            } else {
                element.classList.remove("active")
            }
        }
    });
})

// 国外
http.get("http://api.tianapi.com/txapi/ncovabroad/index?key=e6dd59fdff89fe13a4060eeca449795f").then(result => {
    result = JSON.parse(result);
    // console.log(result)
    let data = result.newslist
    console.log("data ==>", data)
    // 数据分类
    let list = {}
    data.map(element => {
        if (!list[element.continents]) {
            list[element.continents] = []
        }
        list[element.continents].push(element)
    })
    // console.log(list)

    // 处理数据，格式：newData
    // {continents:
    //     [confirmedCount:confirmedCount,
    //         ...,
    //         provinceName:
    //         [
    //             {},{},...
    //         ]
    //     ],
    //     ...
    // }
    let newData = {};
    // function yy(key,list){
    for (const i in list) {
        newData[i] = {}
        newData[i]["provinceName"] = []
        list[i].forEach(element => {
            newData[i]["provinceName"].push(element)

            if (!newData[i]["confirmedCount"]) {
                newData[i]["confirmedCount"] = element.confirmedCount
            } else {
                newData[i]["confirmedCount"] += element.confirmedCount
            }

            if (!newData[i]["currentConfirmedCount"]) {
                newData[i]["currentConfirmedCount"] = element.currentConfirmedCount
            } else {
                newData[i]["currentConfirmedCount"] += element.currentConfirmedCount
            }

            if (!newData[i]["curedCount"]) {
                newData[i]["curedCount"] = element.curedCount
            } else {
                newData[i]["curedCount"] += element.curedCount
            }

            if (!newData[i]["deadCount"]) {
                newData[i]["deadCount"] = element.deadCount
            } else {
                newData[i]["deadCount"] += element.deadCount
            }
        })
    }
    console.log("newData ==>", newData)
    // 数据处理完毕 newData


    function add(keyname, list) {
        let num = 0
        for (const key in list) {
            // console.log(key)
            num += list[key][keyname]
        }
        return num
    }

    
    function getNum(keyname, list) {
        return (list.find(element => {
            return element.provinceName == keyname
        })).confirmedCount
    }
    // console.log(getNum("美国", data))

    // console.log( add("confirmedCount") )
    // 赋值
    utils.changeHtml(".epi_out .confirmedCount", add("confirmedCount", newData))
    utils.changeHtml(".epi_out .currentConfirmedCount", add("currentConfirmedCount", newData))
    utils.changeHtml(".epi_out .curedCount", add("curedCount", newData))
    utils.changeHtml(".epi_out .deadCount", add("deadCount", newData))
    utils.changeHtml(".epi_out .USA_currentConfirmedCount", getNum("美国", data))
    utils.changeHtml(".epi_out .ABC_currentConfirmedCount", getNum("巴西", data))
    utils.changeHtml(".epi_out .India_currentConfirmedCount", getNum("印度", data))
    utils.changeHtml(".epi_out .Russia_currentConfirmedCount", getNum("俄罗斯", data))

    // result ({"continents":"亚洲",confirmedCount,currentConfirmedCount,curedCount,deadCount})
    // }
    // console.log(list["亚洲"])

    // 较昨天
    let yesterdayTime = (utils.tranTime(data[0].modifyTime-1000*60*60*24)).slice(0, 10)
    console.log("yesterdayTime ==>", yesterdayTime)
    http.get(`http://api.tianapi.com/txapi/ncovabroad/index?key=e6dd59fdff89fe13a4060eeca449795f&date=${yesterdayTime}`).then(oldResult => {

        oldResult = JSON.parse(oldResult);
        let oldData = oldResult.newslist
        // console.log("data ==>", data)
        // 数据分类
        let oldList = {}
        oldData.map(element => {
            if (!oldList[element.continents]) {
                oldList[element.continents] = []
            }
            oldList[element.continents].push(element)
        })
        // console.log(oldList)

        let yesterdayData = {};
        // function yy(key,oldList){
        for (const i in oldList) {
            yesterdayData[i] = {}
            yesterdayData[i]["provinceName"] = []
            oldList[i].forEach(element => {
                yesterdayData[i]["provinceName"].push(element)

                if (!yesterdayData[i]["confirmedCount"]) {
                    yesterdayData[i]["confirmedCount"] = element.confirmedCount
                } else {
                    yesterdayData[i]["confirmedCount"] += element.confirmedCount
                }

                if (!yesterdayData[i]["currentConfirmedCount"]) {
                    yesterdayData[i]["currentConfirmedCount"] = element.currentConfirmedCount
                } else {
                    yesterdayData[i]["currentConfirmedCount"] += element.currentConfirmedCount
                }

                if (!yesterdayData[i]["curedCount"]) {
                    yesterdayData[i]["curedCount"] = element.curedCount
                } else {
                    yesterdayData[i]["curedCount"] += element.curedCount
                }

                if (!yesterdayData[i]["deadCount"]) {
                    yesterdayData[i]["deadCount"] = element.deadCount
                } else {
                    yesterdayData[i]["deadCount"] += element.deadCount
                }
            })
        }
        console.log("yesterdayData ==>", yesterdayData)
        // 数据处理完毕 newData

        utils.changeHtml(".epi_out .confirmedIncr", utils.num(add("confirmedCount", newData)-add("confirmedCount", yesterdayData)))
        utils.changeHtml(".epi_out .currentConfirmedIncr", utils.num(add("currentConfirmedCount", newData)-add("currentConfirmedCount", yesterdayData)))
        utils.changeHtml(".epi_out .curedIncr", utils.num(add("curedCount", newData)-add("curedCount", yesterdayData)))
        utils.changeHtml(".epi_out .deadIncr", utils.num(add("deadCount", newData)-add("deadCount", yesterdayData)))
        utils.changeHtml(".epi_out .USA_currentConfirmedIncr",utils.num( getNum("美国", data)-getNum("美国", oldData)))
        utils.changeHtml(".epi_out .ABC_currentConfirmedIncr", utils.num(getNum("巴西", data)-getNum("巴西", oldData)))
        utils.changeHtml(".epi_out .India_currentConfirmedIncr",utils.num( getNum("印度", data)-getNum("印度", oldData)))
        utils.changeHtml(".epi_out .Russia_currentConfirmedIncr", utils.num(getNum("俄罗斯", data)-getNum("俄罗斯", oldData)))
    })



    // newData
    let fragment = document.createDocumentFragment()
    // 遍历 生成全球疫情列表
    for (const key in newData) {
        // console.log(element.cities)
        let li = document.createElement("li")
        li.innerHTML = `
        <div class="list_head">
            <span>${key}</span>
            <span>${newData[key].currentConfirmedCount}</span>
            <span>${newData[key].confirmedCount}</span>
            <span>${newData[key].deadCount}</span>
            <span>${newData[key].curedCount}</span>
        </div>
        <ol class="list_province">
        </ol>
        `
        let list_provinceName = newData[key].provinceName;
        let ol = li.querySelector(".list_province")
        if (list_provinceName.length != 0) {
            // console.log("不等于")
            let olFragment = document.createDocumentFragment()
            list_provinceName.forEach(ele => {
                // console.log(ele)
                let ol_li = document.createElement("li");
                ol_li.innerHTML = `
                <span>${ele.provinceName}</span>
                <span>${utils.zeroNum(ele.currentConfirmedCount)}</span>
                <span>${utils.zeroNum(ele.confirmedCount)}</span>
                <span>${utils.zeroNum(ele.deadCount)}</span>
                <span>${utils.zeroNum(ele.curedCount)}</span>
            `
                olFragment.appendChild(ol_li)
            })
            ol.appendChild(olFragment)
        }
        else {
            // let olFragment = document.createDocumentFragment()
            let ol_li = document.createElement("li");
            ol_li.innerHTML = `
                <span>${newData[key].provinceName}</span>
                <span>${utils.zeroNum(newData[key].currentConfirmedCount)}</span>
                <span>${utils.zeroNum(newData[key].confirmedCount)}</span>
                <span>${utils.zeroNum(newData[key].deadCount)}</span>
                <span>${utils.zeroNum(newData[key].curedCount)}</span>
            `
            // olFragment.appendChild(ol_li)
            ol.appendChild(ol_li)

        }

        fragment.appendChild(li)
    }

    utils.query(".epi_out_etails .epi_list")[0].appendChild(fragment)
    utils.query(".epi_out_etails .epi_list li ").forEach(element => {
        element.onclick = () => {
            console.log(111)
            if (!/active/.test(element.className)) {
                element.classList.add("active")
            } else {
                element.classList.remove("active")
            }
        }
    });

})



// 点击事件
// 更多
utils.query(".list_more")[0].onclick = function () {
    this.style.display = "none"
    utils.query(".epi_list ")[0].style.height = "100%"
}
// 国内
utils.query(".epi_selet li")[0].onclick = function () {
    this.className = "active";
    utils.query(".epi_selet li")[1].className = ""
    utils.query(".epi_in")[0].style.display = "block";
    utils.query(".epi_out")[0].style.display = "none"
    utils.query(".epi_in_etails")[0].style.display = "block";
    utils.query(".epi_out_etails")[0].style.display = "none"
}
// 国外
utils.query(".epi_selet li")[1].onclick = function () {
    this.className = "active";
    utils.query(".epi_selet li")[0].className = ""
    utils.query(".epi_in")[0].style.display = "none";
    utils.query(".epi_out")[0].style.display = "block"
    utils.query(".epi_in_etails")[0].style.display = "none";
    utils.query(".epi_out_etails")[0].style.display = "block"
}
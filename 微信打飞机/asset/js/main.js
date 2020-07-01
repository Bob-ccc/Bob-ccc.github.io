var stageScene = document.querySelector(".stage");
var gameScence = stageScene.querySelector(".game");
var startButton = stageScene.querySelector(".start button");
var restartButton = gameScence.querySelector(".restart");
var paylifeButton = gameScence.querySelector(".paylife");
var scoreDom = gameScence.querySelector(".score");


// 初始变量
// 分数
var score = 0;
// 初始化背景定位
var gameScencePosY = 0;
// 初始化游戏状态
var gamePausedState = false;
var gameDeathState = false;
// 保存定时器返回的id
var gameFrameId;
// 帧数
var gameFrames = 0;



// 飞机型号与子弹 保存基本属性 （对象）
var enemyPlaneS = {
    imgSrc: 'enemy-plane-s.png',
    w: 34,
    h: 24,
    speed: 5,
    blood: 1
}
var enemyPlaneM = {
    imgSrc: 'enemy-plane-m.png',
    w: 46,
    h: 60,
    speed: 3,
    blood: 3
}
var enemyPlaneL = {
    imgSrc: 'enemy-plane-l.png',
    w: 110,
    h: 164,
    speed: 1,
    blood: 5
}
var bullet = {
    imgSrc: 'our-bullet.png',
    w: 6,
    h: 14,
    speed: - 5
}


// 元素的构造函数 构造器
function Element(params) {
    this.imgSrc = params.imgSrc;
    this.w = params.w;
    this.h = params.h;
    this.x = params.x;
    this.y = params.y;
    this.blood = params.blood;
    this.speed = params.speed
}
// 创建元素的方法
Element.prototype.create = function () {
    this.node = document.createElement("img");
    this.node.src = './asset/images/' + this.imgSrc;
    this.node.style.left = this.x - this.w / 2 + "px"
    this.node.style.top = this.y - this.h / 2 + "px"
    gameScence.appendChild(this.node);

};
// 元素移动的方法
Element.prototype.move = function () {
    this.y += this.speed;
    var topOutRange = this.y < -this.h / 2;
    var bottomOutRange = this.y > 640 + this.h / 2;
    // 判断是否超出游戏场景
    if (topOutRange || bottomOutRange) {
        //超出游戏场景 标记超出 相当于死亡
        this.death = true
    }
    this.node.style.top = this.y - this.h / 2 + "px"
}


// 保存我方飞机 具象具体
var ourPlane = {
    node: gameScence.querySelector(".our-plane"),
    w: 66,
    h: 80,
    x: 360 / 2,
    y: 640 - 80 / 2 - 60,
    // 保存所有子弹
    bullets: []
}
// 保存所有敌方飞机
var enemies = [];




// 游戏主体
// 更新动画帧的方法
function updateFrame() {
    return setInterval(function () {
        // 更新帧数
        gameFrames++
        // game场景背景
        gameScence.style.backgroundPositionY = ++gameScencePosY + "px";

        // 检测死亡状态
        if (gameDeathState) {
            // 如果死亡 暂停游戏
            gamePause();
            // 显示死亡视图
            stageScene.classList.add("death");
        } else {
            mouse()
        }

        // 每隔多少帧就创建子弹
        if (gameFrames % 20 == 0) {
            var newBullet = new Element(Object.assign(bullet, { x: ourPlane.x, y: ourPlane.y }));
            newBullet.create();
            ourPlane.bullets.push(newBullet);
            biu();
        }
        // 每一帧移动所有子弹ourPlane.bullets
        ourPlane.bullets.forEach(function (bullet, index, bullets) {
            bullet.move();
            // 顺便判断是否超出游戏场景
            if (bullet.death) {
                //超出游戏场景 1删除节点 2从数组删除
                gameScence.removeChild(bullet.node);
                bullets.splice(index, 1)
            }
        })
        // 每隔多少帧就创建敌方大飞机
        if (gameFrames % 800 == 0) {
            var newEnemy = new Element(Object.assign(enemyPlaneL, { x: randomNum(), y: -enemyPlaneL.h / 2 }));
            newEnemy.create();
            enemies.push(newEnemy);
        }
        // 每隔多少帧就创建敌方中飞机
        if (gameFrames % 400 == 0) {
            var newEnemy = new Element(Object.assign(enemyPlaneM, { x: randomNum(), y: -enemyPlaneM.h / 2 }));
            newEnemy.create();
            enemies.push(newEnemy);
        }
        // 每隔多少帧就创建敌方小飞机
        if (gameFrames % 50 == 0) {
            var newEnemy = new Element(Object.assign(enemyPlaneS, { x: randomNum(), y: -enemyPlaneS.h / 2 }));
            newEnemy.create();
            enemies.push(newEnemy);
        }
        // 每一帧移动所有敌方飞机
        enemies.forEach(function (enemy, index, enemies) {
            enemy.move();
            // 顺便判断是否超出游戏场景
            if (enemy.death) {
                //超出游戏场景 1删除节点 2从数组删除
                gameScence.removeChild(enemy.node);
                enemies.splice(index, 1)
            }
        })
        // 每一帧检测碰撞
        enemies.forEach(function (enemy, indexE, enemies) {
            // 子弹与敌方飞机碰撞
            ourPlane.bullets.forEach(function (bullet, indexB, bullets) {
                if (checkCollision(bullet, enemy)) {
                    bullet.death = true;
                    enemy.blood--;
                    if (enemy.speed == 3) {
                        if (enemy.blood == 1) {
                            enemyHit(enemy, indexE);
                            // console.log(enemy.blood, enemy.node.src)
                        }
                    }
                    if (enemy.speed == 1) {
                        if (enemy.blood == 2) {
                            enemyHit(enemy, indexE);
                        }
                    }
                    if (enemy.blood == 0) {
                        enemyBoom(enemy);
                        enemy.death = true;

                        ding()
                    }
                    score++
                }
            })
            // 我方飞机与敌方飞机碰撞死亡
            if (checkCollision(ourPlane, enemy)) {
                enemyBoom(enemy);
                enemy.death = true
                score++
                gameDeathState = true
            }
        })
        scoreDom.innerHTML = score
    }, 30);
};



// 游戏播放
function gamePlay() {
    stageScene.classList.remove("paused");
    // 更改游戏状态
    gamePausedState = false;
    // 开始游戏开启定时器
    gameFrameId = updateFrame();
    // 鼠标移动事件
    mouse();
};

// 游戏暂停
function gamePause() {
    stageScene.classList.add("paused");
    gamePausedState = true;
    // 暂停游戏清除定时器
    clearInterval(gameFrameId);
    // 鼠标取消移动事件
    gameScence.ontouchmove = null;
    gameScence.onmousemove = null;
};

// 随机数生成 用来作为敌方飞机x轴的位置
function randomNum() {
    return Math.round(Math.random() * 360)
}

// 检测碰撞
function checkCollision(obj1, obj2) {
    var h = Math.abs(obj1.x - obj2.x) <= (obj1.w + obj2.w) / 2
    var v = Math.abs(obj1.y - obj2.y) <= (obj1.h + obj2.h) / 2
    return h && v
}

// 敌方飞机死亡的爆炸效果
function enemyBoom(dom) {
    var boom = document.createElement("img");
    gameScence.appendChild(boom);
    if (dom.imgSrc.indexOf("hit") != -1) {
        boom.src = './asset/images/' + dom.imgSrc.replace("-hit.png", "-boom.gif");
    }
    else {
        boom.src = './asset/images/' + dom.imgSrc.replace(".png", "-boom.gif");
    }
    boom.style.top = dom.y - dom.h / 2 + "px";
    boom.style.left = dom.x - dom.w / 2 + "px";
    setTimeout(function () {
        gameScence.removeChild(boom)
    }, 1000)
}

// 敌方飞机挨打效果
function enemyHit(dom, index) {
    if (dom.imgSrc.indexOf("hit") == -1) {
        dom.node.src = './asset/images/' + dom.imgSrc.replace(".png", "-hit.png");
    };
}

// 更改我方飞机节点对象视图位置
ourPlane.updateOurPlanePos = function () {
    this.node.style.left = this.x - 33 + "px";
    this.node.style.top = this.y - 40 + "px";
};
// 初始化
ourPlane.updateOurPlanePos();



// 点击开始游戏
startButton.onclick = function () {
    // 切换场景
    stageScene.classList.add("play");
    // 游戏开始
    gameFrameId = updateFrame();
};

// 游戏场景绑定点击 切换暂停游戏
gameScence.onclick = function () {
    // 判断游戏暂停状态
    if (gamePausedState) {
        // 游戏播放
        gamePlay();
    } else {
        // 游戏暂停
        gamePause();
    }
};

// 重新开始
restartButton.onclick = function () {
    // 刷新页面
    window.location.reload();
};
// 花钱买命
paylifeButton.onclick = function () {
    // 继续游戏
    gameDeathState = false;
    stageScene.classList.remove("death")
};

function mouse() {
    // 触摸移动，我方飞机跟随移动 手机端
    gameScence.ontouchmove = function (event) {
        // console.log(event.changedTouches[0].clientX,event.changedTouches[0].clientY)
        // 更改我方飞机的位置信息
        ourPlane.x = event.changedTouches[0].clientX;
        ourPlane.y = event.changedTouches[0].clientY;
        ourPlane.updateOurPlanePos()
    };

    // 鼠标移动，我方飞机跟随移动 兼容PC
    gameScence.onmousemove = function (event) {
        // 更改我方飞机的位置信息
        ourPlane.x = event.clientX - stageScene.offsetLeft;
        ourPlane.y = event.clientY - stageScene.offsetTop;
        ourPlane.updateOurPlanePos()
    };

}
mouse();
// 子弹发射声音
function biu() {
    this.x = document.createElement("audio");
    x.src = "./asset/images/发射子弹.mp3";
    x.play()
}
// 子弹大中的声音
function ding() {
    this.x = document.createElement("audio");
    x.src = "./asset/images/子弹铁皮.mp3";
    x.play()
}
// 敌方飞机死亡爆炸效果
// 不同的敌方飞机血量不同 1 3 5
// 敌方飞机挨打效果
// 拓展 雷霆战机
// 得分每100分 之后  加快游戏进度
// 每隔15秒 buff效果出现（如何出现）
// 吃到buff 之后 发射导弹（跟普通子弹有什么区别）
// 穿透效果 散射效果 追踪弹
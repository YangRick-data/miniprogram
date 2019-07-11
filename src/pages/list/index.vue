<template>
  <div class="box">
    <div class="top">
      <h1>
        豆瓣
        <icon type="search" size="24" color="#01b601" />
      </h1>
      <div class="btn">
        <button>打开豆瓣</button>
      </div>
    </div>
    <div class="middle">
      <div class="mdbox">
        <h2>影院热映</h2>
        <p>更多</p>
      </div>
      <div class="content">
        <scroll-view class="section" scroll-x>
          <div class="myitem" v-for="(item, index) in movieList" :key="index">
            <div class="item">
              <img :src="item.images.small" alt />
            </div>
            <div class="moviename">{{item.title}}</div>
            <div class="scope">
              <div v-if="item.start !=0">
                <span v-if="item.start >=1" class="star1"></span>
                <span v-else class="star2"></span>
                <span v-if="item.start >=2" class="star1"></span>
                <span v-else class="star2"></span>
                <span v-if="item.start >=3" class="star1"></span>
                <span v-else class="star2"></span>
                <span v-if="item.start >=4" class="star1"></span>
                <span v-else class="star2"></span>
                <span v-if="item.start >=5" class="star1"></span>
                <span v-else class="star2"></span>
                <span class="word">{{item.rating.average}}</span>
              </div>
              <div v-else>暂无评分</div>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      movieList: []
    };
  },
  mounted() {
    wx.request({
      url:
        "https://autumnfish.cn/v2/movie/in_theaters?q=undefined&apikey=0df993c66c0c636e29ecbb5344252a4a",
      data: {},
      header: {
        "content-type": "json"
      },
      success: res => {
        // 解构
        let { statusCode, data } = res;
        // 判断
        if (statusCode === 200) {
          // 得到数据之前将星星数据计算出来
          data.subjects.forEach(item => {
            // 得到星星数
            var startNum = Math.round(item.rating.average / 2);
            item.start = startNum;
            item.rating.average = item.rating.average.toFixed(1);
          });
          this.movieList = data.subjects;
        }
        console.log(this.movieList);
      }
    });
  }
};
</script>

<style lang="less">
.box {
  .top {
    height: 94rpx;
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 0 36rpx;
    border-bottom: 1px solid #ccc;
    h1 {
      font-size: 24px;
      color: #00b600;
      font-weight: 700;
      line-height: 94rpx;
      display: flex;
      align-items: center;
      icon {
        height: 24px;
        margin-left: 30rpx;
      }
    }
    .btn {
      margin-top: 10rpx;
      button {
        padding: 10rpx 15rpx;
        background-color: #42bd56;
        line-height: 58rpx;
        color: #fff;
        font-size: 18px;
      }
    }
  }
  .middle {
    .mdbox {
      margin-top: 20rpx;
      display: flex;
      justify-content: space-between;
      padding: 0 36rpx;

      h2 {
        font-size: 20px;
        color: #111111;
      }
      p {
        font-size: 20px;
        color: #42bd56;
      }
    }
    .content {
      overflow: hidden;
      white-space: nowrap;
      margin-top: 20rpx;
      .section {
        width: auto;
        overflow: hidden;

        .myitem {
          display: inline-block;
          text-align: center;
          margin-right: 10rpx;
          .item {
            img {
              width: 200rpx;
              height: 285rpx;
            }
          }
          .moviename {
            font-size: 16px;
            width: 200rpx;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .scope {
            font-size: 16px;
            span {
              display: inline-block;
              width: 14px;
              height: 14px;
              background-size: 100%;
            }
            .star1 {
              background-image: url("../../utils/imgs/下载.png");
            }
            .star2 {
              background-image: url("../../utils/imgs/1.png");
            }
            .word {
              width: 28px;
            }
          }
          &:first-child {
            margin-left: 36rpx;
          }
          &:last-child {
            margin-right: 36rpx;
          }
        }
      }
    }
  }
}
</style>


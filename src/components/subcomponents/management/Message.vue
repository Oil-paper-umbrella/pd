<template>
  <div class="pd-app-message">
  <el-row>
    <div>
      <h1>收件箱<span class="mail-num">共4封</span></h1>
    </div>
  </el-row>
  <el-row>
    <el-col :span="24">
      <el-collapse accordion>
        <el-collapse-item v-for="(item, i) in messageList" :title="item.title" :name="i" :key="i">
          <template slot="title">
            {{ item.title }}<i class="el-icon-alishanchu" style="float: right" @click="delMessage(i)"></i>
          </template>
          {{ item.content }}
        </el-collapse-item>
      </el-collapse>
    </el-col>
    <div v-if="showFlag">哎呀！你的收件箱空空如也！</div>
  </el-row>
</div>
</template>
<script>
export default {
  name: 'pd-app-message',
  data(){
    return {
      messageList: [
        {
          title: '公司声明',
          content: "这是一条广告消息，你认真看看，你确定它是一条广告消息么？你再看看，它真的是一条广告消息么？你确定？你再看一遍，这个时候，你的答案是什么？它是一条广告消息，还是一条披着广告外表的真实消息？这是一条广告消息，你认真看看，你确定它是一条广告消息么？你再看看，它真的是一条广告消息么？你确定？你再看一遍，这个时候，你的答案是什么？它是一条广告消息，还是一条披着广告外表的真实消息？",
          name: 0
        },
        {
          title: '操作说明',
          content: "这是一条广告消息，你认真看看，你确定它是一条广告消息么？你再看看，它真的是一条广告消息么？你确定？你再看一遍，这个时候，你的答案是什么？它是一条广告消息，还是一条披着广告外表的真实消息？这是一条广告消息，你认真看看，你确定它是一条广告消息么？你再看看，它真的是一条广告消息么？你确定？你再看一遍，这个时候，你的答案是什么？它是一条广告消息，还是一条披着广告外表的真实消息？",
          name: 1
        },
        {
          title: '联系我们',
          content: "这是一条广告消息，你认真看看，你确定它是一条广告消息么？你再看看，它真的是一条广告消息么？你确定？你再看一遍，这个时候，你的答案是什么？它是一条广告消息，还是一条披着广告外表的真实消息？这是一条广告消息，你认真看看，你确定它是一条广告消息么？你再看看，它真的是一条广告消息么？你确定？你再看一遍，这个时候，你的答案是什么？它是一条广告消息，还是一条披着广告外表的真实消息？",
          name: 2
        },
        {
          title: '其他',
          content: "这是一条广告消息，你认真看看，你确定它是一条广告消息么？你再看看，它真的是一条广告消息么？你确定？你再看一遍，这个时候，你的答案是什么？它是一条广告消息，还是一条披着广告外表的真实消息？这是一条广告消息，你认真看看，你确定它是一条广告消息么？你再看看，它真的是一条广告消息么？你确定？你再看一遍，这个时候，你的答案是什么？它是一条广告消息，还是一条披着广告外表的真实消息？",
          name: 3
        },
      ],
      showFlag: false
    }
  },
  methods: {
    delMessage(index){
      this.messageList.splice(index,1);
    }
  },
  watch: {
    messageList(){
      if(this.messageList.length == 0){
        this.showFlag = true;
      }else{
        this.showFlag = false;
      }
    }
  }
}
</script>
<style lang="scss">
.pd-app-message {
  margin: 10px;
}
.el-breadcrumb {
    font-size: 14px;
    line-height: 3;
}
.mail-num {
  margin-left: 8px;
  font-size: 12px;
}
.mail-control {
  // background-color: #fff;
  
}
  .el-collapse {
    border-top: 1px solid #585E80;
    border-bottom: 1px solid #585E80;
    background-color: #111739;
    .el-collapse-item__header {
      color: white;
      background-color: #111739;
    }
    .el-collapse-item__wrap {
      background-color: #111739;
    }
    .el-collapse-item__content {
      color: white;
    }
    
  }

  .el-icon-alishanchu {
    position: absolute;
    top: 1;
    right: 25px;
  }
</style>
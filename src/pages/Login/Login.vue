<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" @click="isUsernameLogin=false" :class="{on:!isUsernameLogin}">短信登录</a>
          <a href="javascript:;" @click="isUsernameLogin=true" :class="{on:isUsernameLogin}">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:!isUsernameLogin}">
            <section class="login_message">
              <input  name="phone" v-validate="'required|mobile'" type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              <button
                  @click.prevent="getCode"
                  :disabled="!rightPhoneNumber || countDownTime>0"
                  class="get_verification"
                  :class="{rightPhone:rightPhoneNumber}">{{countDownTime>0?`${countDownTime}s后可获取验证码`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input name="code" v-validate="'required|code'" type="tel" maxlength="8" placeholder="验证码" v-model="code">
              <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:isUsernameLogin}">
            <section>
              <section class="login_message">
                <input name="username" v-validate="'required'" type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="username">
                <span style="color: red;" v-show="errors.has('username')">{{ errors.first('username') }}</span>
              </section>
              <section class="login_verification">
                <input name="pwd" v-validate="'required'" :type="isShowPwd?'tel':'password'" maxlength="8" placeholder="密码" v-model="pwd">
                <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
                <div class="switch_button " :class='isShowPwd?"on":"off"' @click="isShowPwd=!isShowPwd">
                  <div class="switch_circle" :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input name="captcha" v-validate="'required'" type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                <img ref="captcha" @click="toggleCaptcha" class="get_verification" :src="'http://localhost:4000/captcha'" alt="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="Login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>
<script>
  export default {
    data(){
      return {
        isUsernameLogin:false,
        isShowPwd:false,
        phone:'',
        countDownTime:0,
        code:'',
        username:'',
        pwd:'',
        captcha:''
      }
    },
    methods:{
      toggleCaptcha(){
        this.$refs.captcha.src='http://localhost:4000/captcha?time'+Date.now()
      },
     async getCode(){
        console.log('获取验证码')
        this.countDownTime = 5
        const intervalID=setInterval(() => {
          this.countDownTime--
          this.countDownTime ===0 && clearInterval(intervalID)
        },1000)
        //发送请求验证码
        let result = await this.$API.sendCode({phone:this.phone})
       console.log(result)
       if (result.code === 0){
         alert('短信已发送')
       }else {
         alert(result.msg)
       }
      },
      async Login(){
        //前端验证
        let {isUsernameLogin,phone,code,pwd,username,captcha} = this
        let names = isUsernameLogin?['username','pwd','captcha']:['phone','code']
        const success = await this.$validator.validateAll(names)
        if (success){
          // 后端验证
          //1.收集表单数据
          //2.发送请求
          let result
          if (isUsernameLogin){
           result= await this.$API.usernameLogin({username,pwd,captcha})
            if (result.code === 1){
              alert('请输入正确的用户名/密码/验证码')
              this.toggleCaptcha()
              this.captcha = ''
            }
          } else {
             result= await this.$API.phoneLogin({phone,code})
            if (result.code === 1){
              alert('请输入正确的验证码')
              this.code= ''
            }
          }

          if (result.code === 0){
            alert('登陆成功')
            this.$router.replace('/profile')
            let {token} = result.data
            this.$store.dispatch('getUserAction',result.data)
            this.$store.dispatch('getTokenAction',token)
          }


        } else {
          alert('前端验证失败')
        }

      }
    },
    computed:{
      rightPhoneNumber(){
        return /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.rightPhone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999

</style>

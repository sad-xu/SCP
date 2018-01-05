<template>
  <div id="app"> 
  	<keep-alive exclude="detail,collect"> 
    	<router-view/>
    </keep-alive>	
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {  // 自动登陆
  	let myName = localStorage.getItem('myname'),
				myPassWord = localStorage.getItem('mypassword');
		if (myName === null || myPassWord === null) {
			localStorage.setItem('loginstatus', false);
		} else {
			// 发送登陆验证请求
			// yes status  = true
			// no  status = false
     this.$http.post('/api/user/login', {myname:myName, mypassword:myPassWord})
            .then(res => {
              if (res.data.err) {
                console.log('登录失败')
              } else {
                localStorage.setItem('myname', res.data.myname);
                localStorage.setItem('mypassword', res.data.mypassword);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('collect', res.data.collect);
                localStorage.setItem('loginstatus', true);
              }
            })
            .catch(e => {
              console.log(e)
            })
		}
  }
}
</script>

<style>
html,body {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>

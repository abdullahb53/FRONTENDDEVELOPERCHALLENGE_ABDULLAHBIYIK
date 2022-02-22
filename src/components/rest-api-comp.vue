<template>

<div v-for="index in news.length" :key="index" class="kart" v-bind:id="index"  >
    <div class="kart_photo"><img class="img-fluid" v-bind:src= "news[index-1].image"></div>
    <div class="kart_baslik"><h1> {{news[index-1].name }} </h1></div>
    <div class="kart_aciklama"><h2>{{ news[index-1].description }}</h2></div>
    <div class="kart_zaman"><h3>{{ news[index-1].date }} &nbsp;&nbsp;&nbsp;&nbsp; {{ news[index-1].source }} | 4min read</h3>
    <hr><div class="kart_like"><i class="fa-solid fa-heart"></i> &nbsp;&nbsp;&nbsp;&nbsp; <i class="fa-solid fa-arrow-up-from-bracket"></i>&nbsp;&nbsp;&nbsp;&nbsp;  <i class="fa-solid fa-bookmark"></i></div>
    </div>        
</div>

</template>

<script>

import axios from 'axios'



export default {
  data(){
    return {
      news: null,
    }
  },
  //-> async created() <- ve -> await axios get(dinamikIpString) <-
  async created(){
    
    //local'de denediğim için statik değer verildi
    var ulkeSonKullanici;
    await fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(response => {
    ulkeSonKullanici = response.ip; //client ip
    });
    console.log(ulkeSonKullanici)

    var dynamicIpString = "http://api.ipapi.com/"+ulkeSonKullanici+"?access_key=b8130a15504aba8cee89efafaa11061f"  
        var ulkeKodu = await axios.get(dynamicIpString)
        .then(function(response){
          return response.data.country_code.toLowerCase().trim() //country_code büyük harflerle "TR,EN,DE" geliyor fakat biz collect-api de küçük harfle get yapıyoruz!
        })
        .catch(function(error){
          console.log("->ip bulma apisi patladi->"+error)
        })
        //console.log(ulkeKodu)

      //header değerleri -> api-key
      var optionAxios = {
          headers: {
            "content-type":"application/json",
            "authorization":"apikey 0v7dhJ1WwYlaR90Y6ErZdD:3T14eFz8OdWeS9N2z8SIV9"
          }
      }
      //apitag'i; &tag= ( "->bu kısım değiştikçe içerik değişiyor<-" )
      var apiTag= window.location.pathname.split("/")[1] //pathname ile gelen url fazladan "/" içeriyor split ile 2. dizi elemanını aldık [0]->"/" [1]->"economy"

      this.news = await axios.get('https://api.collectapi.com/news/getNews?country='+ulkeKodu+'&tag='+ apiTag,optionAxios)
      .then( function(response)  { // !!! lambda fonksiyonu olduğunda çalışmadı !!! XXX "function" -> ""=>"" XXX
      //console.log(response.data.result[0].name);
      //console.log(response.data.result[0].description);
      //console.log(response.data.result[0].date);
      return response.data.result // this.news içine değeri bastık üst 3 satır ->"console.log()'lardaki desen devam ediyor.
    
       })
       .catch( function(error) {
           console.log("->collect-api patladi->"+error);
           
        });

        console.log(this.news.length)
    
  //___"CORS" kapatmak için___
  /*
  ->vue.config.js->..........<<

  module.exports = {
    devServer: {
      proxy: 'http://localhost:8080'  --> 'api sunan sitenin ismi proxy yapilir' -> root/[vue.config.js]
    }
  }
  */
  //apikey 0v7dhJ1WwYlaR90Y6ErZdD:3T14eFz8OdWeS9N2z8SIV9
  }
    
  


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

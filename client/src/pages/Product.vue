<template>
  <main-layout>

    <form action="" method="post" role="form">
      <legend>product form</legend>

      <div class="form-group">
        <label>Name</label>
        <input type="text" v-model="name">
      </div>



      <button type="submit"
              @click.prevent="addProduct()"
              class="btn btn-primary">Add Product</button>
    </form>

    <ul>
      <li v-for="product in products">
        {{product.name}}
      </li>
    </ul>
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'
  import axios from "axios"

  const api_base = 'http://localhost:3000/'

  export default {

    components: {
      MainLayout
    }
    ,
    data(){
        return {
            products:[],
            name:''
        }
    }
    ,
    mounted(){
        this.getProducts()
    },
    methods:{
        getProducts(){
            axios.get(api_base+'api/list').then( ({data}) =>{
                this.products = data
            })
        },
        addProduct(){
            if(this.name != '')
              this.products.push({name:this.name})

        }
    }


  }
</script>

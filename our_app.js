import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({ 
    data() {
        return {
            field: "",
        }; 
    },
    watch:{ 
    },
    methods: {  
        addValue(x) {
            this.field += x;
        }
        calculate() {
            for(int i=0; i<this.field.length(); i++) {
                if(this.field[i].isNaN) {
                    
                }
                else {

                }
            }
        }
    }
        
}).mount('#app')

window.myVueApp = app;
    
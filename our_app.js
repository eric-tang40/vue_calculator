import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({ 
    data() {
        return {
            display: "", // what the user will see in the input field
            backend: "", // what we use to calculate
            result: "",
        }; 
    },
    watch:{ 
    },
    methods: {  
        addValue(x) {
            this.display += x;
            if(x == "÷") { // various if statements to make sure there are no errors in evaluating 
                this.backend += '/';
            }
            else if(x == "π") {
                this.backend += 'Math.PI';
            }
            else if(x == 'mod') {
                this.backend += '%';
            }
            else if(x == '%') {
                this.backend += '/100';
            }
            else if(x == '^') {
                this.backend += '**';
            }
            else if(x == '('){
                this.backend += '(';
            }
            else if(x == ')'){
                this.backend += ')';
            }
            else if(x == '√'){
                this.backend += 'Math.sqrt('
                
            }
            else {
                this.backend += x;
            }
        },
        calculate() {
            try {
                if (!this.backend.includes('Math.sqrt()')){
                    for(let i = 0; i < this.backend.length; i++){
                        if (this.backend.substring(i, i+10) === ('Math.sqrt(')){
                            this.backend = this.backend + ')';
                        }
                    }
                }
                this.result = eval('(' + this.backend + ')').toString(); 
                // eval() command is able to calculate certain strings 
            } 
            catch (error) {
                console.log(this.backend)
                this.result = "Error. Not a proper mathematical function.";
            }
        },
        clearField() {
            this.display = "";
            this.backend = "";
            this.result = "";
        },
        
    }
        
}).mount('#app')

window.myVueApp = app;
    
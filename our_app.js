import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({ 
    data() {
        return {
            display: "", // what the user will see in the input field
            backend: "", // what we use to calculate
            result: "",
            history: [],
        }; 
    },
    watch:{ 
    },
    methods: {  
        addValue(x) {
            this.display += x;
            // if(x == "÷") { // various if statements to make sure there are no errors in evaluating 
            //     if(this.backend.includes("Math.sqrt(") && !this.backend.includes(")")){
            //         this.backend += ')'
            //     }
            //     this.backend += '/';
            // }
            // else if(x == "π") {
            //     this.backend += 'Math.PI';
            // }
            // else if(x == 'mod') {
            //     this.backend += '%';
            // }
            // else if(x == '%') {
            //     this.backend += '/100';
            // }
            // else if(x == '^') {
            //     this.backend += '**';
            // }
            // else if(x == '('){
            //     this.backend += '(';
            // }
            // else if(x == ')'){
            //     this.backend += ')';
            // }
            // else if(x == '√'){
            //     this.backend += 'Math.sqrt('
                
            // }
            // else {
            //     this.backend += x;
            // }
        },
        evalDisplay(){
            this.backend = "";
            for(let i = 0; i < this.display.length; i++){
                const x=this.display[i]
                const y=this.display[i+1]
                const z=this.display[i+2]
                if(x == "÷") { // various if statements to make sure there are no errors in evaluating 
                    if(this.backend.includes("Math.sqrt(") && !this.backend.includes(")")){
                        this.backend += ')'
                    }
                    this.backend += '/';
                }
                else if(x == "π") {
                    this.backend += 'Math.PI';
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
            }
            if (this.display.includes("mod")){
                this.backend = this.display.replace("mod",'%')
            }
            console.log(this.backend)
        },
        calculate() {
            try {

                // if (!this.backend.includes('Math.sqrt()')){
                //     for(let i = 0; i < this.backend.length; i++){
                //         if (this.backend.substring(i, i+10) === ('Math.sqrt(')){
                            
                //             this.backend = this.backend + ')';
                //         }
                //     }
                // }

                // this.history.push(this.display)
                console.log(this.history[0])
                this.evalDisplay();
                this.result = eval('(' + this.backend + ')').toString(); 
                this.history.push(this.display + " = " + this.result)
            } 
            catch (error) {
                console.log(this.backend)
                this.result = "Error. Not a proper mathematical function.";
            }
        },
        undo(){
            this.display = this.display.substring(0, this.display.length-1)
        },
        clearField() {
            this.display = "";
            this.backend = "";
            this.result = "";
        },
        
    }
        
}).mount('#app')

window.myVueApp = app;
    
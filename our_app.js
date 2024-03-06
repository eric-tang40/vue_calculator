import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({ 
    data() {
        return {
            display: "", 
            backend: "", 
            result: "",
            history: [],
            previousResult: "",
            operators: ['*', '/', '÷', '-', '+', '^'],
            hasCalculated: false,
        }; 
    },
    watch:{ 
        display(newValue) {
            if(newValue !== "") {
                this.hasCalculated = false;
            }
        }
    },
    methods: {  
        updateInput(event) {
            if (this.hasCalculated) {
              this.result = event.target.value;
            } 
            else {
              this.display = event.target.value;
            }
        },
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
            if(this.operators.includes(this.display[0]) && this.previousResult !== "") {
                this.display = this.previousResult + this.display;
                console.log(this.display);
            }
            this.backend = "";
            for(let i = 0; i < this.display.length; i++){
                const x=this.display[i]
                // const y=this.display[i+1]
                // const z=this.display[i+2]
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
                this.evalDisplay();
                this.result = eval('(' + this.backend + ')').toString(); 
                this.previousResult = this.result;
                this.history.push(this.display + " = " + this.result);
                this.display = "";
                this.hasCalculated = true;
            } 
            catch (error) {
                // this.result = "Error. Not a proper mathematical function.";
                this.history.push("Error. Not a proper mathematical function.")
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
    
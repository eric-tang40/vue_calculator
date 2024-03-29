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
        },
    },
    computed: {
        result(newValue) {
            if(newValue === "") {
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
        },
        evalDisplay(){
            if(this.operators.includes(this.display[0]) && this.previousResult !== "") {
                this.display = this.previousResult + this.display;
            }
            if(this.display[0] === "m" && this.display[1] === "o" && this.display[2] === "d") {
                this.display = this.previousResult + this.display;
            }
            this.backend = "";
            for(let i = 0; i < this.display.length; i++){
                const x=this.display[i];
                if(x == "÷") { 
                    if(this.backend.includes("Math.sqrt(") && !this.backend.includes(")")){
                        this.backend += ')'
                    }
                    this.backend += '/';
                }
                else if((x == "π" && (this.operators.includes(this.display[i-1]) || this.operators.includes(this.display[i+1]))) || this.display == "π") {
                    this.backend += '3.141592653589793';
                } 
                else if(x=="*") {
                    if(this.backend.includes("Math.sqrt(") && !this.backend.includes(")")){
                        this.backend += ')'
                    }
                    this.backend += x;
                }
                else if(x=="+") {
                    if(this.backend.includes("Math.sqrt(") && !this.backend.includes(")")){
                        this.backend += ')'
                    }
                    this.backend += x;
                }
                else if(x=="-") {
                    if(this.backend.includes("Math.sqrt(") && !this.backend.includes(")")){
                        this.backend += ')'
                    }
                    this.backend += x;
                }
                else if(x == "π") {
                    this.backend += '*3.141592653589793';
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
                    console.log(true);
                    if(this.backend.includes("Math.sqrt(") && !this.backend.includes(")")){
                        this.backend += ')'
                    }
                    this.backend += 'Math.sqrt('
                }
                else {               
                    this.backend += x;
                }
            }
            if (this.display.includes("mod")){
                if(this.backend.includes("Math.sqrt(") && !this.backend.includes(")")){  
                    this.backend = this.backend.replace("mod",'p%');
                    this.backend = this.backend.replace("p",')');
                    
                }
            }
        },
        calculate() {
            try {
                this.evalDisplay();
                this.result = eval('(' + this.backend + ')').toString(); 
                this.previousResult = this.result;
                this.history.push(this.display + " = " + this.result);
                this.display = "";
                this.hasCalculated = true;
            } 
            catch (error) {
                if(this.result != this.previousResult) {
                    this.display = this.result;
                    this.backend = this.result;
                    this.calculate();
                }
                else {
                    this.history.push("Error. Not a proper mathematical function.")
                }
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
    
"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[854],{3905:(t,a,n)=>{n.d(a,{Zo:()=>d,kt:()=>N});var e=n(7294);function l(t,a,n){return a in t?Object.defineProperty(t,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[a]=n,t}function r(t,a){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);a&&(e=e.filter((function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable}))),n.push.apply(n,e)}return n}function i(t){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?r(Object(n),!0).forEach((function(a){l(t,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))}))}return t}function p(t,a){if(null==t)return{};var n,e,l=function(t,a){if(null==t)return{};var n,e,l={},r=Object.keys(t);for(e=0;e<r.length;e++)n=r[e],a.indexOf(n)>=0||(l[n]=t[n]);return l}(t,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(e=0;e<r.length;e++)n=r[e],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(l[n]=t[n])}return l}var m=e.createContext({}),o=function(t){var a=e.useContext(m),n=a;return t&&(n="function"==typeof t?t(a):i(i({},a),t)),n},d=function(t){var a=o(t.components);return e.createElement(m.Provider,{value:a},t.children)},u="mdxType",g={inlineCode:"code",wrapper:function(t){var a=t.children;return e.createElement(e.Fragment,{},a)}},k=e.forwardRef((function(t,a){var n=t.components,l=t.mdxType,r=t.originalType,m=t.parentName,d=p(t,["components","mdxType","originalType","parentName"]),u=o(n),k=l,N=u["".concat(m,".").concat(k)]||u[k]||g[k]||r;return n?e.createElement(N,i(i({ref:a},d),{},{components:n})):e.createElement(N,i({ref:a},d))}));function N(t,a){var n=arguments,l=a&&a.mdxType;if("string"==typeof t||l){var r=n.length,i=new Array(r);i[0]=k;var p={};for(var m in a)hasOwnProperty.call(a,m)&&(p[m]=a[m]);p.originalType=t,p[u]="string"==typeof t?t:l,i[1]=p;for(var o=2;o<r;o++)i[o]=n[o];return e.createElement.apply(null,i)}return e.createElement.apply(null,n)}k.displayName="MDXCreateElement"},6623:(t,a,n)=>{n.r(a),n.d(a,{assets:()=>m,contentTitle:()=>i,default:()=>g,frontMatter:()=>r,metadata:()=>p,toc:()=>o});var e=n(7462),l=(n(7294),n(3905));const r={},i="H2O LLM Studio performance",p={unversionedId:"get-started/llm-studio-performance",id:"get-started/llm-studio-performance",title:"H2O LLM Studio performance",description:"Setting up and runnning H2O LLM Studio requires the following minimal prerequisites. This page lists out the speed and performance metrics of H2O LLM Studio based on different hardware setups.",source:"@site/docs/get-started/llm-studio-performance.md",sourceDirName:"get-started",slug:"/get-started/llm-studio-performance",permalink:"/h2o-llmstudio/get-started/llm-studio-performance",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"Set up H2O LLM Studio",permalink:"/h2o-llmstudio/get-started/set-up-llm-studio"},next:{title:"Model flow",permalink:"/h2o-llmstudio/get-started/llm-studio-flow"}},m={},o=[],d={toc:o},u="wrapper";function g(t){let{components:a,...n}=t;return(0,l.kt)(u,(0,e.Z)({},d,n,{components:a,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"h2o-llm-studio-performance"},"H2O LLM Studio performance"),(0,l.kt)("p",null,"Setting up and runnning H2O LLM Studio requires the following minimal ",(0,l.kt)("a",{parentName:"p",href:"/h2o-llmstudio/get-started/set-up-llm-studio#prerequisites"},"prerequisites"),". This page lists out the speed and performance metrics of H2O LLM Studio based on different hardware setups."),(0,l.kt)("p",null,"The following metrics were measured. "),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"Hardware setup:")," The type and number of computing devices used to train the model."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"LLM backbone:")," The underlying architecture of the language model. For more information, see ",(0,l.kt)("a",{parentName:"li",href:"/h2o-llmstudio/concepts#llm-backbone"},"LLM backbone"),"."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"Quantization:")," A technique used to reduce the size and memory requirements of the model. For more information, see ",(0,l.kt)("a",{parentName:"li",href:"/h2o-llmstudio/concepts#quantization"},"Quantization"),"."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"Train"),": The amount of time it took to train the model in hours and minutes."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"Validation:")," The amount of time it took to validate the mode in hours and minutes. ")),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Hardware setup"),(0,l.kt)("th",{parentName:"tr",align:null},"LLM backbone"),(0,l.kt)("th",{parentName:"tr",align:null},"Quantization"),(0,l.kt)("th",{parentName:"tr",align:null},"Train (hh:mm:ss)"),(0,l.kt)("th",{parentName:"tr",align:null},"Validation (hh:mm:ss)"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"8xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-7b"),(0,l.kt)("td",{parentName:"tr",align:null},"bfloat16"),(0,l.kt)("td",{parentName:"tr",align:null},"11:35"),(0,l.kt)("td",{parentName:"tr",align:null},"3:32")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"4xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-7b"),(0,l.kt)("td",{parentName:"tr",align:null},"bfloat16"),(0,l.kt)("td",{parentName:"tr",align:null},"21:13"),(0,l.kt)("td",{parentName:"tr",align:null},"06:35")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"2xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-7b"),(0,l.kt)("td",{parentName:"tr",align:null},"bfloat16"),(0,l.kt)("td",{parentName:"tr",align:null},"37:04"),(0,l.kt)("td",{parentName:"tr",align:null},"12:21")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"1xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-7b"),(0,l.kt)("td",{parentName:"tr",align:null},"bfloat16"),(0,l.kt)("td",{parentName:"tr",align:null},"1:25:29"),(0,l.kt)("td",{parentName:"tr",align:null},"15:50")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"8xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-7b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"14:26"),(0,l.kt)("td",{parentName:"tr",align:null},"06:13")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"4xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-7b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"26:55"),(0,l.kt)("td",{parentName:"tr",align:null},"11:59")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"2xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-7b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"48:24"),(0,l.kt)("td",{parentName:"tr",align:null},"23:37")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"1xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-7b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"1:26:59"),(0,l.kt)("td",{parentName:"tr",align:null},"42:17")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"8xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-13b"),(0,l.kt)("td",{parentName:"tr",align:null},"bfloat16"),(0,l.kt)("td",{parentName:"tr",align:null},"OOM"),(0,l.kt)("td",{parentName:"tr",align:null},"OOM")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"4xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-13b"),(0,l.kt)("td",{parentName:"tr",align:null},"bfloat16"),(0,l.kt)("td",{parentName:"tr",align:null},"OOM"),(0,l.kt)("td",{parentName:"tr",align:null},"OOM")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"2xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-13b"),(0,l.kt)("td",{parentName:"tr",align:null},"bfloat16"),(0,l.kt)("td",{parentName:"tr",align:null},"OOM"),(0,l.kt)("td",{parentName:"tr",align:null},"OOM")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"1xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-13b"),(0,l.kt)("td",{parentName:"tr",align:null},"bfloat16"),(0,l.kt)("td",{parentName:"tr",align:null},"OOM"),(0,l.kt)("td",{parentName:"tr",align:null},"OOM")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"8xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-13b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"25:07"),(0,l.kt)("td",{parentName:"tr",align:null},"10:58")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"4xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-13b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"48:43"),(0,l.kt)("td",{parentName:"tr",align:null},"21:25")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"2xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-13b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"1:30:45"),(0,l.kt)("td",{parentName:"tr",align:null},"42:06")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"1xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-13b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"2:44:36"),(0,l.kt)("td",{parentName:"tr",align:null},"1:14:20")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"8xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-70b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"OOM"),(0,l.kt)("td",{parentName:"tr",align:null},"OOM")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"4xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-70b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"OOM"),(0,l.kt)("td",{parentName:"tr",align:null},"OOM")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"2xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-70b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"OOM"),(0,l.kt)("td",{parentName:"tr",align:null},"OOM")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"1xA10G"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-70b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"OOM"),(0,l.kt)("td",{parentName:"tr",align:null},"OOM")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"---"),(0,l.kt)("td",{parentName:"tr",align:null},"---"),(0,l.kt)("td",{parentName:"tr",align:null},"---"),(0,l.kt)("td",{parentName:"tr",align:null},"---"),(0,l.kt)("td",{parentName:"tr",align:null},"---")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"4xA100 80GB"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-7b"),(0,l.kt)("td",{parentName:"tr",align:null},"bfloat16"),(0,l.kt)("td",{parentName:"tr",align:null},"7:04"),(0,l.kt)("td",{parentName:"tr",align:null},"3:55")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"2xA100 80GB"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-7b"),(0,l.kt)("td",{parentName:"tr",align:null},"bfloat16"),(0,l.kt)("td",{parentName:"tr",align:null},"13:14"),(0,l.kt)("td",{parentName:"tr",align:null},"7:23")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"1xA100 80GB"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-7b"),(0,l.kt)("td",{parentName:"tr",align:null},"bfloat16"),(0,l.kt)("td",{parentName:"tr",align:null},"23:36"),(0,l.kt)("td",{parentName:"tr",align:null},"13:25")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"4xA100 80GB"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-7b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"9:44"),(0,l.kt)("td",{parentName:"tr",align:null},"6:30")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"2xA100 80GB"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-7b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"18:34"),(0,l.kt)("td",{parentName:"tr",align:null},"12:16")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"1xA100 80GB"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-7b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"34:06"),(0,l.kt)("td",{parentName:"tr",align:null},"21:51")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"4xA100 80GB"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-13b"),(0,l.kt)("td",{parentName:"tr",align:null},"bfloat16"),(0,l.kt)("td",{parentName:"tr",align:null},"11:46"),(0,l.kt)("td",{parentName:"tr",align:null},"5:56")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"2xA100 80GB"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-13b"),(0,l.kt)("td",{parentName:"tr",align:null},"bfloat16"),(0,l.kt)("td",{parentName:"tr",align:null},"21:54"),(0,l.kt)("td",{parentName:"tr",align:null},"11:17")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"1xA100 80GB"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-13b"),(0,l.kt)("td",{parentName:"tr",align:null},"bfloat16"),(0,l.kt)("td",{parentName:"tr",align:null},"39:10"),(0,l.kt)("td",{parentName:"tr",align:null},"18:55")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"4xA100 80GB"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-13b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"16:51"),(0,l.kt)("td",{parentName:"tr",align:null},"10:35")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"2xA100 80GB"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-13b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"32:05"),(0,l.kt)("td",{parentName:"tr",align:null},"21:00")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"1xA100 80GB"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-13b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"59:11"),(0,l.kt)("td",{parentName:"tr",align:null},"36:53")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"4xA100 80GB"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-70b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"1:13:33"),(0,l.kt)("td",{parentName:"tr",align:null},"46:02")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"2xA100 80GB"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-70b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"2:20:44"),(0,l.kt)("td",{parentName:"tr",align:null},"1:33:42")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"1xA100 80GB"),(0,l.kt)("td",{parentName:"tr",align:null},"h2oai/h2ogpt-4096-llama2-70b"),(0,l.kt)("td",{parentName:"tr",align:null},"nf4"),(0,l.kt)("td",{parentName:"tr",align:null},"4:23:57"),(0,l.kt)("td",{parentName:"tr",align:null},"2:44:51")))),(0,l.kt)("admonition",{type:"info"},(0,l.kt)("p",{parentName:"admonition"},"The runtimes were gathered using the default parameters. "),(0,l.kt)("details",null,(0,l.kt)("summary",null,"Expand to see the default parameters"),(0,l.kt)("pre",{parentName:"admonition"},(0,l.kt)("code",{parentName:"pre"},"architecture:\n    backbone_dtype: int4\n    force_embedding_gradients: false\n    gradient_checkpointing: true\n    intermediate_dropout: 0.0\n    pretrained: true\n    pretrained_weights: ''\naugmentation:\n    random_parent_probability: 0.0\n    skip_parent_probability: 0.0\n    token_mask_probability: 0.0\ndataset:\n    add_eos_token_to_answer: true\n    add_eos_token_to_prompt: true\n    add_eos_token_to_system: true\n    answer_column: output\n    chatbot_author: H2O.ai\n    chatbot_name: h2oGPT\n    data_sample: 1.0\n    data_sample_choice:\n    - Train\n    - Validation\n    limit_chained_samples: false\n    mask_prompt_labels: true\n    parent_id_column: None\n    personalize: false\n    prompt_column:\n    - instruction\n    system_column: None\n    text_answer_separator: <|answer|>\n    text_prompt_start: <|prompt|>\n    text_system_start: <|system|>\n    train_dataframe: /data/user/oasst/train_full.pq\n    validation_dataframe: None\n    validation_size: 0.01\n    validation_strategy: automatic\nenvironment:\n    compile_model: false\n    find_unused_parameters: false\n    gpus:\n    - '0'\n    - '1'\n    - '2'\n    - '3'\n    - '4'\n    - '5'\n    - '6'\n    - '7'\n    huggingface_branch: main\n    mixed_precision: true\n    number_of_workers: 8\n    seed: -1\n    trust_remote_code: true\n    use_fsdp: false\nexperiment_name: default-8-a10g\nllm_backbone: h2oai/h2ogpt-4096-llama2-7b\nlogging:\n    logger: None\n    neptune_project: ''\noutput_directory: /output/...\nprediction:\n    batch_size_inference: 0\n    do_sample: false\n    max_length_inference: 256\n    metric: BLEU\n    metric_gpt_model: gpt-3.5-turbo-0301\n    min_length_inference: 2\n    num_beams: 1\n    num_history: 4\n    repetition_penalty: 1.2\n    stop_tokens: ''\n    temperature: 0.3\n    top_k: 0\n    top_p: 1.0\nproblem_type: text_causal_language_modeling\ntokenizer:\n    add_prefix_space: false\n    add_prompt_answer_tokens: false\n    max_length: 512\n    max_length_answer: 256\n    max_length_prompt: 256\n    padding_quantile: 1.0\n    use_fast: true\ntraining:\n    batch_size: 2\n    differential_learning_rate: 1.0e-05\n    differential_learning_rate_layers: []\n    drop_last_batch: true\n    epochs: 1\n    evaluate_before_training: false\n    evaluation_epochs: 1.0\n    grad_accumulation: 1\n    gradient_clip: 0.0\n    learning_rate: 0.0001\n    lora: true\n    lora_alpha: 16\n    lora_dropout: 0.05\n    lora_r: 4\n    lora_target_modules: ''\n    loss_function: TokenAveragedCrossEntropy\n    optimizer: AdamW\n    save_best_checkpoint: false\n    schedule: Cosine\n    train_validation_data: false\n    warmup_epochs: 0.0\n    weight_decay: 0.0\n")))))}g.isMDXComponent=!0}}]);